# Deploy Automático

## Ejecutar deploy

```bash
npm run deploy
```

Esto hará:
1. Build de producción con rutas correctas (`npm run build`)
2. Sync a `s3://taptap.pe/finops/assessment/`
3. Elimina archivos antiguos (`--delete`)

## URL final

https://taptap.pe/finops/assessment/index.html

## Nota

El `homepage` está configurado en package.json como `/finops/assessment` para que todas las rutas de assets (CSS, JS) sean correctas.

## Verificar archivos

```bash
aws s3 ls s3://taptap.pe/finops/assessment/ --recursive
```
