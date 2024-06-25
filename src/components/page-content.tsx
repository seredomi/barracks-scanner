import { Content } from '@carbon/react';
import { IDScannerPage } from './pages/id-scanner.tsx';
import { PersonnelPage } from './pages/personnel.tsx';
import { ScanHistoryPage } from './pages/scan-history.tsx';
import { useSelector } from 'react-redux';

const PageContent = () => {

    const currentPage = useSelector((state: any) => state.page.currentPage);
    const whichPage = () => {
        switch (currentPage) {
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
            {/*PurgeModal(purgeModalProps)*/}
            {whichPage()}
        </Content>
    )
}

export default PageContent;