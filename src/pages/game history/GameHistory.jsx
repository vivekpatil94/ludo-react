import React, { useEffect, useState } from 'react'

import { Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import { getGameHistory, getGameHistoryById, getGameLogs } from '../../services/api';
import DataTable from '../../components/DataTable';
import AddEditModal from './AddEditModal';
import GameLogs from './GameLogs';

const GameHistory = (props) => {
    const theme = useTheme();

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "createTime", label: "Create Time", minWidth: 100, align: "center" },
        { id: "gameName", label: "Game", minWidth: 100, align: "center" },
        { id: "variationName", label: "Variation", minWidth: 100, align: "center" },
        { id: "players", label: "Players", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]
    const [rows, SetRows] = useState([]);

    const [historyCount, SetHistoryCount] = useState(0);
    const [gameHistoryIdCap, SetGameHistoryIdCap] = useState(0);

    const [searchParameters, SetSearchParameters] = useState([]);

    const [selectedSearchParameter, SetSelectedSearchParameter] = useState("");
    const [searchValue, SetSearchValue] = useState("");

    const [pageNo, SetPageNo] = useState(0);
    const [rowsPerPage, SetRowsPerPage] = useState(10);

    const [gameLogs, SetGameLogs] = useState();
    const [isModalOpen, SetModalOpen] = useState(false);

    const [showLogs, SetShowLogs] = useState(false);
    const [selectedLog, SetSelectedLog] = useState();

    const handleView = (gameHistory) => {
        fetchLogs(gameHistory.id);
    }

    const handleViewLogs = (log) => {
        SetSelectedLog(log);
    }

    const handleSearchParameter = (parameter) => {
        SetSelectedSearchParameter(parameter);
    }

    const handleSearchValue = (event) => {
        SetSearchValue(event.target.value);
    }

    const onClickSearch = () => {
        if (pageNo === 0)
            fetchData();
        else
            SetPageNo(0);
    }

    const onClickReload = () => {
        SetGameHistoryIdCap(0);

        if (pageNo === 0)
            fetchData();
        else
            SetPageNo(0);
    }

    const handleChangeRowsPerPage = (event) => {
        SetRowsPerPage(event.target.value);
    }

    const handleChangePage = (event, page) => {
        SetPageNo(page);
    }

    const fetchData = async () => {
        var response = {};

        if (props.userId === undefined)
            response = await getGameHistory(pageNo + 1, gameHistoryIdCap, rowsPerPage, selectedSearchParameter, searchValue);
        else
            response = await getGameHistoryById(props.userId, pageNo + 1, gameHistoryIdCap, rowsPerPage, selectedSearchParameter, searchValue);

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.forEach((gameHistory, index) => {
                    _rows.push
                        ({
                            index: (pageNo * rowsPerPage) + (index + 1),
                            data: gameHistory,
                            createTime: gameHistory.createTime,
                            gameName: gameHistory.gameName,
                            variationName: gameHistory.variationName,
                            players:
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: "center" }}>
                                    {
                                        gameHistory.players.map((player) => {
                                            return (
                                                <Chip label={player} />
                                            )
                                        })
                                    }
                                </Box>
                            ,
                            actions: ["view"]
                        })
                });

                SetRows(_rows);

                SetHistoryCount(response.data.count);
                SetSearchParameters(response.data.searchParameters);
                SetGameHistoryIdCap(response.data.gameHistoryIdCap);

                const table = document.querySelector("table");
                table?.scrollIntoView(true);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    const fetchLogs = async (gameHistoryId) => {
        var response = await getGameLogs(gameHistoryId);

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.forEach((gameLog, index) => {
                    _rows.push
                        ({
                            id: gameLog.id,
                            gameUserId: gameLog.gameUserId,
                            logs: gameLog.logs
                        })
                });

                SetGameLogs(_rows);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    useEffect(() => {
        if (props.userId === undefined) {
            props.SetPageDetails({ index: 7, path: "/Game History" })
            fetchData();
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [pageNo, rowsPerPage, gameHistoryIdCap, props.userId]);

    useEffect(() => {
        if (selectedLog) {
            SetShowLogs(true);
            SetModalOpen(false);
        }
    }, [selectedLog]);

    useEffect(() => {
        if (gameLogs) {
            if (gameLogs.length > 1) {
                SetModalOpen(true);
            } else if (gameLogs.length > 0) {
                SetSelectedLog(gameLogs[0]);
            } else {
                props.showError("No Logs Found.")
            }
        }
    }, [gameLogs, props])

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                mt: (props.userId === undefined) ? "100px" : "0px",
                display: "flex",
                flexDirection: "column"
            }}>
            {!showLogs &&
                <Box sx={{
                    width: "90%",
                    margin: "50px",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "25px"
                        }}>
                            <FormControl sx={{ width: "200px", minWidth: "100px" }}>
                                <InputLabel id="parameter-label">Parameters</InputLabel>
                                <Select
                                    labelId="parameter-label"
                                    id="parameter-select"
                                    value={selectedSearchParameter}
                                    label="Parameters"
                                >
                                    {
                                        searchParameters.map((parameter) => {
                                            return (
                                                <MenuItem key={parameter} value={parameter} onClick={() => handleSearchParameter(parameter)}>{parameter}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <TextField label="Search Value" type="text" value={searchValue} onChange={handleSearchValue} />
                            <Button variant='contained' onClick={() => onClickSearch()} sx={{
                                fontWeight: 600,
                                p: "10px",
                            }}>
                                <SearchIcon sx={{ mr: "5px" }} />Search
                            </Button>
                        </Box>
                    </Box>
                    <Button variant='contained' onClick={() => onClickReload()} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        <RefreshIcon sx={{ mr: "5px" }} />Reload
                    </Button>
                </Box>
            }
            {
                !showLogs &&
                <Box sx={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex"
                }}>
                    <DataTable
                        rows={rows}
                        columns={columns}

                        showPagination={true}
                        rowsLength={historyCount}
                        rowsPerPage={rowsPerPage}
                        page={pageNo}

                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}

                        handleView={handleView}

                        height={(props.userId === undefined) ? "65vh" : "40vh"}
                    />
                </Box>
            }
            {
                !showLogs && isModalOpen &&
                <AddEditModal
                    isModalOpen={isModalOpen}
                    SetModalOpen={SetModalOpen}

                    gameLogs={gameLogs}
                    handleViewLogs={handleViewLogs}

                    theme={theme}
                />
            }
            {
                showLogs &&
                <GameLogs selectedLog={selectedLog} SetShowLogs={SetShowLogs} theme={theme} height={(props.userId === undefined) ? "65vh" : "40vh"} />
            }
        </Box >
    )
}

export default GameHistory