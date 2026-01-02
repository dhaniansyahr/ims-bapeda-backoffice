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

export default function TableManajemenUser() {
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
            email: "john.doe@example.com",
            phoneNumber: "081234567890",
            divisi: "IT",
            role: "Admin",
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manajemen User</CardTitle>
                <CardDescription>
                    Daftar user yang terdaftar di sistem.
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
