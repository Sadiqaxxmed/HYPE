import { useRouter, useSegments } from 'expo-router';
import * as React from 'react';
import { login } from '@/store/session';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';  // Import AppDispatch type

const AuthContext = React.createContext<any>(null);

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvider({children}:React.PropsWithChildren) {
    const rootSegment = useSegments()[0];
    const router = useRouter()
    const [user, setUser] = React.useState<string | undefined>("")

    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if(user === undefined)return;
        if(!user && rootSegment !== "(auth)"){
            router.replace("/(auth)/login")
        } else if (user && rootSegment !== "(app)"){
            router.replace("/")
        }
    }, [user, rootSegment])

    // Function to handle user sign in
    const handleSignIn = async (email: string, password: string) => {
        try {
            const result = await dispatch(login({ email, password }));
            if (result){
                setUser(result.meta.arg.email);
            } else {
                return undefined
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Function to handle user sign out
     const handleSignOut = () => {
        setUser("");
    };

    return (
        <AuthContext.Provider 
        value={{
            user: user,
            signIn: handleSignIn,
            signOut: handleSignOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}