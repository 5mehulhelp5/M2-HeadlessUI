"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import magentoGraphQl from '@/lib/magento/graphQl/magentoGraphQl';
import { signInQuery, GetCustomerAfterSignIn } from '@/lib/magento/queries/customer';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    firstname: string | null;
    lastname: string | null;
    middlename: string | null;
    suffix: string | null;
}

interface AuthContextType {
    user: User | null;
    isLogin: boolean;
    cartId: string | null;
    guestCartId: string | null;
    login: (email: string, password: string) => Promise<Boolean>;
    logout: () => Boolean;
    createEmptyCart: () => Promise<string>;
    getToken: () => Promise<string | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLogin, setIsLogin] = useState(false);
    const [cartId, setCartId] = useState<string | null>(null);
    const [guestCartId, setGuestCartId] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get('customerToken');
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const token = await fetchToken(email, password);
            Cookies.set('customerToken', token, { expires: 0.125 }); // 3 hours
            await fetchUserData(token);
            setIsLogin(true);
            return true;
        } catch (e) {
            return false;
        }
    };

    const fetchToken = async (email: string, password: string): Promise<string> => {
        const response = await magentoGraphQl('', 'signInCustomer', signInQuery, { "email": email, "password": password });

        const { data, errors } = await response;

        if (errors) {
            throw new Error(errors[0].message);
        }

        return data.generateCustomerToken.token; // This is the token
    };

    const fetchUserData = async (token: string) => {
        const response = await magentoGraphQl('', 'getCustomerData', GetCustomerAfterSignIn, {}, token)

        const { data, errors } = await response;

        if (errors) {
            console.error('Error fetching user data:', errors);
            return;
        }
        setIsLogin(true);
        setUser(data.customer);
        setCartId(data.customerCart.id);
    };

    const logout = () => {
        Cookies.remove('customerToken');
        setUser(null);
        setIsLogin(false);
        setCartId(null);
        router.push('/');
        return true;
    };
    const createEmptyCart = async () => {
        if (!guestCartId) {
            try {
                const response = await magentoGraphQl('', 'createEmptyCart', `mutation { createEmptyCart }`, {});
                const { data, errors } = await response;
                if (errors) {
                    console.error('Error fetching user data:', errors);
                    return;
                }
                setGuestCartId(data.createEmptyCart);
                return data.createEmptyCart;
            } catch (e) {
                console.log(e)
            }
        }
        return guestCartId;
    }
    const getToken = async () => {
        const token = Cookies.get('customerToken');
        return token;
    }

    return (
        <AuthContext.Provider value={{ user, isLogin, cartId,guestCartId, login, logout, createEmptyCart,getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using the Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;
