#!/usr/bin/env bash
RELEASE_NAME=$(sentry-cli releases propose-version)

echo "📦 Creating release: "$RELEASE_NAME
npx sentry-cli releases new $RELEASE_NAME
npx sentry-cli releases files $RELEASE_NAME upload-sourcemaps public/ --rewrite
# npx sentry-cli releases set-commits --auto $RELEASE_NAME
npx sentry-cli releases finalize $RELEASE_NAME
