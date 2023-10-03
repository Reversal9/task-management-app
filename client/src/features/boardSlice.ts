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
import { DropResult } from "react-beautiful-dnd";

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
    reducers: {
        locallyUpdateColumn: (state, action: { payload: IColumn }) => {
            state.columns[action.payload._id] = action.payload;
        }
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
                const tasks: ITask[] = Object.values(state.tasks).filter(task => task.memberId === action.payload);
                for (const task of tasks) {
                    delete state.tasks[task._id].memberId;
                }
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
);

export const handleDragEnd = createAsyncThunk(
    'board/handleDragEnd',
    async(result: DropResult, { getState, dispatch }) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;
        
        const state: { board: BoardState } = getState() as { board: BoardState };
        
        const sourceColumn: IColumn = state.board.columns[source.droppableId];
        const destinationColumn: IColumn = state.board.columns[destination.droppableId];
        
        if (sourceColumn === destinationColumn) {
            const newTaskIds: string[] = Array.from(sourceColumn.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn: IColumn = {
                ...sourceColumn,
                taskIds: newTaskIds
            };
            dispatch(locallyUpdateColumn(newColumn));
            await handleUpdateColumn(newColumn)
                .catch(() => {
                    dispatch(locallyUpdateColumn(sourceColumn));
                });
        }
        
        if (sourceColumn !== destinationColumn) {
            const newSourceTaskIds: string[] = Array.from(sourceColumn.taskIds);
            newSourceTaskIds.splice(source.index, 1);
            const newDestinationTaskIds: string[] = Array.from(destinationColumn.taskIds);
            newDestinationTaskIds.splice(destination.index, 0, draggableId);
            const newSourceColumn: IColumn = {
                ...sourceColumn,
                taskIds: newSourceTaskIds
            };
            const newDestinationColumn: IColumn = {
                ...destinationColumn,
                taskIds: newDestinationTaskIds
            };
            dispatch(locallyUpdateColumn(newSourceColumn));
            dispatch(locallyUpdateColumn(newDestinationColumn));
            await handleUpdateColumn(newSourceColumn)
                .then(async() => {
                    await handleUpdateColumn(newDestinationColumn);
                })
                .catch(() => {
                    dispatch(locallyUpdateColumn(sourceColumn));
                    dispatch(locallyUpdateColumn(destinationColumn));
                });
        }
    }
);

export const {
    locallyUpdateColumn
} = boardSlice.actions;

export const selectState = (state: RootState) => state.board.state;
export const selectError = (state: RootState) => state.board.error;
export const selectColumnIds = (state: RootState) => Object.values(state.board.columns).map(column => column._id);
export const selectMemberIds = (state: RootState) => Object.values(state.board.members).map(member => member._id);
export const selectColumnById = (state: RootState, columnId: string) => state.board.columns[columnId];
export const selectTaskById = (state: RootState, taskId: string) => state.board.tasks[taskId];
export const selectMemberById = (state: RootState, memberId: string | undefined) => {
    if (!memberId) return undefined;
    return state.board.members[memberId];
};
export const selectMemberNames = (state: RootState) => {
    return Object.values(state.board.members).map(member => {
        return {
            value: member._id,
            label: `${member.firstName} ${member.lastName}`
        };
    });
};

export default boardSlice.reducer;
