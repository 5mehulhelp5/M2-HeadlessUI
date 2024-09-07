import HeroSliderGrid from "@/components/admin/components/HeroSliderGrid"
import { SkeletonGrid } from "@/components/admin/components/HeroSliderGrid"
import { Suspense } from "react"
export default function Page() {
    return (
        <div className="w-full">
            <div className="flex justify-center items-center">
                <h1 className="text-4xl font-bold">Hero Slider</h1>
            </div>
            <Suspense fallback={<SkeletonGrid count={8} />}>
                <HeroSliderGrid />
            </Suspense>
        </div>
    )
}