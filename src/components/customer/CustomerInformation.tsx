"use client";
import { useAuth } from "@/components/customer/authenticate/AuthProvider";
import { ProgressBarLink } from "@/components/context/progress-bar";

export default function CustomerInformation() {
    const { user } = useAuth();
    console.log(user);
    return (
        <div className="w-full">
            <div className="mt-5 lg:mt-0">
                <h3 className="text-xl border-b pb-2 mb-2">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mx-3">
                    <div className="md:col-span-8 sm:col-span-1">
                        <p className="font-medium text-md mb-2">Contact Information</p>
                        <p className="text-gray-500">{user?.firstname} {user?.lastname}<br />
                            {user?.email}</p>
                        <div className="flex">
                            <ProgressBarLink className="text-blue-600" href="/customer/account/edit">Edit</ProgressBarLink>
                        </div>
                    </div>
                    <div className="md:col-span-4 sm:col-span-1">
                        <p className="font-medium text-md mb-2">Newsletters</p>
                        <p className="text-gray-500">You aren&apos;t subscribed to our newsletter.</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="border-b pb-2 mb-2 flex gap-3 items-end">
                    <p className="text-xl">Address Book</p>
                    <ProgressBarLink className="text-blue-600" href="/customer/address">Manage Addresses</ProgressBarLink>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mx-3">
                    <div className="md:col-span-8 sm:col-span-1"></div>
                    <div className="sm:mt-0 mt-5 md:col-span-4 sm:col-span-1">
                    </div>
                </div>
            </div>
        </div>
    );
}
