import { Indie_Flower } from 'next/font/google'
import React from 'react'
import arrow from '../app/png/arrow.png'
import Image from "next/image";

interface Props {
    text: string
    left?: boolean
}

const indieFlower = Indie_Flower({
    weight: '400',
    subsets: ['latin']
})

const Tips = (props: Props) => {
    return (
        <div className={`flex ${props.left ? 'flex-row-reverse' : 'flex-row'} gap-3 justify-end`}>
            <p className={`self-end ${indieFlower.className} text-coffee-cream self-baseline`}>{props.text}</p>
            <Image src={arrow} alt="arrow-down" width={30} className="mt-3" style={props.left ? { transform: 'scaleX(-1)' } : {}} />
        </div>
    )
}

export default Tips