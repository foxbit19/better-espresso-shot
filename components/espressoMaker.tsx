"use client";

import { Button } from '@nextui-org/button'
import React, { useEffect, useRef, useState } from 'react'
import { button as buttonStyles } from "@nextui-org/theme";
import EspressoResults from './espressoResults';
import { title } from './primitives';
import { Status } from '@/app/status';
import EspressoInput from './espressoInput';

interface Props {
    dose: number
}

const EspressoMaker = (props: Props) => {
    const [counter, setCounter] = useState(0)
    const [pullStatus, setPullStatus] = useState(Status.NO_PULL);
    const timerRef = useRef<NodeJS.Timeout>()
    const [coffeeResults, setCoffeeResults] = useState("");
    const [dose, setDose] = useState(0)

    const handleStop = () => {
        clearTimeout(timerRef.current)
        setCounter(0);
        setPullStatus(Status.PULLED);
        setCoffeeResults(
            `Espresso was made in ${counter} seconds. How does it taste?`
        );
    }

    const handleStart = () => {
        setPullStatus(Status.PULLING);
    }

    useEffect(() => {
        if (pullStatus !== Status.PULLING) {
            return;
        }

        const timer = setInterval(() => {
            setCounter(counter => counter + 1)
        }, 1000)

        return () => clearInterval(timer);
    }, [pullStatus]);

    return (
        <div className='flex flex-col gap-4'>
            <EspressoInput label="Your dose" onChange={(event) => setDose(+event.currentTarget.value)} />
            {pullStatus !== Status.PULLING ? (
                <div>
                    <Button
                        onClick={handleStart}
                        className={buttonStyles({
                            color: "primary",
                            radius: "full",
                            variant: "shadow",
                        })}
                    >
                        Make espresso
                    </Button>
                </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    <h1 className={title()}>Pulling the shot </h1><br />
                    <h1 className={title()}> in <span className={title({ color: 'yellow' })}>{counter}</span> seconds.</h1><br />
                    <Button onClick={handleStop}
                        className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}>
                        Stop
                    </Button>
                </div>)}
            {pullStatus === Status.PULLED ? <EspressoResults dose={dose} results={coffeeResults} /> : <></>}
        </div>
    )
}

export default EspressoMaker