import { useState, useEffect } from 'react';
import { DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, } from '@carbon/react';
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

const PersonnelTable = (rows: Row[], headers: Header[], tableProps: {}, headerProps: {}, rowProps: {}) => {

    return (
        <Table >
            <TableHead>
                <TableRow>
                    {headers.map((header) => (
                        <TableHeader >
                            {header.header}
                        </TableHeader>
                    ))}
                </TableRow>
            </TableHead>
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
    )
}


export function PersonnelPage() {

    console.log("PersonnelPage")
    const dispatch = useDispatch<AppDispatch>();
    console.log("dispatch", dispatch);

    useEffect(() => {
        dispatch(queryAll());
    }, []);
    console.log("useEffect");

    const rows = useSelector((state: any) => state.personnel.personnelData);
    console.log("rows", rows);
    const [tableProps, setTableProps] = useState({});
    const [headerProps, setHeaderProps] = useState({});
    const [rowProps, setRowProps] = useState({});

    return (
        <div>
            <h2>Personnel</h2>
            <br/> <br/>
            {PersonnelTable(rows, headers, tableProps, headerProps, rowProps)}
        </div>
    )
}