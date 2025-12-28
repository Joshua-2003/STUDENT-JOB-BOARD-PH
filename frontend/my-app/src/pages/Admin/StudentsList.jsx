import { createColumnHelper } from "@tanstack/react-table"

import DataTable from "../../components/DataTable/DataTable";
import { useTableData } from "../../hooks/useTableData.jsx";

import MainLayout from "../../components/layout/MainLayout.jsx";
import Modal from "../../components/Modal.jsx";

import { useEffect, useState } from "react";

export default function StudentsList() {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [user, setUser] = useState({});

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

    // Edit a student
    const openEditModal = (data) => {
        setUser(data);
        setIsOpenModal(true);
    };

    // Close edit modal
    const handleCloseEditModal = () => {
        setIsOpenModal(false);
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
            <Modal isOpen={isOpenModal} student={user} onClose={handleCloseEditModal}/>
            <DataTable columns={columns} data={data} pagination={pagination} setPagination={setPagination} sorting={sorting} setSorting={setSorting} columnFilters={columnFilters} setColumnFilters={setColumnFilters} pageCount={pageCount} onEdit={openEditModal} onDelete={handleDelete}/>
        </MainLayout>
    )
}