import React, { useEffect, useState } from 'react';

import { Box, Button, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { createGameServerCredential, deleteGameServerCredential, getGameServerCredentials, updateGameServerCredential } from '../../services/api';

import DataTable from '../../components/DataTable';
import AddEditModal from './AddEditModal';

const GameServerCredentials = (props) => {
    const theme = useTheme();

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "masterServer", label: "Master Server", minWidth: 100, align: "center" },
        { id: "ip", label: "IP", minWidth: 100, align: "center" },
        { id: "port", label: "Port", minWidth: 100, align: "center" },
        { id: "priority", label: "Priority", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]
    const [rows, SetRows] = useState([]);

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const [selectedOption, SetSelectedOption] = useState("");

    const [credential, SetCredential] = useState();

    const [masterServers, SetMasterServers] = useState([]);

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
        handleDeleteGameServerCredential(credential.id);
    }

    const fetchData = async () => {
        var response = await getGameServerCredentials();

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.map((credential, index) => (
                    _rows.push
                        ({
                            index: index + 1,
                            data: credential,
                            masterServer: response.data.masterServers.map((server) => {
                                if (server.id === credential.masterServerId) {
                                    return (server.name);
                                } else {
                                    return ("");
                                }
                            }),
                            ip: credential.ip,
                            port: credential.port,
                            priority: credential.priority,
                            actions: ["edit", "delete", "copy"]
                        })
                ));

                SetRows(_rows);
                SetMasterServers(response.data.masterServers);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    const handleCreateGameServerCredential = async (masterServerId, ip, port, priority) => {
        var response = await createGameServerCredential(masterServerId, ip, port, priority);

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

    const handleEditGameServerCredential = async (credentialId, masterServerId, ip, port, priority) => {
        var response = await updateGameServerCredential(credentialId, masterServerId, ip, port, priority);

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

    const handleDeleteGameServerCredential = async (credentialId) => {
        var response = await deleteGameServerCredential(credentialId);

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
        props.SetPageDetails({ index: 25, path: "/GameServerCredentials" })
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
                masterServers={masterServers}

                selectedOption={selectedOption}
                handleCreateCredential={handleCreateGameServerCredential}
                handleEditCredential={handleEditGameServerCredential}
            />
        </Box >
    )
}

export default GameServerCredentials