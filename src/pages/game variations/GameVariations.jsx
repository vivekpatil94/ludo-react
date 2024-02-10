import React, { useEffect, useRef, useState } from 'react';

import { Box, Button, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';

import { createGameVariation, deleteGameVariation, getGameVariations, sortGameVariation, updateGameVariation } from '../../services/api';

import DataTable from '../../components/DataTable';
import AddEditModal from './AddEditModal';

const GameVariations = (props) => {
    const theme = useTheme();

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "hiddenName", label: "Hidden Name", minWidth: 100, align: "center" },
        { id: "displayName", label: "Display Name", minWidth: 100, align: "center" },
        { id: "visibility", label: "Visibility", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]
    const [rows, SetRows] = useState([]);

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const [selectedOption, SetSelectedOption] = useState("");

    const [variationId, SetVariationId] = useState("");
    const [variationHiddenName, SetHiddenName] = useState("");
    const [variationDisplayName, SetDisplayName] = useState("");
    const [visibility, SetVisibility] = useState(false);

    const [isDragAllowed, SetDragAllowed] = useState(false);
    const [selectedRowIndex, SetSelectedRowIndex] = useState(-1);

    const [count, SetCount] = useState(0);

    const game = useRef();

    const ForceRender = () => {
        SetCount(count + 1);
    }

    const navigateBack = () => {
        props.SetPageDetails({ index: 4, path: "/Games" });
    }

    const handleNew = () => {

        SetHiddenName("");
        SetDisplayName("");
        SetVisibility(false);

        SetModalTitle("Create New Variation");

        SetSelectedOption("new");
        SetModalOpen(true);
    }

    const handleEdit = (variation) => {
        SetVariationId(variation.id);
        SetHiddenName(variation.hiddenName);
        SetDisplayName(variation.displayName);
        SetVisibility(variation.isVisible);

        SetModalTitle("Edit Variation");

        SetSelectedOption("edit");
        SetModalOpen(true);
    }

    const handleDelete = (variation) => {
        handleDeleteGame(variation.id);
    }

    const handleForward = (variation) => {
        localStorage.setItem("cc_variation", JSON.stringify(variation));
        props.SetPageDetails({ index: 4, path: "/ParametersRooms" });
    }

    const handleSort = () => {
        SetDragAllowed(true);
    }

    const handleCancelSort = () => {
        SetDragAllowed(false);
        fetchData();
    }

    const handleSaveSort = () => {
        var variationIds = [];

        rows.forEach((variation) => {
            variationIds.push(variation.data.id);
        })

        handleSortGame(variationIds);
    }

    const handleBeforeDragStart = (results) => {
        SetSelectedRowIndex(results.source.index);
    }

    const handleDragEnd = (results) => {
        if (results.destination) {
            var _rows = rows;

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
            SetRows(_rows);
        }
    }

    const fetchData = async () => {
        var response = await getGameVariations(game.current.id);

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.variations.map((variation, index) => (
                    _rows.push
                        ({
                            index: index + 1,
                            data: variation,
                            hiddenName: variation.hiddenName,
                            displayName: variation.displayName,
                            visibility: variation.isVisible ? "Visible" : "Hidden",
                            actions: ["edit", "delete", "forward"]
                        })
                ));

                SetRows(_rows);
                SetDragAllowed(false);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    const handleCreateVariation = async () => {
        var response = await createGameVariation(game.current.id, variationHiddenName, variationDisplayName, visibility);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    const handleEditVariation = async () => {
        var response = await updateGameVariation(variationId, variationHiddenName, variationDisplayName, visibility);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    const handleDeleteGame = async (variationId) => {
        var response = await deleteGameVariation(variationId);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    const handleSortGame = async (variationIds) => {
        var response = await sortGameVariation(game.current.id, variationIds);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    useEffect(() => {
        props.SetPageDetails({ index: 4, path: "/GameVariations" });
        game.current = JSON.parse(localStorage.getItem("cc_game"));
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                mt: "100px",
                display: "flex",
                flexDirection: "column"
            }}>
            <Box sx={{
                width: "90%",
                m: "50px",
                display: isDragAllowed ? "none" : "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>

                <Button variant='contained' onClick={() => navigateBack()} sx={{
                    fontWeight: 600,
                    p: "10px",
                }}>
                    <ArrowBackIcon sx={{ mr: "5px" }} />Back
                </Button>
                <Box>
                    <Button variant='contained' onClick={() => handleNew()} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        <AddIcon sx={{ mr: "5px" }} />Add Game Variation
                    </Button>
                    <Button variant='contained' onClick={() => handleSort()} sx={{
                        fontWeight: 600,
                        p: "10px",
                        ml: "25px"
                    }}>
                        <SortIcon sx={{ mr: "5px" }} />Sort Game Variation
                    </Button>
                </Box>
            </Box>
            <Box sx={{
                width: "90%",
                m: "50px",
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
                <DataTable
                    rows={rows}
                    columns={columns}
                    showPagination={false}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleForward={handleForward}
                    selectedRowIndex={selectedRowIndex}
                    isDragAllowed={isDragAllowed}
                    handleBeforeDragStart={handleBeforeDragStart}
                    handleDragEnd={handleDragEnd}
                />
            </Box>
            <AddEditModal
                theme={theme}
                modalTitle={modalTitle}

                isModalOpen={isModalOpen}
                SetModalOpen={SetModalOpen}

                variationHiddenName={variationHiddenName}
                SetHiddenName={SetHiddenName}

                variationDisplayName={variationDisplayName}
                SetDisplayName={SetDisplayName}

                visibility={visibility}
                SetVisibility={SetVisibility}

                selectedOption={selectedOption}
                handleCreateVariation={handleCreateVariation}
                handleEditVariation={handleEditVariation}

                ForceRender={ForceRender}
            />
        </Box >
    )
}

export default GameVariations