import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {CommodityMutation} from "../../../type";
import {Grid, MenuItem, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {selectCommodityCreateLoading, selectError} from "../commoditiesSlice.ts";
import {createCommodity} from "../commoditiesThunk.ts";
import FileInput from "../../../components/UI/FileInput.tsx";

function SendIcon() {
    return null;
}

const CommodityForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectCommodityCreateLoading);
    const error = useAppSelector(selectError);

    const [state, setState] = useState<CommodityMutation>({
        title: '',
        description: '',
        image: null,
        price: '',
        category: ''
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedPrice = parseFloat(state.price);

        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            alert('Please enter a valid positive price!');
        } else {
            try {
                await dispatch(createCommodity(state)).unwrap();
                navigate('/');
            } catch (e) {
                console.error(e);
            }
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if (files) {
            setState((prevState) => ({
                ...prevState,
                [name]: files[0]
            }));
        }
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField style={{width: '400px'}}
                               id="title"
                               placeholder={"Title"}
                               value={state.title}
                               onChange={inputChangeHandler}
                               name="title"
                               required
                    />
                </Grid>

                <Grid item>
                    <TextField style={{width: '400px'}}
                               multiline rows={3}
                               id="description"
                               placeholder={"Description"}
                               value={state.description}
                               onChange={inputChangeHandler}
                               name="description"
                               error={Boolean(getFieldError('description'))}
                               helperText={getFieldError('description')}
                    />
                </Grid>

                <Grid item>
                    <TextField style={{width: '400px'}}
                               multiline rows={3}
                               id="price"
                               placeholder={"Price"}
                               value={state.price}
                               onChange={inputChangeHandler}
                               name="price"
                               error={Boolean(getFieldError('price'))}
                               helperText={getFieldError('price')}
                    />
                </Grid>

                <Grid item xs>
                    <TextField
                        select
                        id="category" label="Category"
                        value={state.category}
                        onChange={inputChangeHandler}
                        name="category"
                        required
                    >
                        <MenuItem value="" disabled>Please select a category</MenuItem>
                        <MenuItem value="cars">Cars</MenuItem>
                        <MenuItem value="animals" >Animals</MenuItem>
                        <MenuItem value="motorcycles" >Motorcycles</MenuItem>
                        <MenuItem value="property" >Property</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs>
                    <FileInput
                        onChange={fileInputChangeHandler}
                        error={error}
                        name="image"
                        label="image"
                    />
                </Grid>

                <Grid item xs>
                    <LoadingButton
                        type="submit"
                        size="small"
                        endIcon={<SendIcon />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        <span>Save</span>
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default CommodityForm;