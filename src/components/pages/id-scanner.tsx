import { FlexGrid, Row, Column, Button } from '@carbon/react';
import { Check, AlertTriangle } from 'lucide-react';
import { appWindow } from '@tauri-apps/api/window';

async function handleFocusChange(setReadyToScan: (a: boolean) => void ) {
    await appWindow.onFocusChanged(({ payload: focused }) => {
        if (focused) { setReadyToScan(true); }
        else { setReadyToScan(false); }
    })
}

function ReadyIndicator(scannerProps: any) {
    const handleStatusClick = () => { scannerProps.setReadyToScan(true); }

    if (scannerProps.readyToScan) {
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

export function IDScannerPage(scannerProps: any) {

  // let keyBuffer: string[] = [];
  // let keyTimes: number[] = [];

  // window.addEventListener('keyup', (e) => { handleInput(e); });

  // this function flushes the buffer to id after enter is pressed
  // it distinguishes between human input and barcode input based on time b/w key presses
  // the only edge case it doesn't handle is if a user mashes the keyboard while scanning
    // function handleInput(event: KeyboardEvent) {

    //     // first we push the time of the key press to the keyTimes array
    //     keyTimes.push(performance.now());

    //     // if enter
    //     if (event.key === 'Enter') {

    //     // skip all slow key presses until fast scanner-like key presses
    //     let startIndex = 0;
    //     for (let i = 1; i < keyTimes.length; i++) {
    //         if (keyTimes[i] - keyTimes[i-1] > 35) {
    //             startIndex = i;
    //         }
    //     }
    //     if (startIndex < keyTimes.length - 1) {
    //         if (startIndex !== 0) {
    //             keyBuffer = keyBuffer.slice(startIndex);
    //         }
    //         // TODO: send scan to main.rs to be processed
    //         console.log(keyBuffer);

    //         keyBuffer = [];
    //         keyTimes = [];
    //     }
    //     }
    //     // if it's not enter, just push the key to the buffer
    //     else {
    //         keyBuffer.push(event.key);
    //     }
    // }

    handleFocusChange(scannerProps.setReadyToScan);

    return (
        <FlexGrid>
            <Row>
                <Column>
                    <h2>ID Scanner</h2>
                    <br /> <br />
                    <ReadyIndicator {...scannerProps} />
                </Column>
            </Row>
        </FlexGrid>
    )
}