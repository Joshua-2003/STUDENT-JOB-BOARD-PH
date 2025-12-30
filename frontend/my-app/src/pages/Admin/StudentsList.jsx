import { createColumnHelper } from "@tanstack/react-table"

import DataTable from "../../components/DataTable/DataTable";
import { useTableData } from "../../hooks/useTableData.jsx";

import MainLayout from "../../components/layout/MainLayout.jsx";
import Modal from "../../components/Modal.jsx";

import api from "../../api/axios.js";

import { useEffect, useState, useMemo } from "react";

import { showSuccess, showError } from "../../utils/alert.jsx";

import { updateStudent } from "../../services/studentService.js";

export default function StudentsList() {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const {
        data,
        pagination,
        setPagination,
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        pageCount,
        refetch
    } = useTableData('/admin/getStudents');


    const columnHelper = createColumnHelper();

    const columns = useMemo(() => [
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

    ], []); 

    // Saving the updated student
    const handleSubmit = async (userData, userId) => {
        try {
            const response = await updateStudent(userId, userData);
            showSuccess("Student Updated", response.data.message);
            setIsOpen(false);
            refetch();
        } catch (error) {
            showError("Update Failed", error.message || "Unable to update student");
        }
    };

    // Edit a student
    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    // Close edit modal
    const handleCloseModal = () => {
        setIsOpen(false);
    }

    // Delete a student
    const handleDelete = async (data) => {
        console.log(data);
    };

    useEffect(() => {
        setPagination(prev => {
            if (prev.pageIndex === 0) return prev;
            return { ...prev, pageIndex: 0 };
        });
    }, [columnFilters, sorting, pagination.pageSize]);


    return (
        <MainLayout>
            <Modal isOpen={isOpen} user={selectedUser} onClose={handleCloseModal} onSave={handleSubmit}/>
            <DataTable columns={columns} data={data} pagination={pagination} setPagination={setPagination} sorting={sorting} setSorting={setSorting} columnFilters={columnFilters} setColumnFilters={setColumnFilters} pageCount={pageCount} onEdit={openEditModal} onDelete={handleDelete}/>
        </MainLayout>
    )
}