import React, { ChangeEvent, useRef, useState } from "react";
import { title } from "./primitives";
import EspressoInput from "./espressoInput";
import { Button } from "@nextui-org/button";
import { FaFlagCheckered, FaSave } from "react-icons/fa";
import { button as buttonStyles } from "@nextui-org/theme";
import RatioProvider from "@/app/providers/provider";
import Tips from "./tips";
import CoffeeSuggestion from "./coffeeSuggestion";
import { findRatio } from "@/app/evaluations/ratio";

interface Props {
    dose: number;
    results: string;
    seconds: number;
}

const EspressoResults = (props: Props) => {
    const [ratio, setRatio] = useState("1:1");
    const [saved, setSaved] = useState(false);
    const output = useRef<number>(0);

    const handleOutputChange = (event: ChangeEvent<HTMLInputElement>) => {
        output.current = +event.currentTarget.value;
        setRatio(`1:${findRatio(props.dose, output.current)}`);
    };

    const handleSave = () => {
        new RatioProvider().add({
            id: crypto.randomUUID(),
            date: new Date(),
            input: props.dose,
            output: output.current,
            ratio: ratio,
            seconds: props.seconds,
        });

        setSaved(true);
    };

    return (
        <div className="flex flex-col gap-3 text-center">
            {props.results.length > 0 ? (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-3 justify-end">
                        <Tips text="Add your cup output" />
                    </div>
                    <EspressoInput
                        label="Your output"
                        value={output.current.toString()}
                        onChange={handleOutputChange}
                    />
                    <Button
                        onClick={handleSave}
                        disabled={saved}
                        className={buttonStyles({
                            color: "primary",
                            radius: "md",
                            size: "lg",
                        })}
                        startContent={<FaFlagCheckered size={25} />}
                    >
                        View results
                    </Button>
                </div>
            ) : (
                <></>
            )}

            {saved ? (
                <CoffeeSuggestion
                    input={props.dose}
                    output={output.current}
                    seconds={props.seconds}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default EspressoResults;
