import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Grid, Stack, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// import styles from './Table.module.scss';
import Button from "../Button/CustomButton";

function EnhancedTableHead(props: any) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

    return (
        <TableHead sx={{ backgroundColor: "#125895", color: "#fff", maxWidth: '100%' }}>
            <TableRow>
                <TableCell padding="checkbox" sx={{ backgroundColor: "#125895", color: "#fff" }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all clients',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{ backgroundColor: "#125895", color: "#fff" }}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        aria-label={headCell.label}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>

        </TableHead>


    );
}

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Client Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Client email' },
    // { id: 'contact', numeric: false, disablePadding: false, label: 'Contact' },
    // { id: 'country', numeric: false, disablePadding: false, label: 'Country' },
    // { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
    { id: 'modifiedDate', numeric: false, disablePadding: false, label: 'Modified Date' },
    { id: 'modifiedBy', numeric: false, disablePadding: false, label: 'Modified By' },
    { id: 'assignedStaff', numeric: false, disablePadding: false, label: 'Assigned Staff' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Actions' },
];

const rows = [
    { id: 1, name: 'John Doe', email: 'john@example.com', modifiedDate: 'MM/DD/YYYY', modifiedBy: 'MM/DD/YYYY', assignedStaff: 'Smith Martinez ' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', modifiedDate: 'MM/DD/YYYY', modifiedBy: 'MM/DD/YYYY', assignedStaff: 'Diego Charlie' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', modifiedDate: 'MM/DD/YYYY', modifiedBy: 'MM/DD/YYYY', assignedStaff: 'Marco Doe' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', modifiedDate: 'MM/DD/YYYY', modifiedBy: 'MM/DD/YYYY', assignedStaff: 'Altair Martinez' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', modifiedDate: 'MM/DD/YYYY', modifiedBy: 'MM/DD/YYYY', assignedStaff: 'Martinez' },
    { id: 6, name: 'David Wilson', email: 'david@example.com', modifiedDate: 'MM/DD/YYYY', modifiedBy: 'MM/DD/YYYY', assignedStaff: 'Antonio Rabin' },
    { id: 7, name: 'Eve Anderson', email: 'eve@example.com', modifiedDate: 'MM/DD/YYYY', modifiedBy: 'MM/DD/YYYY', assignedStaff: 'Etahn Martin' },
    { id: 8, name: 'Frank Martinez', email: 'frank@example.com', modifiedDate: 'MM/DD/YYYY', modifiedBy: 'MM/DD/YYYY', assignedStaff: 'Henry ' },
];

const GridTable = ({ props, searchQuery, selected, setSelected }: any) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleView = (id: any) => {
        console.log(`View clicked for row ${id}`);
    };

    const handleEdit = (id: any) => {
        console.log(`Edit clicked for row ${id}`);
    };

    const handleDelete = (id: any) => {
        console.log(`Delete clicked for row ${id}`);
    };

    const handleViewUploadDocuments = (id: any) => {
        console.log(`View/Upload Documents clicked for row ${id}`);
    };

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: any, id: any) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: any[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: any) => selected.indexOf(id) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const filteredRows = searchQuery
        ? rows.filter((row) =>
            Object.values(row).some(
                (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        : rows;

    const handleAssignStaff = () => {
        // setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelected([]);
        setOpenDialog(false);
    };

    const handleSaveStaff = () => {
        console.log("Saving staff...");
        handleCloseDialog();
    };

    return (
        <Box sx={{ width: '100' }}>
            <Stack>
                <Grid  >
                    <Grid item xs={12}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <TableContainer>
                                <Table>
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={filteredRows.length}
                                    />
                                    <TableBody>
                                        {filteredRows.length > 0
                                            ? filteredRows
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => {
                                                    const isItemSelected = isSelected(row.id);
                                                    const labelId = `enhanced-table-checkbox-${row.id}`;

                                                    return (
                                                        <TableRow
                                                            hover
                                                            onClick={(event) => handleClick(event, row.id)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={row.id}
                                                            selected={isItemSelected}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    sx={{ color: 'black' }}
                                                                    checked={isItemSelected}
                                                                    inputProps={{
                                                                        'aria-labelledby': labelId,
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                                {searchQuery && row.name.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                                                                    <>
                                                                        {row.name.toLowerCase().split(searchQuery.toLowerCase()).map((part, index) => (
                                                                            <span key={index}>
                                                                                {index > 0 && (
                                                                                    <span style={{ backgroundColor: 'yellow' }}>{searchQuery}</span>
                                                                                )}
                                                                                {part}
                                                                            </span>
                                                                        ))}
                                                                    </>
                                                                ) : (
                                                                    row.name
                                                                )}
                                                            </TableCell>
                                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                                {searchQuery && row.email.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                                                                    <>
                                                                        {row.email.toLowerCase().split(searchQuery.toLowerCase()).map((part, index) => (
                                                                            <span key={index}>
                                                                                {index > 0 && (
                                                                                    <span style={{ backgroundColor: 'yellow' }}>{searchQuery}</span>
                                                                                )}
                                                                                {part}
                                                                            </span>
                                                                        ))}
                                                                    </>
                                                                ) : (
                                                                    row.email
                                                                )}
                                                            </TableCell>
                                                            {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                        {searchQuery && row.contact.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                            <>
                                {row.contact.toLowerCase().split(searchQuery.toLowerCase()).map((part, index) => (
                                    <span key={index}>
                                        {index > 0 && (
                                            <span style={{ backgroundColor: 'yellow' }}>{searchQuery}</span>
                                        )}
                                        {part}
                                    </span>
                                ))}
                            </>
                        ) : (
                            row.contact
                        )}
                    </TableCell> */}

                                                            {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                        {searchQuery && row.country.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                            <>
                                {row.country.toLowerCase().split(searchQuery.toLowerCase()).map((part, index) => (
                                    <span key={index}>
                                        {index > 0 && (
                                            <span style={{ backgroundColor: 'yellow' }}>{searchQuery}</span>
                                        )}
                                        {part}
                                    </span>
                                ))}
                            </>
                        ) : (
                            row.country
                        )}
                    </TableCell> */}
                                                            {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                        {searchQuery && row.location.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                            <>
                                {row.location.toLowerCase().split(searchQuery.toLowerCase()).map((part, index) => (
                                    <span key={index}>
                                        {index > 0 && (
                                            <span style={{ backgroundColor: 'yellow' }}>{searchQuery}</span>
                                        )}
                                        {part}
                                    </span>
                                ))}
                            </>
                        ) : (
                            row.location
                        )}
                    </TableCell> */}
                                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                                {searchQuery && row.modifiedDate.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                                                                    <>
                                                                        {row.modifiedDate.toLowerCase().split(searchQuery.toLowerCase()).map((part, index) => (
                                                                            <span key={index}>
                                                                                {index > 0 && (
                                                                                    <span style={{ backgroundColor: 'yellow' }}>{searchQuery}</span>
                                                                                )}
                                                                                {part}
                                                                            </span>
                                                                        ))}
                                                                    </>
                                                                ) : (
                                                                    row.modifiedDate
                                                                )}
                                                            </TableCell>
                                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                                {searchQuery && row.modifiedBy.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                                                                    <>
                                                                        {row.modifiedBy.toLowerCase().split(searchQuery.toLowerCase()).map((part, index) => (
                                                                            <span key={index}>
                                                                                {index > 0 && (
                                                                                    <span style={{ backgroundColor: 'yellow' }}>{searchQuery}</span>
                                                                                )}
                                                                                {part}
                                                                            </span>
                                                                        ))}
                                                                    </>
                                                                ) : (
                                                                    row.modifiedBy
                                                                )}
                                                            </TableCell>
                                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                                {searchQuery && row.assignedStaff.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                                                                    <>
                                                                        {row.assignedStaff.toLowerCase().split(searchQuery.toLowerCase()).map((part, index) => (
                                                                            <span key={index}>
                                                                                {index > 0 && (
                                                                                    <span style={{ backgroundColor: 'yellow' }}>{searchQuery}</span>
                                                                                )}
                                                                                {part}
                                                                            </span>
                                                                        ))}
                                                                    </>
                                                                ) : (
                                                                    row.assignedStaff
                                                                )}
                                                            </TableCell>

                                                            <TableCell width={"40%"} align="left" padding="none" >
                                                                <div className="d-flex align-items-center w-100 ">
                                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                                        <Tooltip title="View" >
                                                                            <IconButton onClick={() => handleView(row.id)}>
                                                                                <VisibilityIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title="Edit">
                                                                            <IconButton onClick={() => handleEdit(row.id)}>
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title="Delete">
                                                                            <IconButton onClick={() => handleDelete(row.id)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',

                                                                            marginLeft: '15px',
                                                                            width: "100%",
                                                                            gap: "20px"
                                                                        }}>
                                                                        {/* <Button
                                                                            className={`${styles.viewbutton}`}
                                                                            onClick={() => handleViewUploadDocuments(row.id)}>
                                                                            View/Upload Documents
                                                                        </Button> */}
                                                                        <Button
                                                                            style={{ maxWidth: "230px", whiteSpace: "pre" }}
                                                                            color={"primary"}
                                                                            message="View/Upload Documents"
                                                                            handleClick={
                                                                                () => handleViewUploadDocuments(row.id)}
                                                                        />
                                                                        {/* <Button variant="contained"
                                                                            color="primary"
                                                                            onClick={handleAssignStaff} style={{
                                                                                backgroundColor: '#dba236',
                                                                                color: 'black',
                                                                                marginLeft: '30px',
                                                                                borderRadius: '4px',
                                                                                padding: '2px 10px'
                                                                            }}>
                                                                            Assign Staff
                                                                        </Button> */}
                                                                        <Button
                                                                            style={{ maxWidth: "200px", whiteSpace: "pre" }}
                                                                            color={"secondary"}
                                                                            message="Assign Staff"
                                                                            handleClick={handleAssignStaff}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </TableCell>



                                                        </TableRow>
                                                    );
                                                }) :
                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    No Records Found
                                                </TableCell>
                                            </TableRow>
                                        }
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={filteredRows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Grid>
                </Grid>

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="assign-staff-dialog-title"
                >
                    <DialogTitle id="assign-staff-dialog-title">Assign Staff</DialogTitle>
                    <DialogContent>
                        {/* //peple picker */}
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button> */}
                        <Button
                            style={{ maxWidth: "200px", whiteSpace: "pre" }}
                            color={"secondary"}
                            message="Cancel"
                            handleClick={handleCloseDialog}
                        />
                        {/* <Button onClick={handleSaveStaff} color="primary">
                            Save
                        </Button> */}
                        <Button
                            style={{ maxWidth: "200px", whiteSpace: "pre" }}
                            color={"primary"}
                            message="Save"
                            handleClick={handleSaveStaff}
                        />
                    </DialogActions>
                </Dialog>
            </Stack>
        </Box>
    );
};
export default GridTable;

