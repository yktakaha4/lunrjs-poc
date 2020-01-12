#!/bin/bash -eu

which ffprobe >/dev/null

input_dir="$(cd "$1" && pwd)"
output_dir="$(cd "$(dirname "$0")" && pwd)/../data/mp3"

(
  cd "$input_dir"
  find . -name "*.mp3" |
    sort |
    while read target_path; do
      input_path="$(cd "$(dirname "$target_path")" && pwd)/$(basename "$target_path")"
      output_path="$(dirname "$output_dir/$target_path")/$(basename "$target_path" .mp3).json"

      echo "exporing: $input_path"
      mkdir -p "$(dirname "$output_path")"
      ffprobe -v error -show_entries format -of json "$input_path" >"$output_path"
    done
)
