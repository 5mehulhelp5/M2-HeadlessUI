'use client'

import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { ProgressBarLink } from './context/progress-bar'
import magenntoGraphQl from "@/lib/magento/graphQl/magentoGraphQl";
import category from "@/lib/magento/queries/category";

interface NavItem {
  id: number
  name: string
  url_path: string
  children_count: number
  children: NavItem[]
  level: number
}
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
const SkeletonLoader = () => {
  return (
    <>
      <div className="container mx-auto lg:flex hidden">
        <ul className="flex justify-center gap-4 py-4 text-lg font-semibold text-gray-800">
          {[...Array(6)].map((_, index) => (
            <li
              key={index}
              className="py-2 px-4 rounded-md animate-pulse w-[120px] h-[40px] bg-gray-300"
            />
          ))}
        </ul>
      </div>
      <div className="lg:hidden">
        <Menu className="block h-8 w-8 text-black" />
      </div>
    </>
  )
};
// MobileChild component to handle rendering children items in the mobile menu
function MobileChild({ item, activeDropdown, setMobileMenuOpen }: { item: NavItem, activeDropdown: number | null, setMobileMenuOpen: (open: boolean) => void }) {
  const [activeChildDropdown, setActiveChildDropdown] = useState<number | null>(null)

  return (
    <AnimatePresence>
      {item.children.length > 0 && item.id === activeDropdown && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 border-primary"
          transition={{ type: "tween", duration: 0.4 }}
        >
          {item.children.map((child) => (
            <div key={child.id}>
              {child.children_count > 0 ? (
                <div className="flex flex-row justify-between pl-8 pr-4 py-3 border-b text-base font-medium text-gray-700 hover:text-primary hover:bg-indigo-50">
                  <ProgressBarLink
                    onClick={() => setMobileMenuOpen(false)}
                    href={`/${child.url_path}`}
                    className="block"
                  >
                    {child.name}
                  </ProgressBarLink>
                  <button
                    onClick={() => setActiveChildDropdown(activeChildDropdown === child.id ? null : child.id)}
                    className="border-2 px-2 rounded-lg"
                  >
                    <ChevronDown className={`w-5 h-5 text-black transition-transform duration-300 ${child.id === activeChildDropdown ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              ) : (
                <ProgressBarLink
                  onClick={() => setMobileMenuOpen(false)}
                  href={`/${child.url_path}`}
                  className="block pl-12 pr-4 py-3 border-b text-base font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-50"
                >
                  {child.name}
                </ProgressBarLink>
              )}
              {child.children_count > 0 && (
                <MobileChild item={child} activeDropdown={activeChildDropdown} setMobileMenuOpen={setMobileMenuOpen} />
              )}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function DynamicNavbar({ navItems = [] }: { navItems?: NavItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  // Use useMediaQuery to determine if the screen is large (desktop view)
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

  const toggleDropdown = (id: number) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  return (
    <>
      <nav className="container mx-auto">
        {isDesktop ? (
          <div className="flex">
            {navItems?.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.children?.length > 0 ? (
                  <button className="inline-flex items-center py-2 px-4 rounded-md font-bold hover:bg-primary hover:text-white transition-colors duration-200">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <ProgressBarLink
                    href={`/${item.url_path}`}
                    className="inline-flex items-center py-2 px-4 rounded-md font-bold hover:bg-primary hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </ProgressBarLink>
                )}
                <AnimatePresence>
                  {item.children?.length > 0 && hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 md:px-0 lg:ml-0 lg:-translate-x-1/2"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 md:gap-8 md:p-8">
                          {item.children.map((child) => (
                            <ProgressBarLink
                              key={child.id}
                              href={`/${child.url_path}`}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                            >
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{child.name}</p>
                              </div>
                            </ProgressBarLink>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="-mr-2 flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md  focus:outline-none transition-transform duration-300"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ?  <X className="block h-7 w-7 text-black" /> : <Menu className="block h-7 w-7 text-black" />}
              </button>
            </div>
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  className="absolute bg-white w-full z-[1000] left-0 top-[70px] min-h-dvh"
                  transition={{ type: "tween", duration: 0.5 }}
                >
                  <div className="container mx-auto pt-2 pb-3">
                    {navItems?.map((item) => (
                      <div key={item.id}>
                        {item.children.length > 0 ? (
                          <div className="flex flex-row justify-between pl-3 pr-4 py-3 text-medium border-b font-medium text-black hover:text-primary hover:bg-indigo-50">
                            <ProgressBarLink
                              onClick={() => setMobileMenuOpen(false)}
                              href={`/${item.url_path}`}
                              className="block"
                            >
                              {item.name}
                            </ProgressBarLink>
                            <button
                              onClick={() => toggleDropdown(item.id)}
                              className="border-2 px-2 rounded-lg hover:border-primary"
                            >
                              <ChevronDown className={`w-5 h-5 text-black transition-transform duration-300 hover:text-primary ${item.id === activeDropdown ? 'rotate-180 ' : ''}`} />
                            </button>
                          </div>
                        ) : (
                          <ProgressBarLink
                            href={`/${item.url_path}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block pl-3 pr-4 py-3 text-base font-medium text-black border-b hover:text-indigo-700 hover:bg-indigo-50 hover:border-indigo-500"
                          >
                            {item.name}
                          </ProgressBarLink>
                        )}
                        <MobileChild item={item} activeDropdown={activeDropdown} setMobileMenuOpen={setMobileMenuOpen} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </nav>
    </>
  )
}

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
      console.log(JSON.stringify(response.data.categories.items));
    };
    if (isHydrated) {
      fetchData();
    }

    return () => clearTimeout(timeout);
  }, [isHydrated]);


  return (
    <div className="w-max main-header lg:order-2 order-1">
      {menuData.categories.items.length === 0 ? (

        <SkeletonLoader />
      ) : (
        <DynamicNavbar navItems={menuData.categories.items} />
      )}
    </div>
  );
};

export default Navbar;
