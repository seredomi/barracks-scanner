import { useState, useEffect } from 'react';
import { Modal, TextInput, Select, SelectItemGroup, SelectItem } from '@carbon/react';
import { invoke } from '@tauri-apps/api/tauri';


const PersonDetails = (props: any) => {

    // maintain separate state for edits, but still update when new person selected
    const [ editID, setEditID ] = useState("");
    const [ editRank, setEditRank ] = useState("");
    const [ editLast, setEditLast ] = useState("");
    const [ editFirst, setEditFirst ] = useState("");
    const [ editGroup, setEditGroup ] = useState("");
    const [ editRoom, setEditRoom ] = useState("");
    const [ editLeaveDate, setEditLeaveDate ] = useState("");

    useEffect(() => {
        setEditID(props.person.id);
        setEditRank(props.person.rank);
        setEditLast(props.person.last);
        setEditFirst(props.person.first);
        setEditGroup(props.person.group);
        setEditRoom(props.person.room);
        setEditLeaveDate(props.person.leave_date);
    } , [props.person])

    return (
        <Modal
            open={props.detailsOpen}
            modalHeading={ props.detailsMode === 'view' ? "View details" : props.detailsMode === 'edit' ? "Edit details" : "New entry" }
            secondaryButtonText={ props.detailsMode === 'view' ? "Close" : "Cancel" }
            primaryButtonText={ props.detailsMode === 'view' ? "Edit": "Save" }
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

            <TextInput
                id='id-input'
                labelText="ID (Scan back of ID)"
                disabled={props.detailsMode === 'view'}
                value={editID}
                style={{marginBottom: '1rem'}}
                onChange={(e) => setEditID(e.target.value)}
            />

            <div id='rank-name=input' className='formGroup' style={{marginBottom:'1rem'}}>
                <Select
                    id='rank-select'
                    labelText="Rank"
                    disabled={props.detailsMode === 'view'}
                    value={editRank}
                    onChange={(e) => setEditRank(e.target.value)}
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
                    disabled={props.detailsMode === 'view'}
                    value={editLast}
                    onChange={(e) => setEditLast(e.target.value)}
                />
                <TextInput
                    id='first-name-input'
                    labelText="First name"
                    disabled={props.detailsMode === 'view'}
                    value={editFirst}
                    onChange={(e) => setEditFirst(e.target.value)}
                />
            </div>

            <div id='room-group-date-input' className='formGroup'>
                <Select
                    id='group-select'
                    labelText="Group"
                    disabled={props.detailsMode === 'view'}
                    value={editGroup}
                    onChange={(e) => setEditGroup(e.target.value)}
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
                    disabled={props.detailsMode === 'view'}
                    value={editRoom}
                    onChange={(e) => setEditRoom(e.target.value)}
                />
                <TextInput
                    id='leave-date-input'
                    labelText="Leave Date"
                    disabled={props.detailsMode === 'view'}
                    value={editLeaveDate}
                    onChange={(e) => setEditLeaveDate(e.target.value)}
                />
            </div>

        </Modal>
    )
}

export default PersonDetails;