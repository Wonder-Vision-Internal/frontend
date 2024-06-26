import { configureStore } from '@reduxjs/toolkit';
import bannerNameSlice from './bannerImgSrcSlice';

export const store = configureStore({
  reducer: {
    bannerImgSrc: bannerNameSlice
  },
});
//this is index file