export const scoreAdoption = (answers, questions) => {
  const scores = {};
  questions.forEach((q) => {
    if (!scores[q.category]) scores[q.category] = { total: 0, count: 0 };
    const answer = answers[q.id];
    if (answer === 'yes') scores[q.category].total += 3;
    else if (answer === 'partial') scores[q.category].total += 2;
    else if (answer === 'no') scores[q.category].total += 1;
    if (answer) scores[q.category].count += 1;
  });
  return scores;
};

export const translateScoreToTrafficLight = (percentage) => {
  if (percentage >= 70) return 'green';
  if (percentage >= 40) return 'yellow';
  return 'red';
};
