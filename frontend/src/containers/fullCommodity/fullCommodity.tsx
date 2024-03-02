import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectInfo, selectInfoLoading} from "./fullCommoditySlice.ts";
import imageNotAvailable from '../../assets/images/noImage.png';
import {deleteCommodity, fetchFullCommodity} from "./fullComodityThunk.ts";
import Typography from "@mui/material/Typography";
import {Button, CircularProgress, Grid} from "@mui/material";
import {apiURL} from "../../constants.ts";
import {useEffect} from "react";
import {selectUser} from "../users/usersSlice.ts";

const FullCommodity = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const info = useAppSelector(selectInfo);
    const loading = useAppSelector(selectInfoLoading);
    const user = useAppSelector(selectUser);
    let noImage = imageNotAvailable;

    const deleteButton = async () => {
        if (id) {
            try {
                await dispatch(deleteCommodity(id));
                navigate('/');
            } catch (error) {
                console.error('Failed to delete commodity', error);
            }
        } else {
            console.error('ID is undefined');
        }
    };

    console.log(user);

    useEffect( () => {
        if (id) {
            dispatch(fetchFullCommodity(id));
        }
    }, [dispatch, id]);

    return loading ? (
        <CircularProgress />
    ) : (
        <Grid sx={{ margin: '20px' }}>
            <Grid item>
                <Typography variant="h4">Author: {info?.user.displayName}</Typography>
                <Typography variant="h5">Number: {info?.user.phone}</Typography>
                <Typography variant="h6">Category: {info?.category}</Typography>
                <img style={{width: '400px'}} className="post-item-img"
                     src={info?.image ? apiURL + '/' + info.image : noImage} alt="img"/>
                <Typography>Price: {info?.price} $</Typography>
                <Typography>Description:  {info?.description}</Typography>
                {user && info?.user._id === user._id && (
                    <Button variant="contained" color="error" onClick={deleteButton}>
                        Sold
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

export default FullCommodity;