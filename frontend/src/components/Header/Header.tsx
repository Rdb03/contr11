import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import {selectUser} from "../../containers/users/usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import AnonymousMenu from "../AnonymousMenu/AnonymMenu.tsx";
import UserMenu from "../UserMenu/UserMenu.tsx";
import {commodities} from "../../constants.ts";
import {fetchCommodities, fetchCommoditiesCategory} from "../../containers/commodity/commoditiesThunk.ts";

const Header = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link sx={{color: 'white', marginRight: '20px'}} component={RouterLink} to="/">
                        <Typography sx={{fontSize: '30px'}}>Market</Typography>
                    </Link>
                    <span onClick={() => dispatch(fetchCommodities())}>all</span>
                    {commodities.map((item, index) => (
                        <span onClick={() => dispatch(fetchCommoditiesCategory(item))} key={index}>{item}</span>
                    ))}
                    {user
                        ?
                        <UserMenu/>
                        :
                        <AnonymousMenu/>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;