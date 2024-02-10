import React, { useEffect, useState } from 'react'

import { Box, Button, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import { createUser, deleteUser, getUsers, updateUser } from '../../services/api';
import DataTable from '../../components/DataTable';
import AddEditModal from './AddEditModal';

const Users = (props) => {
    const theme = useTheme();

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "createTime", label: "Create Time", minWidth: 100, align: "center" },
        { id: "username", label: "Username", minWidth: 100, align: "center" },
        //{ id: "password", label: "Password", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]
    const [rows, SetRows] = useState([]);

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const [selectedOption, SetSelectedOption] = useState("");

    const [userId, SetUserId] = useState("");
    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");

    const [privileges, SetPrivileges] = useState([]);

    const [tempCount, SetTempCount] = useState(0);

    const ForceRender = () => {
        SetTempCount(tempCount + 1);
    }

    const handleNew = () => {

        SetUsername("");
        SetPassword("");

        SetModalTitle("Create New User");
        ResetPrivileges();

        SetSelectedOption("new");
        SetModalOpen(true);
    }

    const handleEdit = (user) => {
        SetUserId(user.userId);
        SetUsername(user.username);
        SetPassword(user.password);

        SetModalTitle("Edit User");

        ResetPrivileges();

        var _privileges = privileges;

        _privileges.forEach((parentPrivilege) => {
            var _parentPrivilege = user.parentPrivileges.find(function (element) {
                return element.displayName === parentPrivilege.displayName;
            });

            if (_parentPrivilege) {
                parentPrivilege.childPrivileges.forEach((childPrivilege) => {
                    var _childPrivilege = _parentPrivilege.childPrivileges.find(function (element) {
                        return element.hiddenName === childPrivilege.hiddenName;
                    });

                    if (_childPrivilege) {
                        childPrivilege.isOn = true;
                    }
                });
            }
        });

        SetPrivileges(_privileges);
        ForceRender();

        SetSelectedOption("edit");
        SetModalOpen(true);
    }

    const handleDelete = (user) => {
        handleDeleteUser(user.userId);
    }

    const ResetPrivileges = () => {
        var _privileges = privileges;

        _privileges.forEach((privilege) => {
            privilege.isExpanded = false;
            privilege.childPrivileges.forEach((childPrivilege) => {
                childPrivilege.isOn = false;
            })
        });

        SetPrivileges(_privileges);
        ForceRender();
    }

    const fetchData = async () => {
        var response = await getUsers();

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.parentPrivileges.forEach((privilege) => {
                    privilege.isExpanded = false;
                    privilege.childPrivileges.forEach((childPrivilege) => {
                        childPrivilege.isOn = false;
                    })
                });
                SetPrivileges(response.data.parentPrivileges);

                response.data.users.forEach((user, index) => (
                    _rows.push
                        ({
                            index: index + 1,
                            data: user,
                            createTime: user.createTime,
                            username: user.username,
                            password: user.password,
                            actions: ["edit", "delete"]
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

    const handleCreateUser = async () => {
        var _privileges = [];
        privileges.forEach((parentPrivilege) => {
            parentPrivilege.childPrivileges.forEach((childPrivilege) => {
                if (childPrivilege.isOn) {
                    _privileges.push(childPrivilege.id);
                }
            });
        });

        var response = await createUser(username, password, _privileges);

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

    const handleEditUser = async () => {
        var _privileges = [];
        privileges.forEach((parentPrivilege) => {
            parentPrivilege.childPrivileges.forEach((childPrivilege) => {
                if (childPrivilege.isOn) {
                    _privileges.push(childPrivilege.id);
                }
            });
        });

        var response = await updateUser(userId, username, password, _privileges);

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

    const handleDeleteUser = async (userId) => {
        var response = await deleteUser(userId);

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
        props.SetPageDetails({ index: 1, path: "/Users" })
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
                margin: "50px"
            }}>
                <Button variant='contained' onClick={() => handleNew()} sx={{
                    fontWeight: 600,
                    p: "10px",
                }}>
                    <AddIcon sx={{ mr: "5px" }} />Add User
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
                />
            </Box>
            <AddEditModal
                theme={theme}

                privileges={privileges}
                SetPrivileges={SetPrivileges}

                isModalOpen={isModalOpen}
                SetModalOpen={SetModalOpen}

                modalTitle={modalTitle}

                username={username}
                SetUsername={SetUsername}

                password={password}
                SetPassword={SetPassword}

                selectedOption={selectedOption}
                handleCreateUser={handleCreateUser}
                handleEditUser={handleEditUser}

                ForceRender={ForceRender}
            />
        </Box>
    )
}

export default Users