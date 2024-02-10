import React, { useCallback, useEffect, useState } from 'react'

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import { getGameUsers, banUser, unbanUser } from '../../services/api';
import DataTable from '../../components/DataTable';

const Players = (props) => {
    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "userId", label: "User Id", minWidth: 100, align: "center" },
        { id: "username", label: "User Name", minWidth: 100, align: "center" },
        { id: "mobile", label: "Mobile", minWidth: 100, align: "center" },
        //{ id: "cash", label: "Cash", minWidth: 100, align: "center" },
        //{ id: "win", label: "Win", minWidth: 100, align: "center" },
        //{ id: "bonus", label: "Bonus", minWidth: 100, align: "center" },
        { id: "balance", label: "Total Balance", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]
    const [rows, SetRows] = useState([]);

    const [userCount, SetUserCount] = useState(0);
    const [userIdCap, SetUserIdCap] = useState("");

    const [searchParameters, SetSearchParameters] = useState([]);

    const [selectedSearchParameter, SetSelectedSearchParameter] = useState("");
    const [searchValue, SetSearchValue] = useState("");

    const [pageNo, SetPageNo] = useState(0);
    const [rowsPerPage, SetRowsPerPage] = useState(10);

    const handleBanUser = (user) => {
        doBanUser(user.userId);
    }

    const handleUnbanUser = (user) => {
        doUnbanUser(user.userId);
    }

    const handleView = (user) => {
        localStorage.setItem("cc_player", JSON.stringify(user));
        props.SetPageDetails({ index: 5, path: "/ViewPlayer" });
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
        SetUserIdCap("");

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

    const fetchData = useCallback(async () => {
        var response = await getGameUsers(pageNo + 1, userIdCap, rowsPerPage, selectedSearchParameter, searchValue);

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.users.forEach((user, index) => (
                    _rows.push
                        ({
                            index: (pageNo * rowsPerPage) + (index + 1),
                            data: user,
                            userId: user.userId,
                            username: user.userName,
                            mobile: user.mobile,
                            cash: user.cash,
                            win: user.win,
                            bonus: user.bonus,
                            balance: user.balance,
                            actions: ["ban", "view"]
                        })
                ));

                SetRows(_rows);

                SetUserCount(response.data.count);
                SetSearchParameters(response.data.searchParameters);
                SetUserIdCap(response.data.userIdCap);

                const table = document.querySelector("table");
                table.scrollIntoView(true);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }, [pageNo, userIdCap, rowsPerPage, selectedSearchParameter, searchValue, props]);

    const doBanUser = async (userId) => {
        var response = await banUser(userId);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    const doUnbanUser = async (userId) => {
        var response = await unbanUser(userId);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    useEffect(() => {
        props.SetPageDetails({ index: 5, path: "/Players" })
        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [pageNo, rowsPerPage, userIdCap, props.userId]);

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
            <Box sx={{
                width: "100%",
                justifyContent: "center",
                display: "flex"
            }}>
                <DataTable
                    rows={rows}
                    columns={columns}

                    showPagination={true}
                    rowsLength={userCount}
                    rowsPerPage={rowsPerPage}
                    page={pageNo}

                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}

                    handleBanUser={handleBanUser}
                    handleUnbanUser={handleUnbanUser}

                    handleView={handleView}
                />
            </Box>
        </Box>
    )
}

export default Players