import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
  darkColor?: string;
  lightColor?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 180,
  className = '',
  darkColor = '#2e0854', // Royal BingoPlus deep purple
  lightColor = '#ffffff',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;

    QRCode.toCanvas(
      canvasRef.current,
      value,
      {
        width: size,
        margin: 2,
        color: {
          dark: darkColor,
          light: lightColor,
        },
        errorCorrectionLevel: 'H',
      },
      (error) => {
        if (error) {
          console.error('Error generating QR code:', error);
        }
      }
    );
  }, [value, size, darkColor, lightColor]);

  return (
    <div className={`inline-flex items-center justify-center p-3 bg-white rounded-xl shadow-md border border-purple-200/40 ${className}`}>
      <canvas ref={canvasRef} className="block rounded-lg" />
    </div>
  );
};
