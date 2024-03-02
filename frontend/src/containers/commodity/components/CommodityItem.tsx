import React from "react";
import imageNotAvailable from '../../../assets/images/noImage.png';
import {Card, CardActionArea, CardContent, Grid, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import {apiURL} from "../../../constants.ts";
import { Link as RouterLink } from 'react-router-dom';

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
    let noImage = imageNotAvailable;

    return (
        <Link color='inherit' underline="hover" component={RouterLink} to={'/fullcommodity/' + props.id}>
            <Card sx={{ maxWidth: 345, display: 'flex'}}>
                <CardActionArea sx={{padding: '0', margin: '0'}}>
                    <Grid>
                        <img style={{width: '100%'}} className="post-item-img"
                             src={props.image ? apiURL + '/' + props.image : noImage} alt="img"/>
                    </Grid>
                    <CardContent>
                        <Grid sx={{marginTop: 'auto'}}>
                            <Typography gutterBottom variant="h5" component="div">
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
    );
};

export default CommodityItem;