import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";

import { FiSearch } from "react-icons/fi";

import Loader from "../Loader";

export default function DataTable({
    isLoading,
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
                    className="px-3 py-1.5 bg-[#2B2D31] hover:bg-[#1F2023] text-white rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(row.original)}
                    className="px-3 py-1.5 bg-white hover:bg-[#F9FAFB] text-[#2B2D31] border border-[#E5E7EB] rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer"
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

        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,

        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-[#F3F4F6]">
            {/* Search toolbar */}
            <div className="p-4 border-b border-[#F3F4F6]">
                <div className="relative w-full max-w-sm">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={table.getColumn("name")?.getFilterValue() ?? ""}
                        onChange={(e) => {
                            table.getColumn("name")?.setFilterValue(e.target.value);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-[#2B2D31] border border-[#E5E7EB] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFF4D9] transition-all duration-150"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                {isLoading ? 
                    // Loader
                    <Loader /> :

                    // Table
                    <table className="min-w-full">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="border-b border-[#F3F4F6]">
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="px-5 py-3.5 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wide"
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

                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr
                                    key={row.id}
                                    className="border-b border-[#F3F4F6] hover:bg-[#FAFAFA] transition-colors duration-150"
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="px-5 py-4 text-sm font-normal text-[#2B2D31]"
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
                }
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-[#F3F4F6]">
                <span className="text-sm font-medium text-[#6B7280]">
                    Page {pagination.pageIndex + 1} of {pageCount}
                </span>

                <div className="flex gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-4 py-2 rounded-lg bg-white text-[#2B2D31] border border-[#E5E7EB] text-sm font-medium hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors duration-150"
                    >
                        Previous
                    </button>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-4 py-2 rounded-lg bg-white text-[#2B2D31] border border-[#E5E7EB] text-sm font-medium hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors duration-150"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}