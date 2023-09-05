import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ITask } from "@/types/task";
import { IColumn } from "@/types/column";

export interface BoardState {
    columns: {
        [columnId: string]: IColumn
    },
    tasks: {
        [taskId: string]: ITask
    }
}

const initialState: BoardState = {
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
    }
});

export const {
    setColumns,
    setTasks
} = boardSlice.actions;

export const selectColumnIds = (state: RootState) => Object.values(state.board.columns).map(column => column._id);

export default boardSlice.reducer;
