import { createSlice } from "@reduxjs/toolkit";
const colorSlice = createSlice({
  name: "color",
  initialState: {
    gradientColor: "",
  },
  reducers: {
    setGradientColor: (state, action) => {
      state.gradientColor = action.payload;
    },
  },
});
export const { setGradientColor } = colorSlice.actions;
export default colorSlice.reducer;
