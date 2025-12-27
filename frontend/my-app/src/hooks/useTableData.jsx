import { useState, useEffect } from "react";
import api from '../api/axios.js';

export function useTableData(endpoint) {
    const [data, setData] = useState([]);           // table rows
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [sorting, setSorting] = useState([]);     // for sorting columns
    const [columnFilters, setColumnFilters] = useState([]); // for column filters
    const [pageCount, setPageCount] = useState(0);  // total pages

    // Fetch function
    useEffect(() => {
        const fetchData = async () => {
            try {
                const page = pagination.pageIndex + 1; // backend is 1-based
                const limit = pagination.pageSize;

                // Example: search by name
                const nameFilter = columnFilters.find(f => f.id === 'name');
                const search = nameFilter ? nameFilter.value : '';

                const response = await api.get(`${endpoint}?page=${page}&limit=${limit}&search=${search}`, {
                    withCredentials: true
                });

                const rows = response.data.data.data;
                const totalPages = response.data.data.pagination.totalPages;

                setData(rows);
                setPageCount(totalPages);

            } catch (error) {
                console.error("Error fetching table data:", error);
            }
        };

        fetchData();
    }, [endpoint, pagination.pageIndex, pagination.pageSize, columnFilters, sorting]);

    return {
        data,
        pagination,
        setPagination,
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        pageCount,
    };
}

