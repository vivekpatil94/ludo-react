import React, { useEffect, useState } from 'react';

import { Box, Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { createApiCredential, deleteApiCredential, getApiCredentials, updateApiCredential } from '../../services/api';

import DataTable from '../../components/DataTable';
import AddEditModal from './AddEditModal';

const ApiCredentials = (props) => {
    const theme = useTheme();

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "apiUrl", label: "API URL", minWidth: 100, align: "center" },
        { id: "appVersion", label: "App Version", minWidth: 100, align: "center" },
        { id: "masterIp", label: "Master IP", minWidth: 100, align: "center" },
        { id: "masterPort", label: "Master Port", minWidth: 100, align: "center" },
        { id: "gameIp", label: "Game IP", minWidth: 100, align: "center" },
        { id: "gamePort", label: "Game Port", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]
    const [rows, SetRows] = useState([]);

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const [selectedOption, SetSelectedOption] = useState("");

    const [credential, SetCredential] = useState();

    const handleNew = () => {
        SetCredential();

        SetModalTitle("Create New Credential");

        SetSelectedOption("new");
        SetModalOpen(true);
    }

    const handleEdit = (credential) => {
        SetCredential(credential);

        SetModalTitle("Edit Credential");

        SetSelectedOption("edit");
        SetModalOpen(true);
    }

    const handleCopy = (credential) => {
        SetCredential(credential);

        SetModalTitle("Create New Credential");

        SetSelectedOption("new");
        SetModalOpen(true);
    }

    const handleDelete = (credential) => {
        handleDeleteApiCredential(credential.id);
    }

    const fetchData = async () => {
        var response = await getApiCredentials();

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.map((credential, index) => (
                    _rows.push
                        ({
                            index: index + 1,
                            data: credential,
                            apiUrl: credential.apiUrl,
                            appVersion: credential.appVersion,
                            masterIp: credential.masterIp,
                            masterPort: credential.masterPort,
                            gameIp: credential.gameIp,
                            gamePort: credential.gamePort,
                            actions: ["edit", "delete", "copy"]
                        })
                ));

                SetRows(_rows);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    const handleCreateApiCredential = async (apiUrl, appVersion, masterIp, masterPort, gameIp, gamePort) => {
        var response = await createApiCredential(apiUrl, appVersion, masterIp, masterPort, gameIp, gamePort);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    const handleEditApiCredential = async (credentialId, apiUrl, appVersion, masterIp, masterPort, gameIp, gamePort) => {
        var response = await updateApiCredential(credentialId, apiUrl, appVersion, masterIp, masterPort, gameIp, gamePort);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    const handleDeleteApiCredential = async (credentialId) => {
        var response = await deleteApiCredential(credentialId);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                SetModalOpen(false);
                fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }

    useEffect(() => {
        props.SetPageDetails({ index: 26, path: "/ApiCredentials" })
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                mt: "100px",
                display: "flex",
                flexDirection: "column"
            }}>
            <Box sx={{
                width: "90%",
                margin: "50px",
                display: "block"
            }}>
                <Button variant='contained' onClick={() => handleNew()} sx={{
                    fontWeight: 600,
                    p: "10px",
                }}>
                    <AddIcon sx={{ mr: "5px" }} />Add Credential
                </Button>
            </Box>
            <Box sx={{
                width: "100%",
                justifyContent: "center",
                display: "flex"
            }}>
                <DataTable
                    rows={rows}
                    columns={columns}
                    showPagination={false}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleCopy={handleCopy}
                />
            </Box>
            <AddEditModal
                theme={theme}
                modalTitle={modalTitle}

                isModalOpen={isModalOpen}
                SetModalOpen={SetModalOpen}

                credential={credential}

                selectedOption={selectedOption}
                handleCreateCredential={handleCreateApiCredential}
                handleEditCredential={handleEditApiCredential}
            />
        </Box >
    )
}

export default ApiCredentials