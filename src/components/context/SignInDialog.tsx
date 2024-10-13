"use client";
import { createContext, useContext, useState, ReactNode,useEffect } from "react";
import { usePathname } from "next/navigation";
interface SignInDialogProps {
    isOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}

const SignInDialog = createContext<SignInDialogProps | undefined>(undefined);

export const SignInDialogProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();
    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);
    useEffect(() => {
        closeDialog()
    }, [path])

    return (
        <SignInDialog.Provider value={{ isOpen, openDialog, closeDialog }}>
            {children}
        </SignInDialog.Provider>
    );
};

export const useSignInDialog = () => {
    const context = useContext(SignInDialog);
    if (!context) {
        throw new Error("useSignInDialog must be used within a SignInDialogProvider");
    }
    return context;
};
