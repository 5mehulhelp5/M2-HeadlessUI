import PageHeader from "@/components/object/PageHeader";
import ForgetPassword from "@/components/customer/ForgetPassword";
export default function page() {
    return (
        <div>
            <PageHeader title="Forgot Password" />
            <ForgetPassword />
        </div>
    );
}