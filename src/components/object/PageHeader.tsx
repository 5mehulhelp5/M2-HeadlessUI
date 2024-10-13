import React from 'react';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="py-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
    </div>
  );
};

export default PageHeader;
