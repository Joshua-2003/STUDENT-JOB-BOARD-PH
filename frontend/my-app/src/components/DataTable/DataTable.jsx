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
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(row.original)}
                    className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm"
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
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-gray-100">
                <thead className="bg-gray-800 text-left">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="px-4 py-3 border-b border-gray-700"
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

                <tbody className="bg-gray-900">
                    {table.getRowModel().rows.map(row => (
                        <tr
                            key={row.id}
                            className="hover:bg-gray-700 transition-colors"
                        >
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    className="px-4 py-2 border-b border-gray-700"
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
