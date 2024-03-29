import { useState, useEffect } from 'react';
import { Modal, TextInput, Select, SelectItemGroup, SelectItem } from '@carbon/react';
import { invoke } from '@tauri-apps/api/tauri';
import { emptyPerson } from '../store';
import Person from '../classes/person';

const PersonDetails = (props: any) => {

    // maintain separate state for edits, but still update when new person selected
    const [ editID, setEditID ] = useState("");
    const [ editRank, setEditRank ] = useState("");
    const [ editLast, setEditLast ] = useState("");
    const [ editFirst, setEditFirst ] = useState("");
    const [ editGroup, setEditGroup ] = useState("");
    const [ editRoom, setEditRoom ] = useState("");
    const [ editLeaveDate, setEditLeaveDate ] = useState("");

    const [ errorID, setErrorID ] = useState("");
    const [ errorRank, setErrorRank ] = useState("");
    const [ errorLast, setErrorLast ] = useState("");
    const [ errorFirst, setErrorFirst ] = useState("");
    const [ errorGroup, setErrorGroup ] = useState("");
    const [ errorRoom, setErrorRoom ] = useState("");
    const [ errorLeaveDate, setErrorLeaveDate ] = useState("");

    const [ anyEmpty, setAnyEmpty ] = useState(false);
    const [ allValid, setAllValid ] = useState(false);

    useEffect(() => {
        setEditID(props.person.id);
        setEditRank(props.person.rank);
        setEditLast(props.person.last);
        setEditFirst(props.person.first);
        setEditGroup(props.person.group);
        setEditRoom(props.person.room);
        setEditLeaveDate(props.person.leave_date);
    } , [props.person])

    useEffect(() => {validateID();}, [editID])
    useEffect(() => {validateRank();}, [editRank])
    useEffect(() => {validateLast();}, [editLast])
    useEffect(() => {validateFirst();}, [editFirst])
    useEffect(() => {validateGroup();}, [editGroup])
    useEffect(() => {validateRoom();}, [editRoom])
    useEffect(() => {validateLeaveDate();}, [editLeaveDate])

    useEffect(() => { validateAll(); }, [editID, editRank, editLast, editFirst, editGroup, editRoom, editLeaveDate])


    async function validateID() {
        let errorMsg: string = "";
        if (editID.length > 30) { errorMsg = "ID must be less than 40 characters"; }
        if (editID.includes(';')) { errorMsg = "ID must not contain ; "; }
        // ensure ID is unique for new entries
        if (errorMsg === "" && props.detailsMode === 'new') {
            await invoke ('check_id', {id: editID}).then(
                (result) => {
                    const p: Person = new Person(result);
                    if (p.found) { errorMsg = "ID already exists"; }
                },
                (error) => { console.log("Error checking for duplicate ID: " + error); }
            )
        }
        setErrorID(errorMsg);
    }

    function validateRank() {
        let errorMsg: string = "";
        setErrorRank(errorMsg);
    }

    function validateLast() {
        let errorMsg: string = "";
        if (editLast.length > 40) { errorMsg = "Last name must be less than 30 characters"; }
        setErrorLast(errorMsg);
    }

    function validateFirst() {
        let errorMsg: string = "";
        if (editFirst.length > 30) { errorMsg = "First name must be less than 30 characters"; }
        setErrorFirst(errorMsg);
    }

    function validateGroup() {
        let errorMsg: string = "";
        setErrorGroup(errorMsg);
    }

    function validateRoom() {
        let errorMsg: string = "";
        if (editRoom.length > 30) { errorMsg = "Room must be less than 30 characters"; }
        setErrorRoom(errorMsg);
    }

    function validateLeaveDate() {
        let errorMsg: string = "";
        if (editLeaveDate.length > 30) { errorMsg = "Leave date must be less than 30 characters"; }
        setErrorLeaveDate(errorMsg);
    }

    function validateAll() {
        console.log("validating all");
        if (editID.length < 1 || editRank.length < 1 || editLast.length < 1 || editFirst.length < 1 || editGroup.length < 1 || editRoom.length < 1 || editLeaveDate.length < 1) {
            setAllValid(false);
            setAnyEmpty(true);
            return;
        }
        setAnyEmpty(false);

        if (errorID.length > 0 || errorLast.length > 0 || errorFirst.length > 0 || errorRoom.length > 0 || errorLeaveDate.length > 0) {
            setAllValid(false);
            return;
        }
        setAllValid(true);
    }


    function DetailsModal() {

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
            }}
            onRequestSubmit={ () => {
                if (props.detailsMode === 'view') {
                    props.setDetailsMode('edit');
                }
                else if (props.detailsMode === 'edit') {
                    invoke('update_person', {oldId: props.person.id, newInfo: {
                        id: editID,
                        rank: editRank,
                        last: editLast,
                        first: editFirst,
                        group: editGroup,
                        room: editRoom,
                        leave_date: editLeaveDate,
                        found: true

                    }})
                    props.setDetailsMode('view');
                    props.refresh();
                    props.setDetailsOpen(false);
                }
                else { // new person
                    props.refresh();
                    console.log("add person: id=" + editID + ", rank=" + editRank + ", last=" + editLast + ", first=" + editFirst + ", group=" + editGroup + ", room=" + editRoom + ", leave_date=" + editLeaveDate);
                    props.setDetailsOpen(false);
                    props.setDetailsMode('view');
                }
            } } >
            
            <div id='error-message' className='formRow' margin-top='3rem'>
                <TextInput
                    id='id-input'
                    labelText="ID (Scan back of ID)"
                    disabled={props.detailsMode === 'new' ? false : true}
                    value={editID}
                    onChange={(e) => setEditID(e.target.value)}
                    onBlur={() => validateID()}
                    invalid={errorID.length > 0}
                    invalidText={errorID}
                />
            </div>

            <div id='rank-name=input' className='formRow' >
                <Select
                    id='rank-select'
                    labelText="Rank"
                    readOnly={props.detailsMode === 'view'}
                    value={editRank}
                    onChange={(e) => setEditRank(e.target.value)}
                    invalid={errorRank.length > 0}
                    invalidText={errorRank}
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
                    value={editLast}
                    onChange={(e) => setEditLast(e.target.value)}
                    invalid={errorLast.length > 0}
                    invalidText={errorLast}
                />
                <TextInput
                    id='first-name-input'
                    labelText="First name"
                    readOnly={props.detailsMode === 'view'}
                    value={editFirst}
                    onChange={(e) => setEditFirst(e.target.value)}
                    invalid={errorFirst.length > 0}
                    invalidText={errorFirst}
                />
            </div>

            <div id='room-group-date-input' className='formRow'>
                <Select
                    id='group-select'
                    labelText="Group"
                    readOnly={props.detailsMode === 'view'}
                    value={editGroup}
                    onChange={(e) => setEditGroup(e.target.value)}
                    invalid={errorGroup.length > 0}
                    invalidText={errorGroup}
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
                    value={editRoom}
                    onChange={(e) => setEditRoom(e.target.value)}
                    invalid={errorRoom.length > 0}
                    invalidText={errorRoom}
                />
                <TextInput
                    id='leave-date-input'
                    labelText="Leave Date"
                    readOnly={props.detailsMode === 'view'}
                    value={editLeaveDate}
                    onChange={(e) => setEditLeaveDate(e.target.value)}
                    invalid={errorLeaveDate.length > 0}
                    invalidText={errorLeaveDate}
                />
            </div>

            <br /> <p>{anyEmpty ? "All fields are required" : ""}</p>

        </Modal>
    )
}

export default PersonDetails;