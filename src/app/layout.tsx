import type { Metadata } from "next";
import { Suspense } from 'react';
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/skelton/PageLoader";
import AuthProvider from "@/components/customer/authenticate/AuthProvider";
import SignInDialog from "@/components/SignInDialog";
import { NotificationProvider } from "@/components/context/NotificationContext";
import { SignInDialogProvider } from "@/components/context/SignInDialog";
import { LoaderProvider } from "@/components/context/PageLoaderContext";
import { ProgressBar } from "@/components/context/progress-bar";

export const metadata: Metadata = {
  title: "M2 Headless Commerce",
  description: "Fast and lightning experience",
  icons: {
    icon: ["/icon/favicon.ico"]
  }
};
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProgressBar className="fixed top-0 h-1 bg-primary" >
          <AuthProvider>
            <LoaderProvider>
              <PageLoader />
              <NotificationProvider>
                <PageLoader />
                <SignInDialogProvider>
                  <SignInDialog />
                  <Header />
                  <Suspense>
                    <main>{children}</main>
                  </Suspense>
                  <Footer />
                </SignInDialogProvider>
              </NotificationProvider>
            </LoaderProvider>
          </AuthProvider>
        </ProgressBar>
      </body>
    </html>
  );
}
