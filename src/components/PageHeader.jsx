import React from 'react';

const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
};

export default PageHeader;
