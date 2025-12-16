#!/bin/bash

pattern="\"version\": \"[0-9]+\.[0-9]+\.[0-9]+\""
replacement="\"version\": \"$1\""
file_name=../frontend/package.json
sed -i -E "s/$pattern/$replacement/" $file_name

pattern="version = \"[0-9]+\.[0-9]+\.[0-9]+\""
replacement="version = \"$1\""
file_name=../backend/pyproject.toml
sed -i -E "s/$pattern/$replacement/" $file_name

pattern="PROJECT_VERSION = \"[0-9]+\.[0-9]+\.[0-9]+\""
replacement="PROJECT_VERSION = \"$1\""
file_name=../backend/src/core/constants.py
sed -i -E "s/$pattern/$replacement/" $file_name