import React, { useEffect, useState } from 'react'

import { Box, Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

import { getEarnings } from '../../services/api';
import DataTable from '../../components/DataTable';

const Earnings = (props) => {

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "date", label: "Date", minWidth: 100, align: "center" },
        { id: "earnings", label: "Winnings", minWidth: 100, align: "center" },
        { id: "commission", label: "Commission", minWidth: 100, align: "center" },
        { id: "deposit", label: "Deposit", minWidth: 100, align: "center" },
        { id: "withdraw", label: "Withdraw", minWidth: 100, align: "center" },
    ]
    const [rows, SetRows] = useState([]);

    const [fromDate, SetFromDate] = useState(new Date().toDateString());
    const [toDate, SetToDate] = useState(new Date().toDateString());

    const [rowsCount, SetRowsCount] = useState(0);
    const [pageNo, SetPageNo] = useState(0);
    const [rowsPerPage, SetRowsPerPage] = useState(10);

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

    const handleChangeRowsPerPage = (event) => {
        SetRowsPerPage(event.target.value);
    }

    const handleChangePage = (event, page) => {
        SetPageNo(page);
    }

    const fetchData = async () => {
        var _fromDate = moment(new Date(fromDate), 'DD/MM/YYYY', true).format();
        var _toDate = moment(new Date(toDate), 'DD/MM/YYYY', true).format();

        _fromDate = _fromDate.split('T')[0];
        _toDate = _toDate.split('T')[0];

        var response = await getEarnings(_fromDate, _toDate, rowsPerPage, pageNo + 1);

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.forEach((earnings, index) => {
                    _rows.push
                        ({
                            index: (pageNo * rowsPerPage) + (index + 1),
                            data: earnings,
                            date: earnings.date,
                            earnings: earnings.earnings,
                            commission: earnings.commission,
                            deposit: earnings.deposit,
                            withdraw: earnings.withdraw,
                            actions: []
                        })
                });

                SetRows(_rows);

                SetRowsCount(response.data.count);

                const table = document.querySelector("table");
                table?.scrollIntoView(true);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    useEffect(() => {
        if (props.userId === undefined) {
            props.SetPageDetails({ index: 14, path: "/Earnings" })
            fetchData();
        }
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
                    rowsLength={rowsCount}
                    rowsPerPage={rowsPerPage}
                    page={pageNo}

                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    )
}

export default Earnings