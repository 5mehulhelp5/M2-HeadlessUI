"use client";
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { ProgressBarLink } from "@/components/context/progress-bar";
import magenntoGraphQl from "@/lib/magento/graphQl/magentoGraphQl";
import category from "@/lib/magento/queries/category";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";

type MenuItem = {
  id: number;
  url_path: string;
  name: string;
  children_count: number;
  children: MenuItem[];
  level: number;
};

type NavbarProps = {
  menuData: {
    items: MenuItem[];
  };
};

// Skeleton Loader Component
const SkeletonLoader = () => (
  <nav className="container mx-auto">
    <ul className="flex relative z-20 justify-center gap-4 py-4 text-lg font-semibold text-gray-800">
      <li className="py-2 px-4 rounded-md animate-pulse w-[120px] h-[40px]" />
      <li className="py-2 px-4 rounded-md animate-pulse w-[120px] h-[40px]" />
      <li className="py-2 px-4 rounded-md animate-pulse w-[120px] h-[40px]" />
      <li className="py-2 px-4 rounded-md animate-pulse w-[120px] h-[40px]" />
      <li className="py-2 px-4 rounded-md animate-pulse w-[120px] h-[40px]" />
      <li className="py-2 px-4 rounded-md animate-pulse w-[120px] h-[40px]" />
    </ul>
  </nav>
);

// Recursive component for displaying subcategories
const MenuLastChildItems: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  return (
    <ul className="bg-white flex flex-col gap-4">
      {items.map((item) => (
        <li
          className="hover:bg-primary hover:text-white p-2 font-medium rounded-md transition-all duration-200"
          key={item.id}
        >
          <ProgressBarLink href={`/${item.url_path}`} className="block">
            {item.name}
          </ProgressBarLink>

          {item.children_count > 0 && (
            <ul className="bg-white p-2 shadow-lg rounded-lg">
              <MenuLastChildItems items={item.children} />
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

// Component for displaying child categories
const MenuChildItems: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.id} className="group flex flex-col gap-8">
          <ProgressBarLink
            href={`/${item.url_path}`}
            className="block font-semibold text-gray-700 hover:text-primary transition-colors duration-200"
          >
            {item.name}
          </ProgressBarLink>

          {item.children_count > 0 && (
            <div className="transition-all ease-out duration-300 hidden group-hover:block">
              <MenuLastChildItems items={item.children} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Main menu component for top-level categories
const MenuItems: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const pathname = usePathname()
  const path = pathname.split("/")[1];
  return (
    <ul className="flex relative z-20 justify-center gap-4 py-4 text-lg font-semibold text-gray-800">
      {items.map((item) => {
        const isActive = path === item.url_path;
        return (
          <li
            className={`group py-2 px-4 rounded-md hover:bg-primary hover:text-white transition-colors duration-200 ${item.children_count > 0 ? "inline-block" : ""}  ${isActive ? "border-b-2 border-primary" : ""}`}
            key={item.id}
            onMouseEnter={() => setIsOpen(item.id)}
            onMouseLeave={() => setIsOpen(null)}
          >
            <div className="flex items-center">
              <ProgressBarLink href={`/${item.url_path}`} className="flex flex-row items-center">
                {item.name}
                {item.children_count > 0 && (
                  <span className="ml-2 transform transition-transform duration-200 group-hover:rotate-180">
                    <ChevronDownIcon className="w-5 h-5" />
                  </span>
                )}
              </ProgressBarLink>
            </div>

            {item.children_count > 0 && (
              <Transition
                show={isOpen === item.id}
                enter="transition-all ease-in-out duration-500 transform"
                enterFrom="-translate-y-10 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition-all ease-in-out duration-400 transform"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="-translate-y-10 opacity-0"
              >
                <div className="absolute left-0 top-full w-full p-6 bg-white text-black shadow-lg rounded-lg flex flex-col z-30">
                  <MenuChildItems items={item.children} />
                </div>
              </Transition>
            )}
          </li>
        )
      })}
    </ul>
  );
};

const MagentoNavbar: React.FC<NavbarProps> = ({ menuData }) => {
  return (
    <nav className="container mx-auto">
      <MenuItems items={menuData.items} />
    </nav>
  );
};

const Navbar = () => {
  const [menuData, setMenuData] = useState<{ categories: { items: MenuItem[] } }>({ categories: { items: [] } });
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHydrated(true);
    });
    const fetchData = async () => {
      const response: any = await magenntoGraphQl(
        "",
        "category-menu",
        category({ ids: [2], pageSize: 10, currentPage: 1 }),
        {}
      );
      setMenuData({ categories: response.data.categories });
    };
    if (isHydrated) {
      fetchData();
    }

    return () => clearTimeout(timeout);
  }, [isHydrated]);

  return (
    <div className="w-full main-header">
      {menuData.categories.items.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <MagentoNavbar menuData={menuData.categories} />
      )}
    </div>
  );
};

export default Navbar;
