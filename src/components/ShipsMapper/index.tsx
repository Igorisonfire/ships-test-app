import React, {Ref} from 'react';
import {Grid} from '@mui/material'
import {Maybe, Ship} from '../../types'
import CardItem from '../CardItem'
import {ECardViewType} from '../../constants/card-view-types'

interface IProps {
    ships: Maybe<Maybe<Ship>[]> | undefined
    isMobile: boolean
    lastItemRef: Ref<HTMLDivElement>
    cardViewType: ECardViewType
}

const ShipsMapper = (props: IProps) => {
    const {ships, isMobile, lastItemRef, cardViewType} = props

    if (!ships) return null

    return (
        <Grid item container spacing={4}>
            {ships.map((ship, index) => {
                const isLastItem = ships.length === index + 1

                return (
                    <CardItem
                        ref={isLastItem ? lastItemRef : null}
                        key={index}
                        cardViewType={cardViewType}
                        isMobile={isMobile}
                        {...ship}
                    />
                )
            })}
        </Grid>
    )
}

export default ShipsMapper