"use client";
import React from 'react';
import { ProgressBarLink } from '@/components/context/progress-bar';
import { usePathname } from 'next/navigation';

const AccountSidebar: React.FC = () => {
    const path = usePathname();

    const links = [
        { href: "/customer/account", label: "My Account" },
        { href: "/sales/order/history", label: "My Orders" },
        { href: "/downloadable/customer/products", label: "My Downloadable Products" },
        { href: "/customer/address", label: "Address Book" },
        { href: "/customer/account/edit", label: "Account Information" },
    ];

    return (
        <div className="w-full lg:mt-0 lg:pr-6 lg:sticky lg:h-full lg:w-[380px] lg:top-3 xl:w-[380px] 2xl:w-[440px]">
            <div>
                <ul className="bg-gray-100 pt-1 pb-1">
                    {links.map(link => (
                        <li key={link.href} className="my-3">
                            <ProgressBarLink
                                className={`pl-4 text-gray-500 ${path === link.href ? 'text-primary font-medium border-l-2 border-primary active' : ''}`}
                                href={link.href}
                            >
                                {link.label}
                            </ProgressBarLink>
                        </li>
                    ))}
                   
                </ul>
            </div>
        </div>
    );
};

export default AccountSidebar;
