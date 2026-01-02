import api from "../api/axios.js";

// GET students (already handled by useTableData)
export const updateStudent = (id, data) => {
    return api.put(`/admin/updateStudent/${id}`, data);
};

// export const deleteStudent = (id) => {
//     return api.delete(`/admin/deleteStudent/${id}`);
// };