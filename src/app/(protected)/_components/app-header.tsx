"use client";

import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useAuth } from "@/stores/auth";
import { Separator } from "@/components/ui/separator";
import DialogLogout from "./partials/dialog-logout";
import { useRef } from "react";
import type { IModalRef } from "@/components/modal";

export default function AppHeader() {
    const { user } = useAuth();
    const logoutDialogRef = useRef<IModalRef>(null);

    const getUserInitials = () => {
        if (!user?.fullName) return "U";
        return user.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <>
            <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4">
                <div className="flex flex-1 items-center gap-4">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-semibold">Dashboard</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Notifications - Optional */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Icon icon="mdi:bell-outline" className="size-5" />
                        <span className="absolute right-1 top-1 flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
                        </span>
                        <span className="sr-only">Notifications</span>
                    </Button>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative size-8 rounded-full"
                            >
                                <Avatar className="size-8">
                                    <AvatarImage
                                        src={user?.email}
                                        alt={user?.fullName || "User"}
                                    />
                                    <AvatarFallback>
                                        {getUserInitials()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56"
                            align="end"
                            forceMount
                        >
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {user?.fullName || "User"}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email || ""}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <a href="/profile" className="cursor-pointer">
                                    <Icon
                                        icon="mdi:account-outline"
                                        className="mr-2 size-4"
                                    />
                                    Profile
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href="/settings" className="cursor-pointer">
                                    <Icon
                                        icon="mdi:cog-outline"
                                        className="mr-2 size-4"
                                    />
                                    Settings
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={() => logoutDialogRef.current?.open()}
                                className="cursor-pointer"
                            >
                                <Icon
                                    icon="mdi:logout"
                                    className="mr-2 size-4"
                                />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <DialogLogout dialogRef={logoutDialogRef} />
        </>
    );
}
