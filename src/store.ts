import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { invoke } from '@tauri-apps/api/tauri';

// current page ---------------------------
const pageSlice = createSlice({
    name: 'page',
    initialState: { currentPage: 'id-scanner', },
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
});

// personnel -------------------------------
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


export const queryPersonnel = createAsyncThunk(
    'personnel/queryAll',
    async (search: String) => {
        const rows: Person[] = await invoke('query_personnel', { search: search })
        return rows;
    },
)

const personnelSlice = createSlice({
    name: 'personnel',
    initialState: {personnelData: [emptyPerson]},
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(queryPersonnel.fulfilled, (state, action) => {
            state.personnelData = action.payload
        }),
        builder.addCase(queryPersonnel.pending, (state) => {
            state.personnelData = []
        }),
        builder.addCase(queryPersonnel.rejected, (state) => {
            state.personnelData = []
        })
    }
});


// logs -------------------------------------
export type Log = {
    id: string,
    rank: string,
    last: string,
    first: string,
    date: string,
    time: string,
} | {};

export const emptyLog: Log = {
    id: "",
    rank: "",
    last: "",
    first: "",
    date: "",
    time: "",
}

export type LogQuery = {
    search: String,
    startDate: String,
    endDate: String,
}

export const queryLogs = createAsyncThunk(
    'logs/queryAll',
    async (query: LogQuery) => {
        const rows: Log[] = await invoke(
            'query_logs', { search: query.search, startDate: query.startDate, endDate: query.endDate})
        return rows;
    },
)

const logsSlice = createSlice({
    name: 'logs',
    initialState: {logsData: [emptyLog]},
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(queryLogs.fulfilled, (state, action) => {
            state.logsData = action.payload
        }),
        builder.addCase(queryLogs.pending, (state) => {
            state.logsData = []
        }),
        builder.addCase(queryLogs.rejected, (state) => {
            state.logsData = []
        })
    }
});



// store ------------------------------------
const store = configureStore({
    reducer: {
        page: pageSlice.reducer,
        personnel: personnelSlice.reducer,
        logs: logsSlice.reducer,
    },
});

export const { setCurrentPage } = pageSlice.actions;
export type AppDispatch = typeof store.dispatch;
export default store;