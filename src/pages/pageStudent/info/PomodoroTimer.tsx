// PomodoroTimer.tsx
import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";

interface PomodoroTimerProps {
  visible: boolean;
  onClose: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ visible, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            clearInterval(timer!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 500);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(timer!);
    }
    return () => clearInterval(timer!);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <Modal
      title="Pomodoro Timer"
      visible={visible}
      onCancel={onClose}
      footer={null}
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }} // Fundo preto opaco
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>{formatTime(timeLeft)}</h2>
        <Button onClick={handleStart} disabled={isRunning}>
          Start
        </Button>
        <Button onClick={handleStop} style={{ marginLeft: "10px" }}>
          Stop
        </Button>
        <Button onClick={handleReset} style={{ marginLeft: "10px" }}>
          Reset
        </Button>
      </div>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/2ui7nVDDOnKHNunolJaIx8?utm_source=generator"
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </Modal>
  );
};

export default PomodoroTimer;
