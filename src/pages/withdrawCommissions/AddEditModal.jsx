import React from 'react'

import { Box, TextField } from '@mui/material'
import StyledModal from '../../components/StyledModal'

const AddEditModal = (props) => {

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const onChangeMinAmt = (event) => {
        props.SetMinAmt(event.target.value);
    }

    const onChangeMaxAmt = (event) => {
        props.SetMaxAmt(event.target.value);
    }

    const onChangeCommission = (event) => {
        props.SetCommission(event.target.value);
    }

    const handleSave = () => {
        if (props.selectedOption === "new")
            props.handleCreateWithdrawCommission();

        if (props.selectedOption === "edit")
            props.handleEditWithdrawCommission();
    }

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose} handleSave={handleSave}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "25px"
            }}>
                <TextField label="Min Amount" type="number" value={props.minAmt} onChange={onChangeMinAmt} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Max Amount" type="number" value={props.maxAmt} onChange={onChangeMaxAmt} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Commission" type="number" value={props.commission} onChange={onChangeCommission} sx={{ width: "80%", mt: "20px" }} />
            </Box>
        </StyledModal>
    )
}

export default AddEditModal