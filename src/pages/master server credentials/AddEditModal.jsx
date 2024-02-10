import React, { useEffect, useState } from 'react'

import { Box, TextField } from '@mui/material'
import StyledModal from '../../components/StyledModal'

const AddEditModal = (props) => {

    const [appVersion, SetAppVersion] = useState("");
    const [ip, SetIP] = useState("");
    const [port, SetPort] = useState(0);

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const handleSave = () => {
        if (props.selectedOption === "new")
            props.handleCreateCredential(appVersion, ip, port);

        if (props.selectedOption === "edit")
            props.handleEditCredential(props.credential.id, appVersion, ip, port);
    }

    useEffect(() => {
        if (props.credential) {
            SetAppVersion(props.credential.appVersion);
            SetIP(props.credential.ip);
            SetPort(props.credential.port);
        } else {
            SetAppVersion("");
            SetIP("");
            SetPort(0);
        }
    }, [props.credential]);

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose} handleSave={handleSave}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "25px"
            }}>
                <TextField label="AppVersion" type="text" value={appVersion} onChange={(event) => { SetAppVersion(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="IP" type="text" value={ip} onChange={(event) => { SetIP(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Port" type="number" value={port} onChange={(event) => { SetPort(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
            </Box>
        </StyledModal>
    )
}

export default AddEditModal