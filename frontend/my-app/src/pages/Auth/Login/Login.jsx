import { useForm } from "react-hook-form";

import FormWrapper from "../../../components/form/FormWrapper";
import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";
import FormSelect from "../../../components/form/FormSelect";

import Loader from "../../../components/Loader";

import { useAuth } from "../../../context/AuthContext";

import api from "../../../api/axios";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            type: "STUDENT",
        }
    });

    const { fetchUser, loading } = useAuth();

    const onSubmit = async (data) => {
        try {
            await api.post("/auth/login", data, { withCredentials: true });
            await fetchUser();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    if (loading) {
        return <Loader />
    }

    return (
        <FormWrapper title="Login">
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
                        { value: "ADMIN", label: "Admin" },]}
                />

                {/* Common Fields */}
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

                <FormButton text="Login" />
            </form>
        </FormWrapper>
    );
}