import React from "react";
import imageNotAvailable from '../../../assets/images/noImage.png';
import {Card, CardActionArea, CardContent, Grid, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import {apiURL} from "../../../constants.ts";
import {Link as RouterLink} from 'react-router-dom';

interface Props {
    id: string;
    image: string | null;
    title: string;
    price: number,
    user: {
        username: string;
        _id: string;
    }
}

const CommodityItem: React.FC<Props> = (props) => {
    const noImage = imageNotAvailable;
    return (
        <Grid>
            <Link color='inherit' underline="hover" component={RouterLink} to={'/fullcommodity/' + props.id}>
                <Card sx={{ maxWidth: 345, margin: '10px', height: '350px', display: 'flex', padding: '0'}}>
                    <CardActionArea>
                        <img style={{width: '100%'}} className="post-item-img"
                             src={props.image ? apiURL + '/' + props.image : noImage} alt="img"/>
                        <CardContent sx={{display: 'flex', marginTop: 'auto'}}>
                            <Grid sx={{marginTop: 'auto', display: 'flex', flexDirection: 'column'}}>
                                <Typography sx={{marginTop: 'auto'}} gutterBottom variant="h5" component="div">
                                    {props.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {props.price} $
                                </Typography>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid>
    );
};

export default CommodityItem;