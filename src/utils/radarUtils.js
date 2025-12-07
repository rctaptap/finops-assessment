export const transformToRadarData = (scores) => {
  return Object.keys(scores).map((cat) => ({
    category: cat,
    score: scores[cat].count > 0 ? Math.round((scores[cat].total / scores[cat].count / 3) * 100) : 0,
  }));
};
