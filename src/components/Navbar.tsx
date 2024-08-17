"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import magenntoGraphQl from '@/lib/magento/graphQl/magentoGraphQl';
import category from '@/lib/magento/queries/category';
// Define the type for the menuData prop
type MenuItem = {
  id: number;
  url_path: string;
  name: string;
  children_count: number;
  children: MenuItem[];
  level: number;
};
type Category = {
  id: number;
  uid: string;
  level: number;
  image: string | null;
  include_in_menu: number;
  name: string;
  path: string;
  url_path: string;
  url_key: string;
  position: number;
  children_count: string;
  children: Category[];
};
type NavbarProps = {
  menuData: {
    items: MenuItem[];
  };
};
interface FetchNavbar {
  categories: {
    items: MenuItem[];
  };
}
// Recursive function to render menu items and their children with Tailwind CSS
const renderMenuItems = (items: MenuItem[]) => {
  return items.map((item) => (
    <li className={`hover:border-primary border-b-2 border-transparent ${item.children_count > 0 ? 'group inline-block' : 'false'}`}
      key={item.id}
    >
      <Link legacyBehavior key={item.id} href={{
        pathname: `/${item.url_path}`
      }} className={`boutline-none focus:outline-none  py-3 rounded-sm flex items-center hover:text-primary font-semibold hover:underline`}>
        <a>{item.name}</a>
      </Link>

      {item.children_count > 0 && (
        <ul
          className={`bg-gray-100 box-shadow transform  hidden group-hover:opacity-100 absolute transition duration-150 ease-in-out origin-top w-max py-2 px-2 group-hover:flex flex-col`}
        >
          {renderMenuChildItems(item.children)}
        </ul>
      )}
    </li>
  ));
};
const renderMenuChildItems = (items: MenuItem[]) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  return items.map((item) => (
    <li className={`rounded-sm relative group p-2 hover:bg-gray-100'`}
      key={item.id}
      onMouseEnter={() => setHoverIndex(item.id)}
      onMouseLeave={() => setHoverIndex(0)}
    >
      <Link legacyBehavior key={item.id} href={`/${item.url_path}`} className={`font-semibold block hover:text-primary hover:underline`}>
        <a>{item.name}</a>
      </Link>
      {item.children_count > 0 && (
        <ul className={`absolute bg-gray-100 left-[88px] p-2 w-max top-0 transition duration-150 ease-in-out origin-top-left py-2 px-2 ${item.id == hoverIndex ? 'scale-100' : 'scale-0'}`}> {/* Add appropriate Tailwind CSS classes here */}
          {renderMenuLastChildItems(item.children)}
        </ul>
      )}
    </li>
  ));
};
const renderMenuLastChildItems = (items: MenuItem[]) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  return items.map((item) => (
    <li className='px-3 py-1 hover:bg-gray-100 font-medium hover:text-primary'
      key={item.id} // Ensure each item has a unique key
      onMouseEnter={() => setHoverIndex(item.id)}
      onMouseDown={() => setHoverIndex(item.id)}
      onMouseLeave={() => setHoverIndex(0)}
    >
      <Link legacyBehavior key={item.id} href={`/${item.url_path}`}>
        <a>{item.name}</a>
      </Link>

      {item.children_count > 0 && (
        <ul className={`dropdown-container absolute bg-gray-100 left-[88px] p-2 w-max top-0 transition duration-150 ease-in-out origin-top-left py-2 px-2 ${item.id == hoverIndex ? 'scale-100' : 'scale-0'}`}> {/* Add appropriate Tailwind CSS classes here */}
          {renderMenuLastChildItems(item.children)}
        </ul>
      )}
    </li>
  ))
};

const MagentoNavbar: React.FC<NavbarProps> = ({ menuData }) => {

  return (
    <nav className="container mx-auto fixed left-0 top-0 py-7 z-10 w-full hidden h-screen transition-all md:relative md:max-h-0 md:flex md:items-center">
      <ul className="pt-4 text-base lg:text-md text-gray-950 md:flex-row md:pt-0 md:px-0 flex justify-center  gap-[20px] lg:gap-[30px] ">
        {menuData?.items?.length
          ? renderMenuItems(menuData.items)
          : 'Loading...'}
      </ul>
    </nav>
  );
};


const Navbar = () => {
  const [menuData, setMenuData] = useState<FetchNavbar>({ categories: { items: [] } });

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await magenntoGraphQl('','', category({ ids: [2], pageSize: 10, currentPage: 1 }), {});
      // Fetch menu data from your API
      setMenuData({ categories: response.data.categories });
    };
    fetchData();
  }, []);

  return (
    <div className='w-full main-header bg-gray-100'>
      <MagentoNavbar menuData={menuData.categories || []} />
    </div>
  );
}

export default Navbar;
