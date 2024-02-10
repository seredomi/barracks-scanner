import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Content, HeaderContainer, Header, HeaderName, SideNavItems, SideNav, SideNavLink } from '@carbon/react';
import { Outlet } from 'react-router-dom';
import { ScanBarcode, User, History } from 'lucide-react';

function Title() {
    return (
        <Header aria-label="Window Header">
            <HeaderName prefix="6070">
                Barracks Personnel Identifier
            </HeaderName>
        </Header>
    )

}

function NavBar() {
    return (
        <SideNav
            isFixedNav
            expanded={true}
            isChildOfHeader={false}
            aria-label="Side navigation"
        >
            <SideNavItems>
                <SideNavLink renderIcon={ScanBarcode} href="/main_window/id-scanner" large>ID Scanner</SideNavLink>
                <SideNavLink renderIcon={User} href="/main_window/personnel" large>Personnel</SideNavLink>
                <SideNavLink renderIcon={History} href="/main_window/scan-history" large>Scan History</SideNavLink>
            </SideNavItems>
        </SideNav>
    )
}
export default function RootPage() {
    return (
        <>
            <Title />
            <NavBar />
            <Outlet />
        </>
    )
}