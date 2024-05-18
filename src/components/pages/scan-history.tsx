import { useState, useEffect } from 'react';
import { DataTable, TableContainer, TableToolbar, TableToolbarContent, TableToolbarSearch,
    Table, TableHead, TableRow, TableHeader, TableBody, TableCell, DatePicker, DatePickerInput } from '@carbon/react';
import { useSelector, useDispatch } from 'react-redux';
import { queryLogs, AppDispatch, LogQuery } from '../../store';
import { formatCalendarDate } from '../../classes/date';

const headers = [
    { key: 'date', header: 'Date' },
    { key: 'time', header: 'Time' },
    { key: 'rank', header: 'Rank' },
    { key: 'last', header: 'Last Name' },
    { key: 'first', header: 'First Name' },
]

const LogsTable = (props: any) => {

    return (
        <DataTable rows={props.logs} headers={headers} >
            {({ rows, headers }) => 

            <TableContainer>
                <TableToolbar>
                    <TableToolbarContent>
                        <TableToolbarSearch onChange = { (e: any) => props.setSearch(e.target.value) } />
                        <DatePicker 
                            datePickerType="range"
                            dateFormat='Y-m-d'
                            onChange={ (e) => {
                                props.setStartDate(formatCalendarDate(e[0].toLocaleString()));
                                props.setEndDate(formatCalendarDate(e[1].toLocaleString()));
                            } }
                            >
                            <DatePickerInput 
                                id="date-picker-input-id-start" 
                                labelText=" "
                                placeholder="Start"
                                defaultValue={formatCalendarDate(new Date(Date.now()).toLocaleString())}
                                 />
                            <DatePickerInput 
                                id="date-picker-input-id-start" 
                                labelText=" "
                                defaultValue={formatCalendarDate(new Date(Date.now()).toLocaleString())}
                                placeholder="End" />

                        </DatePicker>
                    </TableToolbarContent>
                </TableToolbar>
                <Table overflowMenuOnHover={true} isSortable={true}>
                <TableHead>
                    <TableRow>
                        {headers.map((header: any) => (
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
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer> }
        </DataTable> 
    )
}

export function ScanHistoryPage() {

    const [ search, setSearch ] = useState<string>("");
    const [ startDate, setStartDate ] = useState<string>(formatCalendarDate(new Date(Date.now()).toLocaleString()));
    const [ endDate, setEndDate ] = useState<string>(formatCalendarDate(new Date(Date.now()).toLocaleString()));
    const [ query, setQuery ] = useState<LogQuery>({ search: search, startDate: startDate, endDate: endDate });

    useEffect (() => {
        setQuery({ search: search, startDate: startDate, endDate: endDate });
    }, [search, startDate, endDate]);

    const logs = useSelector((state: any) => state.logs.logsData);

    const tableProps = {
        logs: logs,
        headers: headers,
        setSearch: setSearch,
        setStartDate: setStartDate,
        setEndDate: setEndDate,
    }

    const dispatch = useDispatch<AppDispatch>();
    const refresh = () => { dispatch(queryLogs(query)) }
    useEffect(() => { refresh(); }, [query]);

    return (
        <div>
            <h2>Scan History</h2>
            <br/>
            {LogsTable(tableProps)}
        </div>
    )
}