import { FC, useEffect, useRef } from "react";

interface RainDrop {
    x: number;
    y: number;
    endY: number;
    velocity: number;
    opacity: number;
    draw: () => void;
    update: () => void;
}

const randomNum = (max: number, min: number) => Math.floor(Math.random() * max) + min;

export const Rain: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rainArrayRef = useRef<RainDrop[]>([]);

    const RainDrops = (
        c: CanvasRenderingContext2D,
        x: number,
        y: number,
        endY: number,
        velocity: number,
        opacity: number
    ): RainDrop => {
        const draw = () => {
            c.beginPath();
            c.moveTo(x, y);
            c.lineTo(x, y - endY);
            c.lineWidth = 1;
            c.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            c.stroke();
        };

        const update = () => {
            const rainEnd = window.innerHeight + 100;
            if (y >= rainEnd) {
                y = endY - 100;
            } else {
                y += velocity;
            }
            draw();
        };

        return { x, y, endY, velocity, opacity, draw, update };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const c = canvas.getContext("2d");
        if (!c) return;

        const initCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Устанавливаем размеры холста
        initCanvasSize();

        // Создаем капли дождя
        const rainArray: RainDrop[] = [];
        for (let i = 0; i < 140; i++) {
            const rainXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
            const rainYLocation = Math.random() * -500;
            const randomRainHeight = randomNum(10, 2);
            const randomSpeed = randomNum(20, 0.2);
            const randomOpacity = Math.random() * 0.55;
            rainArray.push(RainDrops(c, rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity));
        }

        rainArrayRef.current = rainArray;

        // Анимация дождя
        const animateRain = () => {
            requestAnimationFrame(animateRain);
            c.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < rainArrayRef.current.length; i++) {
                rainArrayRef.current[i].update();
            }
        };

        animateRain();

        // Обновляем размеры холста при изменении размера окна
        window.addEventListener("resize", initCanvasSize);

        // Очищаем слушатели при размонтировании компонента
        return () => {
            window.removeEventListener("resize", initCanvasSize);
        };
    }, []);

    return <canvas ref={canvasRef} className="rain" />;
}