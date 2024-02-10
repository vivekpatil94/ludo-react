import React from 'react'

import { Box, Button, Typography } from '@mui/material'
import StyledModal from '../../components/StyledModal'

const AddEditModal = (props) => {

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const handleViewLogs = (log) => {
        props.handleViewLogs(log);
    }

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "25px"
            }}>
                <Typography variant='h6' sx={{ color: props.theme.palette.text.primary }}>Select User to View Logs</Typography>
                <Box
                    sx={{ maxHeight: "40vh", overflow: "hidden", overflowY: "auto", mt: "25px", width: "100%", alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    {
                        props.gameLogs.map((log) => {
                            return (
                                <Box
                                    key={log.id}
                                    sx={{ mt: "25px", width: "100%", alignItems: "center", display: "flex", justifyContent: "center" }}
                                >
                                    <Button variant='contained' onClick={() => handleViewLogs(log)} sx={{
                                        fontWeight: 600,
                                        p: "10px",
                                        width: "80%"
                                    }}>
                                        {log.gameUserId}
                                    </Button>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
        </StyledModal >
    )
}

export default AddEditModal