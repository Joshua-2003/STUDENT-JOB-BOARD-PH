export default function FormSelect({
    label,
    name,
    register,
    rules,
    error,
    options,
}) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>

            <select
                {...register(name, rules)}
                className={`w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring
          ${error ? "border-red-500" : "border-gray-300"}`}
            >
                <option value="">Select an option</option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="text-red-500 text-xs mt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
}
