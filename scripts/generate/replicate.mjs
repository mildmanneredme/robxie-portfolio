// Minimal Replicate client for local media generation. Reads the token and model IDs from .env
// (run via `node --env-file=.env`). The deployed site never calls Replicate.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname } from "node:path";

const token = process.env.REPLICATE_API_TOKEN;
if (!token) throw new Error("REPLICATE_API_TOKEN missing: run with --env-file=.env");

export function model(envVar) {
  const id = process.env[envVar]?.split("#")[0].trim();
  if (!id) throw new Error(`${envVar} is not set in .env`);
  return id;
}

export async function dataUri(path) {
  const type = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg" }[extname(path)];
  return `data:${type};base64,${(await readFile(path)).toString("base64")}`;
}

async function api(url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...init.headers },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(body)}`);
  return body;
}

/** Runs a model to completion and saves its first output to `out`. */
export async function run(modelId, input, out) {
  let p = await api(`https://api.replicate.com/v1/models/${modelId}/predictions`, {
    method: "POST",
    headers: { Prefer: "wait=60" },
    body: JSON.stringify({ input }),
  });
  while (!["succeeded", "failed", "canceled"].includes(p.status)) {
    await new Promise((r) => setTimeout(r, 4000));
    p = await api(p.urls.get);
  }
  if (p.status !== "succeeded") throw new Error(`${modelId} ${p.status}: ${p.error}`);
  const url = Array.isArray(p.output) ? p.output[0] : p.output;
  const file = await fetch(url);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, Buffer.from(await file.arrayBuffer()));
  console.log(`✓ ${out} (${p.metrics?.predict_time?.toFixed(1) ?? "?"}s)`);
  return out;
}

/** Only generate the shots named on the command line, or all of them. */
export function selected(shots) {
  const want = process.argv.slice(2);
  return want.length ? shots.filter((s) => want.includes(s.id)) : shots;
}
