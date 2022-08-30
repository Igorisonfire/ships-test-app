import React, {forwardRef, Ref} from 'react';
import {Ship} from '../../types'
import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material'
import {ECardViewType} from '../../constants/card-view-types'

interface IProps extends Ship {
    cardViewType: ECardViewType
    isMobile: boolean
}

const CardItem = forwardRef((props: IProps, ref: Ref<HTMLDivElement>) => {
    const {cardViewType, image, ship_name, ship_type, isMobile} = props
    const isGalleryType = isMobile || cardViewType === ECardViewType.GALLERY

    const mdState = isGalleryType ? 4 : 12
    const smState = isGalleryType ? 6 : 12
    const xsState = 12

    const sxTextEllipsis = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '1',
        WebkitBoxOrient: 'vertical',
    }

    return (
        <Grid item md={mdState} sm={smState} xs={xsState} ref={ref}>
            <Card sx={{display: isGalleryType ? 'block' : 'flex'}}>
                <CardMedia
                    sx={{width: isGalleryType ? '100%' : '40%'}}
                    component="img"
                    height="140"
                    image={image || ''}
                    alt={ship_name || ''}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        sx={sxTextEllipsis}
                        title={ship_name || ''}
                    >
                        {ship_name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={sxTextEllipsis}
                        title={ship_type || ''}
                    >
                        {ship_type}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
})

export default CardItem