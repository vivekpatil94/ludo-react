import React, { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { createWithdrawCommission, deleteWithdrawCommission, getWithdrawCommissions, updateWithdrawCommission } from '../../services/api';

import DataTable from '../../components/DataTable';
import AddEditModal from './AddEditModal';

const WithdrawCommissions = (props) => {

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "minAmount", label: "Min Amount", minWidth: 100, align: "center" },
        { id: "maxAmount", label: "Max Amount", minWidth: 100, align: "center" },
        { id: "commission", label: "Commission", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]
    const [rows, SetRows] = useState([]);

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const [selectedOption, SetSelectedOption] = useState("");

    const [withdrawCommissionId, SetWithdrawCommissionId] = useState("");
    const [minAmt, SetMinAmt] = useState(0);
    const [maxAmt, SetMaxAmt] = useState(0);
    const [commission, SetCommission] = useState(0);

    const handleNew = () => {

        SetMinAmt(0);
        SetMaxAmt(0);
        SetCommission(0);

        SetModalTitle("Create New Commission");

        SetSelectedOption("new");
        SetModalOpen(true);
    }

    const handleEdit = (withdrawCommission) => {
        SetWithdrawCommissionId(withdrawCommission.id);
        SetMinAmt(withdrawCommission.minAmount);
        SetMaxAmt(withdrawCommission.maxAmount);
        SetCommission(withdrawCommission.commission);

        SetModalTitle("Edit Commission");

        SetSelectedOption("edit");
        SetModalOpen(true);
    }

    const handleDelete = (withdrawCommission) => {
        handleDeleteWithdrawCommission(withdrawCommission.id);
    }

    const fetchData = async () => {
        var response = await getWithdrawCommissions();

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.map((withdrawCommission, index) => (
                    _rows.push
                        ({
                            index: index + 1,
                            data: withdrawCommission,
                            minAmount: withdrawCommission.minAmount,
                            maxAmount: withdrawCommission.maxAmount,
                            commission: withdrawCommission.commission,
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

    const handleCreateWithdrawCommission = async () => {
        var response = await createWithdrawCommission(minAmt, maxAmt, commission);

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

    const handleEditWithdrawCommission = async () => {
        var response = await updateWithdrawCommission(withdrawCommissionId, minAmt, maxAmt, commission);

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

    const handleDeleteWithdrawCommission = async (withdrawCommissionId) => {
        var response = await deleteWithdrawCommission(withdrawCommissionId);

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
        props.SetPageDetails({ index: 28, path: "/WithdrawCommissions" })
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
                    <AddIcon sx={{ mr: "5px" }} />Add Commission
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
                modalTitle={modalTitle}

                isModalOpen={isModalOpen}
                SetModalOpen={SetModalOpen}

                minAmt={minAmt}
                SetMinAmt={SetMinAmt}

                maxAmt={maxAmt}
                SetMaxAmt={SetMaxAmt}

                commission={commission}
                SetCommission={SetCommission}

                selectedOption={selectedOption}
                handleCreateWithdrawCommission={handleCreateWithdrawCommission}
                handleEditWithdrawCommission={handleEditWithdrawCommission}
            />
        </Box>
    )
}

export default WithdrawCommissions