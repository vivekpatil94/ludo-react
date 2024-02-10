import React, { useEffect, useRef, useState } from 'react'

import { Box, Button, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

import { createBotTransaction, getBotTransactions } from '../../services/api';
import DataTable from '../../components/DataTable';
import AddModal from './AddModal';

const BotTransactions = (props) => {
    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "txnTime", label: "Time", minWidth: 100, align: "center" },
        { id: "txnType", label: "Type", minWidth: 100, align: "center" },
        { id: "txnAmount", label: "Amount", minWidth: 100, align: "center" },
        { id: "txnDescription", label: "Description", minWidth: 100, align: "center" },
    ]
    const [rows, SetRows] = useState([]);

    const [txnCount, SetTxnCount] = useState(0);
    //const [txnIdCap, SetTxnIdCap] = useState(0);

    const [pageNo, SetPageNo] = useState(0);
    const [rowsPerPage, SetRowsPerPage] = useState(10);

    const [fromDate, SetFromDate] = useState(new Date().toDateString());
    const [toDate, SetToDate] = useState(new Date().toDateString());

    const [botBalance, SetBotBalance] = useState(0);

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const txnAmount = useRef(null);
    const txnIsCredit = useRef(null);
    const txnDescription = useRef(null);

    let txnIdCap = useRef(0);

    const handleNew = () => {
        SetModalTitle("Create New Transaction");
        SetModalOpen(true);
    }

    const onChangeFromDate = (value) => {
        SetFromDate(value);
    }

    const onChangeToDate = (value) => {
        SetToDate(value);
    }

    const onClickSearch = () => {
        if (pageNo === 0)
            fetchData();
        else
            SetPageNo(0);
    }

    const onClickReload = () => {
        console.log(txnIdCap);
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
        SetRows([]);

        var _fromDate = moment(new Date(fromDate), 'DD/MM/YYYY', true).format();
        var _toDate = moment(new Date(toDate), 'DD/MM/YYYY', true).format();

        _fromDate = _fromDate.split('T')[0];
        _toDate = _toDate.split('T')[0];

        var response = await getBotTransactions(pageNo + 1, txnIdCap.current, rowsPerPage, _fromDate, _toDate);

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.forEach((txn, index) => {
                    _rows.push
                        ({
                            index: (pageNo * rowsPerPage) + (index + 1),
                            data: txn,
                            txnTime: txn.txnTime,
                            txnType: txn.txnType,
                            txnAmount: txn.txnAmount,
                            txnDescription: txn.txnDescription,
                            actions: []
                        })
                });

                SetRows(_rows);

                SetTxnCount(response.data.count);
                txnIdCap.current = response.data.txnIdCap;

                if (response.data.balance)
                    SetBotBalance(response.data.balance);

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
        var response = await createBotTransaction(txnIsCredit.current.firstChild.innerText === "Credit", parseFloat(txnAmount.current.value), txnDescription.current.value);

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
        props.SetPageDetails({ index: 15, path: "/Bot Transactions" })
        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [pageNo, rowsPerPage]);

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
                <Box sx={{
                    display: "flex",
                    gap: "25px"
                }}>
                    <Button variant='contained' onClick={() => handleNew()} sx={{
                        fontWeight: 600,
                        p: "10px",
                        display: (props.userId === undefined) ? "flex" : "none"
                    }}>
                        <AddIcon sx={{ mr: "5px" }} />New Transaction
                    </Button>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "25px"
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box spacing={3} sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "25px"
                            }}>
                                <DatePicker
                                    label="From Date"
                                    value={dayjs(fromDate)}
                                    onChange={onChangeFromDate}
                                    renderInput={(params) => <TextField {...params}
                                        sx={{ width: "80%" }}
                                    />}
                                />
                                <DatePicker
                                    label="To Date"
                                    value={dayjs(toDate)}
                                    onChange={onChangeToDate}
                                    renderInput={(params) => <TextField {...params}
                                        sx={{ width: "80%" }}
                                    />}
                                />
                            </Box>
                        </LocalizationProvider>
                        <Button variant='contained' onClick={() => onClickSearch()} sx={{
                            fontWeight: 600,
                            p: "10px",
                        }}>
                            <SearchIcon sx={{ mr: "5px" }} />Search
                        </Button>
                    </Box>
                </Box>
                <TextField label="Balance" type="number" value={botBalance} sx={{ maxWidth: "200px" }} disabled />
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
                />
            </Box>

            <AddModal
                modalTitle={modalTitle}

                isModalOpen={isModalOpen}
                SetModalOpen={SetModalOpen}

                txnAmount={txnAmount}
                txnIsCredit={txnIsCredit}
                txnDescription={txnDescription}

                handleCreateTransaction={handleCreateTransaction}
            />
        </Box>
    )
}

export default BotTransactions