import React from 'react';
import {
    SelectChangeEvent,
    SxProps,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material'
import {ECardViewType} from '../../constants/card-view-types'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewListIcon from '@mui/icons-material/ViewList'


interface IProps {
    value: ECardViewType
    onChange(e: any, value: ECardViewType): void
}

const ViewToggleComponent = (props: IProps) => {
    const {value, onChange} = props

    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={onChange}
        >
            <ToggleButton value={ECardViewType.GALLERY} aria-label="gallery">
                <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value={ECardViewType.LIST} aria-label="list">
                <ViewListIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default ViewToggleComponent