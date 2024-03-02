import axiosApi from "../../axiosApi.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Commodity} from "../../type";

export const fetchCommodities = createAsyncThunk<Commodity[]>(
    'posts/fetchCommodity',
    async () => {
        const response = await axiosApi.get<Commodity[]>('/commodity');
        return response.data;
    }
);