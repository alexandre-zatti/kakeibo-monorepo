'use client';

import { PackageIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import React from 'react';

const items = [
  {
    title: 'Products',
    url: '/products',
    icon: PackageIcon,
  },
];

export function AppSidebar() {
  const { isMobile, toggleSidebar } = useSidebar();

  function closeOnNavigateIfMobile() {
    if (isMobile) {
      toggleSidebar();
    }
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader>Kekaibo</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Groceries</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} onClick={closeOnNavigateIfMobile}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger />
    </>
  );
}
