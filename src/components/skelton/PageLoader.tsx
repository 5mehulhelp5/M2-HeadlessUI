"use client";
import { Hourglass } from "react-loader-spinner"
import { useLoader } from "@/components/context/PageLoaderContext"
const PageLoader: React.FC = () => {
    const { loading } = useLoader();

    if (!loading) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center scale-100 ">
            <div className="absolute inset-0 bg-white transition-opacity duration-500 opacity-50">
            </div>
            <div className="border-4 border-primary rounded-full z-20 p-5">
                <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#FF0000', '#EA8C81']}
                />
            </div>
        </div>
    )
}
export default PageLoader;