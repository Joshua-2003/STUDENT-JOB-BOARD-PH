import { useForm } from "react-hook-form";

import FormWrapper from "../../../components/form/FormWrapper";
import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";
import FormSelect from "../../../components/form/FormSelect";

import api from "../../../api/axios";

export default function Signup() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            type: "STUDENT",
        }
    });

    const userType = watch("type");

    const onSubmit = (data) => {
        try {
            console.log(data); 
            const formData = new FormData();

            for (const key in data) {
                if (key === "resume_url" && data.resume_url?.length > 0) {
                    formData.append("resume_url", data.resume_url[0]);
                } else {
                    formData.append(key, data[key]);
                }

            }

            api.post("/auth/signup", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(res => console.log(res.data))
                .catch(err => console.error(err));

        } catch (error) {
            console.error("Signup error:", error);
        }
    };



    return (
        <FormWrapper title="Signup">
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* User Type Selection */}
                <FormSelect
                    label="User Type"
                    name="type"
                    register={register}
                    rules={{
                        required: "User type is required",
                    }}
                    error={errors.type}
                    options={[
                        { value: "STUDENT", label: "Student" },
                        { value: "EMPLOYER", label: "Employer" },
                    ]}
                />

                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    {/* Common Fields */}
                    <FormInput
                        label={userType === "STUDENT" ? "Student Name" : "Company Name"}
                        name="name"
                        placeholder={
                            userType === "STUDENT"
                                ? "Enter your student name"
                                : "Enter your company name"
                        }
                        register={register}
                        rules={{
                            required:
                                userType === "STUDENT"
                                    ? "Student name is required"
                                    : "Company name is required",
                            minLength: {
                                value: 3,
                                message: "Must be at least 3 characters",
                            },
                        }}
                        error={errors.name}
                    />


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
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        register={register}
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                        }}
                        error={errors.password}
                    />


                    <FormInput
                        label="Confirm password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Enter your password"
                        register={register}
                        rules={{
                            required: "Confirm password is required",
                            validate: (value) =>
                                value === watch("password") || "Passwords do not match",
                        }}
                        error={errors.confirmPassword}
                    />

                    {/* Student Fields */}
                    {userType === "STUDENT" && (
                        <>
                            <FormInput
                                label="Age"
                                name="age"
                                type="text"
                                placeholder="Enter your age"
                                register={register}
                                rules={{
                                    required: "Age is required for students",
                                    min: {
                                        value: 18,
                                        message: "Age must be 18 or older",
                                    },
                                }}
                                error={errors.age}
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


                            <FormInput
                                label="Upload Resume"
                                name="resume_url"
                                type="file"
                                register={register}
                                rules={{ required: "Resume is required for students" }}
                                error={errors.resume_url}
                            />


                        </>
                    )}

                    {/* Employer Fields */}
                    {userType === "employer" && (
                        <>

                            <FormInput
                                label="Company Description"
                                name="companyDescription"
                                type="text"
                                placeholder="Enter your company description"
                                register={register}
                                rules={{
                                    required: "Description is required for companies",
                                    minLength: {
                                        value: 10,
                                        message: "Description must be at least 10 characters",
                                    },
                                }}
                                error={errors.companyDescription}
                            />

                            <FormInput
                                label="Location"
                                name="location"
                                type="text"
                                placeholder="Enter your company location"
                                register={register}
                                rules={{
                                    required: "Location is required for companies",
                                }}
                                error={errors.location}
                            />
                        </>
                    )}
                </div>
                
                <FormButton text="Signup" />
            </form>
        </FormWrapper>
    );
}