import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";

export default function DataTable({ data, columns, onEdit, onDelete }) {
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
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
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
        </div>
    );
}
