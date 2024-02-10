import React, { useEffect, useState } from 'react'

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

import { utils, writeFileXLSX } from 'xlsx';

import { getReports } from '../../services/api';

// eslint-disable-next-line
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const Reports = (props) => {

    const [reportTypes, SetReportTypes] = useState([]);
    const [selectedReportType, SetSelectedReportType] = useState("");

    const [fromDate, SetFromDate] = useState((new Date().addDays(-1)).toString());
    const [toDate, SetToDate] = useState(new Date().toDateString());

    const onChangeFromDate = (value) => {
        SetFromDate(value);
    }

    const onChangeToDate = (value) => {
        SetToDate(value);
    }

    const fetchData = async () => {
        var response = await getReports("", "", "");

        if (response.status === 200) {
            if (response.data.status) {
                if (response.data.reportTypes)
                    SetReportTypes(response.data.reportTypes);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    const handleClick = async (event) => {
        var _fromDate = moment(new Date(fromDate), 'DD/MM/YYYY', true).format();
        var _toDate = moment(new Date(toDate), 'DD/MM/YYYY', true).format();

        _fromDate = _fromDate.split('T')[0];
        _toDate = _toDate.split('T')[0];

        var response = await getReports(selectedReportType, _fromDate, _toDate);

        if (response.status === 200) {
            if (response.data.status) {
                console.log(response.data.reports);

                if (response.data.reportTypes)
                    SetReportTypes(response.data.reportTypes);

                if (response.data.reports) {
                    //ws["!cols"] = [{ wch: 30 }, { wch: 20 }]; Set Column Widths

                    const wb = utils.book_new();

                    const ws = utils.json_to_sheet(response.data.reports[0].report);
                    utils.book_append_sheet(wb, ws, response.data.reports[0].name); //Line to add multiple sheets

                    writeFileXLSX(wb, response.data.reports[0].name + ".xlsx");
                }
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    useEffect(() => {
        props.SetPageDetails({ index: 21, path: "/Reports" })
        fetchData();

        // eslint-disable-next-line
    }, []);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                m: "50px",
                mt: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "50px"
            }}>
            <Box sx={{ width: "80%", mt: "20px" }}>
                <FormControl fullWidth>
                    <InputLabel id="report-label">Reports</InputLabel>
                    <Select
                        labelId="report-label"
                        id="report-select"
                        value={selectedReportType}
                        label="Reports"
                    >
                        {
                            reportTypes.map((report) => {
                                return (
                                    <MenuItem key={report} value={report} onClick={() => SetSelectedReportType(report)}>{report}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </Box>
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
            </Box>
            <Button variant="contained" onClick={handleClick} sx={{
                margin: "50px",
                marginBottom: "10px",
                fontWeight: 600,
                width: "100px"
            }}>Download</Button>
        </Box>
    )
}

export default Reports