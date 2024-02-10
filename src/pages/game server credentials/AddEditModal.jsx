import React, { useEffect, useState } from 'react'

import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import StyledModal from '../../components/StyledModal'

const AddEditModal = (props) => {

    const [masterServerId, SetMasterServerId] = useState(0);
    const [ip, SetIP] = useState("");
    const [port, SetPort] = useState(0);
    const [priority, SetPriority] = useState(0);

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const handleSave = () => {
        if (props.selectedOption === "new")
            props.handleCreateCredential(masterServerId, ip, port, priority);

        if (props.selectedOption === "edit")
            props.handleEditCredential(props.credential.id, masterServerId, ip, port, priority);
    }

    useEffect(() => {
        if (props.credential) {
            SetMasterServerId(props.credential.masterServerId);
            SetIP(props.credential.ip);
            SetPort(props.credential.port);
            SetPriority(props.credential.priority);
        } else {
            SetMasterServerId(0);
            SetIP("");
            SetPort(0);
            SetPriority(0);
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
                <Box sx={{ width: "80%", mt: "20px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="masterServer-label">Master Server</InputLabel>
                        <Select
                            labelId="masterServer-label"
                            id="masterServer-select"
                            value={masterServerId}
                            label="Master Server"
                        >
                            {
                                props.masterServers.map((masterServer) => {
                                    return (
                                        <MenuItem key={masterServer.id} value={masterServer.id} onClick={() => SetMasterServerId(masterServer.id)}>{masterServer.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
                <TextField label="IP" type="text" value={ip} onChange={(event) => { SetIP(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Port" type="number" value={port} onChange={(event) => { SetPort(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Priority" type="number" value={priority} onChange={(event) => { SetPriority(event.target.value) }} sx={{ width: "80%", mt: "20px" }} />
            </Box>
        </StyledModal>
    )
}

export default AddEditModal