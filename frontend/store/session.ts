import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// ------------------- THUNKS ------------------- //

export const login = createAsyncThunk(
    'session/login',
    async ({ email, password }: { email: string; password: string }, { dispatch }) => {
        const response = await fetch("http://10.0.0.217:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data.user));
            localStorage.setItem("token", data.token);
            return data.user;
        } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                throw new Error(data.errors.join(", "));
            }
        } else {
            throw new Error("An error occurred. Please try again.");
        }
    }
);

// ------------------- REDUCER ------------------- //

const initialState = { 
    user: null
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
        });
    }
});

export const { setUser } = sessionSlice.actions;
export default sessionSlice.reducer;
