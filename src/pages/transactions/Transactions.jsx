import React, { useEffect, useRef, useState } from 'react'

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import { getTransactions, createTransaction, getTransactionsById } from '../../services/api';
import DataTable from '../../components/DataTable';
import AddModal from './AddModal';

const Transactions = (props) => {
    const theme = useTheme();

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "txnTime", label: "Time", minWidth: 100, align: "center" },
        { id: "userId", label: "User Id", minWidth: 100, align: "center" },
        { id: "userName", label: "User Name", minWidth: 100, align: "center" },
        { id: "txnType", label: "Type", minWidth: 100, align: "center" },
        //{ id: "txnCash", label: "Cash", minWidth: 100, align: "center" },
        //{ id: "txnWin", label: "Win", minWidth: 100, align: "center" },
        //{ id: "txnBonus", label: "Bonus", minWidth: 100, align: "center" },
        { id: "txnAmount", label: "Amount", minWidth: 100, align: "center" },
        { id: "txnDescription", label: "Description", minWidth: 100, align: "center" },
    ]
    const [rows, SetRows] = useState([]);

    const [txnCount, SetTxnCount] = useState(0);
    //const [txnIdCap, SetTxnIdCap] = useState(0);

    const [searchParameters, SetSearchParameters] = useState([]);

    //const [selectedSearchParameter, SetSelectedSearchParameter] = useState("");
    //const [searchValue, SetSearchValue] = useState("");

    const selectedSearchParameter = useRef(null);
    const searchValue = useRef(null);

    const [pageNo, SetPageNo] = useState(0);
    const [rowsPerPage, SetRowsPerPage] = useState(10);

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    // const [txnAmount, SetTxnAmount] = useState(0);
    // const [txnIsCredit, SetTxnType] = useState(true);
    // const [txnWallet, SetTxnWallet] = useState("");
    // const [txnDescription, SetDescription] = useState("");
    // const [txnUserId, SetUserId] = useState("");

    const txnAmount = useRef(null);
    const txnIsCredit = useRef(null);
    const txnWallet = useRef(null);
    const txnDescription = useRef(null);
    const txnUserId = useRef(null);

    let txnIdCap = useRef(0);

    const handleNew = () => {
        /*SetTxnAmount(0);
        SetTxnType(true);
        SetTxnWallet("");
        SetDescription("");
        SetUserId("");*/

        /*txnAmount.current.value = 0;
        txnIsCredit.current.firstChild.innerText = "Credit";
        txnWallet.current.firstChild.innerText = "Cash";
        txnDescription.current.value = "";
        txnUserId.current.value = "";*/

        SetModalTitle("Create New Transaction");
        SetModalOpen(true);
    }

    /*const handleSearchParameter = (parameter) => {
        SetSelectedSearchParameter(parameter);
    }*/

    /*const handleSearchValue = (event) => {
        SetSearchValue(event.target.value);
    }*/

    const onClickSearch = () => {
        if (pageNo === 0)
            fetchData();
        else
            SetPageNo(0);
    }

    const onClickReload = () => {
        txnIdCap.current = 0;

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

        SetRows([]);

        if (props.userId === undefined)
            response = await getTransactions(pageNo + 1, txnIdCap.current, rowsPerPage, selectedSearchParameter.current.firstChild.innerText, searchValue.current.value);
        else
            response = await getTransactionsById(props.userId, pageNo + 1, txnIdCap.current, rowsPerPage, selectedSearchParameter.current.firstChild.innerText, searchValue.current.value);

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.forEach((txn, index) => {
                    _rows.push
                        ({
                            index: (pageNo * rowsPerPage) + (index + 1),
                            data: txn,
                            userId: txn.userId,
                            userName: txn.userName,
                            txnTime: txn.txnTime,
                            txnType: txn.txnType,
                            txnCash: txn.txnCash,
                            txnWin: txn.txnWin,
                            txnBonus: txn.txnBonus,
                            txnAmount: txn.txnAmount,
                            txnDescription: txn.txnDescription,
                            actions: []
                        })
                });

                SetRows(_rows);

                SetTxnCount(response.data.count);
                SetSearchParameters(response.data.searchParameters);
                txnIdCap.current = response.data.txnIdCap;

                const table = document.querySelector("table");
                table?.scrollIntoView(true);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    const handleCreateTransaction = async () => {
        var response = await createTransaction(txnUserId.current.value, txnIsCredit.current.firstChild.innerText === "Credit", parseFloat(txnAmount.current.value), txnDescription.current.value, txnWallet.current.firstChild.innerText);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                onClickReload();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    useEffect(() => {
        if (props.userId === undefined) {
            props.SetPageDetails({ index: 8, path: "/Transactions" })
            fetchData();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [pageNo, rowsPerPage, props.userId]);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                mt: (props.userId === undefined) ? "100px" : "0px",
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
                        <Button variant='contained' onClick={() => handleNew()} sx={{
                            fontWeight: 600,
                            p: "10px",
                            display: (props.userId === undefined) ? "flex" : "none"
                        }}>
                            <AddIcon sx={{ mr: "5px" }} />New Transaction
                        </Button>
                        <FormControl sx={{ width: "200px", minWidth: "100px" }}>
                            <InputLabel id="parameter-label">Parameters</InputLabel>
                            <Select
                                labelId="parameter-label"
                                id="parameter-select"
                                ref={selectedSearchParameter}
                                label="Parameters"
                            >
                                {
                                    searchParameters.map((parameter) => {
                                        return (
                                            <MenuItem key={parameter} value={parameter}>{parameter}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <TextField label="Search Value" type="text" inputRef={searchValue} />
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
                    rowsLength={txnCount}
                    rowsPerPage={rowsPerPage}
                    page={pageNo}

                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}

                    height={(props.userId === undefined) ? "65vh" : "40vh"}
                />
            </Box>

            <AddModal
                theme={theme}
                modalTitle={modalTitle}

                isModalOpen={isModalOpen}
                SetModalOpen={SetModalOpen}

                txnAmount={txnAmount}
                //SetTxnAmount={SetTxnAmount}

                txnIsCredit={txnIsCredit}
                //SetTxnType={SetTxnType}

                txnWallet={txnWallet}
                //SetTxnWallet={SetTxnWallet}

                txnDescription={txnDescription}
                //SetDescription={SetDescription}

                txnUserId={txnUserId}
                //SetUserId={SetUserId}

                handleCreateTransaction={handleCreateTransaction}
            />
        </Box>
    )
}

export default Transactions