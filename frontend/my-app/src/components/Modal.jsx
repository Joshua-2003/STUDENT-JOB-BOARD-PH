import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import FormInput from "./form/FormInput";
import FormButton from "./form/FormButton";

import { useForm } from "react-hook-form";

// Note make this a reusable in order to use it for every component
export default function Modal({ isOpen, onClose, student, onSave }) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Click");
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    useEffect(() => {
        if (student) {
            reset({
                email: student.email || "",
                name: student.name || "",
                course: student.course || "",
            });
        }
    }, [student, reset]);

    if (!isOpen) return null;
    
    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40 transition-opacity duration-200"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-md transform transition-all duration-200">

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
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6">

                       <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            register={register}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Email is invalid",
                                },
                            }}
                            error={errors.email}
                        />

                        <FormInput
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter name"
                            register={register}
                            rules={{
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Must be at least 3 characters",
                                },
                            }}
                            error={errors.name}
                        />

                        <FormInput
                            label="Course"
                            name="course"
                            type="text"
                            placeholder="Enter your course"
                            register={register}
                            rules={{
                                required: "Course is required for students",
                            }}
                            error={errors.course}
                        />

                        {/* Modal footer */}
                        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#E5E7EB]">
                            <FormButton text="Cancel" />
                            <FormButton text="Save" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}