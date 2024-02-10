import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { ScanBarcode, User, History } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootPage from './pages/root.jsx';
import IdScannerPage from './pages/id-scanner.jsx';
import PersonnelPage from './pages/personnel.jsx';
import ScanHistoryPage from './pages/scan-history.jsx';

const root = createRoot(document.body);
root.render(MyRouter());

function MyRouter() {
    const router = createBrowserRouter([
        { path: "/main_window", element: <RootPage />,
            children: [
                { path: "/main_window/id-scanner", element: <IdScannerPage /> },
                { path: "/main_window/personnel", element: <PersonnelPage /> },
                { path: "/main_window/scan_history", element: <ScanHistoryPage /> },
            ]
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}