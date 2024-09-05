import { xCoefficient, yCoefficient } from "../constants/parallaxValues.tsx";

export enum Axis {
    x = "x",
    y = "y",
}

export const mousePositionFn = (value: number, coordinate: Axis) => {
    const coefficient = coordinate === Axis.x ? xCoefficient : yCoefficient;
    const innerValue =  coordinate === Axis.x ? window.innerWidth : window.innerHeight;

    return `${(value - innerValue / 2) * coefficient}deg`
}