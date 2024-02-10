import React, { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { createBundle, deleteBundle, getBundles, updateBundle } from '../../services/api';

import DataTable from '../../components/DataTable';
import AddEditModal from './AddEditModal';

const Bundles = (props) => {

    const columns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "name", label: "Name", minWidth: 100, align: "center" },
        { id: "androidUrl", label: "Android Url", minWidth: 100, align: "center" },
        { id: "iosUrl", label: "iOS Url", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]
    const [rows, SetRows] = useState([]);

    const [isModalOpen, SetModalOpen] = useState(false);
    const [modalTitle, SetModalTitle] = useState("");

    const [selectedOption, SetSelectedOption] = useState("");

    const [bundleId, SetBundleId] = useState("");
    const [bundleName, SetBundleName] = useState("");
    const [androidUrl, SetAndroidUrl] = useState("");
    const [iosUrl, SetIosUrl] = useState("");

    const handleNew = () => {

        SetBundleName("");
        SetAndroidUrl("");
        SetIosUrl("");

        SetModalTitle("Create New Bundle");

        SetSelectedOption("new");
        SetModalOpen(true);
    }

    const handleEdit = (bundle) => {
        SetBundleId(bundle.id);
        SetBundleName(bundle.name);
        SetAndroidUrl(bundle.androidUrl);
        SetIosUrl(bundle.iosUrl);

        SetModalTitle("Edit Bundle");

        SetSelectedOption("edit");
        SetModalOpen(true);
    }

    const handleDelete = (bundle) => {
        handleDeleteBundle(bundle.id);
    }

    const fetchData = async () => {
        var response = await getBundles();

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.data.map((bundle, index) => (
                    _rows.push
                        ({
                            index: index + 1,
                            data: bundle,
                            name: bundle.name,
                            androidUrl: bundle.androidUrl,
                            iosUrl: bundle.iosUrl,
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

    const handleCreateBundle = async () => {
        var response = await createBundle(bundleName, androidUrl, iosUrl);

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

    const handleEditBundle = async () => {
        var response = await updateBundle(bundleId, bundleName, androidUrl, iosUrl);

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

    const handleDeleteBundle = async (bundleId) => {
        var response = await deleteBundle(bundleId);

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
        props.SetPageDetails({ index: 2, path: "/Bundles" })
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
                    <AddIcon sx={{ mr: "5px" }} />Add Bundle
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

                bundleName={bundleName}
                SetBundleName={SetBundleName}

                androidUrl={androidUrl}
                SetAndroidUrl={SetAndroidUrl}

                iosUrl={iosUrl}
                SetIosUrl={SetIosUrl}

                selectedOption={selectedOption}
                handleCreateBundle={handleCreateBundle}
                handleEditBundle={handleEditBundle}
            />
        </Box>
    )
}

export default Bundles