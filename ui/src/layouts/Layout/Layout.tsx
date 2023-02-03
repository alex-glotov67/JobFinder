import React from 'react';

import Header from '../../layouts/Header/Header';
import Navigation from '../../layouts/Navigation/Navigation';
import Footer from '../../layouts/Footer/Footer';
import { Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { routes } from '../../configs/routes.config';
import { ExtendedRouteProps } from '../../types/interfaces/Route';
import { MobileNav } from '../../layouts/Navigation/MobileNav';
import { RouteWithSubRoutes } from '../../features/Routes/Routes';

import 'react-toastify/dist/ReactToastify.css';
import './Layout.scss';

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <div className="app-container">
        <Header>
          <Navigation />
        </Header>
        <Switch>
          {routes.list.map((route: ExtendedRouteProps, i: number) => (
            <RouteWithSubRoutes key={i + route.path} {...route} />
          ))}
        </Switch>
        <ToastContainer />
        {location.pathname !== '/' && <MobileNav />}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
