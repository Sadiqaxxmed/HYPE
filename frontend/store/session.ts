import { createAsyncThunk, createSlice, isRejected } from '@reduxjs/toolkit';

interface User {
    _id: string;
    bio?: string;
    created_at: string;
    email: string;
    phoneVerified: boolean;
    profile_pic?: string;
    username: string;
    __v: number;
  }
  
  interface NormalizedUsers {
    [id: string]: User;
  }
  
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

export const fetchCurrentUser = createAsyncThunk(
    'session/fetchCurrentUser',
    async (_, { getState }) => {
        const token = localStorage.getItem("token");
        const response = await fetch("http://10.0.0.217:3000/auth/current", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });


        if (response.ok) {
            const data = await response.json();
            return data.user;
        } else {
            throw new Error("Failed to fetch current user");
        }
    }
);

// Async thunk to fetch all users
export const getAllUsers = createAsyncThunk(
    'session/getAllUsers',
    async () => {
      const response = await fetch("http://10.0.0.217:3000/auth/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data: User[] = await response.json();  
        const normalizeUserData: NormalizedUsers = data.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {} as NormalizedUsers);
  
        return normalizeUserData;
      } else {
        throw new Error("Failed to fetch users");
      }
    }
  );
  
// ------------------- REDUCER ------------------- //

const initialState = { 
    user: null,
    users: {} as NormalizedUsers,
    status: 'idle',
    error: null as string | null
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
        builder
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        })
        .addMatcher(
            action => action.type.endsWith('/pending'),
            state => {
                state.status = 'loading';
                state.error = null;
            }
        )
        .addMatcher(
            action => action.type.endsWith('/fulfilled'),
            state => {
                state.status = 'succeeded';
                state.error = null;
            }
        )
        .addMatcher(
            isRejected,
            (state, action) => {
                state.status = 'failed';
                state.error = action.error?.message ?? "An unknown error occurred";
            }
        );
    }
});

export const { setUser } = sessionSlice.actions;
export default sessionSlice.reducer;
