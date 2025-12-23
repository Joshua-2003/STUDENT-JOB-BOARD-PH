import { createColumnHelper } from "@tanstack/react-table"

import DataTable from "../../components/DataTable/DataTable";

import { DashboardLayout } from "../../components/layout/DahboardLayout.jsx";

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

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get("/admin/getStudents", {
                    withCredentials: true
                });

                const studentsList = response.data.data.studentsList;
                setStudents(studentsList);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        }

        fetchStudents();
    }, []);

    return (
        <DashboardLayout>
            <h1>Students List</h1>
            <DataTable columns={columns} data={students} />
        </DashboardLayout>
    )
}