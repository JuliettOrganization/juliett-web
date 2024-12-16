'user client';
import { Building2, Network, Plane, Route } from "lucide-react"
// import { Globe, Send, Building2, Route } from "lucide-react"

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
  SidebarMenuAction

} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Agency Grouping",
    url: "/home_account/configuration/agencygrouping",
    icon: Building2,
  },
  {
    title: "Class Mapping",
    url: "/home_account/configuration/classmapping",
    icon: Network,
  },
  {
    title: "Airline Groupings",
    url: "/home_account/configuration/airlinegrouping",
    icon: Plane,
  },
  {
    title: "Geographical Groupings",
    url: "/home_account/configuration/geogrouping",
    icon: Route,
  },

]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" >
        <SidebarHeader>_____</SidebarHeader>
        <SidebarHeader>_____</SidebarHeader>
        {/* <SidebarHeader></SidebarHeader> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Configuration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {/* <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" /> */}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
