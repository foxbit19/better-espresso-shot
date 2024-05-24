import { findRatio, ratioEvaluation } from "@/app/evaluations/ratio";
import { Card, CardBody, CardFooter, CardHeader, Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import options from '../config/lottie'
import resultLottie from '../app/lottie/results.json'
import extractionMap from "@/config/extraction";
import { CoffeeType } from "@/types/coffeeType";

interface Props {
    input: number;
    output: number;
    seconds: number;
}

const CoffeeSuggestion = (props: Props) => {
    const [suggestion, setSuggestion] = useState<string | undefined>("");
    const [ratio, setRatio] = useState('')
    const [extractionResult, setExtractionResult] = useState<CoffeeType>(CoffeeType.ESPRESSO)

    const getDescription = () => {
        switch (extractionResult) {
            case CoffeeType.RISTRETTO:
                return 'Ristretto';
            case CoffeeType.ESPRESSO:
                return 'Espresso';
            case CoffeeType.LUNGO:
                return 'Lungo';
        }
    }

    useEffect(() => {
        const currentRatio = findRatio(props.input, props.output);
        setRatio(`1:${currentRatio}`)
        const evaluation = ratioEvaluation(currentRatio)
        setExtractionResult(evaluation)
        // timeEvaluation(props.seconds)
        setSuggestion(extractionMap.get(evaluation));
    }, [props.input, props.output, props.seconds]);

    return (
        <Card className="py-4 my-5">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Ratio {ratio}</p>
                <small className="text-default-500">{props.seconds} seconds | {props.input} gr in | {props.output} gr out</small>
                <h4 className="font-bold text-large">{getDescription()}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Lottie options={{ ...options, animationData: resultLottie }} width={200} height={200} />
            </CardBody>
            <CardFooter className="flex flex-col gap-5 max-w-md text-default-500">
                <small>
                    You&apos;ve made a <b>{getDescription()}</b> with a ratio of {ratio}.
                </small>
                <small>
                    Ristretto: <b>1:1 - 1:1.5</b> | Espresso: <b>1:1.5 - 1:3</b> | Lungo: <b>1:3 - 1:6</b>
                </small>
            </CardFooter>
        </Card>
    );
};

export default CoffeeSuggestion;
