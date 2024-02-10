import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Content, HeaderContainer, Header, HeaderName, SideNavItems, SideNav, SideNavLink } from '@carbon/react';
import { ScanBarcode, User, History } from 'lucide-react';
import { createRoot } from 'react-dom/client';

import IdScannerPage from './pages/id-scanner.jsx';
import PersonnelPage from './pages/personnel.jsx';
import ScanHistoryPage from './pages/scan-history.jsx';

const root = createRoot(document.body);
root.render(App());


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
                    <SideNavLink renderIcon={ScanBarcode} large>ID Scanner</SideNavLink>
                <SideNavLink renderIcon={User} large>Personnel</SideNavLink>
                <SideNavLink renderIcon={History} large>Scan History</SideNavLink>
            </SideNavItems>
        </SideNav>
    )
}
function App() {
    return (
        <>
            <Title />
            <NavBar />
            <Content>
                <IdScannerPage />
            </Content>
        </>
    )
}