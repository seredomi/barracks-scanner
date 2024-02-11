import './app.scss';
//import App from './app.jsx';

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { Header, HeaderName, Content } from '@carbon/react';
import { NavBar } from './components/nav-bar.jsx';
import { PageContent } from './components/page-content.jsx';



const root = createRoot(document.body);
root.render(<App />);

export default function App() {
    const [selected, setSelected] = useState('id-scanner');
    const [inputBuffer, setInputBuffer] = useState('');
    const selectProps = { selected, setSelected };

    window.addEventListener('keyup', handleKeyPress);
    function handleKeyPress(event) {
        setInputBuffer(inputBuffer + event.key);
        if (selected == 'id-scanner') {
            if (event.key == 'Enter') {
                let newString = '';
                for (let i = 0; i < inputBuffer.length; i += 2) {
                    newString += inputBuffer[i];
                }
                console.log(newString);
                setInputBuffer('');
            }
        }
    }


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