import { CSSProperties } from "react";

import { useMousePosition } from "./shared/hooks";
import { zMoveFn } from "./shared/lib";
import { scaleFn } from "./shared/lib";
import { Axis, mousePositionFn } from "./shared/lib";

import { Logo } from "./shared/components/shared/logo/Logo.tsx";
import { Rain } from "./shared/lib";

import { layers } from "./shared/constants/layers.ts";

import cls from "./App.module.scss";
import {portfolio} from "./shared/constants/links.ts";

export const App = () => {
    const { mousePosition, onMouseMove } = useMousePosition();

    return (
        <main className={cls.main} onMouseMove={onMouseMove}>
            <Logo className={cls.logo}/>
            <section className={cls.layers}>
                <div
                    className={cls.layersContainer}
                    style={{
                        "--move-x": `${mousePositionFn(mousePosition.x, Axis.x)}`,
                        "--move-y": `${mousePositionFn(mousePosition.y, Axis.y) || "0deg"}`,
                    } as CSSProperties}
                >
                    {layers.map(layer => (
                        <img
                            key={layer.id}
                            className={cls.layerItem}
                            style={{
                                "--z": zMoveFn(layer.id),
                                "--scale": scaleFn(layer.id),
                            } as CSSProperties}
                            src={layer.image}
                            alt={layer.description}
                        />
                    ))}
                    <div className={cls.contentContainer}>
                        <h1 className={cls.title}>Natural Forest <span>HTML / CSS</span></h1>
                        <div className={cls.subTitle}>Creating a beautiful 3D website with a ‘lens effect’</div>
                        <a
                            className={cls.link}
                            href={portfolio}
                            rel={"nofollow noopener noreferrer"}
                        >
                            My portfolio
                        </a>
                    </div>
                    <div className={cls.rainContainer}>
                        <Rain />
                    </div>
                </div>
            </section>
        </main>
    )
};
