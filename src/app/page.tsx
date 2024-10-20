import { Metadata } from "next";
import HeroSlider from "@/components/landingPage/HeroSlider";
import ShopByCategories from '@/components/landingPage/ShopByCategories'
import FeaturesSection from "@/components/FeaturesSection";
export const metadata = {
    description: 'High-performance ecommerce store built with Next.js, Vercel, and M2.',
    openGraph: {
        type: 'website'
    }
};
export default function page() {
    
    return (
        <div>
            <HeroSlider />
            <FeaturesSection />
            <ShopByCategories />
        </div>
    );
}