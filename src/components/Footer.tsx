"use client";

import React, { useEffect, useState } from 'react';
import { ProgressBarLink } from "@/components/context/progress-bar";
import magentoGraphQl from '@/lib/magento/graphQl/magentoGraphQl';

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

const nameofCompany = process.env.M2_COMPANY_NAME || 'Magento';

const Footer: React.FC = () => {
  const [links, setLinks] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    // Simulate delayed hydration with setTimeout
    const timeout = setTimeout(() => {
      setIsHydrated(true);
    }); // Adjust delay as needed (500ms in this case)

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

  if (!isHydrated) {
    return null;
  }

  return (
    <footer>
      <div className="bg-primary">
        <div className="container m-auto py-8 px-10">
          <div className="text-center">
            <h2 className="sm:text-3xl text-2xl text-white font-semibold">Magento With Next JS UI</h2>
            <p className="text-white mt-2 text-sm">
              Headless eCommerce: Seamless shopping experience with integrated backend.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 text-black py-8 transition-all ease-in duration-150">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex flex-col items-center">
              <h5 className="text-lg font-semibold">{nameofCompany}</h5>
              <p className="text-sm">© 2024 All rights reserved.</p>
            </div>
            <div className="flex sm:space-x-4 sm:flex-row flex-col items-center">
              {loading ? (
                <div className="space-y-2">
                  {/* Skeleton loaders for links */}
                  <div className="h-4 w-24 bg-gray-300 animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-300 animate-pulse"></div>
                  <div className="h-4 w-28 bg-gray-300 animate-pulse"></div>
                </div>
              ) : (
                links.map((item, index) => (
                  <ProgressBarLink key={index} className="!mt-0 text-black hover:text-primary" href={`/${item.identifier == 'home' ? '' : item.identifier}`}>
                    {item.title}
                  </ProgressBarLink>
                ))
              )}
              <ProgressBarLink className="!mt-0 text-black hover:text-primary" href="/admin/login">Admin</ProgressBarLink>
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="text-black hover:text-primary">Facebook</a>
            <a href="#" className="text-black hover:text-primary">Twitter</a>
            <a href="#" className="text-black hover:text-primary">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
