import React, { ReactNode } from 'react'
import { subtitle } from './primitives'

interface Props {
    question: string,
    children: ReactNode
}

const EspressoChallengeResponse = (props: Props) => {
    return (
        <div>
            <h2 className={subtitle()}>{props.question}</h2>
            {props.children}
        </div>
    )
}

export default EspressoChallengeResponse