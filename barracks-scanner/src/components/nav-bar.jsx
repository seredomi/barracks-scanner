import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Content, HeaderContainer, Header, HeaderName, SideNavItems, SideNav, SideNavLink } from '@carbon/react';
import { Outlet } from 'react-router-dom';
import { ScanBarcode, User, History } from 'lucide-react';


export function NavBar(props) {
    const handleIdScannerClick = () => { props.setSelected('id-scanner'); }
    const handlePersonnelClick = () => { props.setSelected('personnel'); }
    const handleScanHistoryClick = () => { props.setSelected('scan-history'); }

    return (
        <SideNav
            isFixedNav
            expanded={true}
            isChildOfHeader={false}
            aria-label="Side navigation"
        >
            <SideNavItems>
                <SideNavLink
                    isActive={props.selected === 'id-scanner'}
                    onClick={handleIdScannerClick}
                    renderIcon={ScanBarcode} large >
                    ID Scanner
                </SideNavLink>
                <SideNavLink
                    isActive={props.selected === 'personnel'} 
                    onClick={handlePersonnelClick}
                    renderIcon={User} large >
                    Personnel
                </SideNavLink>
                <SideNavLink
                    isActive={props.selected === 'scan-history'} 
                    onClick={handleScanHistoryClick}
                    renderIcon={History} large >
                    Scan History
                </SideNavLink>
            </SideNavItems>
        </SideNav>
    )
}