import ForestImage from "../../assets/img/layer-1.jpg";
import BranchImage from "../../assets/img/layer-2.png";
import LeavesImage from "../../assets/img/layer-5.png";
import FoggedGlassEffectImage from "../../assets/img/layer-6.png";

export interface ILayer {
    id: number;
    image: string;
    description: string;
}

export const layers: Array<ILayer> = [
    {
        id: 1,
        image: ForestImage,
        description: "forest",
    },
    {
        id: 2,
        image: BranchImage,
        description: "branch",
    },
    {
        id: 3,
        image: LeavesImage,
        description: "leaves",
    },
    {
        id: 4,
        image: FoggedGlassEffectImage,
        description: "fogged glass effect",
    },
]