#!/usr/bin/env bash
RELEASE_NAME="$COMMIT_REF-$BUILD_ID"

echo $RELEASE_NAME
npx sentry-cli releases new $RELEASE_NAME
npx sentry-cli releases files $RELEASE_NAME upload-sourcemaps public/
npx sentry-cli releases finalize $RELEASE_NAME
