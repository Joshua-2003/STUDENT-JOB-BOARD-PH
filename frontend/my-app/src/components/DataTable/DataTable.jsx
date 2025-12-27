import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";

import { useState } from "react";

export default function DataTable({ 
    data, 
    columns,
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    pageCount,
    onEdit, 
    onDelete 
}) {
    // Add an actions column dynamically
    const actionColumn = {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(row.original)}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm cursor-pointer"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(row.original)}
                    className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm cursor-pointer"
                >
                    Delete
                </button>
            </div>
        ),
    };

    const table = useReactTable({
        data,
        columns: [...columns, actionColumn],
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,

        pageCount,

        state: {
            pagination,
            sorting,
            columnFilters,
        },

        onPaginationChange: setPagination, // setPagination of parent component
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,

        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            {/* Search input */}
            <div className="mb-4 flex items-center justify-between">
                <div className="relative w-72">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={table.getColumn("name")?.getFilterValue() ?? ""}
                        onChange={(e) => {
                            table.getColumn("name")?.setFilterValue(e.target.value);
                        }}
                        className="w-72 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 px-4 py-2"
                    />

                </div>
            </div>

            {/* Table */}
            <table className="min-w-full border-collapse text-gray-100">
                <thead className="text-left text-[#8392AB] text-sm">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="px-4 py-3 border-b border-gray-200 font-medium" 
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody className="">
                    {table.getRowModel().rows.map(row => (
                        <tr
                            key={row.id}
                            className="text-left text-[#8392AB] text-sm"
                        >
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    className="px-4 py-2 border-b border-gray-200 font-medium"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-400">
                <span>
                    Page {pagination.pageIndex + 1} of {pageCount}
                </span>

                <div className="flex gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 cursor-pointer"
                    >
                        Previous
                    </button>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
}
