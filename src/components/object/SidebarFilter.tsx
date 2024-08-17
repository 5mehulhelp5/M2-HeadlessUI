import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid';
import { SidebarFilterProps,FilterCategories } from '@/lib/types';


const SidebarFilter: React.FC<SidebarFilterProps> = ({ filters }) => {
    return (
        <div className="p-4">
            {filters.map((filter) => (
                <FilterCategory key={filter.attribute_code} filter={filter} />
            ))}
        </div>
    );
};

const FilterCategory: React.FC<{ filter: FilterCategories }> = ({ filter }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-2 pb-2 border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left font-semibold text-gray-800 flex justify-between items-center"
            >
                {filter.label} ({filter.count})
                <ChevronDoubleDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`} />
            </button>
            <Transition
                show={isOpen}
                enter="transition-all duration-300"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-screen"
                leave="transition-all duration-300"
                leaveFrom="opacity-100 max-h-screen"
                leaveTo="opacity-0 max-h-0"
            >
                <ul className="mt-2 space-y-1">
                    {filter.options.map((option) => (
                        <li key={option.value}>
                            <label className="inline-flex items-center text-gray-700">
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    className="form-checkbox"
                                    name={filter.attribute_code}
                                />
                                <span className="ml-2">{option.label}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </Transition>
        </div>
    );
};

export default SidebarFilter;
