"use client";

import { Button } from '@nextui-org/button'
import React, { useEffect, useRef, useState } from 'react'
import { button as buttonStyles } from "@nextui-org/theme";

interface Props {
    start: boolean
    onStop: (result: number) => void
}

const CoffeeCounter = (props: Props) => {
    const [counter, setCounter] = useState(0)
    const timerRef = useRef<NodeJS.Timeout>()

    const handleStop = () => {
        setCounter(0);
        props.onStop(counter)
    }

    useEffect(() => {
        if (!props.start) {
            timerRef.current?.unref
        } else {
            timerRef.current = setTimeout(() => {
                setCounter(counter + 1)
            }, 1000)
        }
    }, [counter, props.start])

    return (
        <>
            <h2>Coffee is making...</h2><br />
            <h2>{counter}</h2>
            <Button onClick={handleStop}
                className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}>
                Stop
            </Button>
        </>
    )
}

export default CoffeeCounter