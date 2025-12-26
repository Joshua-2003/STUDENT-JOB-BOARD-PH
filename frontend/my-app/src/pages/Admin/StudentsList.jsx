import { createColumnHelper } from "@tanstack/react-table"

import DataTable from "../../components/DataTable/DataTable";
import { useTableData } from "../../hooks/useTableData.jsx";

import MainLayout from "../../components/layout/MainLayout.jsx";

export default function StudentsList() {

    const {
        data,
        pagination,
        setPagination,
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        pageCount
    } = useTableData('/admin/getStudents');


    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("name", {
            header: "Name",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("email", {
            header: "Email",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("course", {
            header: "Course",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("type", {
            header: "Type",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("resume_url", {
            header: "Resume URL",
            cell: info => info.getValue(),
        }),

    ];


    return (
        <MainLayout>
            {/* <h1>Students List</h1> */}
            <DataTable columns={columns} data={data} pagination={pagination} setPagination={setPagination} sorting={sorting} setSorting={setSorting} columnFilters={columnFilters} setColumnFilters={setColumnFilters} pageCount={pageCount} />
        </MainLayout>
    )
}