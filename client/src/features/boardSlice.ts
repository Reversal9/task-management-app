import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ITask } from "@/types/task";
import { IColumn } from "@/types/column";
import { IBoardApi, IColumnApi } from "@/types/api";
import {
    getColumns, getTasks, addColumn as handleAddColumn, deleteColumn as handleDeleteColumn,
    addTask as handleAddTask, deleteTask as handleDeleteTask, updateColumn as handleUpdateColumn,
    updateTask as handleUpdateTask
} from "@/features/boardApi"
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
            .addCase(deleteColumn.fulfilled, (state, action) => {
                delete state.columns[action.payload];
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks[action.payload.task._id] = action.payload.task;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskIds: string[] = state.columns[action.payload.columnId].taskIds;
                state.columns[action.payload.columnId].taskIds = taskIds.filter((taskId: string): boolean => taskId !== action.payload.taskId);
            })
            .addCase(updateColumn.fulfilled, (state, action) => {
                state.columns[action.payload.column._id] = action.payload.column;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.tasks[action.payload.task._id] = action.payload.task;
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

export const deleteColumn = createAsyncThunk(
    'board/deleteColumn',
    async(columnId: string) => {
        await handleDeleteColumn(columnId);
        return columnId;
    }
);

export const addTask = createAsyncThunk(
    'board/addTask',
    async(data: {
        task: Omit<ITask, "_id">,
        columnId: string
    }) => {
        const response = await handleAddTask(data.columnId, data.task);
        return response.data;
    }
);

export const deleteTask = createAsyncThunk(
    'board/deleteTask',
    async(data: {
        taskId: string,
        columnId: string
    }) => {
        await handleDeleteTask(data.taskId);
        return data;
    }
);

export const updateColumn = createAsyncThunk(
  'board/updateColumn',
  async(column: IColumn) => {
      const response = await handleUpdateColumn(column);
      return response.data;
  }
);

export const updateTask = createAsyncThunk(
    'board/updateTask',
    async(task: ITask) => {
        const response = await handleUpdateTask(task);
        return response.data;
    }
)

// export const {
// } = boardSlice.actions;

export const selectState = (state: RootState) => state.board.state;
export const selectError = (state: RootState) => state.board.error;
export const selectColumnIds = (state: RootState) => Object.values(state.board.columns).map(column => column._id);
export const selectColumnById = (state: RootState, columnId: string) => state.board.columns[columnId];
export const selectTaskById = (state: RootState, taskId: string) => state.board.tasks[taskId];

export default boardSlice.reducer;
