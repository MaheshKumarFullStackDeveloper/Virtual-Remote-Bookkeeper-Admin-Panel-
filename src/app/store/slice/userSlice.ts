import { UserData } from '@/lib/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    user: UserData | null;
    isEmailVerified: boolean;
    isLoginDialogOpen: boolean;
    accessToken: string;
}

const initialState: UserState = {
    user: null,
    isEmailVerified: false,
    isLoginDialogOpen: false,
    accessToken: "",

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserData>) => {
            state.user = action.payload;
        },
        setEmailVerified: (state, action: PayloadAction<boolean>) => {
            state.isEmailVerified = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isEmailVerified = false;
            state.accessToken = "";

        },
        toggleLoginDialog: (state) => {
            state.isLoginDialogOpen = !state.isLoginDialogOpen;
            console.log("check isLoginDialogOpen", state.isLoginDialogOpen)
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    }
})

export const { setUser, setEmailVerified, logout, toggleLoginDialog, setAccessToken } = userSlice.actions;
export default userSlice.reducer;