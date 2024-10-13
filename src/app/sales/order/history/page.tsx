import PageHeader from "@/components/object/PageHeader";
import AccountSidebar from "@/components/customer/AccountSidebar";
export default function page() {
    return (
        <div className="container mx-auto px-4 xl:px-0">
            <PageHeader title="Order History" />
            <div className="flex-none lg:flex mb-3">
                <AccountSidebar />
            </div>
        </div>
    );
}