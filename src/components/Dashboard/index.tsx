import React from 'react';
import {useQuery} from '@apollo/client'
import {loader} from 'graphql.macro'
import {CircularProgress} from '@mui/material'
import {Query, QueryShipsArgs} from '../../types'

const GetShips = loader('./../../queries/GetShips.graphql')

interface IProps {

}

const Dashboard = (props: IProps) => {
    const {data, loading} = useQuery<Pick<Query, 'ships'>, QueryShipsArgs>(GetShips, {
        variables: {
            offset: 0,
            limit: 6
        }
    })

    console.log('data', data?.ships)

    if (loading) return <CircularProgress size={70}/>

    return (
        <div>
            <h1>Test</h1>
        </div>
    )
}

export default Dashboard