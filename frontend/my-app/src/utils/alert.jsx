import Swal from "sweetalert2";

/**
 * Success Alert
 */
export const showSuccess = (title = "Success", text = "") => {
    return Swal.fire({
        icon: "success",
        title,
        text,
        confirmButtonColor: "#4f46e5", // indigo
    });
};

/**
 * Error Alert
 */
export const showError = (title = "Error", text = "Something went wrong") => {
    return Swal.fire({
        icon: "error",
        title,
        text,
        confirmButtonColor: "#dc2626", // red
    });
};

/**
 * Confirm Alert (optional but recommended)
 */
export const showConfirm = (
    title = "Are you sure?",
    text = "This action cannot be undone"
) => {
    return Swal.fire({
        icon: "warning",
        title,
        text,
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, continue",
    });
};
