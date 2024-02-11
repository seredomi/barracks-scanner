import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Content, HeaderContainer, Header, HeaderName, SideNavItems, SideNav, SideNavLink } from '@carbon/react';
import { ScanBarcode, User, History } from 'lucide-react';


export function NavBar(props) {

    const handleIdScannerClick = () => { props.setPage('id-scanner'); }
    const handlePersonnelClick = () => { props.setPage('personnel'); }
    const handleScanHistoryClick = () => { props.setPage('scan-history'); }

    return (
        <SideNav
            isFixedNav
            expanded={true}
            isChildOfHeader={false}
            aria-label="Side navigation"
        >
            <SideNavItems>
                <SideNavLink
                    isActive={props.page === 'id-scanner'}
                    onClick={handleIdScannerClick}
                    renderIcon={ScanBarcode} large >
                    ID Scanner
                </SideNavLink>
                <SideNavLink
                    isActive={props.page === 'personnel'} 
                    onClick={handlePersonnelClick}
                    renderIcon={User} large >
                    Personnel
                </SideNavLink>
                <SideNavLink
                    isActive={props.page === 'scan-history'} 
                    onClick={handleScanHistoryClick}
                    renderIcon={History} large >
                    Scan History
                </SideNavLink>
            </SideNavItems>
        </SideNav>
    )
}