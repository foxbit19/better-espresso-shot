import { Input, InputProps } from '@nextui-org/input'
import React, { ChangeEvent, KeyboardEventHandler } from 'react'

interface Props {
}

const EspressoInput = (props: Props & InputProps) => {
    const handleKeyDown = (event: any) => {
        if (!/[0-9]/.test(event.key) && !['Tab', 'Backspace', 'Delete', 'ArrowUp', 'ArrowDown', '.'].includes(event.key)) {
            event.preventDefault();
        }
    }

    return (
        <Input
            className='flex-1 mb-5'
            type='number'
            endContent={
                <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">grams</span>
                </div>
            }
        />
    )
}

export default EspressoInput