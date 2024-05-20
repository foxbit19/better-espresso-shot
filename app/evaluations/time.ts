export function timeEvaluation(seconds: number) {
    let evaluation = '';

    if (seconds < 20) {
        evaluation = 'The extraction time indicates that your espresso is over-extracted. Try grinding coarser or increasing the output in the cup.'
    } else if (seconds > 30) {
        evaluation = 'The extraction time indicates that your espresso is under-extracted. Try grinding finer or decreasing the output in the cup.'
    } else {
        evaluation = 'Your espresso time window is perfect! No further improvements are needed from a timing perspective.'
    }

    return evaluation;
}