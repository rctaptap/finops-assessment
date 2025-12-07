export function generateExecutiveReport(pillarSummary, recs) {
  return `
Resumen Ejecutivo – Well-Architected Cost Optimization

El pilar de Optimización de Costos presenta el siguiente estado:

• Riesgo Alto: ${pillarSummary.high}
• Riesgo Medio: ${pillarSummary.medium}
• Riesgo Bajo: ${pillarSummary.low}
• Sin Riesgo: ${pillarSummary.noRisk}

Interpretación:
Un nivel significativo de riesgo implica oportunidades claras de eficiencia, optimización operativa y reducción de costos.

Recomendaciones Clave:
${recs.map(r => `- ${r}`).join("\n")}

Conclusión:
El análisis identifica áreas de mejora alineadas a buenas prácticas AWS. La implementación priorizada permitirá mejorar eficiencia, control y gobernanza financiera en la nube.
`;
}
