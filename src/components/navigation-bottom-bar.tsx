"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  Sparkles,
  ShoppingCart,
  User,
} from "lucide-react";

const NavigationBottomBar = () => {
  const currentRoute = usePathname();

  const menuItems = [
    { href: "/dashboard/meal-plans", icon: CalendarCheck },
    { href: "/dashboard/chats", icon: Sparkles },
    { href: "/dashboard/shopping-lists", icon: ShoppingCart },
    { href: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 max-w-md mx-auto border-t border-x bg-white
                  border-t-indigo-300 border-x-indigo-200 flex items-center bg-slate-white z-50">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentRoute === item.href;

        return (
          <Link key={item.href} href={item.href} className="w-1/4 h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
              <div className={`p-4 rounded-full ${isActive ? 'bg-custom shadow-md' : ''}`}>
                <Icon className={isActive ? "text-white" : "text-slate-600"} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationBottomBar;
