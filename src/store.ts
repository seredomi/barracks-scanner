import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { invoke } from '@tauri-apps/api/tauri';

const pageSlice = createSlice({
    name: 'page',
    initialState: { currentPage: 'id-scanner', },
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
});

type PersonRow = {id: string, rank: string, last: string, first: string, group: string};
const emptyPersonnel: PersonRow[] = [];

export const queryAll = createAsyncThunk(
    'personnel/fetchAll',
    async () => {
        const rows: PersonRow[] = await invoke('query_all')
        return rows
    },
)

const personnelSlice = createSlice({
    name: 'personnel',
    initialState: {personnelData: emptyPersonnel},
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(queryAll.fulfilled, (state, action) => {
            state.personnelData = action.payload
        }),
        builder.addCase(queryAll.pending, (state) => {
            state.personnelData = emptyPersonnel
        }),
        builder.addCase(queryAll.rejected, (state) => {
            state.personnelData = emptyPersonnel
        })
    }
});

export const { setCurrentPage } = pageSlice.actions;

const store = configureStore({
    reducer: {
        page: pageSlice.reducer,
        personnel: personnelSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export default store;