import React from 'react';
import Link from 'next/link';
const Footer: React.FC = () => {
  return (
    <footer>
      <div className="bg-primary">
        <div className="container m-auto py-8 px-10">
          <div className="text-center">
            <h2 className="sm:text-3xl text-2xl text-white font-semibold">Magento With Next JS UI</h2>
            <p className="text-white mt-2 text-sm">Headless eCommerce: Seamless shopping experience with integrated backend.</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 text-black py-8 transition-all ease-in duration-150">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex flex-col items-center">
              <h5 className="text-lg font-semibold">{process.env.M2_COMPANY_NAME}</h5>
              <p className="text-sm">© 2024 All rights reserved.</p>
            </div>
            <div className="flex sm:space-x-4 sm:flex-row flex-col items-center">
              <a href="#" className="text-black hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-black hover:text-primary">Terms of Service</a>
              <a href="#" className="text-black hover:text-primary">Contact Us</a>
              <Link className="!mt-0 text-black hover:text-primary" href="/admin/login">Admin</Link>
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
