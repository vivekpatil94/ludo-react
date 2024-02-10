import React, { useEffect, useState } from 'react'

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import { getWithdrawals, approveWithdrawal, rejectWithdrawal } from '../../services/api';
import DataTable from '../../components/DataTable';
import ViewPlayer from '../players/ViewPlayer';

const Withdrawals = (props) => {
    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "createTime", label: "Create Time", minWidth: 100, align: "center" },
        { id: "userId", label: "User Id", minWidth: 100, align: "center" },
        { id: "balance", label: "Balance", minWidth: 100, align: "center" },
        //{ id: "upiId", label: "UPI ID", minWidth: 100, align: "center" },
        { id: "amount", label: "Amount", minWidth: 100, align: "center" },
        { id: "status", label: "Status", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" },
    ]
    const [rows, SetRows] = useState([]);

    const [withdrawalCount, SetWithdrawalCount] = useState(0);
    const [withdrawalIdCap, SetWithdrawalIdCap] = useState(0);

    const [searchParameters, SetSearchParameters] = useState([]);

    const [selectedSearchParameter, SetSelectedSearchParameter] = useState("");
    const [searchValue, SetSearchValue] = useState("");

    const [pageNo, SetPageNo] = useState(0);
    const [rowsPerPage, SetRowsPerPage] = useState(10);

    const [userId, SetUserId] = useState("");

    const handleApprove = (withdrawal) => {
        if (withdrawal["status"] === "Pending")
            handleApproveWithdrawal(withdrawal.id);
        else
            props.showError("Already Approved/Rejected.");
    }

    const handleReject = (withdrawal) => {
        if (withdrawal["status"] === "Pending")
            handleRejectWithdrawal(withdrawal.id);
        else
            props.showError("Already Approved/Rejected.");
    }

    const handleView = (withdrawal) => {
        SetUserId(withdrawal.userId);
    }

    const navigateBack = () => {
        SetUserId("");
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
        SetWithdrawalIdCap(0);

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

        response = await getWithdrawals(pageNo + 1, withdrawalIdCap, rowsPerPage, selectedSearchParameter, searchValue);

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.forEach((withdrawal, index) => {
                    _rows.push
                        ({
                            index: (pageNo * rowsPerPage) + (index + 1),
                            data: withdrawal,
                            createTime: withdrawal.createTime,
                            balance: withdrawal.balance,
                            upiId: withdrawal.upiId,
                            amount: withdrawal.amount,
                            userId: withdrawal.userId,
                            status: withdrawal.status,
                            actions: ["view", "approve", "reject"]
                        })
                });

                SetRows(_rows);

                SetWithdrawalCount(response.data.count);
                SetSearchParameters(response.data.searchParameters);
                SetWithdrawalIdCap(response.data.withdrawalIdCap);

                const table = document.querySelector("table");
                table?.scrollIntoView(true);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    const handleApproveWithdrawal = async (withdrawalId) => {
        var response = await approveWithdrawal(withdrawalId);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                onClickReload();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    const handleRejectWithdrawal = async (withdrawalId) => {
        var response = await rejectWithdrawal(withdrawalId);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                onClickReload();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    useEffect(() => {
        props.SetPageDetails({ index: 13, path: "/Withdrawals" })
        fetchData();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [pageNo, rowsPerPage, withdrawalIdCap]);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                mt: (props.userId === undefined) ? "100px" : "0px",
                display: "flex",
                flexDirection: "column"
            }}>

            <Box sx={{
                display: userId === "" ? "flex" : "none",
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
                        rowsLength={withdrawalCount}
                        rowsPerPage={rowsPerPage}
                        page={pageNo}

                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}

                        handleApprove={handleApprove}
                        handleReject={handleReject}
                        handleView={handleView}
                    />
                </Box>
            </Box>
            <Box sx={{
                display: userId === "" ? "none" : "flex",
                flexDirection: "column",
                mt: "-100px"
            }}>
                <ViewPlayer
                    userId={userId}

                    navigateBack={navigateBack}
                    showBack={true}
                />
            </Box>
        </Box>
    )
}

export default Withdrawals