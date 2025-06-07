import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Link from "next/link";

const items = [
	{
    title: "Main",
    url: "/dashboard",
  },
  {
    title: "Users",
    url: "/admin/dashboard/users",
  },
  {
    title: "Products",
    url: "/admin/dashboard/products",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Dashboard</SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup>
          <Button>Logout</Button>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
