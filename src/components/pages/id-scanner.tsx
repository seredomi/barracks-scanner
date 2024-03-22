import { FlexGrid, Row, Column, Button, Modal, ActionableNotification, ActionableNotificationProps } from '@carbon/react';
import { Check, AlertTriangle } from 'lucide-react';
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import Person from '../../classes/person';


async function checkID(idArg: string)  {
    let test: string = await invoke('check_id', { id: idArg });
    return test;
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

const ResultPopup = (props: {open: boolean, setOpen: (a: boolean) => void, person: Person}) => {
    if (!props.open) { return null; }
    let resultProps: ActionableNotificationProps;
    if (props.person.found) {
        resultProps = {
            kind: 'success',
            title: 'Authorized',
            subtitle: props.person.rank + ' ' + props.person.last + ', ' + props.person.first + '\n' +
                props.person.group + ' in ' + props.person.room + '\n',
           onActionButtonClick: () => props.setOpen(false),
            closeOnEscape: true,
            onClose: () => props.setOpen(false),
            lowContrast: true,
        }
    }
    else {
        resultProps = {
            kind: 'error',
            title: 'Unauthorized',
            subtitle: 'ID: ' + props.person.id + ' not found. \n' +
                "If they are authorized to stay here, add them in Personnel",
            onActionButtonClick: () => props.setOpen(false),
            closeOnEscape: true,
            onClose: () => props.setOpen(false),
            lowContrast: true,
        }
    }

    return (
        <ActionableNotification {...resultProps} />
    )
}

export function IDScannerPage() {

    const [ readyToScan, setReadyToScan ] = useState(true);
    handleFocusChange(setReadyToScan);

    const [ resultPerson, setResultPerson ] = useState(new Person({id: "null", found: false}) );
    const [ resultOpen, setResultOpen ] = useState(false);

    const resultProps = { open: resultOpen, setOpen: setResultOpen, person: resultPerson };

    // scan detection
    let keyBuffer: string[] = [];
    let keyTimes: number[] = [];

    document.removeEventListener("keydown", window.handleInput);
    window.handleInput = (e: KeyboardEvent) => {
        keyTimes.push(performance.now());
        if (e.key === "Enter") {
            console.log('e$');
            // arbitrary limit, TODO: splice and work with latest 100 chars
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

            // temp fix because js reads "Shift" as a key
            let id = keyBuffer.join('').replaceAll('Shift','');

            // get result from checkID
            setResultOpen(false);
            checkID(id).then(
                (result) => {
                    setResultPerson(new Person(result));
                    setResultOpen(true);
                 },
                (error) => { console.log("error: " + error); }
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
                    {ResultPopup(resultProps)}
                </Column>
            </Row>
        </FlexGrid>
    )
}