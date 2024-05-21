import { findRatio, ratioEvaluation } from "@/app/evaluations/ratio";
import { timeEvaluation } from "@/app/evaluations/time";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import options from '../config/lottie'
import resultLottie from '../app/lottie/results.json'
import { Result } from "@/types/result";
import resultsMap from "@/config/results";

interface Props {
    input: number;
    output: number;
    seconds: number;
}

const CoffeeSuggestion = (props: Props) => {
    const [suggestion, setSuggestion] = useState<string | undefined>("");
    const [ratio, setRatio] = useState('')
    const [extractionResult, setExtractionResult] = useState<Result>(Result.UNDER_EXTRACTED)

    const getDescription = () => {
        switch (extractionResult) {
            case Result.OVER_EXTRACTED:
                return 'Over-extracted';
            case Result.UNDER_EXTRACTED:
                return 'Under-extracted';
            case Result.PERFECT:
                return 'Perfect!';
        }
    }

    useEffect(() => {
        const currentRatio = findRatio(props.input, props.output);
        setRatio(`1:${currentRatio}`)
        const evaluation = ratioEvaluation(currentRatio)
        setExtractionResult(evaluation)
        // timeEvaluation(props.seconds)
        setSuggestion(resultsMap.get(evaluation));
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
            <CardFooter className="max-w-md text-default-600 italic">
                {suggestion}
            </CardFooter>
        </Card>
    );
};

export default CoffeeSuggestion;
