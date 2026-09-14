import { useState } from 'react';
import type { QuizQuestion } from '../types';

export function Quiz({ questions, onComplete }: { questions: QuizQuestion[]; onComplete: (score: number) => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  const isCorrect = selected === question.answer;

  const next = () => {
    if (selected === null) return;
    const nextScore = score + (isCorrect ? 1 : 0);
    if (index === questions.length - 1) {
      setScore(nextScore);
      setFinished(true);
      onComplete(nextScore);
      return;
    }
    setScore(nextScore);
    setIndex((value) => value + 1);
    setSelected(null);
  };

  const retry = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="quiz-finish card">
        <div className="big-emoji">🎉</div>
        <h3>여행 미션 완료!</h3>
        <p><strong>{questions.length}문제 중 {score}문제</strong>를 맞혔어요.</p>
        <button className="primary-button" onClick={retry}>다시 도전하기</button>
      </div>
    );
  }

  return (
    <div className="quiz card">
      <div className="progress-row"><span>미션 {index + 1} / {questions.length}</span><span>⭐ {score}</span></div>
      <div className="progress"><div style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      {question.image && <figure className="quiz-image"><img src={question.image} alt={question.imageAlt ?? '문제와 관련된 교육용 이미지'} /></figure>}
      <h3>{question.question}</h3>
      <div className="option-list">
        {question.options.map((option, optionIndex) => {
          let className = 'option';
          if (selected !== null && optionIndex === question.answer) className += ' correct';
          else if (selected === optionIndex) className += ' wrong';
          return (
            <button key={option} className={className} disabled={selected !== null} onClick={() => setSelected(optionIndex)}>
              <span>{optionIndex + 1}</span>{option}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className={isCorrect ? 'feedback good' : 'feedback'}>
          <strong>{isCorrect ? '정답이에요! 🎉' : '조금만 더 생각해 봐요.'}</strong>
          <p>{question.explanation}</p>
        </div>
      )}
      <button className="primary-button" disabled={selected === null} onClick={next}>
        {index === questions.length - 1 ? '미션 완료' : '다음 문제'}
      </button>
    </div>
  );
}
