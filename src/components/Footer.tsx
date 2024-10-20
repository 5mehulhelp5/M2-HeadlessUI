"use client";

import React, { useEffect, useState } from 'react';
import { ProgressBarLink } from "@/components/context/progress-bar";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import magentoGraphQl from '@/lib/magento/graphQl/magentoGraphQl';
import PaymentIcon from '@/components/PaymentIcon';
import Image from 'next/image';

const linkQuery = `query GetCmsPages($is_active: Boolean!) {
  getCmsPages(is_active: $is_active) {
    identifier
    title
  }
}`;

interface CmsPage {
  identifier: string;
  title: string;
}



const Footer: React.FC = () => {
  const [links, setLinks] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [storeName, setStoreName] = useState<string | null>();
  useEffect(() => {
    // Simulate delayed hydration with setTimeout
    const timeout = setTimeout(() => {
      setIsHydrated(true);
    }); // Adjust delay as needed (500ms in this case)

    setStoreName(process.env.M2_COMPANY_NAME || 'Magento');
    const fetchLinks = async () => {
      try {
        const result = await magentoGraphQl('', 'GetCmsLink', linkQuery, { is_active: true });
        setLinks(result.data.getCmsPages);
      } catch (error) {
        console.error('Error fetching CMS pages:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isHydrated) {
      fetchLinks();
    }

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [isHydrated]);



  return (
    <>
      <div className="bg-primary">
        <div className="container m-auto py-8 px-10">
          <div className="text-center">
            <h2 className="sm:text-3xl text-2xl text-white font-semibold">Welcome to {storeName} with Next.js</h2>
            <p className="text-white mt-2 text-sm">
              Experience the future of eCommerce with our headless architecture and seamless integration.
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-gray-300 text-black py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div className="space-y-4">
            <div><ProgressBarLink href="/">
              <Image src="/logo/logo_hd.png"
                title="logo"
                className="w-[8rem]"
                alt="Magento Headless Commerce"
                width={700}
                height={400}
              />
            </ProgressBarLink></div>
            <div className="flex items-center space-x-2">
              <span className="material-icons"><PhoneIcon className='w-5 h-5' /></span>
              <a href="tel:+918141245978" className="text-black">+91-8141245978</a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-icons"><EnvelopeIcon className='w-5 h-5' /></span>
              <a href="mailto:darshilmodi8141@gmail.com" className="text-black">darshilmodi8141@gmail.com</a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-icons"><MapPinIcon className='w-5 h-5' /></span>
              <span>Ahmedabad, Gujarat (380014)</span>
            </div>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="font-bold mb-3 text-primary">Information</h3>
            <ul className="space-y-2">
              <li>My Account</li>
              <li>My Cart</li>
              <li>My Wishlist</li>
              <li>Checkout</li>
            </ul>
          </div>

          {/* Service Section */}
          <div>
            <h3 className="font-bold mb-3 text-primary">Service</h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Delivery Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h3 className="font-bold mb-3 text-primary">Subscribe</h3>
            <p className="mb-4">Enter your email below to be the first to know about new collections and product launches.</p>
            <form className="flex items-center border border-black bg-white rounded-xl overflow-hidden">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 w-full text-black border-none focus:border-none focus:ring-0"
              />
              <button
                type="submit"
                className="bg-primary text-white px-5 py-3 flex-shrink-0"
              >
                <ArrowRightIcon className='w-5 h-5' />
              </button>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 container mx-auto px-4 border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <PaymentIcon type="visa" className="w-10 h-10" />
            <PaymentIcon type="mastercard" className="w-10 h-10" />
            <PaymentIcon type="gpay" className="w-10 h-10" />
            <PaymentIcon type="amex" className="w-10 h-10" />
            <PaymentIcon type="paypal" className="w-10 h-10" />
          </div>
          <p className="text-gray-500 text-sm">©2023 {storeName} All Rights are reserved</p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" target='_blank' className="text-white">
              <PaymentIcon type="facebook" className="w-6 h-6" />
            </a>
            <a href="https://x.com/" target='_blank' className="text-white">
              <PaymentIcon type="twitter" className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/" target='_blank' className="text-white">
              <PaymentIcon type="instagram" className="w-6 h-6" />

            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
