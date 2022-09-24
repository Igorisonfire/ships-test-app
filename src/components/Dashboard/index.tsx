import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useQuery} from '@apollo/client'
import {loader} from 'graphql.macro'
import {CircularProgress,Grid, Theme, Typography, useMediaQuery} from '@mui/material'
import {Query, QueryShipsArgs} from '../../types'
import {ECardViewType} from '../../constants/card-view-types'
import {SHIP_TYPE_OPTIONS} from '../../constants/ship-type-options'
import SelectComponent from '../SelectComponent'
import ViewToggleComponent from '../ViewToggleComponent'
import ShipsMapper from '../ShipsMapper'

const GetShips = loader('./../../queries/GetShips.graphql')

const Dashboard = () => {
    const {
        data, loading, fetchMore,
        previousData, error, refetch
    } = useQuery<Pick<Query, 'ships'>, QueryShipsArgs>(GetShips, {
        variables: {
            offset: 0,
            limit: 6
        },
        notifyOnNetworkStatusChange: true
    })

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
    const [shipTypeValue, setShipTypeValue] = useState('')
    const [cardViewType, setCardViewType] = useState<ECardViewType>(ECardViewType.LIST)

    const currentNumberOfShips = data?.ships?.length
    const previousNumberOfShips = previousData?.ships?.length

    //Infinity scroll
    const observer = useRef<IntersectionObserver | null>(null)
    const lastItemRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return

            if (observer.current) {
                observer.current?.disconnect()
            }

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && currentNumberOfShips !== previousNumberOfShips) {
                    fetchMore({
                        variables: {
                            offset: currentNumberOfShips
                        }
                    })
                }
            });
            if (node) observer.current?.observe(node);
        },
        [loading, fetchMore, currentNumberOfShips, previousNumberOfShips]
    );

    //Filter by type
    useEffect(() => {
        if (shipTypeValue) {
            refetch({
                find: {
                    type: shipTypeValue === 'All' ? '' : shipTypeValue
                }
            })
        }
    }, [shipTypeValue, refetch])

    return (
        <Grid container direction={'column'} gap={4}>
            <Grid item>
                <Typography variant={'h3'} component={'h1'}>Ships</Typography>
            </Grid>
            <Grid item container justifyContent={'space-between'}>
                <Grid item>
                    <SelectComponent
                        label={'Ship Type'}
                        options={SHIP_TYPE_OPTIONS}
                        value={shipTypeValue}
                        onChange={(e) => setShipTypeValue(e.target.value)}
                        sx={{minWidth: 150}}
                    />
                </Grid>
                {!isMobile &&
                    <Grid item>
                        <ViewToggleComponent
                            value={cardViewType}
                            onChange={(e, value) => setCardViewType(value)}
                        />
                    </Grid>
                }
            </Grid>
            {currentNumberOfShips &&
                <ShipsMapper
                    ships={data?.ships}
                    isMobile={isMobile}
                    lastItemRef={lastItemRef}
                    cardViewType={cardViewType}
                />
            }
            {loading &&
                <Grid item container justifyContent={'center'}>
                    <CircularProgress size={50}/>
                </Grid>
            }
            {error &&
                <Grid item container>
                    <Typography>Error</Typography>
                </Grid>
            }
        </Grid>
    )
}

export default Dashboard