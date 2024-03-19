import { configureStore, createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
    name: 'page',
    initialState: { currentPage: 'id-scanner', },
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
});

export const { setCurrentPage } = pageSlice.actions;

const store = configureStore({
    reducer: {
        page: pageSlice.reducer,
    },
});

export default store;