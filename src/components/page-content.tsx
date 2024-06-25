import { useState } from 'react';
import { Content } from '@carbon/react';
import { IDScannerPage } from './pages/id-scanner.tsx';
import { PersonnelPage } from './pages/personnel.tsx';
import { ScanHistoryPage } from './pages/scan-history.tsx';
// import { page } from '../App.tsx';
import { useSelector, useDispatch } from 'react-redux';
// import { CronJob } from 'cron';
// import { getExpiredPersonnel, AppDispatch }  from '../store';
// import { PurgeModal } from './purger.tsx';

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

    // const expiredPersonnel = useSelector((state: any) => state.expiredPersonnel.expiredData);
    // const [ purgeModalOpen, setPurgeModalOpen ] = useState(false);
    // const purgeModalProps = {
    //     expiredPersonnel: expiredPersonnel,
    //     purgeModalOpen: purgeModalOpen,
    //     setPurgeModalOpen: setPurgeModalOpen,
    // }
    // const dispatch = useDispatch<AppDispatch>();

    // function promptExpired() {
    //     console.log("15s elapsed !");
    //     setPurgeModalOpen(true);
    //     dispatch(getExpiredPersonnel());
    // }

    // new CronJob(
    //     '0,15,30,45 * * * * *',
    //     promptExpired, null, true
    // )

    return  (
        <Content className='pageContent'>
            {/*PurgeModal(purgeModalProps)*/}
            {whichPage()}
        </Content>
    )
}

export default PageContent;