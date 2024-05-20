import { ratioEvaluation } from '@/app/evaluations/ratio'
import { timeEvaluation } from '@/app/evaluations/time'
import React, { useEffect, useState } from 'react'

interface Props {
    input: number
    output: number
    seconds: number
}

const CoffeeSuggestion = (props: Props) => {
    const [suggestion, setSuggestion] = useState('')

    useEffect(() => {
        const ratio = (1 / props.input) * props.output;
        setSuggestion([ratioEvaluation(ratio), timeEvaluation(props.seconds)].join('\n'))
    }, [props.input, props.output, props.seconds])


    return (
        <span className='leading-relaxed mb-8 lg:text-2xl pt-5'>{suggestion}</span>
    )
}

export default CoffeeSuggestion