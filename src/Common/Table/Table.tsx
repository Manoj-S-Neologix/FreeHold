/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-expressions */
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
import { CircularProgress, Grid } from '@mui/material';


interface Action {
    label: string;
    icon?: React.ReactNode;
    button?: React.ReactNode;
    handler?: (id: string | number) => void;
}

function EnhancedTableHead(props: any) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, headCells } = props;

    return (
        <TableHead sx={{ backgroundColor: "#125895", color: "#fff", maxWidth: '100%' }}>
            <TableRow>
                <TableCell padding="checkbox" sx={{ backgroundColor: "#125895", color: "#fff" }}>
                    <Checkbox
                        sx={{
                            color: onSelectAllClick ? "#fff !important" : "#000 !important",
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

const GridTable = ({ props, searchQuery, setSelected, selected, rows, tableData, headCells, actions, isLoading }: any) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    console.log(rows, tableData, "rowsrows");

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelected = rows.map((n: any, idx: any) => n.Id);
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

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
            <Grid container>
                <Grid item xs={12}>
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
                                    {!isLoading && filteredRows.length > 0 ? (
                                        filteredRows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row: any, idx: any) => {
                                                const isItemSelected = isSelected(row.Id);
                                                const labelId = `enhanced-table-checkbox-${row.Id}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.Id)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.Id}
                                                        selected={isItemSelected}
                                                        sx={{ cursor: 'pointer', height: "55px" }}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                checked={isItemSelected}
                                                                inputProps={{
                                                                    'aria-labelledby': labelId,
                                                                }}
                                                            />
                                                        </TableCell>
                                                        {/* {Object.values(row).map((cellData: string, cellIndex) => (
                                                            <TableCell
                                                                key={cellIndex}
                                                                component="th"
                                                                scope="row"
                                                                padding="none"
                                                            >
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
                                                                    cellData ? cellData : '-'
                                                                )}
                                                            </TableCell>
                                                        ))} */}
                                                        {console.log(headCells, row, "headCellsheadCells")}
                                                        {headCells.map((headCell: any) => (
                                                            row.hasOwnProperty(headCell.id) &&
                                                            <TableCell
                                                                key={headCell.id}
                                                                component="th"
                                                                scope="row"
                                                                padding="none"
                                                            >
                                                                {searchQuery && row[headCell.id] &&
                                                                    typeof row[headCell.id] === 'string' &&
                                                                    row[headCell.id].toLowerCase().includes(searchQuery.toLowerCase()) ? (
                                                                    <>
                                                                        {row[headCell.id].toLowerCase().split(searchQuery.toLowerCase()).map((part: any, index: any) => (
                                                                            <React.Fragment key={index}>
                                                                                {index > 0 && (
                                                                                    <span style={{ backgroundColor: 'yellow' }}>{searchQuery}</span>
                                                                                )}
                                                                                {part}
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </>
                                                                ) : (
                                                                    row[headCell.id] ? row[headCell.id] : '-'
                                                                )}
                                                            </TableCell>
                                                        ))}

                                                        <TableCell width={"40%"} align="left" padding="none">
                                                            <div className="d-flex align-items-center w-100">
                                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                                    {actions.map((action: Action, index: number) => (
                                                                        action.button ? (
                                                                            <IconButton
                                                                                key={index}
                                                                                onClick={(e) => {
                                                                                    e?.stopPropagation();
                                                                                    action.handler && action.handler(row);
                                                                                }}
                                                                            >
                                                                                {action.button}
                                                                            </IconButton>
                                                                        ) : (
                                                                            <Tooltip key={index} title={action.label}>
                                                                                <IconButton
                                                                                    onClick={(e) => {
                                                                                        e?.stopPropagation();
                                                                                        action.handler && action.handler(row);
                                                                                    }}
                                                                                >
                                                                                    {action.icon}
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        )
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                    ) : (
                                        !isLoading && <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                No Records Found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {!isLoading && emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={7} />
                                        </TableRow>
                                    )}
                                    {isLoading &&
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                <CircularProgress size={20} />
                                            </TableCell>
                                        </TableRow>
                                    }
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
        </Box >
    );
};

export default GridTable;
