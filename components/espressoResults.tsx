import React, { ChangeEvent, useState } from "react";
import { title } from "./primitives";
import EspressoInput from "./espressoInput";
import ShareBar from "./shareBar";
import { Indie_Flower } from 'next/font/google'
import arrow from '../app/png/arrow.png'
import Image from "next/image";
import { card as cardStyles } from "@nextui-org/theme";

interface Props {
    dose: number;
    results: string;
}

const indieFlower = Indie_Flower({
    weight: '400',
    subsets: ['latin']
})

const EspressoResults = (props: Props) => {
    const [ratio, setRatio] = useState("1:1");

    const handleOutputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const currentRatio = (1 / props.dose) * +event.currentTarget.value;
        setRatio(`1:${Math.round(currentRatio * 100) / 100}`);
    };

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

            <ShareBar />
        </div>
    );
};

export default EspressoResults;
