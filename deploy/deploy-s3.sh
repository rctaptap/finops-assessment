#!/bin/bash
# Deploy script para S3
# Uso: ENV=prod sh deploy/deploy-s3.sh

set -e

ENV=${ENV:-local}

if [ "$ENV" != "prod" ]; then
  echo "❌ ENV no es 'prod'. Deploy cancelado."
  echo "Para deploy: ENV=prod sh deploy/deploy-s3.sh"
  exit 0
fi

echo "🚀 Deploy a s3://taptap.pe/finops/assessment/"
echo "📦 Building..."
npm run build

echo "☁️  Uploading..."
aws s3 sync build/ s3://taptap.pe/finops/assessment/ --delete

echo "✅ Done! https://taptap.pe/finops/assessment/index.html"
