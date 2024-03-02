import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommodityInfo} from "../../type";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

export const fetchFullCommodity = createAsyncThunk<CommodityInfo | null, string>(
    'commodity/fetchInfo',
    async (id) => {
        const { data }  = await axiosApi<CommodityInfo>(`/commodity/${id}`);

        if (!data) {
            return null;
        }

        return  {
            title: data.title,
            description: data.description,
            user: data.user,
            price: data.price,
            image: data.image,
            category: data.category
        }
    }
);

export const deleteCommodity = createAsyncThunk<void, string, {state: RootState}>(
    'commodity/delete',
    async (id, thunkAPI) => {
        try {
            const userState = thunkAPI.getState().users;
            const token = userState.user?.token;

            await axiosApi.delete(`/commodity/${id}`, {headers: {'Authorization': token}});
        } catch (error) {
            throw error;
        }
    }
);