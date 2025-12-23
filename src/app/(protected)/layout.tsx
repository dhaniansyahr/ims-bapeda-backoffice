import { TAuthIsLogin, TAuthUser } from "@/stores/auth";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";
import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { services } from "@/services";
import Providers from "./_components/providers";
import AppSidebar from "./_components/app-sidebar";
import AppHeader from "./_components/app-header";

type TLayoutProps = {
    children: React.ReactNode;
};

export default async function Layout({ children }: TLayoutProps) {
    const session = await getSession();

    let isLogin: TAuthIsLogin = false;
    let user: TAuthUser | null = null;

    if (session?.accessToken) {
        await services.auth
            .verifyToken({ token: session?.accessToken })
            .then((response) => {
                isLogin = true;
                user =
                    response?.content?.user ??
                    (session?.user as TAuthUser | null);
            })
            .catch(() => {
                user = null;
                redirect("/api/logout");
            });
    }

    if (!isLogin) {
        redirect("/login");
    }

    return (
        <Providers
            auth={{
                isLogin: isLogin,
                accessToken: session?.accessToken ?? "",
                user: user,
            }}
        >
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AppHeader />
                    <section className="flex max-w-full min-w-0 flex-1 flex-col gap-4 overflow-x-hidden bg-[#FAFAFA] p-4">
                        {children}
                    </section>
                </SidebarInset>
            </SidebarProvider>
        </Providers>
    );
}
