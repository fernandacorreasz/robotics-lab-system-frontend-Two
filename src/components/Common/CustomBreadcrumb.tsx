import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { routeNames } from '../../routes/AppRoutes';

const CustomBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumb style={{ margin: '16px' }}>
      {pathnames.length > 0 ? (
        <Breadcrumb.Item key="home">
          <Link to="/admin/dashboard">Home</Link>
        </Breadcrumb.Item>
      ) : null}

      {pathnames.map((path, index) => {
        const url = `/${pathnames.slice(0, index + 1).join('/')}`;
        const routeName = routeNames[url] || path;
        const isLast = index === pathnames.length - 1;

        return (
          <Breadcrumb.Item key={url}>
            {isLast ? (
              <span>{routeName}</span>
            ) : (
              <Link to={url}>{routeName}</Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
