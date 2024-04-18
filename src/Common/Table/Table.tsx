import * as React from 'react';
import Box from '@mui/material/Box';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Grid } from '@mui/material';
import Button from "../Button/CustomButton";


function EnhancedTableHead(props: any) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, headCells } = props;

    return (
        <TableHead sx={{ backgroundColor: "#125895", color: "#fff", maxWidth: '100%' }}>
            <TableRow>
                <TableCell padding="checkbox" sx={{ backgroundColor: "#125895", color: "#fff" }}>
                    <Checkbox
                        sx={{
                            color: onSelectAllClick ? "#fff !important" :
                                "#000 !important",
                        }}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all clients',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell: any) => (
                    <TableCell
                        sx={{ backgroundColor: "#125895", color: "#fff", fontWeight: 600 }}
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

const GridTable = ({ props, searchQuery, setSelected, selected, rows, headCells, handleAssign }: any) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');

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
            const newSelected = rows.map((n: any, idx: any) => idx + 1);
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
        ? rows.filter((row: any) =>
            Object.values(row).some(
                (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        : rows;

    return (
        <Box>
            <Grid container  >
                <Grid item xs={12} >
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table>
                                <EnhancedTableHead
                                    headCells={headCells}
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
                                            .map((row: any, idx: any) => {
                                                const isItemSelected = isSelected(idx + 1);
                                                const labelId = `enhanced-table-checkbox-${idx + 1}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, idx + 1)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={idx + 1}
                                                        selected={isItemSelected}
                                                        sx={{ cursor: 'pointer', height: "55px" }}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                // sx={{ color: 'black' }}
                                                                checked={isItemSelected}
                                                                inputProps={{
                                                                    'aria-labelledby': labelId,
                                                                }}
                                                            />
                                                        </TableCell>
                                                        {Object.values(row).map((cellData: string, cellIndex) => (
                                                            <TableCell key={cellIndex} component="th" scope="row" padding="none">
                                                                {searchQuery && cellData && typeof cellData === 'string' && cellData.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                                                                    <>
                                                                        {cellData.toLowerCase().split(searchQuery.toLowerCase()).map((part: any, index: any) => (
                                                                            <React.Fragment key={index}>
                                                                                {index > 0 && (
                                                                                    <span style={{ backgroundColor: 'yellow' }}>{searchQuery}</span>
                                                                                )}
                                                                                {part}
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </>
                                                                ) : (
                                                                    cellData
                                                                )}
                                                            </TableCell>
                                                        ))}
                                                        <TableCell width={"40%"} align="left" padding="none">
                                                            <div className="d-flex align-items-center w-100">
                                                                <div style={{ display: 'flex', gap: '10px' }}>
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
                                                                <div
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        marginLeft: '15px',
                                                                        marginRight: '15px',
                                                                        width: "100%",
                                                                        gap: "20px"
                                                                    }}>

                                                                    <Button
                                                                        style={{ maxWidth: "230px", whiteSpace: "pre" }}
                                                                        color={"primary"}
                                                                        message="View/Upload Documents"
                                                                        handleClick={
                                                                            () => handleViewUploadDocuments(row.id)}
                                                                    />

                                                                    <Button
                                                                        style={{ maxWidth: "200px", whiteSpace: "pre" }}
                                                                        color={"secondary"}
                                                                        message="Assign Client"
                                                                        handleClick={handleAssign}
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
        </Box>
    );
};
export default GridTable;



