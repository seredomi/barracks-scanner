import * as React from 'react';
import { useState } from 'react';
import { Header, HeaderName } from '@carbon/react';
import { NavBar } from './components/nav-bar.jsx';

import { createRoot } from 'react-dom/client';

const root = createRoot(document.body);
root.render(App());

function Title() {
    const buildingNo = useState(6070);
    return (
        <Header aria-label="Window Header" className="globalHeader">
            <HeaderName prefix={buildingNo}>
                Barracks Personnel Identifier
            </HeaderName>
        </Header>
    )
}

function App() {
    return (
        <>
            <Title />
            <NavBar />
        </>
    );

}