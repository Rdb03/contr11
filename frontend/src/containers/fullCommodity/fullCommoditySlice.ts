import {CommodityInfo} from "../../type";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchFullCommodity} from "./fullComodityThunk.ts";

interface InfoState {
    info: CommodityInfo | null;
    fetchLoadingInfo: boolean;
}

const initialState: InfoState = {
    info: null,
    fetchLoadingInfo: false,
}

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFullCommodity.pending, (state) => {
            state.fetchLoadingInfo = true;
        });
        builder.addCase(fetchFullCommodity.fulfilled, (state, {payload: commodity}) => {
            state.fetchLoadingInfo = false;
            state.info = commodity;
        });
        builder.addCase(fetchFullCommodity.rejected, (state) => {
            state.fetchLoadingInfo = false;
        });
    }
})

export const infoReducer = infoSlice.reducer;
export const selectInfo = (state: RootState) => state.info.info;
export const selectInfoLoading = (state: RootState) => state.info.fetchLoadingInfo;
