import React, { useEffect, useState } from 'react';

import { Box, Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { createMasterServerCredential, deleteMasterServerCredential, 
    getMasterServerCredentials,
     updateMasterServerCredential } from '../../services/api';

import DataTable from '../../components/DataTable';
import AddEditModal from './AddEditModal';

const MasterServerCredentials = (props) => {
    const theme = useTheme();

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "appVersion", label: "App Version", minWidth: 100, align: "center" },
        { id: "ip", label: "IP", minWidth: 100, align: "center" },
        { id: "port", label: "Port", minWidth: 100, align: "center" },
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
        handleDeleteMasterServerCredential(credential.id);
    }

    const fetchData = async () => {
        var response = await getMasterServerCredentials();

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.map((credential, index) => (
                    _rows.push
                        ({
                            index: index + 1,
                            data: credential,
                            appVersion: credential.appVersion,
                            ip: credential.ip,
                            port: credential.port,
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

    const handleCreateMasterServerCredential = async (appVersion, ip, port) => {
        var response = await createMasterServerCredential(appVersion, ip, port);

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

    const handleEditMasterServerCredential = async (credentialId, appVersion, ip, port) => {
        var response = await updateMasterServerCredential(credentialId, appVersion, ip, port);

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

    const handleDeleteMasterServerCredential = async (credentialId) => {
        var response = await deleteMasterServerCredential(credentialId);

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
        props.SetPageDetails({ index: 24, path: "/MasterServerCredentials" })
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
                handleCreateCredential={handleCreateMasterServerCredential}
                handleEditCredential={handleEditMasterServerCredential}
            />
        </Box >
    )
}

export default MasterServerCredentials