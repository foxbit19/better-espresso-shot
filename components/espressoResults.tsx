import { Slider } from '@nextui-org/slider'
import React, { useState } from 'react'
import { subtitle, title } from './primitives'
import { Tastes } from '@/app/tastes'

interface Props {
    results: string
}

const EspressoResults = (props: Props) => {
    const [coffeeSuggestion, setCoffeeSuggestion] = useState("");

    const handleCoffeeValue = (coffeeValue: any): void => {
        let suggestion = "";

        switch (coffeeValue[0]) {
            case Tastes.BITTER:
                suggestion = "Grind finer or reduce your yield";
                break;
            case Tastes.SWEET:
                suggestion = "You're doing a good job!";
                break;
            case Tastes.SOUR:
                suggestion = "Grind coarser or increase your yield";
                break;
        }

        setCoffeeSuggestion(suggestion);
    };

    return (
        <div className='flex flex-col gap-3'>
            {props.results.length > 0 ? (
                <div>
                    <h2 className={subtitle()}>{props.results}</h2>
                    <Slider
                        onChange={handleCoffeeValue}
                        step={1}
                        minValue={1}
                        maxValue={3}
                        marks={[
                            {
                                value: 1,
                                label: "Bitter",
                            },
                            {
                                value: 2,
                                label: "Sweet",
                            },
                            {
                                value: 3,
                                label: "Sour",
                            },
                        ]}
                    />
                </div>
            ) : (
                <></>
            )}
            {coffeeSuggestion}
        </div>
    )
}

export default EspressoResults