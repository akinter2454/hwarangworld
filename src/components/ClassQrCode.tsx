import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

export function ClassQrCode({ value }: { value: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!canvasRef.current) return;
    setError(false);
    QRCode.toCanvas(canvasRef.current, value, { width: 210, margin: 2, errorCorrectionLevel: 'M' }).catch(() => setError(true));
  }, [value]);
  if (error) return <div className="qr-error">QR 생성에 실패했습니다. 아래 참여 링크를 사용해 주세요.</div>;
  return <canvas ref={canvasRef} className="class-qr" aria-label="학급 참여 QR 코드" />;
}
