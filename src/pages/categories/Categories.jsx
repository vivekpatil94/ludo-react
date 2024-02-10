import React, { useEffect, useState } from 'react';

import { Box, Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';

import { createCategory, deleteCategory, getCategories, sortCategory, updateCategory } from '../../services/api';

import DataTable from '../../components/DataTable';
import AddEditModal from './AddEditModal';

const Categories = (props) => {
    const theme = useTheme();

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "name", label: "Name", minWidth: 100, align: "center" },
        { id: "visibility", label: "Visiblity", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]
    const [rows, SetRows] = useState([]);

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const [selectedOption, SetSelectedOption] = useState("");

    const [categoryId, SetCategoryId] = useState("");
    const [categoryName, SetCategoryName] = useState("");
    const [visibility, SetVisibility] = useState(false);

    const [isDragAllowed, SetDragAllowed] = useState(false);
    const [selectedRowIndex, SetSelectedRowIndex] = useState(-1);

    const handleNew = () => {

        SetCategoryName("");
        SetVisibility(false);

        SetModalTitle("Create New Category");

        SetSelectedOption("new");
        SetModalOpen(true);
    }

    const handleEdit = (category) => {
        SetCategoryId(category.id);
        SetCategoryName(category.name);
        SetVisibility(category.isVisible);

        SetModalTitle("Edit Category");

        SetSelectedOption("edit");
        SetModalOpen(true);
    }

    const handleDelete = (bundle) => {
        handleDeleteCategory(bundle.id);
    }

    const handleSort = (event) => {
        SetDragAllowed(true);
    }

    const handleCancelSort = () => {
        SetDragAllowed(false);
        fetchData();
    }

    const handleSaveSort = () => {
        var categoryIds = [];

        rows.forEach((category) => {
            categoryIds.push(category.data.id);
        })

        handleSortCategory(categoryIds);
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
        var response = await getCategories();

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.map((category, index) => (
                    _rows.push
                        ({
                            index: index + 1,
                            data: category,
                            name: category.name,
                            visibility: category.isVisible ? "Visible" : "Hidden",
                            actions: ["edit", "delete"]
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

    const handleCreateCategory = async () => {
        var response = await createCategory(categoryName, visibility);

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

    const handleEditCategory = async () => {
        var response = await updateCategory(categoryId, categoryName, visibility);

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

    const handleDeleteCategory = async (categoryId) => {
        var response = await deleteCategory(categoryId);

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

    const handleSortCategory = async (categoryIds) => {
        var response = await sortCategory(categoryIds);

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
        props.SetPageDetails({ index: 3, path: "/Categories" })
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
                margin: "50px",
                display: isDragAllowed ? "none" : "block"
            }}>
                <Button variant='contained' onClick={() => handleNew()} sx={{
                    fontWeight: 600,
                    p: "10px",
                }}>
                    <AddIcon sx={{ mr: "5px" }} />Add Category
                </Button>
                <Button variant='contained' onClick={() => handleSort()} sx={{
                    fontWeight: 600,
                    p: "10px",
                    ml: "25px"
                }}>
                    <SortIcon sx={{ mr: "5px" }} />Sort Category
                </Button>
            </Box>
            <Box sx={{
                width: "90%",
                margin: "50px",
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

                categoryName={categoryName}
                SetCategoryName={SetCategoryName}

                visibility={visibility}
                SetVisibility={SetVisibility}

                selectedOption={selectedOption}
                handleCreateCategory={handleCreateCategory}
                handleEditCategory={handleEditCategory}
            />
        </Box >
    )
}

export default Categories