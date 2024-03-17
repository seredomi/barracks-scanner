import { SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { ScanBarcode, User, History } from 'lucide-react';
// import { page } from '../App';

export function NavBar(pageProps: any) {

    const handleIdScannerClick = () => {
        pageProps.setCurrPage("id-scanner") ;
        pageProps.setReadyToScan(true);
    };
    const handlePersonnelClick = () => {
        pageProps.setCurrPage("personnel") ;
        pageProps.setReadyToScan(false);
    };
    const handleScanHistoryClick = () => {
        pageProps.setCurrPage("scan-history") ;
        pageProps.setReadyToScan(false);
    };

    return (
        <SideNav
            aria-label="Side navigation"
            isFixedNav={true}
            expanded={true}
            isChildOfHeader={false}
        >
            <SideNavItems>
                <SideNavLink 
                    isActive={pageProps.currPage === "id-scanner"}
                    onClick={handleIdScannerClick}
                    renderIcon={ScanBarcode} large >
                    ID Scanner
                </SideNavLink>
                <SideNavLink
                    isActive={pageProps.currPage === "personnel"}
                    onClick={handlePersonnelClick}
                    renderIcon={User} large >
                    Personnel
                </SideNavLink>
                <SideNavLink 
                    isActive={pageProps.currPage === "scan-history"}
                    onClick={handleScanHistoryClick}
                    renderIcon={History} large >
                    Scan History
                </SideNavLink>
            </SideNavItems>
        </SideNav>
    )
}
