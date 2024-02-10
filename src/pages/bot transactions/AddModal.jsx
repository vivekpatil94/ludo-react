import React from 'react'

import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import StyledModal from '../../components/StyledModal'

const AddModal = (props) => {

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const handleSave = () => {
        props.handleCreateTransaction();
    }

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose} handleSave={handleSave}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "25px"
            }}>
                <TextField label="Amount" type="number" inputRef={props.txnAmount} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Description" type="text" inputRef={props.txnDescription} sx={{ width: "80%", mt: "20px" }} />
                <Box sx={{ width: "80%", mt: "20px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="txnType-label">Txn Type</InputLabel>
                        <Select
                            labelId="txnType-label"
                            id="txnType-select"
                            ref={props.txnIsCredit}
                            label="Txn Type"
                        >
                            <MenuItem value="Credit">Credit</MenuItem>
                            <MenuItem value="Debit">Debit</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </StyledModal >
    )
}

export default AddModal