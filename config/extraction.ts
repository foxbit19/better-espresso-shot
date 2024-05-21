import { CoffeeType } from "@/types/coffeeType";

const extractionMap: Map<CoffeeType, string> = new Map();

extractionMap.set(CoffeeType.RISTRETTO, 'It seems that your espresso is over-extracted. Try to grind coarser or increment your output in the cup.')
extractionMap.set(CoffeeType.ESPRESSO, 'Your espresso is perfect! No need other improvements by a ratio prospective.')
extractionMap.set(CoffeeType.LUNGO, 'It seems that your espresso is under-extracted. Try to grind finer or decrement your output in the cup.')

export default extractionMap