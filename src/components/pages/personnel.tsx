import { useState, useEffect } from 'react';
import { DataTable, TableContainer, TableToolbar, TableToolbarContent, TableToolbarAction, TableToolbarSearch, TableToolbarMenu, Button, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, } from '@carbon/react';
import { AddLarge } from '@carbon/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { queryAll } from '../../store';
import { AppDispatch } from '../../store';


type Header = {key: string, header: string};
type Row = {id: string, rank: string, last: string, first: string, group: string};

const headers = [
    { key: 'rank', header: 'Rank' },
    { key: 'last', header: 'Last Name' },
    { key: 'first', header: 'First Name' },
    { key: 'group', header: 'Group' },
]

const PersonnelTableHeaders = (headers: Header[], rows: Row[]) => {
    if (rows.length === 0) { return null; }
    return (
        <TableHead>
            <TableRow>
                {headers.map((header) => (
                    <TableHeader >
                        {header.header}
                    </TableHeader>
                ))}
            </TableRow>
        </TableHead>
    )
}

const PersonnelTable = (rows: Row[], headers: Header[], onSearchChange: any) => {

    return (
        <TableContainer>
            <TableToolbar>
                <TableToolbarContent>
                    <TableToolbarSearch onChange = {onSearchChange} />
                    <Button renderIcon={AddLarge} onClick={() => console.log("Add button clicked")}>
                        New
                    </Button>
                </TableToolbarContent>
            </TableToolbar>
            <Table >
                {PersonnelTableHeaders(headers, rows)}
                <TableBody>
                    {rows.map((row) => (
                        <TableRow >
                            <TableCell key={row.id}> {row.rank} </TableCell>
                            <TableCell key={row.id}> {row.last} </TableCell>
                            <TableCell key={row.id}> {row.first} </TableCell>
                            <TableCell key={row.id}> {row.group} </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export function PersonnelPage() {

    const [search, setSearch] = useState('');

    const onSearchChange = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    }
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(queryAll(search));
    }, [search]);


    const rows = useSelector((state: any) => state.personnel.personnelData);

    return (
        <div>
            <h2>Personnel</h2>
            <br/>
            {PersonnelTable(rows, headers, onSearchChange)}
        </div>
    )
}