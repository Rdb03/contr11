import Typography from "@mui/material/Typography";
import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../users/usersSlice.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Grid} from "@mui/material";
import CommodityForm from "./components/CommodityForm.tsx";

const NewCommodities = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <Grid sx={{margin: '50px'}}>
            <Typography sx={{fontSize: '50px'}}>Add new commodity</Typography>
            <CommodityForm/>
        </Grid>
    );
};

export default NewCommodities;