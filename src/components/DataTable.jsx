import React, { useState } from 'react'

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, useTheme } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CopyIcon from '@mui/icons-material/CopyAll';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AlertDialog from './AlertDialog';

class LockedCell extends React.Component {
    ref;

    getSnapshotBeforeUpdate(prevProps) {
        if (!this.ref) {
            return null;
        }

        const isDragStarting =
            this.props.isDragging && !prevProps.isDragging;

        if (!isDragStarting) {
            return null;
        }

        const { width, height } = this.ref.getBoundingClientRect();

        const snapshot = {
            width,
            height
        };

        return snapshot;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const ref = this.ref;
        if (!ref) {
            return;
        }

        if (snapshot) {
            if (ref.style.width === snapshot.width) {
                return;
            }
            ref.style.width = `${snapshot.width}px`;
            ref.style.height = `calc(${snapshot.height} - 10)px`;
            return;
        }

        if (this.props.isDragging) {
            return;
        }

        // inline styles not applied
        if (ref.style.width == null) {
            return;
        }

        // no snapshot and drag is finished - clear the inline styles
        ref.style.removeProperty("height");
        ref.style.removeProperty("width");
    }

    setRef = (ref) => {
        this.ref = ref;
    };

    render() {
        return <TableCell key={this.props.column.id} align={this.props.column.align} ref={this.setRef}>{this.props.children}</TableCell>;
    }
}

const DataTable = (props) => {
    const theme = useTheme();

    const [alertOpen, SetAlertOpen] = useState(false);
    const [data, SetData] = useState();

    const handleDelete = (data) => {
        SetAlertOpen(true);
        SetData(data);
    }

    return (
        <Box sx={{ width: '90%', overflow: 'hidden' }}>
            < Paper>
                <DragDropContext onBeforeDragStart={(results) => props.handleBeforeDragStart(results)} onDragEnd={(results) => props.handleDragEnd(results)}>
                    <TableContainer sx={{ maxHeight: props.height || "65vh" }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {
                                        props.columns.map((column) => {
                                            if (!props.isDragAllowed || column.id !== "actions") {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth, fontWeight: 600 }}
                                                        sx={{ bgcolor: theme.palette.table.head }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                )
                                            }
                                            return ([])
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <Droppable droppableId="droppable">
                                {(provider) => (
                                    <TableBody
                                        className="text-capitalize"
                                        ref={provider.innerRef}
                                        {...provider.droppableProps}>
                                        {
                                            props.rows.map((row, index) => (
                                                <Draggable
                                                    key={index + ""}
                                                    draggableId={index + ""}
                                                    index={index}>
                                                    {(provider) => (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.index}
                                                            ref={provider.innerRef}
                                                            {...provider.draggableProps}
                                                            {...props.isDragAllowed ? { ...provider.dragHandleProps } : {}}>
                                                            {
                                                                props.columns.map((column) => {
                                                                    if (!props.isDragAllowed || column.id !== "actions") {
                                                                        return (
                                                                            <LockedCell key={column.id} align={column.align} column={column} isDragging={props.selectedRowIndex === index}>
                                                                                {column.id !== "actions" && row[column.id]}
                                                                                < Box sx={{ gap: "10px", alignItems: "center", justifyContent: "center", display: column.id === "actions" ? "flex" : "none" }}>
                                                                                    <Button variant='contained' onClick={() => props.handleUnbanUser(row["data"])} sx={{ display: row["actions"] && row["actions"].some(x => x === "ban") ? row["data"].isBanned ? "block" : "none" : "none", fontWeight: 600 }}>Unban</Button>
                                                                                    <Button variant='contained' onClick={() => props.handleBanUser(row["data"])} sx={{ display: row["actions"] && row["actions"].some(x => x === "ban") ? !row["data"].isBanned ? "block" : "none" : "none", fontWeight: 600 }}>Ban</Button>
                                                                                    <Button onClick={() => props.handlePlayInfo(row["data"])} sx={{ display: row["actions"] && row["actions"].some(x => x === "playInfo") ? "block" : "none" }}><PlayArrowIcon /></Button>
                                                                                    <Button onClick={() => props.handleEdit(row["data"])} sx={{ display: row["actions"] && row["actions"].some(x => x === "edit") ? "block" : "none" }}><EditIcon /></Button>
                                                                                    <Button onClick={() => props.handleCopy(row["data"])} sx={{ display: row["actions"] && row["actions"].some(x => x === "copy") ? "block" : "none" }}><CopyIcon /></Button>
                                                                                    <Button onClick={() => handleDelete(row["data"])} sx={{ display: row["actions"] && row["actions"].some(x => x === "delete") ? "block" : "none" }}><DeleteIcon /></Button>
                                                                                    <Button onClick={() => props.handleForward(row["data"])} sx={{ display: row["actions"] && row["actions"].some(x => x === "forward") ? "block" : "none" }}> <ArrowForwardIcon /></Button>
                                                                                    <Button variant='contained' onClick={() => props.handleView(row["data"])} sx={{ display: row["actions"] && row["actions"].some(x => x === "view") ? "block" : "none", fontWeight: 600 }}>View</Button>
                                                                                    <Button variant='contained' onClick={() => props.handleApprove(row["data"])} sx={{ display: row["actions"] && row["actions"].some(x => x === "approve") ? "block" : "none", fontWeight: 600 }}>Approve</Button>
                                                                                    <Button variant='contained' onClick={() => props.handleReject(row["data"])} sx={{ display: row["actions"] && row["actions"].some(x => x === "reject") ? "block" : "none", fontWeight: 600 }}>Reject</Button>
                                                                                </Box >
                                                                            </LockedCell>
                                                                        );
                                                                    }
                                                                    return ([])
                                                                })
                                                            }
                                                        </TableRow>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provider.placeholder}
                                    </TableBody>
                                )}
                            </Droppable>
                        </Table>
                    </TableContainer>
                </DragDropContext >
                {
                    (props.showPagination) &&
                    <TablePagination
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={props.rowsLength}
                        rowsPerPage={props.rowsPerPage}
                        page={props.page}
                        onPageChange={props.handleChangePage}
                        onRowsPerPageChange={props.handleChangeRowsPerPage}
                    />
                }
            </Paper >

            <AlertDialog
                open={alertOpen}
                SetOpen={SetAlertOpen}

                title={"Are you sure you want to delete?"}

                handleYes={() => { props.handleDelete(data) }}
            />
        </Box>
    )
}

export default DataTable