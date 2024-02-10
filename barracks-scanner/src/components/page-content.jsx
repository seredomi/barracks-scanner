import * as React from 'react';

import IdScannerPage from '../pages/id-scanner.jsx';
import { PersonnelPage } from '../pages/personnel.jsx';
import { ScanHistoryPage } from '../pages/scan-history.jsx';


export function PageContent(props) {

    switch (props.selected) {
        case 'id-scanner':
            return <IdScannerPage />;
        case 'personnel':
            return <PersonnelPage />;
        case 'scan-history':
            return <ScanHistoryPage />;
        default:
            return <IdScannerPage />;
    }

}