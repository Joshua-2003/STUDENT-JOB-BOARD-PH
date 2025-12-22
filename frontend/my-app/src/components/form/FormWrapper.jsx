export default function FormWrapper({ title, children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
                {title && (
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        {title}
                    </h2>
                )}
                {children}
            </div>
        </div>
    );
}
