import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function Modal({ isOpen, onClose, student, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        course: ""
    });

    // Populate form when student data changes
    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name || "",
                email: student.email || "",
                course: student.course || ""
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40 transition-opacity duration-200"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-xl shadow-lg w-full max-w-md transform transition-all duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
                        <h2 className="text-xl font-semibold text-[#2B2D31] tracking-tight">
                            Edit Student
                        </h2>
                        <button
                            onClick={handleClose}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] transition-colors duration-150 cursor-pointer"
                        >
                            <IoMdClose className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-[#2B2D31] mb-1.5"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter student name"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg bg-white text-[#2B2D31] border border-[#E5E7EB] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFF4D9] transition-all duration-150"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-[#2B2D31] mb-1.5"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg bg-white text-[#2B2D31] border border-[#E5E7EB] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFF4D9] transition-all duration-150"
                                />
                            </div>

                            {/* Course Field */}
                            <div>
                                <label
                                    htmlFor="course"
                                    className="block text-sm font-medium text-[#2B2D31] mb-1.5"
                                >
                                    Course
                                </label>
                                <input
                                    type="text"
                                    id="course"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    placeholder="Enter course name"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg bg-white text-[#2B2D31] border border-[#E5E7EB] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFF4D9] transition-all duration-150"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#E5E7EB]">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 rounded-lg bg-white text-[#2B2D31] border border-[#E5E7EB] text-sm font-medium hover:bg-[#F9FAFB] transition-colors duration-150 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-[#2B2D31] text-white text-sm font-medium hover:bg-[#1F2023] transition-colors duration-150 cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}