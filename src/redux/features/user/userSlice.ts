import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  contactNo: string;
  id: string | null;
  email: string | null;
  role: string | null;
  address: string | null;
  phone:string | null;
  name: string | null;
  avatar: string | null; 
}

const initialState: UserState = {
  id: null,
  email: null,
  role: null,
  address: null,
  name: null,
  avatar: null,
  phone: null,
  contactNo: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      console.log(action.payload);
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.name = action.payload.name;
      state.avatar=action.payload.avatar;
      state.phone=action.payload.phone;
    },
    clearUser: (state: UserState) => {
      state.id = null;
      state.role = null;
      state.email = null;
      state.name = null;
      state.address = null;
      state.avatar=null;
      state.phone=null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
