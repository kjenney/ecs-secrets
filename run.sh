#!/usr/bin/env bash

# Environment variables are each a JSON string
# Parse each of them and export the key as the value
for var in "$@"; do
    key=$(echo "$var" | jq -r keys[])
    value=$(echo "$var" | jq -r .[])
    export $key="$value"
done

npm start
