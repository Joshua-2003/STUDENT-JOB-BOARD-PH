import '../styles/loader.css'

export default function Loader() {
    return(
        <>
            <div
                className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40 transition-opacity duration-200"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                
                <div className="loader"></div>
            </div>
        </>
        
    )
}