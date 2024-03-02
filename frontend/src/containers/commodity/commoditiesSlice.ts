import {Commodity} from "../../type";
import {createSlice} from "@reduxjs/toolkit";
import {fetchCommodities} from "./commoditiesThunk.ts";
import {RootState} from "../../app/store.ts";

interface CommoditiesState {
    items: Commodity[],
    fetchLoadingCommodity: boolean;
}

const initialState: CommoditiesState = {
    items: [],
    fetchLoadingCommodity: false,
}

export const commoditySlice = createSlice({
   name: 'commodity',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
       builder.addCase(fetchCommodities.pending, (state) => {
           state.fetchLoadingCommodity = true;
       });
       builder.addCase(fetchCommodities.fulfilled, (state, {payload: commodity}) => {
           state.fetchLoadingCommodity = false;
           state.items = commodity;
       });
       builder.addCase(fetchCommodities.rejected, (state) => {
           state.fetchLoadingCommodity = false;
       });
   }
});

export const commodityReducer = commoditySlice.reducer;
export const selectCommodity = (state: RootState) => state.commodity.items;
export const selectCommodityLoading = (state: RootState) => state.commodity.fetchLoadingCommodity;