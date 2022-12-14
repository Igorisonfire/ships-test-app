import React, {forwardRef, Ref} from 'react';
import {Ship} from '../../types'
import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material'
import {ECardViewType} from '../../constants/card-view-types'
import notFoundImage from '../../images/image-not-found-icon.png'

interface IProps extends Ship {
    cardViewType: ECardViewType
    isMobile: boolean
}

const CardItem = forwardRef((props: IProps, ref: Ref<HTMLDivElement>) => {
    const {cardViewType, image, name, type, isMobile} = props
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
                    image={image || notFoundImage}
                    alt={name || ''}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        sx={sxTextEllipsis}
                        title={name || ''}
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={sxTextEllipsis}
                        title={type || ''}
                    >
                        {type}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
})

export default CardItem