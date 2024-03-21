import { FlexGrid, Row, Column, Button } from '@carbon/react';
import { Check, AlertTriangle } from 'lucide-react';
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';


async function checkID(idArg: string)  {
    let test: string = await invoke('check_id', { id: idArg });
    return test;
}

function TestButton(testButtonText: String) {
    return (
        <Button >
            {testButtonText}
        </Button>
    )
}

async function handleFocusChange(setReadyToScan: (a: boolean) => void ) {
    await appWindow.onFocusChanged(({ payload: focused }) => {
        if (focused) { setReadyToScan(true) }
        else { setReadyToScan(false) }
    })
}

function ReadyIndicator(readyToScan: boolean, setReadyToScan: any) {
    const handleStatusClick = () => { setReadyToScan(true); }

    if (readyToScan) {
        return (
            <Button kind='tertiary' disabled>
                <div style={{display:'flex'}}>
                    <Check className='buttonIcon' /> <p>Scan back of ID when ready</p>
                </div>
            </Button>
        )
    }
    else {
        return (
            <Button kind='danger' onClick={handleStatusClick}>
                <div style={{display:'flex'}}>
                    <AlertTriangle className='buttonIcon' /> <p>Click here before scanning!</p>
                </div>
            </Button>
        )
    }

}

export function IDScannerPage() {

    const [ testButtonText, setTestButtonText ] = useState('testtt');

    const [ readyToScan, setReadyToScan ] = useState(true);

    handleFocusChange(setReadyToScan);

    // scan detection
    let keyBuffer: string[] = [];
    let keyTimes: number[] = [];

    document.removeEventListener("keydown", window.handleInput);

    window.handleInput = (e: KeyboardEvent) => {

        keyTimes.push(performance.now());

        if (e.key === "Enter") {
            console.log('e$');
            // arbitrary limit, TODO: splice by 500 and work with latest
            if (keyBuffer.length > 500) { keyBuffer = []; keyTimes = []; return; }

            // work our way down from end of buffer until speed is slow like a human
            let startIdx = keyBuffer.length;
            for (let i = keyBuffer.length; i > 0; i--) {
                if (keyTimes[i] - keyTimes[i-1] > 80) { break; }
                startIdx = i;
            }

            if (startIdx === keyBuffer.length) {console.log("problem"); keyBuffer = []; keyTimes = []; return; }
            if (startIdx > 0) {
                keyBuffer = keyBuffer.slice(startIdx-1);
            }

            let id = keyBuffer.join('').replaceAll('Shift','');

            // get result from checkID
            checkID(id).then(
                (result) => { setTestButtonText(result); },
                (error) => { setTestButtonText('Error: ' + error); }
            )

            keyBuffer = [];
            keyTimes = [];
            }

        else { keyBuffer.push(e.key); }
    }


    document.addEventListener("keydown", window.handleInput);

    return (
        <FlexGrid>
            <Row>
                <Column>
                    <h2>ID Scanner</h2>
                    <br /> <br />
                    {ReadyIndicator(readyToScan, setReadyToScan)}
                    <br /> <br /> <br />
                    {TestButton(testButtonText)}
                </Column>
            </Row>
        </FlexGrid>
    )
}