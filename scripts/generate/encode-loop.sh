#!/usr/bin/env bash
# Makes a raw clip loop seamlessly (its tail cross-fades into its head) and encodes it for the web.
# Usage: scripts/generate/encode-loop.sh media-raw/gen/loop-x.mp4 public/projects/x/loop.mp4 [width]
set -euo pipefail
in=$1; out=$2; width=${3:-960}; fade=0.6
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
offset=$(echo "$dur - 2*$fade" | bc -l)
ffmpeg -v error -y -i "$in" -filter_complex \
  "[0:v]split[a][b];[a]trim=start=$fade,setpts=PTS-STARTPTS[main];[b]trim=end=$fade,setpts=PTS-STARTPTS[head];[main][head]xfade=transition=fade:duration=$fade:offset=$offset,scale=$width:-2,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -crf 27 -preset slow -movflags +faststart "$out"
ls -la "$out"

# Lumen's clip brightens steadily, so a cross-fade would flash; it is ping-ponged instead:
#   ffmpeg -i media-raw/gen/loop-lumen.mp4 -filter_complex "[0:v]scale=720:-2,split[f][r0];[r0]reverse[r];[f][r]concat=n=2:v=1,format=yuv420p[v]" \
#     -map "[v]" -an -c:v libx264 -crf 27 -preset slow -movflags +faststart public/projects/lumen/loop.mp4
