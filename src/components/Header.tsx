"use client";
import Image from "next/image";
import { ProgressBarLink } from "@/components/context/progress-bar";
import { useSignInDialog } from "@/components/context/SignInDialog";
import { useAuth } from "@/components/customer/authenticate/AuthProvider";
import React, { useState, useRef, useEffect } from 'react';
import { useNotification } from "@/components/context/NotificationContext";
import { UserIcon, ShoppingBagIcon } from "@heroicons/react/20/solid";
import Navbar from "@/components/Navbar";

export default function Header() {
    const { openDialog, closeDialog } = useSignInDialog();
    const { user, isLogin, logout } = useAuth();
    const { showNotification } = useNotification();
    const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
    const headerRef = useRef<HTMLElement | null>(null);
    const handleScroll = (elTopOffset: number, elHeight: number) => {
        const nextElement = headerRef.current?.nextElementSibling as HTMLElement | null;
        if (window.scrollY > (elTopOffset + elHeight)) {
            setSticky({ isSticky: true, offset: elHeight });
            if (nextElement) {
                nextElement.style.marginTop = `${elHeight}px`;
            }
        } else {
            setSticky({ isSticky: false, offset: 0 });
            if (nextElement) {
                nextElement.style.marginTop = '0px';
            }
        }
    };

    useEffect(() => {
        if (headerRef.current) {
            var header = headerRef.current.getBoundingClientRect();
            const handleScrollEvent = () => {
                handleScroll(header.top, header.height)
            }

            window.addEventListener('scroll', handleScrollEvent);

            return () => {
                window.removeEventListener('scroll', handleScrollEvent);
            };
        }
    }, []);

    function UserLogout() {
        logout();
        showNotification('User is Successfully Logout', 'success', 3000);
    }

    return (

        <header className={`w-full border-b-4 border-primary transition-all duration-300 ease-out bg-gray-300 ${sticky.isSticky ? ' sticky' : ''}`} ref={headerRef}>
            <div className="container mx-auto flex md:flex-row justify-between py-2 items-center xs:px-0 px-2">
                <div className="logo lg:order-1 order-2 pl-10 md:pl-0">
                    <ProgressBarLink href="/">
                        <Image src="/logo/logo_hd.png"
                            title="Seamless shopping, next-gen tech."
                            className="w-[6rem]"
                            alt="Magento Headless Commerce"
                            width={700}
                            height={400}
                        />
                    </ProgressBarLink>
                </div>
                    <Navbar />
                <div className="order-3">
                    <div className="flex items-center ">
                        <div className="px-3 text-2xl pt-2 hidden md:block">
                            <div className="group inline-block">
                                <a href="#" className="hover:text-primary text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                        <circle cx="12" cy="12" r="10"></circle>
                                    </svg>
                                </a>

                                <ul className="bg-white box-shadow transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 py-1 px-2 z-20 rounded-sm">
                                    {!isLogin && (
                                        <>
                                            <li className="px-2 py-1 text-base border-b border-gray-300">
                                                <button onClick={openDialog} className="text-black">Sign In </button>
                                            </li>
                                            <li className="px-2 py-1 text-base">
                                                <ProgressBarLink className="text-black" href="/customer/account/create">Sign Up</ProgressBarLink>
                                            </li>
                                        </>
                                    )}
                                    {isLogin && (
                                        <>
                                            <li className="px-2 py-1 text-base border-b border-gray-300">
                                                <ProgressBarLink className="text-black" href="/customer/account">My Account</ProgressBarLink>
                                            </li>
                                            <li className="px-2 py-1 text-base">
                                                <button onClick={UserLogout} className="text-black">Log Out</button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="px-3 text-2xl pt-2 block md:hidden">
                            <div className="group inline-block">
                                <a href="#" className="hover:text-primary text-black relative">
                                    <UserIcon className='w-5 h-5' />
                                </a>
                            </div>
                        </div>
                        <div className="border-l-2 border-black h-5"></div>
                        <div className="pl-3 pr-0 text-2xl">
                            <a href="#" className="hover:text-primary text-black relative">
                                <ShoppingBagIcon className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
