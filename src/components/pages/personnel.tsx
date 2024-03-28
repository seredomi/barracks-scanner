import { useState, useEffect } from 'react';
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


const PersonnelTable = (personnel: Person[], headers: Header[], onSearchChange: any, setSelectedPerson, setDetailsOpen) => {

    return (
        <DataTable rows={personnel} headers={headers} >
            {({ rows, headers }) => 

            <TableContainer>
                <TableToolbar>
                    <TableToolbarContent>
                        <TableToolbarSearch onChange = {onSearchChange} />
                        <Button renderIcon={AddLarge} onClick={() => {
                            setDetailsOpen(true)
                            setSelectedPerson(personnel[0])
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
                                            setSelectedPerson(result);
                                            console.log(result);
                                            setDetailsOpen(true)
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


const PersonDetails = (person: any, detailsOpen: boolean, setDetailsOpen: (arg0: boolean) => void) => {
    const [ editMode, setEditMode ] = useState(false);

    return (
        <Modal
            open={detailsOpen}
            onRequestClose={() => {
                setDetailsOpen(false)
                setEditMode(false)
            }}
            modalHeading={ (editMode ? "Edit" : "View" ) + " details"}
            secondaryButtonText="Cancel"
            primaryButtonText={ editMode ? "Save" : "Edit"}
        >
            <TextInput
                id='id-input'
                labelText="ID (Scan back of ID)"
                disabled={!editMode}
                value={person.id}
                style={{marginBottom: '1rem'}}
            />

            <div id='rank-name=input' className='formGroup' style={{marginBottom:'1rem'}}>
                <Select
                    id='rank-select'
                    labelText="Rank"
                    disabled={!editMode}
                    value={person.rank}
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
                    value={person.last}
                />
                <TextInput
                    id='first-name-input'
                    labelText="First name"
                    disabled={!editMode}
                    value={person.first}
                />
            </div>

            <div id='room-group-date-input' className='formGroup'>
                <TextInput
                    id='group-input'
                    labelText="Group"
                    disabled={!editMode}
                    value={person.group}
                />
                <TextInput
                    id='room-input'
                    labelText="Room"
                    disabled={!editMode}
                    value={person.room}
                />
                <TextInput
                    id='leave-date-input'
                    labelText="Leave Date"
                    disabled={!editMode}
                    value={person.leave_date}
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
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(queryAll(search));
    }, [search]);


    const personnel = useSelector((state: any) => state.personnel.personnelData);

    const [ detailsOpen, setDetailsOpen ] = useState(false);
    const [ selectedPerson, setSelectedPerson ] = useState(emptyPerson);

    return (
        <div>
            <h2>Personnel</h2>
            <br/>
            {PersonDetails(selectedPerson, detailsOpen, setDetailsOpen)}
            {PersonnelTable(personnel, headers, onSearchChange, setSelectedPerson, setDetailsOpen )}
        </div>
    )
}