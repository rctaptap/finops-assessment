#!/bin/bash

# Deploy script para S3
# Uso: DEPLOY_MODE=prod sh deploy.sh

DEPLOY_MODE=${DEPLOY_MODE:-local}

echo "🚀 FinOps Assessment - Deploy Script"
echo "Mode: $DEPLOY_MODE"

if [ "$DEPLOY_MODE" != "prod" ]; then
  echo "❌ DEPLOY_MODE no es 'prod'. Deploy cancelado."
  echo "Para deploy: DEPLOY_MODE=prod sh deploy.sh"
  exit 0
fi

echo "📦 Building..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "☁️  Uploading to S3..."
aws s3 sync build/ s3://taptap.pe/finops/assessment/ --delete

if [ $? -eq 0 ]; then
  echo "✅ Deploy completado!"
  echo "🌐 URL: https://taptap.pe/finops/assessment/index.html"
else
  echo "❌ Deploy failed"
  exit 1
fi
