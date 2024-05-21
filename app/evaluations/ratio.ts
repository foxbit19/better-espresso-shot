export function ratioEvaluation(ratio: number) {
    let evaluation = '';

    if (ratio < 2) {
        evaluation = 'It seems that your espresso is over-extracted. Try to grind coarser or increment your output in the cup.'
    } else if (ratio >= 2.5) {
        evaluation = 'It seems that your espresso is under-extracted. Try to grind finer or decrement your output in the cup.'
    } else {
        evaluation = 'Your espresso is perfect! No need other improvements by a ratio prospective.'
    }

    return evaluation;
}

export function findRatio(input: number, output: number): number {
    const currentRatio = (1 / input) * output;
    return Math.round(currentRatio * 100) / 100
}