import React, { useState } from 'react';

import { Box, Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';

import { createGameRoom, deleteGameRoom, sortGameRoom, updateGameRoom } from '../../../services/api';

import DataTable from '../../../components/DataTable';
import AddEditModal from './AddEditModal';

const Rooms = (props) => {
    const theme = useTheme();

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const [selectedOption, SetSelectedOption] = useState("");

    const [roomId, SetRoomId] = useState("");
    const [roomParameters, SetRoomParameters] = useState([]);
    const [visibility, SetVisibility] = useState(false);
    const [name, SetName] = useState("");

    const [isDragAllowed, SetDragAllowed] = useState(false);
    const [selectedRowIndex, SetSelectedRowIndex] = useState(-1);

    const handleNew = () => {

        SetVisibility(false);
        SetName("");

        let _roomParameters = [];

        props.dynamicColumns.forEach((column) => {
            _roomParameters.push({
                id: column.id,
                label: column.label,
                value: column.defaultValue
            })
        });

        SetRoomParameters(_roomParameters);

        SetModalTitle("Create New Room");

        SetSelectedOption("new");
        SetModalOpen(true);
    }

    const handleEdit = (room) => {

        SetRoomId(room.id);
        SetVisibility(room.isVisible);
        SetName(room.name);

        let _roomParameters = [];

        props.dynamicColumns.forEach((column) => {
            let parameter = room.parameters.find((x) => { return x.id === column.id });
            _roomParameters.push({
                id: column.id,
                label: column.label,
                value: parameter ? parameter.value : ""
            })
        });

        SetRoomParameters(_roomParameters);

        SetModalTitle("Edit Room");

        SetSelectedOption("edit");
        SetModalOpen(true);
    }

    const handleDelete = (room) => {
        handleDeleteRoom(room.id);
    }

    const handleSort = () => {
        SetDragAllowed(true);
    }

    const handleCancelSort = () => {
        SetDragAllowed(false);
        props.fetchData();
    }

    const handleSaveSort = () => {
        var roomIds = [];

        props.rows.forEach((room) => {
            roomIds.push(room.data.id);
        })

        handleSortRoom(roomIds);
    }

    const handleBeforeDragStart = (results) => {
        SetSelectedRowIndex(results.source.index);
    }

    const handleDragEnd = (results) => {
        if (results.destination) {
            var _rows = props.rows;

            var sourceIndex = results.source.index;
            var destIndex = results.destination.index;

            var selectedRow = _rows[sourceIndex];

            if (destIndex > sourceIndex) {
                _rows.splice(destIndex + 1, 0, selectedRow);
                _rows.splice(sourceIndex, 1);
            } else if (destIndex < sourceIndex) {
                _rows.splice(destIndex, 0, selectedRow);
                _rows.splice(sourceIndex + 1, 1);
            }

            SetSelectedRowIndex(-1);
            props.SetRows(_rows);
        }
    }

    const handleCreateRoom = async () => {
        var response = await createGameRoom(props.variation.current.id, name, visibility, roomParameters);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                props.fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    const handleEditRoom = async () => {
        var response = await updateGameRoom(props.variation.current.id, roomId, name, visibility, roomParameters);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                props.fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    const handleDeleteRoom = async (roomId) => {
        var response = await deleteGameRoom(props.variation.current.id, roomId);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                props.fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    const handleSortRoom = async (roomIds) => {
        var response = await sortGameRoom(props.variation.current.id, roomIds);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                await props.fetchData();
                SetDragAllowed(false);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                mt: "0px",
                mb: "25px",
                display: "flex",
                flexDirection: "column"
            }}>
            <Box sx={{
                width: "90%",
                margin: "35px",
                display: isDragAllowed ? "none" : "block"
            }}>
                <Button variant='contained' onClick={() => handleNew()} sx={{
                    fontWeight: 600,
                    p: "10px",
                }}>
                    <AddIcon sx={{ mr: "5px" }} />Add Game Room
                </Button>
                <Button variant='contained' onClick={() => handleSort()} sx={{
                    fontWeight: 600,
                    p: "10px",
                    ml: "25px"
                }}>
                    <SortIcon sx={{ mr: "5px" }} />Sort Game Room
                </Button>
            </Box>
            <Box sx={{
                width: "90%",
                margin: "35px",
                flexDirection: "row",
                alignItems: "center",
                display: !isDragAllowed ? "none" : "flex"
            }}>
                <Button variant='contained' onClick={() => handleCancelSort()} sx={{
                    fontWeight: 600,
                    p: "10px",
                    width: "100px"
                }}>
                    Cancel
                </Button>
                <Button variant='contained' onClick={() => handleSaveSort()} sx={{
                    fontWeight: 600,
                    p: "10px",
                    ml: "25px",
                    width: "100px"
                }}>
                    Save
                </Button>
            </Box>
            <Box sx={{
                width: "100%",
                justifyContent: "center",
                display: "flex"
            }}>
                {
                    !isModalOpen &&
                    <DataTable
                        height="50vh"
                        rows={props.rows}
                        columns={props.columns}
                        showPagination={false}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        selectedRowIndex={selectedRowIndex}
                        isDragAllowed={isDragAllowed}
                        handleBeforeDragStart={handleBeforeDragStart}
                        handleDragEnd={handleDragEnd}
                    />
                }
            </Box>
            <AddEditModal
                theme={theme}
                modalTitle={modalTitle}

                isModalOpen={isModalOpen}
                SetModalOpen={SetModalOpen}

                roomParameters={roomParameters}
                SetRoomParameters={SetRoomParameters}

                visibility={visibility}
                SetVisibility={SetVisibility}

                name={name}
                SetName={SetName}

                selectedOption={selectedOption}
                handleCreateRoom={handleCreateRoom}
                handleEditRoom={handleEditRoom}

                ForceRender={props.ForceRender}
            />
        </Box >
    )
}

export default Rooms