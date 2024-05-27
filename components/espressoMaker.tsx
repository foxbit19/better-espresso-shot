"use client";

import { Button } from "@nextui-org/button";
import React, { useEffect, useRef, useState } from "react";
import { button as buttonStyles } from "@nextui-org/theme";
import EspressoResults from "./espressoResults";
import EspressoInput from "./espressoInput";
import { Status } from "@/types/status";
import { FaCoffee } from "react-icons/fa";
import CoffeeMeter from "./coffeeMeter";
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@nextui-org/input";
import { round } from "@/app/evaluations/ratio";

interface Props { }

const EspressoMaker = (props: Props) => {
    const [counter, setCounter] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [pullStatus, setPullStatus] = useState(Status.NO_PULL);
    const timerRef = useRef<NodeJS.Timeout>();
    const [coffeeResults, setCoffeeResults] = useState("");
    const [dose, setDose] = useState(0);

    const handleStop = () => {
        clearTimeout(timerRef.current);
        setSeconds(counter);
        setCounter(0);
        setPullStatus(Status.PULLED);
        setCoffeeResults(
            `Espresso was made in ${counter} seconds. How does it taste?`
        );
    };

    const handleStart = (input: number) => {
        setPullStatus(Status.PULLING);
        setDose(input);
    };

    useEffect(() => {
        if (pullStatus !== Status.PULLING) {
            return;
        }

        const timer = setInterval(() => {
            setCounter((counter) => counter + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [pullStatus]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<{ input: number }>()

    const onSubmit: SubmitHandler<{ input: number }> = (data) => handleStart(round(data.input))

    return (
        <div className="flex flex-col gap-4">
            {pullStatus !== Status.PULLING ? (
                <div className="flex flex-col">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-3 align-middle justify-center">
                        <Input
                            label="Your dose"
                            type="number"
                            {...register('input', { required: true, valueAsNumber: true })}
                            isInvalid={!!errors.input}
                            errorMessage={'Please insert a valid dose in grams.'}
                            endContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">grams</span>
                                </div>
                            }
                        />
                        <Button
                            //onClick={handleStart}
                            type="submit"
                            isIconOnly
                            className={`${buttonStyles({
                                color: "primary",
                                radius: "md",
                                size: "lg",
                            })} h-14`}
                            startContent={<FaCoffee size={25} />}
                        ></Button>
                    </form>
                </div>

            ) : (
                <div className="flex flex-col align-middle text-center gap-4">
                    <CoffeeMeter seconds={counter} />
                    <Button
                        onClick={handleStop}
                        className={buttonStyles({
                            color: "primary",
                            radius: "md",
                            size: 'lg'
                        })}
                    >
                        Stop
                    </Button>
                </div>
            )
            }
            {
                pullStatus === Status.PULLED ? (
                    <EspressoResults dose={dose} results={coffeeResults} seconds={seconds} />
                ) : (
                    <></>
                )
            }
        </div >
    );
};

export default EspressoMaker;
