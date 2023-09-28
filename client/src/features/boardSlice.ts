import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { ITask } from "@/types/task";
import { IColumn } from "@/types/column";
import { getColumns, getTasks } from "@/features/boardApi"

export interface BoardState {
    state: "loading" | "idle" | "pending" | "success",
    columns: {
        [columnId: string]: IColumn
    },
    tasks: {
        [taskId: string]: ITask
    }
}

const initialState: BoardState = {
    state: "loading",
    columns: {},
    tasks: {}
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setColumns: (state, action: { payload: IColumn[] }) => {
            state.columns = {};
            for (const column of action.payload) {
                state.columns[column._id] = column;
            }
        },
        setTasks: (state, action: { payload: ITask[] }) => {
            state.tasks = {};
            for (const task of action.payload) {
                state.tasks[task._id] = task;
            }
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase
    // }
});

// export const getColumns = createAsyncThunk(
//     'board/getColumns',
//     async () => {
//         const response = await getColumns();
//         // The value we return becomes the `fulfilled` action payload
//         return response.data;
//     }
// );

export const {
    setColumns,
    setTasks
} = boardSlice.actions;

export const selectColumnIds = (state: RootState) => Object.values(state.board.columns).map(column => column._id);
export const selectState = (state: RootState) => state.board.state;

export default boardSlice.reducer;
