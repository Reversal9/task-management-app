import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ITask } from "@/types/task.ts";
import { IColumn } from "@/types/column.ts";

export interface BoardState {
    columns: IColumn[],
    tasks: Record<string, ITask>
}

const initialState: BoardState = {
    columns: [],
    tasks: {}
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setColumns: (state, action: { payload: IColumn[] }) => {
            state.columns = action.payload;
        },
        setTasks: (state, action: { payload: ITask[] }) => {
            state.tasks = {};
            for (const task of action.payload) {
                state.tasks[task._id] = task;
            }
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
