import {Commodity, ValidationError} from "../../type";
import {createSlice} from "@reduxjs/toolkit";
import {createCommodity, fetchCommodities} from "./commoditiesThunk.ts";
import {RootState} from "../../app/store.ts";

interface CommoditiesState {
    items: Commodity[],
    fetchLoadingCommodity: boolean;
    createLoading: boolean;
    error: ValidationError | null,
}

const initialState: CommoditiesState = {
    items: [],
    fetchLoadingCommodity: false,
    createLoading: false,
    error: null,
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
       builder.addCase(createCommodity.pending, (state) => {
           state.createLoading = true;
           state.error = null;
       });
       builder.addCase(createCommodity.fulfilled, (state) => {
           state.createLoading = false;
       });
       builder.addCase(createCommodity.rejected, (state, {payload: error}) => {
           state.createLoading = false;
           state.error = error || null;
       });
   }
});

export const commodityReducer = commoditySlice.reducer;
export const selectCommodity = (state: RootState) => state.commodity.items;
export const selectCommodityLoading = (state: RootState) => state.commodity.fetchLoadingCommodity;

export const selectCommodityCreateLoading = (state: RootState) => state.commodity.createLoading;
export const selectError = (state: RootState) => state.commodity.error;
