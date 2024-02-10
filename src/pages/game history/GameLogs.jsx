import React, { useEffect, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import DataTable from '../../components/DataTable';

const GameLogs = (props) => {

    const columns = [
        { id: "timestamp", label: "Time Stamp", minWidth: 100, align: "center" },
        { id: "userInfo", label: "User Info", minWidth: 100, align: "center" },
        { id: "description", label: "Description", minWidth: 100, align: "center" }
    ]
    const [rows, SetRows] = useState([]);

    const navigateBack = () => {
        props.SetShowLogs(false);
    }

    useEffect(() => {
        const _rows = [];

        props.selectedLog.logs.forEach((log) => {
            _rows.push({
                timestamp: log.timestamp,
                userInfo: log.userInfo,
                description: log.description
            })
        });

        SetRows(_rows);

        // eslint-disable-next-line
    }, []);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                display: "flex",
                flexDirection: "column"
            }}>
            <Box sx={{
                width: "90%",
                margin: "50px",
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "50px"
                }}>
                    <Button variant='contained' onClick={() => navigateBack()} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        <ArrowBackIcon sx={{ mr: "5px" }} />Back
                    </Button>
                    <Typography variant='h6' sx={{ color: props.theme.palette.text.primary }}>User: {props.selectedLog.gameUserId}</Typography>
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

                    height={props.height}
                />
            </Box>
        </Box>
    )
}

export default GameLogs