import {GlobalError, IUser, ValidationError} from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "../../app/store";
import {login, register} from "./usersThunk";

interface UsersState {
    user: IUser | null,
    registerLoading: boolean,
    registerError: ValidationError | null,
    loginLoading: boolean;
    loginError: GlobalError | null;
}

const initialState: UsersState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        unsetUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.registerLoading = true;
            state.registerError = null;
        });
        builder.addCase(register.fulfilled, (state, {payload: userResponse}) => {
            state.registerLoading = false;
            state.user = userResponse.user;
        });
        builder.addCase(register.rejected, (state, {payload: error}) => {
            state.registerLoading = false;
            state.registerError = error || null;
        });

        builder.addCase(login.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(login.fulfilled, (state, {payload: userResponse}) => {
            state.loginLoading = false;
            state.user = userResponse.user;
        });
        builder.addCase(login.rejected, (state, {payload: error}) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });
    },
});

export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const {unsetUser} = usersSlice.actions;