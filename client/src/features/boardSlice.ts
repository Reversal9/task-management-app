import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ITask } from "@/types/task";
import { IColumn } from "@/types/column";
import { IBoardApi, IColumnApi } from "@/types/api";
import {
    getColumns, getTasks, getMembers, addColumn as handleAddColumn, deleteColumn as handleDeleteColumn,
    addTask as handleAddTask, deleteTask as handleDeleteTask, updateColumn as handleUpdateColumn,
    updateTask as handleUpdateTask, addMember as handleAddMember, deleteMember as handleDeleteMember,
    updateMember as handleUpdateMember
} from "@/features/boardApi"
import { AxiosResponse } from "axios";
import { IMember } from "@/types/member";

interface BoardState {
    state: "idle" | "loading" | "succeeded" | "failed",
    error: string | undefined,
    columns: {
        [columnId: string]: IColumn
    },
    tasks: {
        [taskId: string]: ITask
    },
    members: {
        [memberId: string]: IMember
    }
}

const initialState: BoardState = {
    state: "idle",
    error: undefined,
    columns: {},
    tasks: {},
    members: {}
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {},
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
                for (const member of action.payload.membersResponse.members) {
                    state.members[member._id] = member;
                }
            })
            .addCase(fetchBoard.rejected, (state, action) => {
                state.state = "failed";
                state.error = action.error.message;
            })
            .addCase(addColumn.fulfilled, (state, action) => {
                state.columns[action.payload.column._id] = action.payload.column;
            })
            .addCase(deleteColumn.fulfilled, (state, action) => {
                delete state.columns[action.payload];
                //need to handle excess tasks lying around
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks[action.payload.data.task._id] = action.payload.data.task;
                state.columns[action.payload.columnId].taskIds.push(action.payload.data.task._id);
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
            .addCase(addMember.fulfilled, (state, action) => {
                state.members[action.payload.member._id] = action.payload.member;
            })
            .addCase(deleteMember.fulfilled, (state, action) => {
                delete state.members[action.payload];
            })
            .addCase(updateMember.fulfilled, (state, action) => {
                state.members[action.payload.member._id] = action.payload.member;
            })
    }
});

export const fetchBoard = createAsyncThunk(
    'board/fetchBoard',
    async () => {
        const columnsResponse = await getColumns();
        const tasksResponse = await getTasks();
        const membersResponse = await getMembers();
        const data: IBoardApi = {
            columnsResponse: columnsResponse.data,
            tasksResponse: tasksResponse.data,
            membersResponse: membersResponse.data
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
        return {
            data: response.data,
            columnId: data.columnId
        };
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
);

export const addMember = createAsyncThunk(
    'board/addMember',
    async(member: Omit<IMember, "_id">) => {
        const response = await handleAddMember(member);
        return response.data;
    }
);

export const deleteMember = createAsyncThunk(
    'board/deleteMember',
    async(memberId: string) => {
        await handleDeleteMember(memberId);
        return memberId;
    }
);

export const updateMember = createAsyncThunk(
    'board/updateMember',
    async(member: IMember) => {
        const response = await handleUpdateMember(member);
        return response.data;
    }
)

export const selectState = (state: RootState) => state.board.state;
export const selectError = (state: RootState) => state.board.error;
export const selectColumnIds = (state: RootState) => Object.values(state.board.columns).map(column => column._id);
export const selectMemberIds = (state: RootState) => Object.values(state.board.members).map(member => member._id);
export const selectColumnById = (state: RootState, columnId: string) => state.board.columns[columnId];
export const selectTaskById = (state: RootState, taskId: string) => state.board.tasks[taskId];
export const selectMemberById = (state: RootState, memberId: string | undefined) => {
    if (!memberId) return undefined;
    return state.board.members[memberId];
}

export default boardSlice.reducer;
