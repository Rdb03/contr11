import axiosApi from "../../axiosApi.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Commodity, CommodityMutation, ValidationError} from "../../type";
import {RootState} from "../../app/store.ts";
import {isAxiosError} from "axios";

export const fetchCommodities = createAsyncThunk<Commodity[], string>(
    'commodity/fetchCommodityCategory',
    async (category: string) => {
        if(category !== null) {
            const response = await axiosApi.get<Commodity[]>(`/commodity?category=${category}`);
            return response.data;
        }


        const response = await axiosApi.get<Commodity[]>(`/commodity`);
        return response.data;
    }
);

export const createCommodity = createAsyncThunk<
    void,
    CommodityMutation,
    { state:RootState, rejectValue: ValidationError }
>(
    'commodity/create',
    async (postMutation, {getState, rejectWithValue}) => {
        const usersState = getState().users;
        const token = usersState.user?.token;

        const formData = new FormData();
        const keys = Object.keys(postMutation) as (keyof CommodityMutation)[];

        keys.forEach(key => {
            const value = postMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        try {
            await axiosApi.post(
                '/commodity',
                formData,
                { headers: {
                        'Authorization': token
                    }});
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);