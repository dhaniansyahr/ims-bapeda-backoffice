"use client";

import { DataTable } from "@/components/data-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Icon } from "@iconify/react";
import { createColumns } from "./columns";

export default function TableAbsensi() {
    const columns = createColumns({
        onDetail: (id: string) => {
            console.log(id);
        },
        onEdit: (id: string) => {
            console.log(id);
        },
        onDelete: (id: string) => {
            console.log(id);
        },
        currentPage: 1,
        pageSize: 10,
    });

    const pagination = {
        currentPage: 1,
        totalPages: 10,
        onPageChange: (page: number) => {
            console.log(page);
        },
        isFetching: false,
    };

    const data = [
        {
            name: "John Doe",
            kehadiran: "Hadir",
            tanggal: "2026-01-01T00:00:00Z",
            jamMasuk: "2026-01-01T08:00:00Z",
            jamKeluar: "2026-01-01T17:00:00Z",
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Absensi</CardTitle>
                <CardDescription>
                    Daftar absensi yang terdaftar di sistem.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                    <InputGroup>
                        <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon align="inline-start">
                            <Icon icon="lucide:search" />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <DataTable
                    pagination={pagination}
                    columns={columns}
                    data={data}
                />
            </CardContent>
        </Card>
    );
}
