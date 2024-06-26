import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const bannerImgSrcSlice = createSlice({
    name: 'bannerImgSrc',
    initialState,
    reducers: {
        assignBannerImgSrc: (state, action) => {
            state.value = {};
            state.value = action.payload;
        }
    }
});


export const { assignBannerImgSrc } = bannerImgSrcSlice.actions;
export default bannerImgSrcSlice.reducer;