import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { DataTable, TableContainer, TableToolbar, TableToolbarContent, TableToolbarSearch,
        Table, TableHead, TableRow, TableHeader, TableBody, TableCell,
        Button, OverflowMenuItem, OverflowMenu, Modal, TextInput, Select, SelectItemGroup, SelectItem} from '@carbon/react';
import { AddLarge, OverflowMenuVertical } from '@carbon/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { queryAll, AppDispatch, Person, emptyPerson } from '../../store';
import { checkID } from './id-scanner';


type Header = {key: string, header: string};

const headers = [
    { key: 'rank', header: 'Rank' },
    { key: 'last', header: 'Last Name' },
    { key: 'first', header: 'First Name' },
    { key: 'group', header: 'Group' },
]


const PersonnelTable = (props: any) => {

    return (
        <DataTable rows={props.personnel} headers={headers} >
            {({ rows, headers }) => 

            <TableContainer>
                <TableToolbar>
                    <TableToolbarContent>
                        <TableToolbarSearch onChange = {props.onSearchChange} />
                        <Button renderIcon={AddLarge} onClick={() => {
                            props.setSelectedPerson(emptyPerson)
                            props.setDetailsOpen(true)
                            }}>
                            New
                        </Button>
                    </TableToolbarContent>
                </TableToolbar>
                <Table overflowMenuOnHover={true} isSortable={true}>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableHeader>
                                {header.header}
                            </TableHeader>
                        ))}
                        <TableHeader />
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {rows.map(row =>
                        <TableRow key={row.id} >
                            {row.cells.map(cell =>
                            <TableCell key={cell.id}> {cell.value} </TableCell>)}
                            <TableCell className="bx--table-column-menu">
                                <OverflowMenu  size='sm' light flipped onClick={() => {
                                    checkID(row.id).then(
                                        (result) => {
                                            props.setSelectedPerson(result);
                                            props.setDetailsOpen(true)
                                        },
                                        (error) => { console.log("error: " + error); }
            )
                                } } >
                                </OverflowMenu>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer> }
        </DataTable> 
    )
}


const PersonDetails = (props: any) => {
    const [ editMode, setEditMode ] = useState(false);

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
            modalHeading={ (editMode ? "Edit" : "View" ) + " details"}
            secondaryButtonText={ editMode ? "Cancel" : "Close"}
            primaryButtonText={ editMode ? "Save" : "Edit"}
            onRequestClose={() => {
                props.setDetailsOpen(false)
                setEditMode(false)
            }}
            onRequestSubmit={ () => {
                if (!editMode) {
                    setEditMode(true);
                }
                else {
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
                    setEditMode(false);
                    props.refresh();
                }

            } } >

            <TextInput
                id='id-input'
                labelText="ID (Scan back of ID)"
                disabled={!editMode}
                value={editID}
                style={{marginBottom: '1rem'}}
                onChange={(e) => setEditID(e.target.value)}
            />

            <div id='rank-name=input' className='formGroup' style={{marginBottom:'1rem'}}>
                <Select
                    id='rank-select'
                    labelText="Rank"
                    disabled={!editMode}
                    value={editRank}
                    onChange={(e) => setEditRank(e.target.value)}
                >
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
                    disabled={!editMode}
                    value={editLast}
                    onChange={(e) => setEditLast(e.target.value)}
                />
                <TextInput
                    id='first-name-input'
                    labelText="First name"
                    disabled={!editMode}
                    value={editFirst}
                    onChange={(e) => setEditFirst(e.target.value)}
                />
            </div>

            <div id='room-group-date-input' className='formGroup'>
                <TextInput
                    id='group-input'
                    labelText="Group"
                    disabled={!editMode}
                    value={editGroup}
                    onChange={(e) => setEditGroup(e.target.value)}
                />
                <TextInput
                    id='room-input'
                    labelText="Room"
                    disabled={!editMode}
                    value={editRoom}
                    onChange={(e) => setEditRoom(e.target.value)}
                />
                <TextInput
                    id='leave-date-input'
                    labelText="Leave Date"
                    disabled={!editMode}
                    value={editLeaveDate}
                    onChange={(e) => setEditLeaveDate(e.target.value)}
                />
            </div>

        </Modal>
    )
}


export function PersonnelPage() {

    const [search, setSearch] = useState('');

    const onSearchChange = (e: any) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    }

    const refresh = () => {
        dispatch(queryAll(search));
    }

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        refresh();
    }, [search]);

    const personnel = useSelector((state: any) => state.personnel.personnelData);

    const [ detailsOpen, setDetailsOpen ] = useState(false);
    const [ selectedPerson, setSelectedPerson ] = useState(emptyPerson);

    const detailsProps = {
        person: selectedPerson,
        detailsOpen: detailsOpen,
        setDetailsOpen: setDetailsOpen,
        search: search,
        setSearch: setSearch,
        refresh: refresh
    }

    const tableProps = {
        personnel: personnel,
        headers: headers,
        onSearchChange: onSearchChange,
        setSelectedPerson: setSelectedPerson,
        setDetailsOpen: setDetailsOpen
    }


    return (
        <div>
            <h2>Personnel</h2>
            <br/>
            {PersonDetails(detailsProps)}
            {PersonnelTable(tableProps)}
        </div>
    )
}