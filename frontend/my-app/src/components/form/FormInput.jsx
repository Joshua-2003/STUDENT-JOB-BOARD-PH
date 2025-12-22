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
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring
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
