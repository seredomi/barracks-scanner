import * as React from 'react';

import { Content } from '@carbon/react';
import { IDScannerPage } from './pages/id-scanner.tsx';
import { PersonnelPage } from './pages/personnel.tsx';
import { ScanHistoryPage } from './pages/scan-history.tsx';
import { page } from '../App.tsx';

function switchPage(currPage: page) {
    switch (currPage) {
        case "id-scanner":
            return <IDScannerPage />;
        case "personnel":
            return <PersonnelPage />;
        case "scan-history":
            return <ScanHistoryPage />;
    }
}

export function PageContent(currPage: page) {
    return (
        <Content>
            {switchPage(currPage)}
        </Content>
    )
}