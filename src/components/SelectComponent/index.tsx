import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps} from '@mui/material'


interface IProps {
    label: string
    options: string[]
    value: string
    onChange(e: SelectChangeEvent): void
    sx?: SxProps
}

const SelectComponent = (props: IProps) => {
    const {options, value, onChange, label, sx} = props

    return (
        <FormControl sx={sx}>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                value={value}
                onChange={onChange}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectComponent