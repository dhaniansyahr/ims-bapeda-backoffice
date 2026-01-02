import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";

interface IColumnProps {
    onDetail?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    currentPage: number;
    pageSize: number;
}

export const createColumns = ({
    onDetail,
    onEdit,
    onDelete,
    currentPage,
    pageSize,
}: IColumnProps): ColumnDef<any>[] => {
    return [
        {
            header: "No",
            accessorKey: "no",
            cell: ({ row }) => {
                return (
                    <div>{(currentPage - 1) * pageSize + row.index + 1}</div>
                );
            },
        },
        {
            header: "Nama",
            accessorKey: "name",
            cell: ({ row }) => {
                return (
                    <span className="text-sm">{row.original?.name ?? "-"}</span>
                );
            },
        },
        {
            header: "Deskripsi",
            accessorKey: "description",
            cell: ({ row }) => {
                return (
                    <span className="text-sm">
                        {row.original?.description ?? "-"}
                    </span>
                );
            },
        },
        {
            header: "",
            accessorKey: "actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2.5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Icon icon="lucide:more-vertical" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    className="inline-flex items-center gap-2 cursor-pointer"
                                    onClick={() => onDetail?.(row.original.id)}
                                >
                                    <Icon icon="lucide:eye" />
                                    <span>Detail</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="inline-flex items-center gap-2 cursor-pointer"
                                    onClick={() => onEdit?.(row.original.id)}
                                >
                                    <Icon icon="lucide:pen" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="inline-flex items-center gap-2 cursor-pointer"
                                    onClick={() => onDelete?.(row.original.id)}
                                >
                                    <Icon icon="lucide:trash" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ];
};
