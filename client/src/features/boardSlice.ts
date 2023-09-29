import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ITask } from "@/types/task";
import { IColumn } from "@/types/column";
import { IBoardApi, IColumnApi } from "@/types/api";
import { getColumns, getTasks, addColumn as handleAddColumn } from "@/features/boardApi"
import { AxiosResponse } from "axios";

interface BoardState {
    state: "idle" | "loading" | "succeeded" | "failed",
    error: string | undefined,
    columns: {
        [columnId: string]: IColumn
    },
    tasks: {
        [taskId: string]: ITask
    }
}

const initialState: BoardState = {
    state: "idle",
    error: undefined,
    columns: {},
    tasks: {}
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoard.pending, (state) => {
                state.state = "loading";
            })
            .addCase(fetchBoard.fulfilled, (state, action) => {
                state.state = "succeeded";
                for (const task of action.payload.tasksResponse.tasks) {
                    state.tasks[task._id] = task;
                }
                for (const column of action.payload.columnsResponse.columns) {
                    state.columns[column._id] = column;
                }
            })
            .addCase(fetchBoard.rejected, (state, action) => {
                state.state = "failed";
                state.error = action.error.message;
            })
            .addCase(addColumn.fulfilled, (state, action) => {
                // Column added to database successfully, now need to render UI
                state.columns[action.payload.column._id] = action.payload.column;
            })
    }
});

export const fetchBoard = createAsyncThunk(
    'board/fetchBoard',
    async () => {
        const columnsResponse = await getColumns();
        const tasksResponse = await getTasks();
        const data: IBoardApi = {
            columnsResponse: columnsResponse.data,
            tasksResponse: tasksResponse.data,
        }
        return data;
    }
);

export const addColumn = createAsyncThunk(
    'board/addColumn',
    async(column: Omit<IColumn, "_id">) => {
        const response: AxiosResponse<IColumnApi> = await handleAddColumn(column);
        return response.data;
    }
);

// export const {
//
// } = boardSlice.actions;

export const selectState = (state: RootState) => state.board.state;
export const selectError = (state: RootState) => state.board.error;
export const selectColumnIds = (state: RootState) => Object.values(state.board.columns).map(column => column._id);
export const selectColumnById = (state: RootState, columnId: string) => state.board.columns[columnId];
export const selectTaskById = (state: RootState, taskId: string) => state.board.tasks[taskId];

export default boardSlice.reducer;
