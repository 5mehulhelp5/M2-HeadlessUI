"use client"
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSignInDialog } from "@/components/context/SignInDialog";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/customer/authenticate/AuthProvider";
import { useNotification } from "@/components/context/NotificationContext";

export default function SignInDialog() {
    const { login, user, isLogin,getToken} = useAuth();
    const { showNotification } = useNotification();
    const { isOpen, closeDialog } = useSignInDialog();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const router = useRouter();
    console.log('token',getToken())
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        try {
            const data = await login(formData.email, formData.password);
            if (data) {
                closeDialog()
                showNotification('User is Successfully Login', 'success', 3000)
                router.push('/customer/account')
            } else {
                showNotification('Something Went to wrong', 'error', 3000)
            }
        } catch (e) {
            showNotification('Something Went to wrong', 'error', 3000)
        }

    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog open={isOpen} as="div" className="relative z-10" onClose={closeDialog}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-500"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="relative w-full xl:max-w-[30%] lg:max-w-[40%] md:max-w-[80%] rounded-xl bg-white p-8 backdrop-blur-2xl">
                                {/* Close button */}
                                <button onClick={closeDialog} className="absolute top-3 right-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <h2 className="text-2xl font-semibold text-center mb-3">Sign into your account</h2>

                                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                                    <div className="text-center">Don’t have an account?&nbsp;
                                        <Link className="text-blue-500 border-b border-blue-500" href="/customer/account/create">
                                            Create Account
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <label className="absolute -top-2 left-3 bg-white text-xs text-gray-400">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="appearance-none border rounded-md w-full py-3.5 px-5 text-gray-500 leading-tight"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="absolute -top-2 left-3 bg-white text-xs text-gray-400">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="appearance-none border rounded-md w-full py-3.5 px-5 text-gray-500 leading-tight"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="flex justify-end mt-3">
                                        <Link href="/customer/account/forgotpassword" className="text-gray-900">
                                            Forget Password?
                                        </Link>
                                    </div>
                                    <div className="mt-4 flex justify-center">
                                        <button type="submit" className="btn-primary w-full">Sign Up</button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
