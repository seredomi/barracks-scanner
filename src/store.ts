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

export type Person = {
    id: string, 
    rank: string, 
    last: string, 
    first: string, 
    group: string,
    room: string,
    leave_date: string,
    found: boolean,
} | {};
export const emptyPerson: Person = {
    id: "",
    rank: "",
    last: "",
    first: "",
    group: "",
    room: "",
    leave_date: "",
    found: false,
}

export const queryAll = createAsyncThunk(
    'personnel/fetchAll',
    async (search: String) => {
        const rows: Person[] = await invoke('query_all', { search: search })
        return rows;
    },
)

const personnelSlice = createSlice({
    name: 'personnel',
    initialState: {personnelData: [emptyPerson]},
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(queryAll.fulfilled, (state, action) => {
            state.personnelData = action.payload
        }),
        builder.addCase(queryAll.pending, (state) => {
            state.personnelData = []
        }),
        builder.addCase(queryAll.rejected, (state) => {
            state.personnelData = []
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