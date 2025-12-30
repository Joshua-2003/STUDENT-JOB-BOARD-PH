export default function FormButton({ text, isLoading }) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-white text-[#2B2D31] border border-[#E5E7EB] text-sm font-medium hover:bg-[#F9FAFB] transition-colors duration-150 cursor-pointer"
        >
            {isLoading ? "Please wait..." : text}
        </button>
    );
}
