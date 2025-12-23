"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { NAVIGATION } from "@/constants/navigation";
import Image from "next/image";
import DialogLogout from "./partials/dialog-logout";
import { useRef } from "react";
import { IModalRef } from "@/components/modal";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/stores/auth";
import { Button } from "@/components/ui/button";

export default function AppSidebar() {
    const pathname = usePathname();
    const logoutDialogRef = useRef<IModalRef>(null);

    const { user } = useAuth();

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
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                asChild
                                tooltip="IMS Bapeda Backoffice"
                            >
                                <Link href="/dashboard">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <Image
                                            src="/logo.png"
                                            alt="Logo"
                                            width={32}
                                            height={32}
                                            className="size-4"
                                        />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            IMS Bapeda
                                        </span>
                                        <span className="truncate text-xs">
                                            Backoffice
                                        </span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Menu</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {NAVIGATION.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === item.href}
                                            tooltip={item.name}
                                        >
                                            <Link href={item.href}>
                                                {item.icon && (
                                                    <Icon
                                                        icon={item.icon}
                                                        className="size-4"
                                                    />
                                                )}
                                                <span>{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.email}
                                            alt={user?.fullName || "User"}
                                        />
                                        <AvatarFallback>
                                            {getUserInitials()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {user?.fullName || "User"}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user?.email || "User"}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        logoutDialogRef.current?.open()
                                    }
                                >
                                    <Icon
                                        icon="mdi:logout"
                                        className="size-4"
                                    />
                                </Button>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <DialogLogout dialogRef={logoutDialogRef} />
        </>
    );
}
