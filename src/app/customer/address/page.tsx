import AccountSidebar from "@/components/customer/AccountSidebar"
import CustomerEdit from "@/components/customer/CustomerEdit"
import PageHeader from "@/components/object/PageHeader"
export default function page() {
    return (
        <div className="container mx-auto px-4 xl:px-0">
            <PageHeader title="Address Book" />
            <div className="flex-none lg:flex mb-3">
                <AccountSidebar />
            </div>
        </div>
    )
}