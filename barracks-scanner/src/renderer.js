import './app.scss';
//import App from './app.jsx';

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { Header, HeaderName, Content } from '@carbon/react';
import { NavBar } from './components/nav-bar.jsx';
import { PageContent } from './components/page-content.jsx';


const root = createRoot(document.body);
root.render( <App />);

export default function App() {

    const [page, setPage] = useState('id-scanner'); // can be 'id-scanner', 'personnel', or 'scan-history'
    const [scan, setScan] = useState([]); // stores keyboard input until a flush
    const [status, setStatus] = useState(false); // stores if window in focus or not

    const props = { page, setPage, scan, setScan, status, setStatus };

    let tempBuffer = [];
    let charTimes = [];

    window.addEventListener('keyup', (event) => handleInput(event));
    
    // this function flushes the buffer to id after enter is pressed
    // it distinguishes between human input and barcode input based on time b/w key presses
    // the only edge case it doesn't handle is if a user mashes the keyboard while scanning
    function handleInput(event) {
        if (page !== 'id-scanner') {
            console.log("not scanning!");
        }
        else {
            charTimes.push(performance.now());
            if (event.key === 'Enter') {
                let startIndex = 0;
                for (let i = 1; i < charTimes.length; i++) {
                    if (charTimes[i] - charTimes[i-1] > 35) {
                        startIndex = i;
                    }
                }

                if (startIndex < charTimes.length - 1) {
                    if (startIndex !== 0) {
                        tempBuffer = tempBuffer.slice(startIndex);
                    }
                    console.log(tempBuffer);

                    tempBuffer = [];
                    charTimes = [];
                }
            }
            else {
                tempBuffer.push(event.key);
            }
        }

    }

    return (
        <>
            <Title />
            <NavBar {...props} />
            <Content>
                <PageContent {...props} />
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