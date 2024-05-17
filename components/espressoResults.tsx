import React, { ChangeEvent, useRef, useState } from "react";
import { title } from "./primitives";
import EspressoInput from "./espressoInput";
import ShareBar from "./shareBar";
import { Indie_Flower } from 'next/font/google'
import arrow from '../app/png/arrow.png'
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { FaSave } from "react-icons/fa";
import { button as buttonStyles } from "@nextui-org/theme";
import { RatioResult } from "@/types/ratioResult";
import RatioProvider from "@/app/providers/provider";

interface Props {
    dose: number;
    results: string;
    seconds: number
}

const indieFlower = Indie_Flower({
    weight: '400',
    subsets: ['latin']
})

const EspressoResults = (props: Props) => {
    const [ratio, setRatio] = useState("1:1");
    const [saved, setSaved] = useState(false)
    const output = useRef<number>(0)

    const handleOutputChange = (event: ChangeEvent<HTMLInputElement>) => {
        output.current = +event.currentTarget.value
        const currentRatio = (1 / props.dose) * output.current;
        setRatio(`1:${Math.round(currentRatio * 100) / 100}`);
    };

    const handleSave = () => {
        new RatioProvider().add({
            id: crypto.randomUUID(),
            date: new Date(),
            input: props.dose,
            output: output.current,
            ratio: ratio,
            seconds: props.seconds
        })

        setSaved(true);
    }

    return (
        <div className="flex flex-col gap-3 text-center">
            {props.results.length > 0 ? (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-3 justify-end">
                        <p className={`self-end ${indieFlower.className} text-coffee-cream self-baseline`}>Add your cup output</p>
                        <Image src={arrow} alt="arrow-down" width={30} className="mt-3" />
                    </div>
                    <EspressoInput label="Your output" onChange={handleOutputChange} />
                </div>
            ) : (
                <></>
            )}
            <h1 className={`${title()} py-10`}>
                Your ratio is
                <br />
                <span className={title({ color: "yellow" })}>{ratio}</span>
            </h1>
            <Button
                onClick={handleSave}
                disabled={saved}
                className={buttonStyles({
                    color: "primary",
                    radius: "md",
                    size: "lg",
                })}
                startContent={<FaSave size={25} />}
            >Save</Button>
        </div>
    );
};

export default EspressoResults;
