import * as React from 'react';

import { Content } from '@carbon/react';
import { IDScannerPage } from './pages/id-scanner.tsx';
import { PersonnelPage } from './pages/personnel.tsx';
import { ScanHistoryPage } from './pages/scan-history.tsx';
import { page } from '../App.tsx';

function switchPage(pageProps) {
    switch (pageProps.currPage) {
        case "id-scanner":
            return <IDScannerPage {...pageProps} />;
        case "personnel":
            return <PersonnelPage />;
        case "scan-history":
            return <ScanHistoryPage />;
    }
}

export function PageContent(pageProps) {
    return (
        <Content>
            {switchPage(pageProps)}
        </Content>
    )
}