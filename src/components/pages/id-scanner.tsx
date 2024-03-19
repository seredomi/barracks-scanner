import { FlexGrid, Row, Column, Button } from '@carbon/react';
import { Check, AlertTriangle } from 'lucide-react';
import { appWindow } from '@tauri-apps/api/window';

async function handleFocusChange(setReadyToScan: (a: boolean) => void ) {
    await appWindow.onFocusChanged(({ payload: focused }) => {
        if (focused) { setReadyToScan(true) }
        else { setReadyToScan(false) }
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