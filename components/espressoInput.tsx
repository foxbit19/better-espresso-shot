import { Input } from '@nextui-org/input'
import React, { ChangeEvent, KeyboardEventHandler } from 'react'

interface Props {
    value?: string
    label: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const EspressoInput = (props: Props) => {
    const handleKeyDown = (event: any) => {
        if (!/[0-9]/.test(event.key) && !['Tab', 'Backspace', 'Delete', 'ArrowUp', 'ArrowDown', '.'].includes(event.key)) {
            event.preventDefault();
        }
    }

    return (
        <Input
            className='flex-1 mb-5'
            value={props.value}
            label={props.label}
            onChange={props.onChange}
            onKeyDown={handleKeyDown}
            type="number"
            placeholder="0"
            required
            endContent={
                <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">grams</span>
                </div>
            }
        />
    )
}

export default EspressoInput