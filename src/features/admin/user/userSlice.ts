import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import orderApi from "api/orderApi";
import { ListParams, ListResponse, User } from "models";
import { Order } from "models/order";
import userApi from "../../../api/userApi";

export interface UserState {
  loading: boolean;
  list: User[];
  orderList: Order[];
  filter: ListParams;
}

const initialState: UserState = {
  loading: false,
  list: [],
  orderList: [],
  filter: {
    page: 1,
  },
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (params: ListParams) => {
    const data = await userApi.getAll(params);
    return {
      data: data.users,
    };
  }
);

export const fetchMyOrders = createAsyncThunk(
  "user/fetchMyOrders",
  async () => {
    const data = await orderApi.getMyOrders();
    return {
      data: data.orders,
    };
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (params: FormData) => {
    const data = await userApi.add(params);
    return {
      data: data.user,
    };
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (params: FormData) => {
    const data = await userApi.update(params);
    localStorage.setItem("currentUser", JSON.stringify(data.user));
    return {
      data: data.user,
    };
  }
);

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUser.fulfilled,
        (state: any, action: PayloadAction<ListResponse<User>>) => {
          state.list = action.payload.data;
          state.loading = false;
        }
      )
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMyOrders.fulfilled,
        (state: any, action: PayloadAction<ListResponse<Order>>) => {
          state.orderList = action.payload.data;
          state.loading = false;
        }
      )
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        addUser.fulfilled,
        (state: any, action: PayloadAction<ListResponse<User>>) => {
          state.list.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        updateUser.fulfilled,
        (state: any, action: PayloadAction<ListResponse<User>>) => {
          state.list = action.payload;
          state.loading = false;
        }
      );
  },
});

//actions
export const userActions = useSlice.actions;

// reducer
export default useSlice.reducer;
