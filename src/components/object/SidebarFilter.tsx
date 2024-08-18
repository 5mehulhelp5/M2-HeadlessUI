import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid';
import { SidebarFilterProps, FilterCategories } from '@/lib/types';
import { decode } from 'html-entities';
interface FilterState {
    [key: string]: string[];
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ filters, setSidebarFilter }) => {
    return (
        <div className="p-4">
            <div className="layered-title mb-4"><h4>Shopping Options</h4></div>
            {filters.map((filter) => (
                <FilterCategory
                    key={filter.attribute_code}
                    filter={filter}
                    handleFilterChange={setSidebarFilter}
                />
            ))}
        </div>
    );
};

const FilterCategory: React.FC<{ filter: FilterCategories; handleFilterChange: any }> = ({ filter, handleFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    function makeFilter(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const selectedValue: string = target.value;
        const isChecked: boolean = target.checked;
        const filterName: string = target.name;

        handleFilterChange((prevFilters: FilterState): FilterState => {
            // Ensure prevFilters is defined and filterName is valid
            if (!prevFilters) {
                prevFilters = {};
            }

            const currentValues: string[] = prevFilters[filterName] || [];
            let updatedValues: string[];

            if (!isChecked) {
                // If the checkbox is unchecked, remove the value from the filter
                updatedValues = currentValues.filter(value => value !== selectedValue);
            } else {
                // If the checkbox is checked, add the value to the filter
                updatedValues = [...currentValues, selectedValue];
            }

            return {
                ...prevFilters,
                [filterName]: updatedValues
            };
        });
    }



    return (
        <div className="mt-2 pb-2 border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left font-semibold text-gray-800 flex justify-between items-center"
                aria-expanded={isOpen}
                aria-controls={`filter-options-${filter.attribute_code}`}
            >
                {decode(filter.label)} ({filter.count})
                <ChevronDoubleDownIcon
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`}
                />
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
                <ul id={`filter-options-${filter.attribute_code}`} className="mt-2 space-y-1">
                    {filter.options.map((option) => (
                        <li key={option.value}>
                            <label className="inline-flex items-center text-gray-700">
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    className="form-checkbox"
                                    name={filter.attribute_code}
                                    onChange={makeFilter}
                                />
                                <span className="ml-2">{decode(option.label)}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </Transition>
        </div>
    );
};

export default SidebarFilter;
