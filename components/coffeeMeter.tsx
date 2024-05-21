import { CircularProgress } from '@nextui-org/react'
import { Slider } from '@nextui-org/slider'
import React, { useEffect, useState } from 'react'

interface Props {
    seconds: number
}

const CoffeeMeter = (props: Props) => {
    const [indicatorColor, setIndicatorColor] = useState<string>('stroke-coffee-over-under-extracted')

    const handleCoffeeType = () => {
        if (props.seconds < 20) {
            setIndicatorColor('stroke-coffee-over-extracted')
        } else if (props.seconds > 30) {
            setIndicatorColor('stroke-coffee-under-extracted')
        } else {
            setIndicatorColor('stroke-coffee-espresso')
        }
    }

    useEffect(() => {
        handleCoffeeType()
    }, [props.seconds])

    return (
        <div className='flex flex-col justify-center align-middle text-center self-center mb-10'>
            <CircularProgress
                classNames={{
                    svg: "w-36 h-36 drop-shadow-md",
                    indicator: `${indicatorColor}`,
                    track: "stroke-black/10",
                    value: "text-3xl font-semibold text-coffee-cream",
                }}
                maxValue={40}
                value={props.seconds}
                showValueLabel={true}
                formatOptions={{ style: "decimal" }}
                strokeWidth={4}
            />
        </div>
    )
}

export default CoffeeMeter