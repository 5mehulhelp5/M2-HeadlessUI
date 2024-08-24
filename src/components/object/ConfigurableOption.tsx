import React from 'react';
import { ConfigurableOptionsProps } from '@/lib/types';

const ConfigurableOptions: React.FC<ConfigurableOptionsProps> = ({ options, isProductPage }) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      {options.map((option) => (
        <>
          {isProductPage && (
            <div className="border-dashed border border-primary"></div>
          )}
          <div key={option.id} className="w-full">
            <p className="font-medium mb-2">{option.label}</p>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <label key={value.value_index} className="cursor-pointer">
                  <input
                    type="radio"
                    name={option.attribute_code}
                    value={value.value_index}
                    className="sr-only peer"
                  />
                  {value.swatch_data.__typename === 'ColorSwatchData' ? (
                    <div
                      className="w-10 h-10 rounded-full border-2 border-gray-200 peer-checked:border-primary"
                      style={{ backgroundColor: value.swatch_data.value }}
                    ></div>
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center border-2 border-gray-200 rounded-md peer-checked:border-primary">
                      <span className="text-sm font-medium">{value.label}</span>
                    </div>
                  )}
                </label>
              ))}
            </div>

          </div>
        </>
      ))}
    </div >
  );
};

export default ConfigurableOptions;
