import { AnimationKeyInterpolation } from "@babylonjs/core/Animations";

export class AnimationKey {
    frame: number;
    value: any;
    inTangent?: any;
    outTangent?: any;
    interpolation?: AnimationKeyInterpolation;
}