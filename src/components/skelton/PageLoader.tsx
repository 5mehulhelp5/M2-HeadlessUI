import { Hourglass } from "react-loader-spinner"
export default function PageLoader() {
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