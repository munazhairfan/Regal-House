import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarTrigger,
  } from "@/components/ui/sidebar"
  
  export function AppSidebar() {
    return (
      <Sidebar className="font-poppins">
          <SidebarTrigger label="x" className="size-6 ml-auto"/>
        <SidebarHeader />
        <SidebarContent className="p-9 text-2xl underline">
          Categories
          <SidebarGroup className=""/>
          <ul className="text-xl leading-[80px] bg-slate-200 pl-3">
            <li><a href={'/shop/Chair'}>Chair</a></li>
            <li><a href={'/shop/Bed'}>Bed</a></li>
            <li><a href={'/shop/Table'}>Table</a></li>
            <li><a href={'/shop/Sofa'}>Sofa</a></li>
            <li><a href={'/shop/Desk'}>Desk</a></li>
          </ul>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  