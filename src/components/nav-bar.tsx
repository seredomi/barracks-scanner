import { SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { ScanAlt, UserMultiple, Time } from '@carbon/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../store'

// import { page } from '../App';

const NavBar = () => {

    const dispatch = useDispatch();
    const currPage = useSelector((state: any) => state.page.currentPage);

    return (
        <SideNav
            aria-label="Side navigation"
            isFixedNav={true}
            expanded={true}
            isChildOfHeader={false}
        >
            <SideNavItems>
                <SideNavLink 
                    isActive={currPage === "id-scanner"}
                    onClick={() => dispatch(setCurrentPage("id-scanner"))}
                    renderIcon={ScanAlt} large >
                    ID Scanner
                </SideNavLink>
                <SideNavLink
                    isActive={currPage === "personnel"}
                    onClick={() => dispatch(setCurrentPage("personnel"))}
                    renderIcon={UserMultiple} large >
                    Personnel
                </SideNavLink>
                <SideNavLink 
                    isActive={currPage === "scan-history"}
                    onClick={() => dispatch(setCurrentPage("scan-history"))}
                    renderIcon={Time} large >
                    Scan History
                </SideNavLink>
            </SideNavItems>
        </SideNav>
    )
}

export default NavBar;