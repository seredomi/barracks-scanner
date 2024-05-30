import { Content, Button } from '@carbon/react';
import { IDScannerPage } from './pages/id-scanner.tsx';
import { PersonnelPage } from './pages/personnel.tsx';
import { ScanHistoryPage } from './pages/scan-history.tsx';
// import { page } from '../App.tsx';
import { useSelector } from 'react-redux';
import { PurgeModal } from '../purger.tsx';

const PageContent = () => {

    const current = useSelector((state: any) => state.page.currentPage);

    const whichPage = () => {
        switch (current) {
            case "id-scanner":
                return <IDScannerPage />;
            case "personnel":
                return <PersonnelPage />;
            case "scan-history":
                return <ScanHistoryPage />;
        }
    }

    return  (
        <Content className='pageContent'>
            {/*PurgeModal()*/}

            {whichPage()}
        </Content>
    )
}

export default PageContent;