"use client";

import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type Row,
    type SortingState,
    type VisibilityState,
    type HeaderGroup,
    type Header,
    type Cell,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { useEffect, useMemo, useState } from "react";

interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
        isFetching?: boolean;
    };
    onRowsPerPageChange?: (rowsPerPage: number) => void;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    loading?: boolean;
    totalData?: number;
}

export function DataTable<TData>({
    data: initialData,
    columns,
    pagination,
    onRowsPerPageChange,
    rowsPerPage = 10,
    rowsPerPageOptions = [10, 20, 30, 40, 50],
    loading = false,
    totalData,
}: DataTableProps<TData>) {
    const [data, setData] = useState(() => initialData);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [internalPagination, setInternalPagination] = useState({
        pageIndex: 0,
        pageSize: rowsPerPage,
    });

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination: pagination ? undefined : internalPagination,
        },
        getRowId: (row: TData) => (row as unknown as { id: string }).id,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: pagination ? undefined : setInternalPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: pagination ? undefined : getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        manualPagination: !!pagination,
        pageCount: pagination?.totalPages,
    });

    const handlePageSizeChange = (value: string) => {
        const newPageSize = Number(value);
        if (onRowsPerPageChange) {
            onRowsPerPageChange(newPageSize);
        } else {
            table.setPageSize(newPageSize);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (pagination) {
            pagination.onPageChange(newPage);
        } else {
            table.setPageIndex(newPage - 1);
        }
    };

    const currentPage = pagination
        ? pagination.currentPage
        : table.getState().pagination.pageIndex + 1;

    const totalPages = pagination
        ? pagination.totalPages
        : table.getPageCount();

    // Calculate start and end data range
    const startData = (currentPage - 1) * rowsPerPage + 1;
    const endData = Math.min(
        currentPage * rowsPerPage,
        totalData || data.length
    );
    const totalDataCount = totalData || data.length;

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push("ellipsis");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("ellipsis");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push("ellipsis");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("ellipsis");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex w-full flex-col gap-6">
            <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden rounded-lg border">
                <div className="min-w-fit">
                    <Table>
                        <TableHeader className="bg-muted sticky top-0 z-10">
                            {table
                                .getHeaderGroups()
                                .map((headerGroup: HeaderGroup<TData>) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map(
                                            (
                                                header: Header<TData, unknown>
                                            ) => {
                                                return (
                                                    <TableHead
                                                        key={header.id}
                                                        colSpan={header.colSpan}
                                                        className="h-12 px-4 text-left"
                                                    >
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                  header.column
                                                                      .columnDef
                                                                      .header,
                                                                  header.getContext()
                                                              )}
                                                    </TableHead>
                                                );
                                            }
                                        )}
                                    </TableRow>
                                ))}
                        </TableHeader>
                        <TableBody className="**:data-[slot=table-cell]:first:w-8">
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : table.getRowModel().rows?.length ? (
                                table
                                    .getRowModel()
                                    .rows.map((row: Row<TData>) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={
                                                row.getIsSelected() &&
                                                "selected"
                                            }
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map(
                                                    (
                                                        cell: Cell<
                                                            TData,
                                                            unknown
                                                        >
                                                    ) => (
                                                        <TableCell
                                                            key={cell.id}
                                                            className="h-16 px-4"
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    )
                                                )}
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="flex items-center justify-between px-4">
                <div className="hidden items-center gap-2 lg:flex">
                    <Label
                        htmlFor="rows-per-page"
                        className="text-sm font-medium"
                    >
                        Rows per page
                    </Label>
                    <Select
                        value={`${rowsPerPage}`}
                        onValueChange={handlePageSizeChange}
                    >
                        <SelectTrigger className="w-20" id="rows-per-page">
                            <SelectValue placeholder={rowsPerPage} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {rowsPerPageOptions.map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex w-fit items-center justify-center text-sm font-medium">
                    {startData}-{endData} of {totalDataCount}
                </div>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (
                                        currentPage > 1 &&
                                        !pagination?.isFetching
                                    ) {
                                        handlePageChange(currentPage - 1);
                                    }
                                }}
                                className={
                                    currentPage === 1 || pagination?.isFetching
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer"
                                }
                            />
                        </PaginationItem>

                        {getPageNumbers().map((page, index) => (
                            <PaginationItem key={index}>
                                {page === "ellipsis" ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (!pagination?.isFetching) {
                                                handlePageChange(page);
                                            }
                                        }}
                                        isActive={currentPage === page}
                                        className={
                                            pagination?.isFetching
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                    >
                                        {page}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (
                                        currentPage < totalPages &&
                                        !pagination?.isFetching
                                    ) {
                                        handlePageChange(currentPage + 1);
                                    }
                                }}
                                className={
                                    currentPage === totalPages ||
                                    pagination?.isFetching
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer"
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
