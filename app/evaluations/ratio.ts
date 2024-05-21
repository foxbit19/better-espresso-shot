import { Result } from "@/types/result";

export function ratioEvaluation(ratio: number): Result {
    let evaluation = '';
    let result: Result;

    if (ratio < 2) {
        result = Result.OVER_EXTRACTED;
    } else if (ratio >= 2.5) {
        result = Result.UNDER_EXTRACTED;
    } else {
        result = Result.PERFECT
    }

    return result;
}

export function findRatio(input: number, output: number): number {
    const currentRatio = (1 / input) * output;
    return Math.round(currentRatio * 100) / 100
}