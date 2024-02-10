import React from 'react'

import { Box, TextField } from '@mui/material'
import StyledModal from '../../components/StyledModal'

const AddEditModal = (props) => {

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const onChangeBundleName = (event) => {
        props.SetBundleName(event.target.value);
    }

    const onChangeAndroidUrl = (event) => {
        props.SetAndroidUrl(event.target.value);
    }

    const onChangeIosUrl = (event) => {
        props.SetIosUrl(event.target.value);
    }

    const handleSave = () => {
        if (props.selectedOption === "new")
            props.handleCreateBundle();

        if (props.selectedOption === "edit")
            props.handleEditBundle();
    }

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose} handleSave={handleSave}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "25px"
            }}>
                <TextField label="Name" type="text" value={props.bundleName} onChange={onChangeBundleName} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Android URL" type="text" value={props.androidUrl} onChange={onChangeAndroidUrl} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="iOS URL" type="text" value={props.iosUrl} onChange={onChangeIosUrl} sx={{ width: "80%", mt: "20px" }} />
            </Box>
        </StyledModal>
    )
}

export default AddEditModal