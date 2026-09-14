export function SpeakButton({ text, lang }: { text: string; lang: string }) {
  const speak = () => {
    if (!('speechSynthesis' in window)) {
      alert('이 브라우저에서는 음성 읽기를 지원하지 않아요.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  return <button className="small-button" onClick={speak}>🔊 발음 듣기</button>;
}
