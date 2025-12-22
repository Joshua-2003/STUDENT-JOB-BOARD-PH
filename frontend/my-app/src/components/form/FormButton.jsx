export default function FormButton({ text, isLoading }) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
            {isLoading ? "Please wait..." : text}
        </button>
    );
}
