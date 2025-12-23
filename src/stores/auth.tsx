"use client";

import { TLoginResponse } from "@/services/auth/types";
import * as React from "react";

export type TAuthIsLogin = boolean;

export type TAuthUser = TLoginResponse["user"];

interface IAuthState {
    isLogin: TAuthIsLogin;
    accessToken: string;
    user: TAuthUser | null;
}

interface IAuthContextValue extends IAuthState {
    setIsLogin: (isLogin: boolean) => void;
    setUser: (user: TAuthUser) => void;
    setAccessToken: (accessToken: string) => void;
}

const AuthContext = React.createContext<IAuthContextValue | null>(null);

export function useAuth() {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

type IAuthProviderProps = {
    isLogin: TAuthIsLogin;
    accessToken: string;
    user: TAuthUser | null;
    children: React.ReactNode;
};

export function AuthProvider({
    isLogin: initialIsLogin,
    accessToken: initialAccessToken,
    user: initialUser,
    children,
}: IAuthProviderProps) {
    const [isLogin, setIsLogin] = React.useState<TAuthIsLogin>(initialIsLogin);
    const [accessToken, setAccessToken] =
        React.useState<string>(initialAccessToken);
    const [user, setUser] = React.useState<TAuthUser | null>(initialUser);

    const value: IAuthContextValue = React.useMemo(
        () => ({
            isLogin,
            setIsLogin,
            accessToken,
            setAccessToken,
            user,
            setUser,
        }),
        [isLogin, accessToken, user]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
