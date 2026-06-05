import React from 'react';

import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <div className="flex items-center">
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;