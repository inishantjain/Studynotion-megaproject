import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../services/operations/profileAPI";

// Async initialization function to fetch user details
const initializeUserDetails = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    const userDetails = await getUserData(token);
    return userDetails;
  }
  return null;
};

// Set initial state without fetching user details
const initialState = {
  user: null,
  loading: false,
};

// Asynchronous initialization of user details
initializeUserDetails().then((userDetails) => {
  initialState.user = userDetails;
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
