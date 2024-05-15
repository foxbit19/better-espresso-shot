import { Slider } from '@nextui-org/slider'
import React, { ChangeEvent, EventHandler, useState } from 'react'
import { subtitle, title } from './primitives'
import { Tastes } from '@/app/tastes'
import EspressoChallengeResponse from './espressoChallengeResponse'
import EspressoInput from './espressoInput'

interface Props {
    dose: number
    results: string
}

const EspressoResults = (props: Props) => {
    const [output, setOutput] = useState(0)
    const [ratio, setRatio] = useState("");
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

    const handleOutputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOutput(+event.currentTarget.value)
        setRatio(`1:${(1 / props.dose) * +event.currentTarget.value}`)
    }

    return (
        <div className='flex flex-col gap-3'>
            {props.results.length > 0 ? (
                <div>
                    <EspressoChallengeResponse question='Which is the output?'>
                        <EspressoInput label='Your output' onChange={handleOutputChange} />
                    </EspressoChallengeResponse>
                    <EspressoChallengeResponse question={props.results}>
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
                    </EspressoChallengeResponse>
                </div>
            ) : (
                <></>
            )}
            <h1 className={title()}>Your ratio is <span className={title({ color: 'yellow' })}>{ratio}</span></h1>
            <h1 className={title()}>{coffeeSuggestion}</h1>
        </div>
    )
}

export default EspressoResults