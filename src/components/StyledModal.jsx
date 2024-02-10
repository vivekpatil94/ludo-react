import React from 'react'

import { Box, Button, Modal, Typography, useTheme } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledModal = (props) => {
    const theme = useTheme();

    return (
        <Modal
            open={props.isModalOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Typography variant="h6" color={theme.palette.text.primary}>{props.modalTitle}</Typography>
                </Box>
                {props.children}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    mt: "50px"
                }}>
                    <Button onClick={props.handleModalClose} variant="contained" sx={{ width: "100px", fontWeight: 600 }}>Close</Button>
                    {props.handleSave && <Button onClick={props.handleSave} variant="contained" sx={{ width: "100px", fontWeight: 600 }}>Save</Button>}
                </Box>
            </Box>
        </Modal>
    )
}

export default StyledModal