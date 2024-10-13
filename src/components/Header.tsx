"use client";
import Image from "next/image";
import { ProgressBarLink } from "@/components/context/progress-bar";
import { useSignInDialog } from "@/components/context/SignInDialog";
import { useAuth } from "@/components/customer/authenticate/AuthProvider";
import { useNotification } from "./context/NotificationContext";
export default function Header() {
    const { openDialog, closeDialog } = useSignInDialog();
    const { user, isLogin, logout } = useAuth();
    const { showNotification } = useNotification();
    function UserLogout() {
        logout();
        showNotification('User is Successfully Logout', 'success', 3000);
    }
    return (
        <div className="container mx-auto flex md:flex-row justify-between flex-col py-4 items-center">
            <div className="logo">
                <ProgressBarLink href="/">
                    <Image src="/logo/m2logo.svg"
                        title="logo"
                        alt="Magento Headless Commerce"
                        width={189}
                        height={83}
                    />
                </ProgressBarLink>
            </div>
            <div>
                <div className="relative">
                    <form action="/catalogsearch/result/" className="border-primary">
                        <div className="relative">
                            <input className="py-[7px] px-3 focus:outline-none border lg:w-[500px] md:w-[400px] w-[100%] border-primary rounded-l-sm" placeholder="I'm Searching for..." type="text" value="" name="q" />
                            <button className="bg-primary px-3 py-2 text-white rounded-r-sm absolute right-0" type="submit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg></button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <div className="flex items-center">
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
                                            <ProgressBarLink className="text-black" href="/customer/account/create" >Sign Up</ProgressBarLink>
                                        </li>
                                    </>
                                )}
                                {isLogin && (<>
                                    <li className="px-2 py-1 text-base border-b border-gray-300">
                                        <ProgressBarLink className="text-black" href="/customer/account" >My Account</ProgressBarLink>
                                    </li>
                                    <li className="px-2 py-1 text-base">
                                        <button onClick={UserLogout} className="text-black">Log Out </button>
                                    </li>
                                </>)}
                            </ul>
                        </div>
                    </div>
                    <div className="px-3 text-2xl pt-2 block md:hidden">
                        <div className="group inline-block">
                            <a href="#" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg></a></div></div>
                    <div className="border-l-2 border-gray-300 h-5"></div><div className="pl-3 pr-0 text-2xl"><a href="" className="hover:text-primary text-black relative"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"></path></svg></a></div></div>
            </div>

        </div>
    )
}