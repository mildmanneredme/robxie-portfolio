#!/usr/bin/env node
'use strict';
// Decrypt local configuration in memory before launching a tool. Never print values.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync, spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const requested = [];
let check = false;
let npmScript;
while (argv.length && argv[0] !== '--') {
  const flag = argv.shift();
  if (flag === '--check') check = true;
  else if (flag === '--file' && argv.length) requested.push(path.resolve(argv.shift()));
  else if (flag === '--npm-script' && argv.length) { npmScript = argv.shift(); break; }
  else { console.error('Use --check, --file PATH, --npm-script NAME, or -- COMMAND.'); process.exit(2); }
}
if (argv[0] === '--') argv.shift();
const env = { ...process.env };
const hosted = !check && (env.CI === 'true' || env.CI === '1' || env.VERCEL === '1');
let fileCount = 0;
try {
  if (!hosted) {
    let files = requested;
    if (!files.length) {
      files = ['.env.machine', '.env.shared.local', '.env.shared'].map(f => path.join(process.cwd(), f)).filter(f => fs.existsSync(f));
      // Heardvine's pipeline and web share the reconciled root development consumer.
      if (!files.length && fs.existsSync(path.join(root, 'pipeline/pyproject.toml'))) {
        files = ['.env.machine', '.env.shared.local', '.env.shared'].map(f => path.join(root, f)).filter(f => fs.existsSync(f));
      }
    }
    if (files.length) {
      const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
      const globalRoot = spawnSync(npm, ['root', '-g'], { encoding: 'utf8', shell: process.platform === 'win32', windowsHide: true });
      if (globalRoot.status !== 0) throw new Error('Tool unavailable');
      const moduleRoot = path.join(globalRoot.stdout.trim(), '@dotenvx/dotenvx');
      if (JSON.parse(fs.readFileSync(path.join(moduleRoot, 'package.json'), 'utf8')).version !== '2.33.0') throw new Error('Version mismatch');
      const dotenvx = require(moduleRoot);
      for (const file of files) {
        if (!fs.existsSync(file)) throw new Error('Missing file');
        // SDK diagnostics can include credential fragments on failure; emit only our generic error.
        const saved = { log: console.log, warn: console.warn, error: console.error };
        let loaded;
        try {
          console.log = console.warn = console.error = () => {};
          loaded = dotenvx.config({ path: file, envKeysFile: path.join(path.dirname(file), '.env.keys'), processEnv: env, quiet: true, strict: true, noArmor: true, noNative: true });
        } finally {
          Object.assign(console, saved);
        }
        if (loaded.error) throw new Error('Decryption failed');
        for (const [name, value] of Object.entries(loaded.parsed || {})) {
          if (!name.startsWith('DOTENV_PUBLIC_KEY') && value.startsWith('encrypted:')) throw new Error('Unresolved ciphertext');
        }
        fileCount++;
      }
    }
  }
} catch {
  console.error('Environment loading failed. Check the selected file, its matching local .env.keys, and global @dotenvx/dotenvx version 2.33.0. Values withheld.');
  process.exit(1);
}
// Decryption keys and crypto metadata are never inherited by the application.
for (const name of Object.keys(env)) if (/^DOTENV_(?:PRIVATE|PUBLIC)_KEY/.test(name)) delete env[name];
if (check) {
  console.log(`Environment check passed: ${fileCount} encrypted file(s); values withheld.`);
  if (!npmScript && !argv.length) process.exit(0);
}
let command;
let args;
if (npmScript) {
  if (!process.env.npm_execpath) { console.error('Run package scripts through npm.'); process.exit(2); }
  command = process.execPath;
  args = [process.env.npm_execpath, 'run', npmScript, ...(argv.length ? ['--', ...argv] : [])];
} else {
  command = argv.shift();
  args = argv;
}
if (!command) { console.error('Supply a command after --, or use --check.'); process.exit(2); }
const child = spawn(command, args, { env, stdio: 'inherit', windowsHide: true });
child.on('error', () => { console.error('Could not start the requested command.'); process.exitCode = 1; });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', (code, signal) => { process.exitCode = code === null ? (signal === 'SIGINT' ? 130 : 1) : code; });
