import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";

// Types for absence data
export type AbsenceRecord = {
    id: string;
    internName: string;
    email: string;
    date: string;
    status: "present" | "absent" | "sick" | "permit";
    reason?: string;
    checkIn?: string;
    checkOut?: string;
};

export const columns: ColumnDef<AbsenceRecord>[] = [
    {
        accessorKey: "internName",
        header: "Intern Name",
        cell: ({ row }) => {
            const record = row.original;
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{record.internName}</span>
                    <span className="text-sm text-muted-foreground">
                        {record.email}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            const date = new Date(row.original.date);
            return date.toLocaleDateString("id-ID", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            const statusConfig = {
                present: {
                    label: "Present",
                    icon: "mdi:check-circle",
                    className: "text-green-600 bg-green-50",
                },
                absent: {
                    label: "Absent",
                    icon: "mdi:close-circle",
                    className: "text-red-600 bg-red-50",
                },
                sick: {
                    label: "Sick",
                    icon: "mdi:hospital",
                    className: "text-orange-600 bg-orange-50",
                },
                permit: {
                    label: "Permit",
                    icon: "mdi:calendar-alert",
                    className: "text-blue-600 bg-blue-50",
                },
            };

            const config = statusConfig[status];

            return (
                <div className="flex items-center gap-2">
                    <div
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
                    >
                        <Icon icon={config.icon} className="h-3.5 w-3.5" />
                        {config.label}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "checkIn",
        header: "Check In/Out",
        cell: ({ row }) => {
            const record = row.original;
            if (record.checkIn) {
                return (
                    <div className="flex flex-col text-sm">
                        <span>
                            <Icon
                                icon="mdi:login"
                                className="mr-1 inline h-4 w-4 text-green-600"
                            />
                            {record.checkIn}
                        </span>
                        {record.checkOut && (
                            <span>
                                <Icon
                                    icon="mdi:logout"
                                    className="mr-1 inline h-4 w-4 text-red-600"
                                />
                                {record.checkOut}
                            </span>
                        )}
                    </div>
                );
            }
            return <span className="text-muted-foreground">-</span>;
        },
    },
    {
        accessorKey: "reason",
        header: "Reason/Note",
        cell: ({ row }) => {
            const reason = row.original.reason;
            return reason ? (
                <span className="text-sm">{reason}</span>
            ) : (
                <span className="text-muted-foreground">-</span>
            );
        },
    },
];
