export default function getPercent(sumWrongAnswers: number, sumCorrectAnswers: number) {
  if ((sumWrongAnswers === 0 && sumCorrectAnswers === 0)
    || sumWrongAnswers > sumCorrectAnswers) {
    return 0;
  }
  if (sumWrongAnswers === 0 && sumCorrectAnswers > 0) {
    return 100;
  }

  return 1;
}
