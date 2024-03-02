import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCommodity, selectCommodityLoading} from "./commoditiesSlice.ts";
import {useEffect} from "react";
import {fetchCommodities} from "./commoditiesThunk.ts";
import {CircularProgress, Grid} from "@mui/material";
import CommodityItem from "./components/CommodityItem.tsx";

const Commodities = () => {
    const dispatch = useAppDispatch();
    const commodities = useAppSelector(selectCommodity);
    const loading = useAppSelector(selectCommodityLoading);

    useEffect(() => {
        dispatch(fetchCommodities());
    }, [dispatch]);


    return loading ? <CircularProgress/> : (
        <Grid sx={{marginTop: '50px'}}>
            <Grid item sx={{display: 'flex', justifyContent: 'space-between'}}>
                {commodities.map(item => (
                 <CommodityItem
                     id={item._id}
                     image={item.image}
                     price={item.price}
                     title={item.title}
                     user={item.user}
                 />
                ))}
            </Grid>
        </Grid>
    );
};

export default Commodities;