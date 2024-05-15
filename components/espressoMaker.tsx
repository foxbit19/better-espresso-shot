"use client";

import { Button } from "@nextui-org/button";
import React, { useEffect, useRef, useState } from "react";
import { button as buttonStyles } from "@nextui-org/theme";
import EspressoResults from "./espressoResults";
import { title } from "./primitives";
import EspressoInput from "./espressoInput";
import { Status } from "@/types/status";
import { FaCoffee } from "react-icons/fa";
import animation from '../app/lottie/beans.json'
import Lottie from "react-lottie";

interface Props { }

const EspressoMaker = (props: Props) => {
    const [counter, setCounter] = useState(0);
    const [pullStatus, setPullStatus] = useState(Status.NO_PULL);
    const timerRef = useRef<NodeJS.Timeout>();
    const [coffeeResults, setCoffeeResults] = useState("");
    const [dose, setDose] = useState(0);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const handleStop = () => {
        clearTimeout(timerRef.current);
        setCounter(0);
        setPullStatus(Status.PULLED);
        setCoffeeResults(
            `Espresso was made in ${counter} seconds. How does it taste?`
        );
    };

    const handleStart = () => {
        setPullStatus(Status.PULLING);
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

    return (
        <div className="flex flex-col gap-4">
            {pullStatus !== Status.PULLING ? (
                <div className="flex flex-row gap-3 align-middle justify-center">
                    <EspressoInput
                        label="Your dose"
                        value={dose.toString()}
                        onChange={(event) => setDose(+event.currentTarget.value)}
                    />
                    <Button
                        onClick={handleStart}
                        isIconOnly
                        className={buttonStyles({
                            color: "primary",
                            radius: "md",
                            size: "lg",
                        })}
                        startContent={<FaCoffee size={25} />}
                    ></Button>
                </div>
            ) : (
                <div className="flex flex-col align-middle text-center gap-4">
                    Making espresso...
                    <Lottie options={defaultOptions}
                        height={100}
                        width={200} />
                    <h2>
                        <span className={title({ color: "yellow" })}>{counter}</span>{" "}
                        seconds
                    </h2>
                    <br />
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
            )}
            {pullStatus === Status.PULLED ? (
                <EspressoResults dose={dose} results={coffeeResults} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default EspressoMaker;
