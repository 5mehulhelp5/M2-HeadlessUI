"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/customer/authenticate/AuthProvider';
import magentoGraphQl from '@/lib/magento/graphQl/magentoGraphQl';
import { customerEdit } from '@/lib/magento/queries/customer';
import { useNotification } from '@/components/context/NotificationContext';
const CustomerEdit: React.FC = () => {
    const { user,getToken } = useAuth(); // Get the current user data
    const [changeEmail, setChangeEmail] = useState(false);
    const [firstname, setFirstname] = useState(user?.firstname || '');
    const [lastname, setLastname] = useState(user?.lastname || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const { showNotification } = useNotification();

    useEffect(() => {
        if (user) {
            setFirstname(user?.firstname || ''); 
            setLastname(user?.lastname || ''); 
            setEmail(user?.email || '');
        }
    }, [user]);
    async function changeDetails() {
        let object;
        !changeEmail ? object = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email
        } : object = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password
        }
        const token = await getToken();
        const response = await magentoGraphQl('', 'customerDetailsEdit', customerEdit, object,token);
        const { data, errors } = await response;
        if (errors) {
            console.log(errors);
            showNotification('Something went wrong', 'error', 3000);
            return;
        }
        showNotification('Account details updated successfully', 'success', 3000);
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        await changeDetails();
    };

    return (
        <div className="w-full">
            <div className="mt-5 lg:mt-0">
                <div>
                    <h2 className="font-medium text-2xl mb-5">Edit Account Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mx-3">
                    {/* Account Information */}
                    <div className="md:col-span-6 sm:col-span-1">
                        <h3 className="text-xl border-b pb-2 mb-2">Account Information</h3>
                        <form className="mt-0" onSubmit={handleSubmit}>
                            <div>
                                <label className="block py-1 mt-2 text-gray-500 font-light">First Name</label>
                                <input
                                    className="text-sm border border-gray-300 font-light rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
                                    placeholder="First Name"
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block py-1 mt-2 text-gray-500 font-light">Last Name</label>
                                <input
                                    className="text-sm border border-gray-300 font-light rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
                                    placeholder="Last Name"
                                    type="text"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center mt-4">
                                <input
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    type="checkbox"
                                    checked={changeEmail}
                                    onChange={(e) => setChangeEmail(e.target.checked)}
                                />
                                <label className="ms-2 text-sm font-light text-gray-500">Change Email</label>
                            </div>
                            <button
                                type="submit"
                                className="btn-primary mt-4"
                            >
                                <span>Save</span>
                            </button>
                        </form>
                    </div>

                    {/* Change Email Section */}
                    {changeEmail && (
                        <div className="md:col-span-6 sm:col-span-1">
                            <h3 className="text-xl border-b pb-2 mb-2">Change Email</h3>
                            <div>
                                <label className="block py-1 mt-2 text-gray-500 font-light">Email</label>
                                <input
                                    className="text-sm border border-gray-300 font-light rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block py-1 mt-2 text-gray-500 font-light">Current Password</label>
                                <input
                                    className="text-sm border border-gray-300 font-light rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerEdit;
