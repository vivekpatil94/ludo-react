import React, { useState } from 'react';

import { Box, Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';

import { createGameParameter, deleteGameParameter, setPlayGameParameter, sortGameParameter, updateGameParameter } from '../../../services/api';

import DataTable from '../../../components/DataTable';
import AddEditModal from './AddEditModal';

const Parameters = (props) => {
    const theme = useTheme();

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const [selectedOption, SetSelectedOption] = useState("");

    const [parameterId, SetParameterId] = useState("");
    const [parameterHiddenName, SetHiddenName] = useState("");
    const [parameterDisplayName, SetDisplayName] = useState("");
    const [dataType, SetDataType] = useState("");
    const [defaultValue, SetDefaultValue] = useState("");
    const [visibility, SetVisibility] = useState(false);
    const [dimension, SetDimension] = useState(0);

    const [isDragAllowed, SetDragAllowed] = useState(false);
    const [selectedRowIndex, SetSelectedRowIndex] = useState(-1);

    const handleNew = () => {

        SetHiddenName("");
        SetDisplayName("");
        SetDataType("");
        SetDefaultValue("");
        SetVisibility(false);
        SetDimension(0);

        SetModalTitle("Create New Parameter");

        SetSelectedOption("new");
        SetModalOpen(true);
    }

    const handleEdit = (parameter) => {

        SetParameterId(parameter.id);
        SetHiddenName(parameter.hiddenName);
        SetDisplayName(parameter.displayName);
        SetDataType(parameter.dataType);
        SetDefaultValue(parameter.defaultValue);
        SetVisibility(parameter.isVisible);
        SetDimension(parameter.dimension);

        SetModalTitle("Edit Parameter");

        SetSelectedOption("edit");
        SetModalOpen(true);
    }

    const handleDelete = (parameter) => {
        handleDeleteParameter(parameter.id);
    }

    const handlePlayInfo = (parameter) => {
        handlePlayInfoParameter(parameter.id);
    }

    const handleSort = () => {
        SetDragAllowed(true);
    }

    const handleCancelSort = () => {
        SetDragAllowed(false);
        props.fetchData();
    }

    const handleSaveSort = () => {
        var parameterIds = [];

        props.rows.forEach((parameter) => {
            parameterIds.push(parameter.data.id);
        })

        handleSortParameter(parameterIds);
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

    const handleCreateParameter = async () => {
        var response = await createGameParameter(props.variation.current.id, dataType, parameterHiddenName, parameterDisplayName, defaultValue, visibility, dimension);

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

    const handleEditParameter = async () => {
        var response = await updateGameParameter(props.variation.current.id, parameterId, dataType, parameterHiddenName, parameterDisplayName, defaultValue, visibility, dimension);

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

    const handleDeleteParameter = async (parameterId) => {
        var response = await deleteGameParameter(props.variation.current.id, parameterId);

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

    const handleSortParameter = async (parameterIds) => {
        var response = await sortGameParameter(props.variation.current.id, parameterIds);

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

    const handlePlayInfoParameter = async (parameterId) => {
        var response = await setPlayGameParameter(props.variation.current.id, parameterId);

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

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                mt: "0px",
                display: "flex",
                flexDirection: "column"
            }}>
            <Box sx={{
                width: "90%",
                margin: "35px",
                display: isDragAllowed ? "none" : "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Box>
                    <Button variant='contained' onClick={() => handleNew()} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        <AddIcon sx={{ mr: "5px" }} />Add Game Parameter
                    </Button>
                    <Button variant='contained' onClick={() => handleSort()} sx={{
                        fontWeight: 600,
                        p: "10px",
                        ml: "25px"
                    }}>
                        <SortIcon sx={{ mr: "5px" }} />Sort Game Parameter
                    </Button>
                </Box>
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
            }}>{
                    !isModalOpen &&
                    <DataTable
                        height="50vh"
                        rows={props.rows}
                        columns={props.columns}
                        showPagination={false}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handlePlayInfo={handlePlayInfo}
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

                parameterHiddenName={parameterHiddenName}
                SetHiddenName={SetHiddenName}

                parameterDisplayName={parameterDisplayName}
                SetDisplayName={SetDisplayName}

                dataType={dataType}
                SetDataType={SetDataType}

                defaultValue={defaultValue}
                SetDefaultValue={SetDefaultValue}

                dimension={dimension}
                SetDimension={SetDimension}

                visibility={visibility}
                SetVisibility={SetVisibility}

                selectedOption={selectedOption}
                handleCreateParameter={handleCreateParameter}
                handleEditParameter={handleEditParameter}

                ForceRender={props.ForceRender}
            />
        </Box >
    )
}

export default Parameters