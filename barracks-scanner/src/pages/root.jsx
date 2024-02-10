import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Content, HeaderContainer, Header, HeaderName, SideNavItems, SideNav, SideNavLink } from '@carbon/react';
import { Outlet } from 'react-router-dom';
import { ScanBarcode, User, History } from 'lucide-react';

function Title() {
    const buildingNo = useState(6070);
    return (
        <Header aria-label="Window Header" className="globalHeader">
            <HeaderName prefix={buildingNo}>
                Barracks Personnel Identifier
            </HeaderName>
        </Header>
    )

}

function NavBar() {
    const [selected, setSelected] = useState('id-scanner');
    const handleIdScannerClick = () => { setSelected('id-scanner'); }
    const handlePersonnelClick = () => { setSelected('personnel'); }
    const handleScanHistoryClick = () => { setSelected('scan-history'); }

    return (
        <SideNav
            isFixedNav
            expanded={true}
            isChildOfHeader={false}
            aria-label="Side navigation"
        >
            <SideNavItems>
                <SideNavLink
                    isActive={selected === 'id-scanner'}
                    onClick={handleIdScannerClick}
                    renderIcon={ScanBarcode} large >
                    ID Scanner
                </SideNavLink>
                <SideNavLink
                    isActive={selected === 'personnel'} 
                    onClick={handlePersonnelClick}
                    renderIcon={User} large >
                    Personnel
                </SideNavLink>
                <SideNavLink
                    isActive={selected === 'scan-history'} 
                    onClick={handleScanHistoryClick}
                    renderIcon={History} large >
                    Scan History
                </SideNavLink>
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