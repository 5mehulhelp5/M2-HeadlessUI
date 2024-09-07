import HeroSectionEditor from "@/components/admin/components/HeroSectionEditor";
export default async function Page({ params }: { params: { slide: any } }) {
    console.log(JSON.stringify(params));
    return (
        <div>
            <HeroSectionEditor slide={params.slide} />
        </div>
    )
}