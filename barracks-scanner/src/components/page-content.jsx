import * as React from 'react';

import { IdScannerPage } from '../pages/id-scanner.jsx';
import { PersonnelPage } from '../pages/personnel.jsx';
import { ScanHistoryPage } from '../pages/scan-history.jsx';


export function PageContent(props) {

    switch (props.page) {
        case 'id-scanner':
            return <IdScannerPage {...props} />;
        case 'personnel':
            return <PersonnelPage />;
        case 'scan-history':
            return <ScanHistoryPage />;
        default:
            return <IdScannerPage />;
    }
}