import React from 'react';
import { FlexGrid, Row, Column, Button } from '@carbon/react';
import { Check, AlertTriangle } from 'lucide-react';
import { appWindow } from '@tauri-apps/api/window';

function Indicator(scannerProps) {
    const handleStatusClick = () => { scannerProps.setReadyToScan(true); }

    if (scannerProps.readyToScan) {
        return (
            <Button kind='tertiary' disabled>
                <div style={{display:'flex'}}>
                    <Check className='buttonIcon' /> <p>Ready to scan</p>

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

async function handleFocusChange(setReadyToScan: (a: boolean) => void ) {
    await appWindow.onFocusChanged(({ payload: focused }) => {
        if (focused) { setReadyToScan(true); }
        else { setReadyToScan(false); }
    })
}

export function IDScannerPage(scannerProps) {

    handleFocusChange(scannerProps.setReadyToScan);

    return (
        <FlexGrid>
            <Row>
                <Column>
                    <h2>ID Scanner</h2>
                    <br /> <br />
                    <Indicator {...scannerProps} />
                </Column>
            </Row>
        </FlexGrid>
    )
}