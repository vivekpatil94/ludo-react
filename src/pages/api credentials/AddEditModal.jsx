import React, { useEffect, useState } from 'react'

import { Box, TextField } from '@mui/material'
import StyledModal from '../../components/StyledModal'

const AddEditModal = (props) => {

    const [apiUrl, SetApiUrl] = useState("");
    const [appVersion, SetAppVersion] = useState("");
    const [masterIp, SetMasterIP] = useState("");
    const [masterPort, SetMasterPort] = useState(0);
    const [gameIp, SetGameIP] = useState("");
    const [gamePort, SetGamePort] = useState(0);

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const handleSave = () => {
        if (props.selectedOption === "new")
            props.handleCreateCredential(apiUrl, appVersion, masterIp, masterPort, gameIp, gamePort);

        if (props.selectedOption === "edit")
            props.handleEditCredential(props.credential.id, apiUrl, appVersion, masterIp, masterPort, gameIp, gamePort);
    }

    useEffect(() => {
        if (props.credential) {
            SetApiUrl(props.credential.apiUrl);
            SetAppVersion(props.credential.appVersion);
            SetMasterIP(props.credential.masterIp);
            SetMasterPort(props.credential.masterPort);
            SetGameIP(props.credential.gameIp);
            SetGamePort(props.credential.gamePort);
        } else {
            SetApiUrl("");
            SetAppVersion("");
            SetMasterIP("");
            SetMasterPort(0);
            SetGameIP("");
            SetGamePort(0);
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
                <TextField label="API URL" type="text" value={apiUrl} onChange={(event) => { SetApiUrl(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="App Version" type="text" value={appVersion} onChange={(event) => { SetAppVersion(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Master IP" type="text" value={masterIp} onChange={(event) => { SetMasterIP(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Master Port" type="number" value={masterPort} onChange={(event) => { SetMasterPort(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Game IP" type="text" value={gameIp} onChange={(event) => { SetGameIP(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Game Port" type="number" value={gamePort} onChange={(event) => { SetGamePort(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
            </Box>
        </StyledModal>
    )
}

export default AddEditModal