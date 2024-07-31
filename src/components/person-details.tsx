import { useState, useEffect, useRef, ReactNode } from 'react';
import { Modal, TextInput, Select, SelectItemGroup, SelectItem, DatePicker, DatePickerInput } from '@carbon/react';
import { TrashCan, Subtract } from '@carbon/icons-react';
import { invoke } from '@tauri-apps/api/tauri';
import { Person } from '../classes/person';
import { formatCalendarDate } from '../classes/date';
import { Button } from '@carbon/react';
import { FolderMinus } from 'lucide-react';

const PersonDetails = (props: any) => {

    // maintain separate state for edits, but still update when new person selected
    const [ newID, setNewID ] = useState("");
    const [ newRank, setNewRank ] = useState("");
    const [ newLast, setNewLast ] = useState("");
    const [ newFirst, setNewFirst ] = useState("");
    const [ newGroup, setNewGroup ] = useState("");
    const [ newRoom, setNewRoom ] = useState("");
    const [ newLeaveDate, setNewLeaveDate ] = useState("");

    const [ errorID, setErrorID ] = useState("");
    const [ errorLast, setErrorLast ] = useState("");
    const [ errorFirst, setErrorFirst ] = useState("");
    const [ errorRoom, setErrorRoom ] = useState("");
    const [ errorLeaveDate, setErrorLeaveDate ] = useState("");

    const [ anyEmpty, setAnyEmpty ] = useState(false);
    const [ anyBadChars, setAnyBadChars ] = useState(false);
    const [ allValid, setAllValid ] = useState(false);

    useEffect(() => {
        setNewID(props.person.id);
        setNewRank(props.person.rank);
        setNewLast(props.person.last);
        setNewFirst(props.person.first);
        setNewGroup(props.person.group);
        setNewRoom(props.person.room);
        setNewLeaveDate(props.person.leave_date);
    } , [props.person])


    useEffect (() => { validateID(); }, [newID]);
    useEffect (() => { validateLast(); }, [newLast]);
    useEffect (() => { validateFirst(); }, [newFirst]);
    useEffect (() => { validateRoom(); }, [newRoom]);

    useEffect(() => { validateAll(); }, [newID, newRank, newLast, newFirst, newGroup, newRoom, newLeaveDate,
                                        errorID, errorLast, errorFirst, errorRoom, errorLeaveDate])


    async function validateID() {
        let errorMsg: string = "";
        if (newID.length > 40) { errorMsg = "ID must be less than 40 characters"; }
        else if (newID.includes(';')) { errorMsg = "ID must not contain ; "; }
        // ensure ID is unique for new entries
        else if (props.detailsMode === 'new') {
            await invoke ('check_id', {id: newID}).then(
                (result) => {
                    const p: Person = new Person(result);
                    if (p.found) { errorMsg = "ID already exists"; }
                    else { errorMsg = ""; }
                },
                (error) => { console.log("Error checking for duplicate ID: " + error); }
            )
        }
        setErrorID(errorMsg);
    }

    function validateLast() {
        setNewLast(newLast.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()));
        let errorMsg: string = "";
        if (newLast.length > 30) { errorMsg = "Last name must be less than 30 characters"; }
        setErrorLast(errorMsg);
    }

    function validateFirst() {
        setNewFirst(newFirst.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()));
        let errorMsg: string = "";
        if (newFirst.length > 30) { errorMsg = "First name must be less than 30 characters"; }
        setErrorFirst(errorMsg);
    }

    function validateRoom() {
        setNewRoom(newRoom.toUpperCase());
        let errorMsg: string = "";
        if (newRoom.length > 0 && ! /^[\d]{3}[abAB]{1}/.test(newRoom)) { errorMsg = "Room should be 3 digits + A or B"; }
        setErrorRoom(errorMsg);
    }

    function validateAll() {
        const badChars: string[] = [";", "'"];
        const allFields: string[] = [newID, newRank, newLast, newFirst, newGroup, newRoom ];

        allFields.forEach(field => {
            if (field.length < 1) {
            }
            badChars.forEach(char => {
                if (field.includes(char)) {
                    setAnyBadChars(true);
                    setAllValid(false);
                    return
                }
            })
        })

        const allErrors: string[] = [errorID, errorLast, errorFirst, errorRoom, errorLeaveDate];
        allErrors.forEach(error => {
            console.log(error);
            if (error.length < 1) {
                setAllValid(false);
                return;
            }
        })
        setAnyBadChars(false);
        setAnyEmpty(false);
        setAllValid(true);
    }

    function clearData() {
        setNewID(""); setNewRank(""); setNewLast(""); setNewFirst("");
        setNewGroup(""); setNewRoom(""); setNewLeaveDate("0000-00-00");

        setErrorID(""); setErrorLast(""); setErrorFirst("");
        setErrorRoom(""); setErrorLeaveDate("");
    }

    const bottomText = (): ReactNode => {
        const badChars: string[] = [";", "'"];
        if (props.detailsMode != 'view') {
            if (anyEmpty) return "All fields must be entered"
            if (anyBadChars) {
                let str: string = "No fields can contain: "
                badChars.forEach(char => str = str + "\"" + char + "\"");
                return str
            }
        }
        return "  "
    }

    return (
        <Modal
            open={props.detailsOpen}
            modalHeading={ props.detailsMode === 'view' ? "View details" : props.detailsMode === 'edit' ? "Edit details" : "New entry" }
            secondaryButtonText={ props.detailsMode === 'view' ? "Close" : "Cancel" }
            primaryButtonText={ props.detailsMode === 'view' ? "Edit": "Save" }
            primaryButtonDisabled={props.detailsMode === 'view' ? false : !allValid}
            onRequestClose={() => {
                props.setDetailsOpen(false)
                props.setDetailsMode('view')
                clearData();
            }}
            onRequestSubmit={ () => {
                if (props.detailsMode === 'view') {
                    props.setDetailsMode('edit');
                }
                else if (props.detailsMode === 'edit') {
                    console.log("last: " + newLast + " first: " + newFirst + " room: " + newRoom);
                    //TODO: somehow wait for formalize to take effect before saving changes
                    invoke('update_person', {oldId: props.person.id, newInfo: {
                        id: newID,
                        rank: newRank,
                        last: newLast,
                        first: newFirst,
                        group: newGroup,
                        room: newRoom,
                        leave_date: newLeaveDate,
                        found: true

                    }})
                    props.setDetailsMode('view');
                    props.refresh();
                    props.setDetailsOpen(false);
                    clearData();
                }
                else { // new person
                    invoke('add_person', {newPerson: {
                        id: newID,
                        rank: newRank,
                        last: newLast,
                        first: newFirst,
                        group: newGroup,
                        room: newRoom,
                        leave_date: newLeaveDate,
                        found: true
                    }})
                    props.refresh();
                    props.setDetailsOpen(false);
                    props.setDetailsMode('view');
                    clearData();
                }
            } }
        >
            
            <br/>
            <div id='error-message' className='formRow' >
                <TextInput
                    id='id-input'
                    labelText="ID"
                    disabled={props.detailsMode === 'new' ? false : true}
                    value={newID}
                    onChange={(e) => setNewID(e.target.value)}
                    onBlur={() => validateID()}
                    invalid={errorID.length > 0}
                    invalidText={errorID}
                    helperText="&nbsp;"
                    placeholder='Scan back of ID'
                />
            </div>

            <div id='rank-name=input' className='formRow' >
                <Select
                    id='rank-select'
                    labelText="Rank"
                    readOnly={props.detailsMode === 'view'}
                    value={newRank}
                    onChange={(e) => setNewRank(e.target.value)}
                    helperText="&nbsp;"
                >
                    <SelectItem value="" text="" />
                    <SelectItemGroup label="Enlisted">
                        <SelectItem value="PVT" text="PVT" />
                        <SelectItem value="PV2" text="PV2" />
                        <SelectItem value="PFC" text="PFC" />
                        <SelectItem value="SPC" text="SPC" />
                        <SelectItem value="CPL" text="CPL" />
                        <SelectItem value="SGT" text="SGT" />
                        <SelectItem value="SSG" text="SSG" />
                        <SelectItem value="SFC" text="SFC" />
                        <SelectItem value="MSG" text="MSG" />
                        <SelectItem value="1SG" text="1SG" />
                        <SelectItem value="SGM" text="SGM" />
                        <SelectItem value="CSM" text="CSM" />
                    </SelectItemGroup>
                    <SelectItemGroup label="Warrant Officer">
                        <SelectItem value="WO1" text="WO1" />
                        <SelectItem value="CW2" text="CW2" />
                        <SelectItem value="CW3" text="CW3" />
                        <SelectItem value="CW4" text="CW4" />
                        <SelectItem value="CW5" text="CW5" />
                    </SelectItemGroup>
                    <SelectItemGroup label="Officer">
                        <SelectItem value="2LT" text="2LT" />
                        <SelectItem value="1LT" text="1LT" />
                        <SelectItem value="CPT" text="CPT" />
                        <SelectItem value="MAJ" text="MAJ" />
                        <SelectItem value="LTC" text="LTC" />
                        <SelectItem value="COL" text="COL" />
                        <SelectItem value="BG" text="BG" />
                        <SelectItem value="MG" text="MG" />
                        <SelectItem value="LTG" text="LTG" />
                        <SelectItem value="GEN" text="GEN" />
                        <SelectItem value="GA" text="GA" />
                    </SelectItemGroup>
                    <SelectItemGroup label="Other">
                        <SelectItem value="CIV" text="CIV" />
                        <SelectItem value="CTR" text="CTR" />
                    </SelectItemGroup>
                </Select>
                <TextInput
                    id='last-name-input'
                    labelText="Last name"
                    readOnly={props.detailsMode === 'view'}
                    value={newLast}
                    onChange={(e) => setNewLast(e.target.value)}
                    invalid={errorLast.length > 0}
                    invalidText={errorLast}
                    helperText="&nbsp;"
                />
                <TextInput
                    id='first-name-input'
                    labelText="First name"
                    readOnly={props.detailsMode === 'view'}
                    value={newFirst}
                    onChange={(e) => setNewFirst(e.target.value)}
                    invalid={errorFirst.length > 0}
                    invalidText={errorFirst}
                    helperText="&nbsp;"
                />
            </div>

            <div id='room-group-date-input' className='formRow'>
                <Select
                    id='group-select'
                    labelText="Category"
                    readOnly={props.detailsMode === 'view'}
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                    helperText="&nbsp;"
                >
                    <SelectItem value="" text="" />
                    <SelectItem value="Resident" text="Resident" />
                    <SelectItem value="Rotational Unit" text="Rotational Unit" />
                    <SelectItem value="COC" text="COC" />
                    <SelectItem value="Guest" text="Guest" />
                    <SelectItem value="Hotel Divarty" text="Hotel Divarty" />

                </Select>
                <TextInput
                    id='room-input'
                    labelText="Room"
                    readOnly={props.detailsMode === 'view'}
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    invalid={errorRoom.length > 0}
                    invalidText={errorRoom}
                    helperText="&nbsp;"
                    placeholder='e.g. 123A'
                />
                <DatePicker 
                    datePickerType='single' 
                    minDate={Date.now()}
                    value={newLeaveDate}
                    dateFormat='Y-m-d'
                    short={true}
                    onChange={(e) => { setNewLeaveDate(formatCalendarDate(e.toLocaleString()))}}
                    readOnly={props.detailsMode === 'view'}
                    >
                    <DatePickerInput
                        id='leave-date-input'
                        labelText="Leave date"
                        readOnly={props.detailsMode === 'view'}
                        placeholder='YYYY-MM-DD'
                    />
                </DatePicker>
            </div>

            <p style={{color: 'red'}}>{bottomText()}

            </p>

            <Button
                kind={props.detailsMode !== 'new' ? 'danger' : 'ghost'}
                renderIcon={props.detailsMode !== 'new' ? TrashCan : Subtract /*this is a temp fix*/ }
                disabled={props.detailsMode === 'new'}
                onClick={() => {
                    props.setDetailsOpen(false);
                    props.setDeleteConfirmOpen(true)
                }
                }
            >
                {props.detailsMode !== 'new' ? 'Delete' : ' '}
            </Button>

        </Modal>
    )
}

export default PersonDetails;