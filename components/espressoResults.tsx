import React, { useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { FaFlagCheckered } from "react-icons/fa";
import { button as buttonStyles } from "@nextui-org/theme";
import RatioProvider from "@/app/providers/provider";
import Tips from "./tips";
import CoffeeSuggestion from "./coffeeSuggestion";
import { findRatio, round } from "@/app/evaluations/ratio";
import { Input } from "@nextui-org/input";
import { useForm, SubmitHandler } from "react-hook-form"

interface Props {
    dose: number;
    results: string;
    seconds: number;
}

const EspressoResults = (props: Props) => {
    const [ratio, setRatio] = useState("1:1");
    const [saved, setSaved] = useState(false);
    const [outputDose, setOutputDose] = useState(0)

    const handleSave = (output: number) => {
        const currentRatio = `1:${findRatio(props.dose, output)}`;
        setOutputDose(output);
        setRatio(currentRatio);

        new RatioProvider().add({
            id: crypto.randomUUID(),
            date: new Date(),
            input: props.dose,
            output: output,
            ratio: currentRatio,
            seconds: props.seconds,
        });

        setSaved(true);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ output: number }>()

    return (
        <div className="flex flex-col gap-3 text-center">
            {props.results.length > 0 ? (
                <form onSubmit={handleSubmit((data: { output: number }) => handleSave(round(data.output)))} className="flex flex-col gap-2">
                    <Tips text="Add your cup output" />
                    <Input
                        label="Your output"
                        type="number"
                        {...register('output', { required: true, valueAsNumber: true })}
                        isInvalid={!!errors.output}
                        errorMessage={'Please insert a valid output in grams.'}
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">grams</span>
                            </div>
                        }
                    />
                    <Button
                        type="submit"
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
                </form>
            ) : (
                <></>
            )}

            {saved ? (
                <CoffeeSuggestion
                    input={props.dose}
                    output={outputDose}
                    seconds={props.seconds}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default EspressoResults;
