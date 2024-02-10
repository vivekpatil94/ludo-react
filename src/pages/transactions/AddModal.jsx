import React from 'react'

import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import StyledModal from '../../components/StyledModal'

const AddModal = (props) => {

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    /*const onChangeAmount = (event) => {
        props.SetTxnAmount(event.target.value);
    }

    const onChangeTxnType = (value) => {
        props.SetTxnType(value === "Credit");
    }

    const onChangeTxnWallet = (value) => {
        props.SetTxnWallet(value);
    }

    const onChangeTxnDescription = (event) => {
        props.SetDescription(event.target.value);
    }

    const onChangeTxnUserId = (event) => {
        props.SetUserId(event.target.value);
    }*/

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
                <Box sx={{ width: "80%", mt: "20px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="txnWallet-label">Txn Wallet</InputLabel>
                        <Select
                            labelId="txnWallet-label"
                            id="txnWallet-select"
                            ref={props.txnWallet}
                            label="Txn Wallet"
                        >
                            <MenuItem value="Cash">Cash</MenuItem>
                            <MenuItem value="Bonus">Bonus</MenuItem>
                            {
                                /*
                                <MenuItem value="Win">Win</MenuItem>
                                <MenuItem value="Bonus">Bonus</MenuItem>
                                */
                            }
                        </Select>
                    </FormControl>
                </Box>
                <TextField label="User Id" type="text" inputRef={props.txnUserId} sx={{ width: "80%", mt: "20px" }} />
            </Box>
        </StyledModal >
    )
}

export default AddModal