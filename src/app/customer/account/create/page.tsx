import SignUp from "@/components/customer/SignUp";
import PageHeader from "@/components/object/PageHeader";
export default function Page() {
    return (
        <>
            <div className="w-full h-full">
                <PageHeader title="Create Your Account" />
                <SignUp />
            </div>
        </>
    );
}