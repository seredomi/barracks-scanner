import { FlexGrid, Row, Column, Button, ActionableNotification, ActionableNotificationProps } from '@carbon/react';
import { Checkmark, WarningAlt } from '@carbon/icons-react';
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import { Person } from '../../classes/person';

export async function checkID(idArg: string)  {
    let res: string = await invoke('check_id', { id: idArg });
    return res;
}

export async function logScan(idArg: string) {
    let res: string = await invoke('log_scan', {id: idArg});
    return res;
}

async function handleFocusChange(setReadyToScan: (a: boolean) => void ) {
    await appWindow.onFocusChanged(({ payload: focused }) => {
        if (focused) { setReadyToScan(true) }
        else { setReadyToScan(false) }
    })
}

function ReadyIndicator(readyToScan: boolean) {

    if (readyToScan) {
        return (
            <Button renderIcon={Checkmark} kind='tertiary' disabled>
                    Scan back of ID when ready
            </Button>
        )
    }
    else {
        return (
            <Button renderIcon={WarningAlt} kind='danger' >
                    Click here before scanning!
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
            title: 'Authorized\n',
            subtitle: '\n' + props.person.rank + ' ' + props.person.last + ', ' + props.person.first + '\n' +
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

    return ( <ActionableNotification {...resultProps} />)
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
            // arbitrary limit, TODO: splice and work with latest 100 chars
            if (keyBuffer.length > 500) { keyBuffer = []; keyTimes = []; return; }

            // work our way down from end of buffer until speed is slow like a human
            let startIdx = keyBuffer.length;
            for (let i = keyBuffer.length; i > 0; i--) {
                if (keyTimes[i] - keyTimes[i-1] > 80) { break; }
                startIdx = i;
            }

            if (startIdx === keyBuffer.length) { keyBuffer = []; keyTimes = []; return; }
            if (startIdx > 0) {
                keyBuffer = keyBuffer.slice(startIdx-1);
            }

            // temp fix because js reads "Shift" as a key
            // TODO: find a more performant way to do this?
            let id = keyBuffer.join('').replaceAll('Shift','');

            logScan(id).then(
                (_) => { },
                (error) => { console.log("error logging scan: " + error); }
            )

            // get result from checkID
            setResultOpen(false);
            checkID(id).then(
                (result) => {
                    setResultPerson(new Person(result));
                    setResultOpen(true);
                },
                (error) => { console.log("error retrieving person details: " + error); }
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
                    {ReadyIndicator(readyToScan)}
                    <br /> <br /> <br />
                    {ResultPopup(resultProps)}
                    {/* test
                    
                    <br /> <br /> <br />
                    <Button
                        onClick={ () => {

                            setResultOpen(false);
                            let testID = "1TPC8D9X1E5LIKGAAT";
                            checkID(testID).then(
                                (result) => {
                                    setResultPerson(new Person(result));
                                    setResultOpen(true);
                                },
                                (error) => { console.log("error retrieving person details: " + error); }
                            )

                            logScan(testID).then(
                                (_) => { },
                                (error) => { console.log("error logging scan: " + error); }
                            )
                        } }
                    >
                        Simulate scan
                    </Button>
                    
                    button */}
                </Column>
            </Row>
        </FlexGrid>
    )
}