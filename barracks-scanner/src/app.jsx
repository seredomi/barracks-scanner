import * as React from 'react';
import { useState } from 'react';
import { Header, HeaderName, Content } from '@carbon/react';
import { NavBar } from './components/nav-bar.jsx';
import { PageContent } from './components/page-content.jsx';

export default function App() {
    const [selected, setSelected] = useState('id-scanner');
    const selectProps = { selected, setSelected };

    return (
        <>
            <Title />
            <NavBar {...selectProps} />
            <Content>
                <PageContent {...selectProps} />
            </Content>
        </>
    );

}

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