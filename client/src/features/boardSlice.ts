import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ITask } from "@/types/task.ts";
import { IColumn } from "@/types/column.ts";

export interface BoardState {
    columns: IColumn[],
    tasks: ITask[]
}

const initialState: BoardState = {
    columns: [],
    tasks: []
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setColumns: (state, action) => {
            state.columns = action.payload;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        }
    }
});

export const {
    setColumns,
    setTasks
} = boardSlice.actions;

export const selectColumns = (state: RootState) => state.board.columns;
export const selectTasks = (state: RootState) => state.board.tasks;


export default boardSlice.reducer;
