"use client";

import React from "react";
import NavigationTopBar from "@/components/navigation-top-bar";
import NavigationBottomBar from "@/components/navigation-bottom-bar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="size-full">
      <NavigationTopBar />
      {children}
      <NavigationBottomBar />
    </div>
  );
};

export default Layout;
