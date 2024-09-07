import { Metadata } from "next";
import HeroSlider from "@/components/landingPage/HeroSlider";
import HeroSliderGrid from "@/components/admin/components/HeroSliderGrid";
export const metadata = {
    description: 'High-performance ecommerce store built with Next.js, Vercel, and M2.',
    openGraph: {
        type: 'website'
    }
};
export default function page() {
    
    return (
        <div className="w-full min-h-screen box-border">
            <HeroSlider />
        </div>
    );
}