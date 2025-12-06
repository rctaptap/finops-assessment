#!/bin/bash
set -e

echo "🚀 Deploy a s3://taptap.pe/finops/assessment/"
echo "📦 Building..."
npm run build

echo "☁️  Uploading..."
aws s3 sync build/ s3://taptap.pe/finops/assessment/ --delete

echo "✅ Done! https://taptap.pe/finops/assessment/index.html"
