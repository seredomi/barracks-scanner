import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getExpiredPersonnel, AppDispatch, emptyPerson }  from './store';
import { DataTable, TableContainer, TableToolbar, TableToolbarContent, TableToolbarSearch,
        Table, TableHead, TableRow, TableHeader, TableBody, TableCell,
        TableBatchAction, TableBatchActions, TableSelectAll, TableSelectRow,
        Button, IconButton, Modal, DatePicker, DatePickerInput } from '@carbon/react';
import { TrashCan } from '@carbon/icons-react';
import { CronJob } from 'cron';


const headers = [
    { key: 'rank', header: 'Rank' },
    { key: 'last', header: 'Last Name' },
    { key: 'first', header: 'First Name' },
    { key: 'group', header: 'Group' },
    // { key: 'leave_date', header: 'Leave Date' },
]

const ExpiredTable = (props: any) => {

    const [selectedCount, setSelectedCount] = useState(0);

    return (
        <DataTable rows={props.expiredPersonnel} headers={props.headers} >
            {({ rows, headers }) => 
            <TableContainer title=" " description="These personnel are no longer authorized to enter the barracks. Extend their leave date or delete them from the system.">
                <Table overflowMenuOnHover={true} isSortable={true}>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableHeader>
                                    {header.header}
                                </TableHeader>
                            ))}
                        <TableHeader >Leave Date</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row =>
                        <TableRow key={row.id} >
                            {row.cells.map(cell =>
                            <TableCell key={cell.id}> {cell.value} </TableCell>)}
                            <TableCell >
                                <DatePicker 
                                    datePickerType='single'
                                    minDate={Date.now()}
                                    value={new Date("2025-01-02")}
                                    dateFormat='Y-m-d'
                                    short={true}
                                    
                                >
                                    <DatePickerInput
                                        light="true"
                                        short="true"
                                        datePickerType='single'
                                        inputMode={'text'}
                                        id='leave-date-input'
                                        labelText=''
                                        placeholder='YYYY-MM-DD'
                                        
                                    />

                                </DatePicker>

                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </DataTable>
    )
}



export function PurgeModal() {

    const [ purgeModalOpen, setPurgeModalOpen ] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    function fetchExpired() {
        dispatch(getExpiredPersonnel());
        setPurgeModalOpen(true);
    }

    // new CronJob(
    //     '0,10,20,30,40,50 * * * * *',
    //     fetchExpired, null, true
    // );
    const expiredPersonnel = useSelector((state: any) =>
    state.expiredPersonnel.personnelData);

    const tableProps = {
        expiredPersonnel: expiredPersonnel,
        headers: headers
    }

    return (
        <Modal
            open={purgeModalOpen}
            danger
            modalHeading="Expired personnel"
            onRequestClose={() => setOpenPurgeModal(false)}
            passiveModal={true}
            preventCloseOnClickOutside={true}
            isFullWidth={true}
        >
            {ExpiredTable(tableProps)}

        </Modal>
    );
}