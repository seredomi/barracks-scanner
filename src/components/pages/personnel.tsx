import { useState, useEffect } from 'react';
import { DataTable, TableContainer, TableToolbar, TableToolbarContent, TableToolbarSearch,
        Table, TableHead, TableRow, TableHeader, TableBody, TableCell,
        Button, IconButton } from '@carbon/react';
import { AddLarge, OverflowMenuHorizontal, OverflowMenuVertical } from '@carbon/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { queryAll, AppDispatch, emptyPerson } from '../../store';
import { checkID } from './id-scanner';
import PersonDetails from '../person-details';

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

    const refresh = () => { dispatch(queryAll(search)); }

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => { refresh(); }, [search]);

    const personnel = useSelector((state: any) => state.personnel.personnelData);

    const [ detailsOpen, setDetailsOpen ] = useState(false);
    const [ detailsMode, setDetailsMode ] = useState('view');
    const [ selectedPerson, setSelectedPerson ] = useState(emptyPerson);

    const detailsProps = {
        person: selectedPerson,
        detailsOpen: detailsOpen,
        setDetailsOpen: setDetailsOpen,
        detailsMode: detailsMode,
        setDetailsMode: setDetailsMode,
        refresh: refresh
    }

    const tableProps = {
        personnel: personnel,
        headers: headers,
        onSearchChange: onSearchChange,
        setSelectedPerson: setSelectedPerson,
        setDetailsOpen: setDetailsOpen,
        setDetailsMode: setDetailsMode
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