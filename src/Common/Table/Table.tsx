import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Stack } from '@fluentui/react/lib/Stack';

import styles from './Table.module.scss';

function EnhancedTableHead(props: any) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

    return (
        <TableHead sx={{ backgroundColor: "#125895", color: "#fff" }}>
            <TableRow>
                <TableCell padding="checkbox" sx={{ backgroundColor: "#000", color: "#fff" }}>
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
                        sx={{ backgroundColor: "#000", color: "#fff" }}
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

function EnhancedTableToolbar({ numSelected }: any) {
    return (
        <Toolbar>
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <></>
            )}
            {false && numSelected > 0 && (
                <Tooltip title="export">
                    <IconButton aria-label="export">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Client Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'contact', numeric: false, disablePadding: false, label: 'Contact' },
    { id: 'country', numeric: false, disablePadding: false, label: 'Country' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Actions' },
];

const rows = [
    { id: 1, name: 'John Doe', email: 'john@example.com', contact: '1234567890', country: 'USA', location: 'New York' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', contact: '0987654321', country: 'UK', location: 'London' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', contact: '4567890123', country: 'Canada', location: 'Toronto' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', contact: '7890123456', country: 'Australia', location: 'Sydney' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', contact: '0123456789', country: 'India', location: 'Delhi' },
    { id: 6, name: 'David Wilson', email: 'david@example.com', contact: '2345678901', country: 'USA', location: 'New York' },
    { id: 7, name: 'Eve Anderson', email: 'eve@example.com', contact: '5678901234', country: 'UK', location: 'London' },
    { id: 8, name: 'Frank Martinez', email: 'frank@example.com', contact: '8901234567', country: 'Canada', location: 'Toronto' },
];

const GridTable = ({ props, searchQuery }: any) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState<any>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

    return (
        <Stack tokens={{ childrenGap: 10 }}>
            <Stack.Item>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2, mt: 2 }}>
                        {false && <EnhancedTableToolbar numSelected={selected.length} />}
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
                                                        <TableCell component="th" id={labelId} scope="row" padding="none">
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
                                                        </TableCell>
                                                        <TableCell component="th" id={labelId} scope="row" padding="none">
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
                                                        </TableCell>
                                                        <TableCell component="th" id={labelId} scope="row" padding="none">
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
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <div className="d-flex align-items-center justify-content-around w-100">
                                                                <div>
                                                                    <Tooltip title="View">
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
                                                                <div>
                                                                    <Button className={`${styles.viewbutton}`} onClick={() => handleViewUploadDocuments(row.id)}>
                                                                        View/Upload Documents
                                                                    </Button>
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
                </Box>
            </Stack.Item>

        </Stack>
    );
};
export default GridTable;
