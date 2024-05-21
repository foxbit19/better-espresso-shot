import { Result } from "@/types/result";

const resultsMap: Map<Result, string> = new Map();

resultsMap.set(Result.OVER_EXTRACTED, 'It seems that your espresso is over-extracted. Try to grind coarser or increment your output in the cup.')
resultsMap.set(Result.PERFECT, 'Your espresso is perfect! No need other improvements by a ratio prospective.')
resultsMap.set(Result.UNDER_EXTRACTED, 'It seems that your espresso is under-extracted. Try to grind finer or decrement your output in the cup.')

export default resultsMap