import { createColumnHelper } from "@tanstack/react-table"

import DataTable from "../../components/DataTable/DataTable";

import MainLayout from "../../components/layout/MainLayout.jsx";

import api from "../../api/axios.js";

import { useEffect, useState } from "react";

export default function StudentsList() {

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

    const [students, setStudents] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0, // frontend = 0-based
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const page = pagination.pageIndex + 1;
                const limit = pagination.pageSize;

                const search =
                    columnFilters.find(f => f.id === 'name')?.value ?? '';

                const response = await api.get(`/admin/getStudents?page=${page}&limit=${limit}&search=${search}`, {
                    withCredentials: true
                });

                const studentsList = response.data.data.data;
                const totalPages = response.data.data.pagination.totalPages
                setStudents(studentsList);
                setPageCount(totalPages);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        }

        fetchStudents();
    }, [pagination.pageIndex,
        pagination.pageSize,
        columnFilters,
        sorting,]);

    return (
        <MainLayout>
            {/* <h1>Students List</h1> */}
            <DataTable columns={columns} data={students} pagination={pagination} setPagination={setPagination} sorting={sorting} setSorting={setSorting} columnFilters={columnFilters} setColumnFilters={setColumnFilters} pageCount={pageCount} />
        </MainLayout>
    )
}