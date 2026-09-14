import type { PlayerData } from '../types';

export type AnalysisLearner = {
  nickname: string;
  progress: PlayerData | null;
};

export type LocalClassAnalysis = {
  headline: string;
  summary: string;
  strengths: string[];
  attention: string[];
  nextActions: string[];
};

function average(values: number[]) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

export function analyzeClassLocally(learners: AnalysisLearner[], totalCountries: number): LocalClassAnalysis {
  const withProgress = learners.filter((learner) => learner.progress);
  if (!learners.length) {
    return {
      headline: '아직 분석할 학생이 없습니다.',
      summary: '학생이 수업 코드로 참여하면 이 화면에서 무료 자동 분석을 볼 수 있습니다.',
      strengths: [],
      attention: ['학생 참여 후 기록이 쌓이면 방문 국가, 퀴즈, 미니게임을 기준으로 분석합니다.'],
      nextActions: ['QR 또는 수업 코드를 학생에게 공유해 보세요.'],
    };
  }

  const visits = withProgress.map((learner) => learner.progress!.visitedCountries.length);
  const stars = withProgress.map((learner) => learner.progress!.stars);
  const avgVisits = average(visits);
  const avgStars = average(stars);
  const noProgress = learners.filter((learner) => !learner.progress || learner.progress.visitedCountries.length === 0);
  const lowProgress = withProgress.filter((learner) => learner.progress!.visitedCountries.length < Math.max(1, Math.floor(avgVisits * 0.5)));
  const activeExplorers = withProgress.filter((learner) => learner.progress!.visitedCountries.length >= Math.max(2, Math.ceil(avgVisits)));

  const quizRates = withProgress.flatMap((learner) => Object.values(learner.progress!.quizBestScores));
  const attempts = withProgress.flatMap((learner) => Object.values(learner.progress!.quizAttempts));
  const avgRawQuiz = average(quizRates);
  const avgAttempts = average(attempts);

  const strengths: string[] = [];
  const attention: string[] = [];
  const nextActions: string[] = [];

  if (withProgress.length >= Math.ceil(learners.length * 0.8)) strengths.push(`학생 ${withProgress.length}/${learners.length}명이 학습 기록을 남겼습니다.`);
  if (avgVisits >= Math.max(2, totalCountries * 0.25)) strengths.push(`평균 ${avgVisits.toFixed(1)}개 여행지를 방문하며 탐험이 꾸준히 진행되고 있습니다.`);
  if (activeExplorers.length) strengths.push(`${activeExplorers.length}명이 학급 평균 이상으로 여러 여행지를 탐험했습니다.`);
  if (avgStars >= 10) strengths.push(`평균 별 ${Math.round(avgStars)}개로 활동 참여가 활발합니다.`);

  if (noProgress.length) attention.push(`아직 여행을 시작하지 않았거나 기록이 없는 학생이 ${noProgress.length}명 있습니다.`);
  if (lowProgress.length) attention.push(`방문 국가 수가 학급 평균의 절반보다 적은 학생이 ${lowProgress.length}명 있습니다.`);
  if (avgAttempts >= 2.5) attention.push('같은 퀴즈에 여러 번 도전하는 경향이 있어, 개념을 다시 확인할 시간이 필요할 수 있습니다.');
  if (!quizRates.length) attention.push('아직 퀴즈 결과가 충분하지 않아 문항 성취도 분석은 보류했습니다.');

  if (noProgress.length || lowProgress.length) nextActions.push('진행이 느린 학생에게 1개 국가만 골라 짧은 미션으로 다시 시작하게 해 보세요.');
  if (avgAttempts >= 2.5) nextActions.push('정답을 바로 알려주기보다 인사말·음식·생활 카드로 돌아가 근거를 찾아보게 해 보세요.');
  nextActions.push('다음 수업에서는 서로 다른 나라에서 찾은 “비슷한 점 1개, 다른 점 1개”를 짝과 공유하게 해 보세요.');
  nextActions.push('자동 분석은 참고용입니다. 학생의 실제 발언·과정·배경을 함께 보고 최종 판단은 교사가 해 주세요.');

  const headline = noProgress.length > 0
    ? `먼저 ${noProgress.length}명의 첫 여행 참여를 도와주세요.`
    : avgVisits >= totalCountries * 0.5
      ? '학급의 세계여행이 활발하게 진행되고 있습니다.'
      : '여행 참여는 안정적이며 다음 문화 비교 활동으로 이어갈 수 있습니다.';

  return {
    headline,
    summary: `기록이 있는 학생 ${withProgress.length}/${learners.length}명 · 평균 방문 ${avgVisits.toFixed(1)}개 · 평균 별 ${Math.round(avgStars)}개${quizRates.length ? ` · 퀴즈 원점수 평균 ${avgRawQuiz.toFixed(1)}` : ''}`,
    strengths,
    attention,
    nextActions,
  };
}
