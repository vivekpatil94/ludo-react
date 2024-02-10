import React from 'react'

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Divider, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import StyledModal from '../../components/StyledModal'

const AddEditModal = (props) => {

    const handleAllPrivilegeExpansion = (doExpand) => {
        var _privileges = props.privileges;
        _privileges.forEach((privilege) => {
            privilege.isExpanded = doExpand
        });

        props.SetPrivileges(_privileges);
        props.ForceRender();
    }

    const handleParentPrivilegeExpansionToggle = (parentIndex) => {
        var _privileges = props.privileges;
        _privileges[parentIndex].isExpanded = !_privileges[parentIndex].isExpanded;

        props.SetPrivileges(_privileges);
        props.ForceRender();
    }

    const isAllPrivilegesExpanded = () => {
        var isExpanded = true;

        props.privileges.forEach((privilege) => {
            if (!privilege.isExpanded) {
                isExpanded = false;
            }
        });

        return isExpanded;
    }

    const handleParentPrivilegeClick = (event) => {
        event.stopPropagation();
    }

    const handleMainPrivilegeToggle = () => {
        var _privileges = props.privileges;
        var isOn = true;

        if (checkAllPrivileges(_privileges) === "checked")
            isOn = false;

        _privileges.forEach((privilege) => {
            privilege.childPrivileges.forEach((childPrivilege) => {
                childPrivilege.isOn = isOn;
            });
        });

        props.SetPrivileges(_privileges);
        props.ForceRender();
    }

    const handleParentPrivilegeToggle = (parentIndex) => {
        var _privileges = props.privileges;
        var isOn = true;

        if (checkParentPrivileges(_privileges[parentIndex]) === "checked")
            isOn = false;

        _privileges[parentIndex].childPrivileges.forEach((childPrivilege) => {
            childPrivilege.isOn = isOn;
        });

        props.SetPrivileges(_privileges);
        props.ForceRender();
    }

    const handleChildPrivilegeToggle = (parentIndex, childIndex) => {
        var _privileges = props.privileges;
        _privileges[parentIndex].childPrivileges[childIndex].isOn = !_privileges[parentIndex].childPrivileges[childIndex].isOn;

        props.SetPrivileges(_privileges);
        props.ForceRender();
    }

    const checkParentPrivileges = (privilege) => {
        var isChecked = true;
        var isIndeterminate = false;

        privilege.childPrivileges.forEach((childPrivilege) => {
            if (childPrivilege.isOn) {
                isIndeterminate = true;
            } else {
                isChecked = false;
            }
        });

        if (isChecked)
            return "checked";

        if (isIndeterminate)
            return "indeterminate";
    }

    const checkAllPrivileges = () => {
        var isChecked = true;
        var isIndeterminate = false;

        props.privileges.forEach((privilege) => {
            privilege.childPrivileges.forEach((childPrivilege) => {
                if (childPrivilege.isOn) {
                    isIndeterminate = true;
                } else {
                    isChecked = false;
                }
            });
        });

        if (isChecked)
            return "checked";

        if (isIndeterminate)
            return "indeterminate";
    }

    const handleModalClose = (event) => {
        props.SetModalOpen(false);
    }

    const onChangeUsername = (event) => {
        props.SetUsername(event.target.value);
    }

    const onChangePassword = (event) => {
        props.SetPassword(event.target.value);
    }

    const handleSave = () => {
        if (props.selectedOption === "new")
            props.handleCreateUser();

        if (props.selectedOption === "edit")
            props.handleEditUser();
    }

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose} handleSave={handleSave}>
            {
                props.selectedOption === "new" &&
                <>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        mt: "25px"
                    }}>
                        <TextField label="Username" type="text" value={props.username} onChange={onChangeUsername} sx={{ width: "40%" }} />
                        <TextField label="Password" type="text" value={props.password} onChange={onChangePassword} sx={{ width: "40%" }} />
                    </Box>
                    <Divider sx={{ m: "25px" }} />
                </>
            }
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                ml: "25px",
                mr: "25px"
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={() => handleMainPrivilegeToggle()}
                                checked={checkAllPrivileges() === "checked"}
                                indeterminate={checkAllPrivileges() === "indeterminate"}
                            />
                        }
                    />
                    <Typography variant='h6' textAlign="left" color={props.theme.palette.text.primary}>Privileges</Typography>
                </Box>
                <Button variant="contained" onClick={() => handleAllPrivilegeExpansion(true)} sx={{
                    width: "150px",
                    fontWeight: 600,
                    display: isAllPrivilegesExpanded() ? "none" : "block",
                }}>Show All</Button>
                <Button variant="contained" onClick={() => handleAllPrivilegeExpansion(false)} sx={{
                    width: "150px",
                    fontWeight: 600,
                    display: isAllPrivilegesExpanded() ? "block" : "none",
                }}>Hide All</Button>
            </Box>
            <Box sx={{ maxHeight: "40vh", overflow: "hidden", overflowY: "auto", mt: "25px" }}>
                {
                    props.privileges.map((privilege, parentIndex) => {
                        return (
                            <Accordion
                                key={privilege.displayName}
                                expanded={privilege.isExpanded}
                                onChange={() => handleParentPrivilegeExpansionToggle(parentIndex)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={privilege.displayName}
                                    id={privilege.displayName}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={() => handleParentPrivilegeToggle(parentIndex)}
                                                onClick={handleParentPrivilegeClick}
                                                checked={checkParentPrivileges(privilege) === "checked"}
                                                indeterminate={checkParentPrivileges(privilege) === "indeterminate"}
                                            />
                                        }
                                    />
                                    <Typography display={"flex"} alignItems={"center"}>{privilege.displayName}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2} ml="25px">
                                        {
                                            privilege.childPrivileges.map((childPrivilege, childIndex) => {
                                                return (
                                                    <Grid item xs={6} key={childPrivilege.id}>
                                                        <FormControlLabel
                                                            label={childPrivilege.displayName}
                                                            control={
                                                                <Checkbox
                                                                    onChange={() => handleChildPrivilegeToggle(parentIndex, childIndex)}
                                                                    checked={childPrivilege.isOn}
                                                                />
                                                            }
                                                        />
                                                    </Grid>
                                                );
                                            })
                                        }
                                    </Grid>
                                </AccordionDetails>
                            </Accordion >
                        );
                    })
                }
            </Box>
        </StyledModal>
    )
}

export default AddEditModal