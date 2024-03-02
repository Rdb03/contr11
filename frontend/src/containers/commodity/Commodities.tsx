import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCommodity, selectCommodityLoading} from "./commoditiesSlice.ts";
import {useEffect} from "react";
import {fetchCommodities} from "./commoditiesThunk.ts";
import {CircularProgress, Grid} from "@mui/material";
import CommodityItem from "./components/CommodityItem.tsx";
import {commoditiesArr} from "../../constants.ts";
import Typography from "@mui/material/Typography";


const Commodities = () => {
    const dispatch = useAppDispatch();
    const commodities = useAppSelector(selectCommodity);
    const loading = useAppSelector(selectCommodityLoading);


    useEffect(() => {
        dispatch(fetchCommodities(''));
    }, [dispatch]);


    return loading ? <CircularProgress/> : (
        <Grid sx={{marginTop: '50px'}}>
            <Grid item sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Grid sx={{margin: '50px', borderRight: ''}}>
                    <Typography sx={{fontSize: '50px'}} onClick={() => dispatch(fetchCommodities(''))}>All</Typography>
                    {commoditiesArr.map((item, index) => (
                        <Typography onClick={() => dispatch(fetchCommodities(item))} key={index}>{item}</Typography>
                    ))}
                </Grid>
                <Grid sx={{display: 'flex'}}>
                    {commodities.map(item => (
                        <CommodityItem
                            id={item._id}
                            image={item.image}
                            price={item.price}
                            title={item.title}
                            user={item.user}
                            key={item._id}
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Commodities;