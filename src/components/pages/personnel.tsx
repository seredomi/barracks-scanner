import { useState, useEffect } from 'react';
import { DataTable, TableContainer, TableToolbar, TableToolbarContent, TableToolbarSearch,
        Table, TableHead, TableRow, TableHeader, TableBody, TableCell,
        Button, IconButton, Modal } from '@carbon/react';
import { AddLarge, OverflowMenuHorizontal } from '@carbon/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { queryPersonnel, AppDispatch, emptyPerson } from '../../store';
import { checkID } from './id-scanner';
import PersonDetails from '../person-details';
import { invoke } from '@tauri-apps/api/tauri';

const headers = [
    { key: 'rank', header: 'Rank' },
    { key: 'last', header: 'Last Name' },
    { key: 'first', header: 'First Name' },
    { key: 'group', header: 'Group' },
]

const DeleteConfirmModal = (props: any) => {
    return (
        <Modal
            danger={true}
            open={props.deleteConfirmOpen}
            modalHeading='Delete Person'
            secondaryButtonText='Cancel'
            primaryButtonText='Delete'
            onRequestClose={() => { props.setDeleteConfirmOpen(false) }}
            onRequestSubmit={() => {
                props.setDeleteConfirmOpen(false);
                invoke('delete_person', { id: props.person.id }).then(() => {
                    props.refresh();
                })
            }}>
            <br/>
            <p>Are you sure you want to permanently delete {props.person.rank} {props.person.last}, {props.person.first}?</p>
            <br/>
            <p>Only do this if you have verified that this person is no longer authorized to stay here.</p>
        </Modal>
    )
}

const PersonnelTable = (props: any) => {

    return (
        <DataTable rows={props.personnel} headers={headers} >
            {({ rows, headers }) => 

            <TableContainer>
                <TableToolbar>
                    <TableToolbarContent>
                        <TableToolbarSearch onChange = {props.onSearchChange} />
                        <Button renderIcon={AddLarge} onClick={() => {
                            props.setDetailsMode('new')
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
                                <IconButton label='More' size='sm' kind="ghost" onClick={() => {
                                    checkID(row.id).then(
                                        (result) => {
                                            props.setSelectedPerson(result);
                                            props.setDetailsOpen(true)
                                        },
                                        (error) => { console.log("error: " + error); }
            )
                                } } >
                                    <OverflowMenuHorizontal />
                                </IconButton>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer> }
        </DataTable> 
    )
}

export function PersonnelPage() {

    const [search, setSearch] = useState('');
    const onSearchChange = (e: any) => { setSearch(e.target.value); }

    const dispatch = useDispatch<AppDispatch>();
    const refresh = () => { dispatch(queryPersonnel(search)); }
    useEffect(() => { refresh(); }, [search]);

    const personnel = useSelector((state: any) => state.personnel.personnelData);

    const [ detailsOpen, setDetailsOpen ] = useState(false);
    const [ detailsMode, setDetailsMode ] = useState('view');
    const [ selectedPerson, setSelectedPerson ] = useState(emptyPerson);
    const [ deleteConfirmOpen, setDeleteConfirmOpen ] = useState(false);

    const detailsProps = {
        person: selectedPerson,
        detailsOpen: detailsOpen,
        setDetailsOpen: setDetailsOpen,
        detailsMode: detailsMode,
        setDetailsMode: setDetailsMode,
        setDeleteConfirmOpen: setDeleteConfirmOpen,
        refresh: refresh
    }

    const tableProps = {
        personnel: personnel,
        headers: headers,
        onSearchChange: onSearchChange,
        setSelectedPerson: setSelectedPerson,
        setDetailsOpen: setDetailsOpen,
        setDetailsMode: setDetailsMode,
    }

    const deleteConfirmProps = {
        person: selectedPerson,
        deleteConfirmOpen: deleteConfirmOpen,
        setDeleteConfirmOpen: setDeleteConfirmOpen,
        refresh: refresh
    }


    const emptyMessage = () => { 
        if (personnel.length === 0) {
            return <p>No personnel found</p>
        }
    }

    return (
        <div>
            <h2>Personnel</h2>
            {DeleteConfirmModal(deleteConfirmProps)}
            <br/>
            {PersonDetails(detailsProps)}
            {PersonnelTable(tableProps)}
            <br/>
            {emptyMessage()}
        </div>
    )
}