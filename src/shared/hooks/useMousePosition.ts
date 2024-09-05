import { useState, MouseEvent, useEffect } from "react";

interface IMousePosition {
    x: number;
    y: number;
}

const lerp = (start: number, end: number, factor: number) => {
    return start * (1 - factor) + end * factor;
};

export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState<IMousePosition>({ x: 0, y: 0 });
    const [smoothMousePosition, setSmoothMousePosition] = useState<IMousePosition>({ x: 0, y: 0 });

    const onMouseMoveHandler = (e: MouseEvent) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
    };

    useEffect(() => {
        const animationFrame = requestAnimationFrame(() => {
            setSmoothMousePosition((prevPosition) => ({
                x: lerp(prevPosition.x, mousePosition.x!, 0.1),
                y: lerp(prevPosition.y!, mousePosition.y!, 0.1),
            }));
        });

        return () => cancelAnimationFrame(animationFrame);
    }, [mousePosition]);

    return {
        mousePosition: smoothMousePosition,
        onMouseMove: onMouseMoveHandler,
    }
}