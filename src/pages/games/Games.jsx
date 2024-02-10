import React, { useEffect, useState } from 'react';

import { Box, Button, Chip, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';

import { createGame, deleteGame, getGames, sortGame, updateGame } from '../../services/api';

import DataTable from '../../components/DataTable';
import AddEditModal from './AddEditModal';

const Games = (props) => {
    const theme = useTheme();

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "hiddenName", label: "Hidden Name", minWidth: 100, align: "center" },
        { id: "displayName", label: "Display Name", minWidth: 100, align: "center" },
        { id: "bundleName", label: "Bundle", minWidth: 100, align: "center" },
        { id: "categories", label: "Categories", minWidth: 100, align: "center" },
        { id: "keywords", label: "Keywords", minWidth: 100, align: "center" },
        { id: "visibility", label: "Visibility", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]
    const [rows, SetRows] = useState([]);

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const [selectedOption, SetSelectedOption] = useState("");

    const [gameId, SetGameId] = useState("");
    const [gameHiddenName, SetHiddenName] = useState("");
    const [gameDisplayName, SetDisplayName] = useState("");
    const [visibility, SetVisibility] = useState(false);
    const [bundle, SetBundle] = useState({});
    const [categories, SetCategories] = useState([]);
    const [keywords, SetKeywords] = useState("");

    const [allCategories, SetAllCategories] = useState([]);
    const [allBundles, SetAllBundles] = useState([]);

    const [isDragAllowed, SetDragAllowed] = useState(false);
    const [selectedRowIndex, SetSelectedRowIndex] = useState(-1);

    const [count, SetCount] = useState(0);

    const ForceRender = () => {
        SetCount(count + 1);
    }

    const getKeywords = (keywords) => {
        var _keywords = "";

        keywords.forEach((keyword) => {
            if (_keywords.length !== 0)
                _keywords += ", ";

            _keywords += keyword;
        });

        return _keywords;
    }

    const handleNew = () => {

        SetHiddenName("");
        SetDisplayName("");
        SetVisibility(false);
        SetBundle({});
        SetCategories([]);
        SetKeywords("");

        SetModalTitle("Create New Game");

        SetSelectedOption("new");
        SetModalOpen(true);
    }

    const handleEdit = (game) => {
        SetGameId(game.id);
        SetHiddenName(game.hiddenName);
        SetDisplayName(game.displayName);
        SetVisibility(game.isVisible);
        SetBundle(game.bundle);
        SetCategories(game.categoryIds);
        SetKeywords(getKeywords(game.keywords));

        SetModalTitle("Edit Game");

        SetSelectedOption("edit");
        SetModalOpen(true);
    }

    const handleDelete = (game) => {
        handleDeleteGame(game.id);
    }

    const handleForward = (game) => {
        localStorage.setItem("cc_game", JSON.stringify(game));
        props.SetPageDetails({ index: 4, path: "/GameVariations" });
    }

    const handleSort = () => {
        SetDragAllowed(true);
    }

    const handleCancelSort = () => {
        SetDragAllowed(false);
        fetchData();
    }

    const handleSaveSort = () => {
        var gameIds = [];

        rows.forEach((game) => {
            gameIds.push(game.data.id);
        })

        handleSortGame(gameIds);
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
        var response = await getGames();

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                SetAllBundles(response.data.bundles);
                SetAllCategories(response.data.categories);

                response.data.games.map((game, index) => (
                    _rows.push
                        ({
                            index: index + 1,
                            data: game,
                            hiddenName: game.hiddenName,
                            displayName: game.displayName,
                            visibility: game.isVisible ? "Visible" : "Hidden",
                            bundleName: game.bundle.name,
                            categories:
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: "center" }}>
                                    {
                                        game.categoryIds.map((categoryId) => {
                                            var category = response.data.categories.find((x) => x.id === categoryId);
                                            if (category) {
                                                return (
                                                    <Chip label={category.name} />
                                                )
                                            }
                                            return ([])
                                        })
                                    }
                                </Box>,
                            keywords:
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: "center" }}>
                                    {
                                        game.keywords.map((keyword) => {
                                            return (
                                                <Chip label={keyword} />
                                            )
                                        })
                                    }
                                </Box>,
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

    const handleCreateGame = async () => {
        var _keywords = keywords.split(',');
        var _keywords1 = [];

        _keywords.forEach((keyword) => {
            _keywords1.push(keyword.trim());
        });

        var response = await createGame(gameHiddenName, gameDisplayName, visibility, bundle.id, categories, _keywords1);

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

    const handleEditGame = async () => {
        var _keywords = keywords.split(',');
        var _keywords1 = [];

        _keywords.forEach((keyword) => {
            _keywords1.push(keyword.trim());
        });

        var response = await updateGame(gameId, gameHiddenName, gameDisplayName, visibility, bundle.id, categories, _keywords1);

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

    const handleDeleteGame = async (gameId) => {
        var response = await deleteGame(gameId);

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

    const handleSortGame = async (gameIds) => {
        var response = await sortGame(gameIds);

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
        props.SetPageDetails({ index: 4, path: "/Games" })
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                mt: "100px",
                display: "flex",
                flexDirection: "column",
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
                    <AddIcon sx={{ mr: "5px" }} />Add Game
                </Button>
                <Button variant='contained' onClick={() => handleSort()} sx={{
                    fontWeight: 600,
                    p: "10px",
                    ml: "25px"
                }}>
                    <SortIcon sx={{ mr: "5px" }} />Sort Games
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

                gameHiddenName={gameHiddenName}
                SetHiddenName={SetHiddenName}

                gameDisplayName={gameDisplayName}
                SetDisplayName={SetDisplayName}

                bundle={bundle}
                SetBundle={SetBundle}

                categories={categories}
                SetCategories={SetCategories}

                keywords={keywords}
                SetKeywords={SetKeywords}

                visibility={visibility}
                SetVisibility={SetVisibility}

                selectedOption={selectedOption}
                handleCreateGame={handleCreateGame}
                handleEditGame={handleEditGame}

                allBundles={allBundles}
                allCategories={allCategories}

                ForceRender={ForceRender}
            />
        </Box >
    )
}

export default Games