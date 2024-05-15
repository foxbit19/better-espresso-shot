import React, { ChangeEvent, useState } from 'react'
import { title } from './primitives'
import EspressoChallengeResponse from './espressoChallengeResponse'
import EspressoInput from './espressoInput'

interface Props {
    dose: number
    results: string
}

const EspressoResults = (props: Props) => {
    const [ratio, setRatio] = useState("1:1");

    const handleOutputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const currentRatio = (1 / props.dose) * +event.currentTarget.value
        setRatio(`1:${Math.round(currentRatio * 100) / 100}`)
    }

    return (
        <div className='flex flex-col gap-3 text-center'>
            {props.results.length > 0 ? (
                <EspressoInput label='Your output' onChange={handleOutputChange} />
            ) : (
                <></>
            )}
            <h1 className={title()}>Your ratio is<br /><span className={title({ color: 'yellow' })}>{ratio}</span></h1>
        </div>
    )
}

export default EspressoResults