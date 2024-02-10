import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Content, HeaderContainer, Header, HeaderName, SideNavItems, SideNav, SideNavLink } from '@carbon/react';
import { Outlet } from 'react-router-dom';
import { ScanBarcode, User, History } from 'lucide-react';

function Title() {
    return (
        <Header aria-label="Window Header" className="globalHeader">
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
                <SideNavLink renderIcon={ScanBarcode} aref="id-scanner" large isActive={true}>ID Scanner</SideNavLink>
                <SideNavLink renderIcon={User} aref="personnel" large>Personnel</SideNavLink>
                <SideNavLink renderIcon={History} aref="scan-history" large>Scan History</SideNavLink>
            </SideNavItems>
        </SideNav>
    )
}
export default function RootPage() {
    return (
        <>
            <Title />
            <NavBar />
            <Content>
                <Outlet />
            </Content>
        </>
    )
}