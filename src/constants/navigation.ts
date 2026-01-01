import { TNavigation } from "@/types/common";

export const NAVIGATION: TNavigation[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: "material-symbols:dashboard-outline",
    },
    {
        name: "Peserta Magang",
        href: "/peserta-magang",
        icon: "mynaui:book-user",
    },
    {
        name: "Absensi",
        href: "/absensi",
        icon: "mdi:clock-edit-outline",
    },
    {
        name: "Manajemen User",
        href: "/manajemen-user",
        icon: "tabler:replace-user",
    },
    {
        name: "Manajemen Divisi",
        href: "/manajemen-divisi",
        icon: "mingcute:department-line",
    },
    {
        name: "Manajemen Role",
        href: "/manajemen-role",
        icon: "eos-icons:role-binding-outlined",
    },
];
