export default function FormInput({
    label,
    name,
    type = "text",
    placeholder,
    register,
    rules,
    error,
}) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-[#2B2D31] mb-1.5">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
                className={`w-full px-4 py-2.5 rounded-lg bg-white text-[#2B2D31] border border-[#E5E7EB] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFF4D9] transition-all duration-150
          ${error ? "border-red-500" : "border-gray-300"}`}
            />

            {error && (
                <p className="text-red-500 text-xs mt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
}
