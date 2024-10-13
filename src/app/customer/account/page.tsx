import AccountSidebar from "@/components/customer/AccountSidebar"
import CustomerInformation from "@/components/customer/CustomerInformation"
import PageHeader from "@/components/object/PageHeader"
export default function page() {
    return (
        <div className="container mx-auto px-4 xl:px-0">
            <PageHeader title="My Account" />
            <div className="flex-none lg:flex mb-3">
                <AccountSidebar />
                <CustomerInformation/>
            </div>
        </div>
    )
}