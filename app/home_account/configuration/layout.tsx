"use client";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/app/home_account/configuration/ui/sidebar/components/sidebar";
import { AppSidebar } from "@/app/home_account/configuration/ui/sidebar/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </div>
  );
}
