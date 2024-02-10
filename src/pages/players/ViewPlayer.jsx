import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { getGameUserDetails, uploadKYC } from '../../services/api';
import DataTable from '../../components/DataTable';
import ImageModal from './ImageModal';

const ViewPlayer = (props) => {
    const infoColumns = [
        { id: "userId", label: "User Id", minWidth: 100, align: "center" },
        { id: "userName", label: "User Name", minWidth: 100, align: "center" },
        { id: "mobile", label: "Mobile", minWidth: 100, align: "center" },
        { id: "emailId", label: "Email Id", minWidth: 100, align: "center" },
        { id: "gender", label: "Gender", minWidth: 100, align: "center" },
        //{ id: "cash", label: "Cash", minWidth: 100, align: "center" },
        //{ id: "win", label: "Win", minWidth: 100, align: "center" },
        //{ id: "bonus", label: "Bonus", minWidth: 100, align: "center" },
        { id: "balance", label: "Balance", minWidth: 100, align: "center" },
        { id: "isBanned", label: "Banned", minWidth: 100, align: "center" }
    ]
    const [infoRows, SetInfoRows] = useState([]);

    const accountColumns = [
        { id: "accountHolder", label: "Account Holder", minWidth: 100, align: "center" },
        { id: "accountNumber", label: "Account Number", minWidth: 100, align: "center" },
        { id: "ifscCode", label: "IFSC Code", minWidth: 100, align: "center" },
        //{ id: "bankName", label: "Bank Name", minWidth: 100, align: "center" },
        //{ id: "branchName", label: "Branch Name", minWidth: 100, align: "center" },
        { id: "upiId", label: "UPI ID", minWidth: 100, align: "center" },
    ]
    const [accountRows, SetAccountRows] = useState([]);

    const statsColumns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "gameName", label: "Game Name", minWidth: 100, align: "center" },
        { id: "gamesPlayed", label: "Games Played", minWidth: 100, align: "center" },
        { id: "gamesWon", label: "Games Won", minWidth: 100, align: "center" },
        { id: "totalEarnings", label: "Total Earnings", minWidth: 100, align: "center" },
        { id: "highestEarnings", label: "Highest Earnings", minWidth: 100, align: "center" },
        { id: "winPercent", label: "Win Percentage", minWidth: 100, align: "center" }
    ]
    const [statsRows, SetStatsRows] = useState([]);

    const [url, SetUrl] = useState("");
    const [isModalOpen, SetModalOpen] = useState(false);

    const [selectedKyc, SetSelectedKyc] = useState("");

    const [aadharFront, SetAadharFront] = useState("");
    const [aadharBack, SetAadharBack] = useState("");
    const [panCard, SetPanCard] = useState("");
    const [photo, SetPhoto] = useState("");

    let imageRef = useRef();

    const navigateBack = () => {
        if (props.navigateBack) {
            props.navigateBack();
        } else {
            props.SetPageDetails({ index: 5, path: "/Players" })
        }
    }

    const handleAadharFront = () => {
        SetUrl(aadharFront);
        SetModalOpen(true);
        SetSelectedKyc("aadhar_front");
    }

    const handleAadharBack = () => {
        SetUrl(aadharBack);
        SetModalOpen(true);
        SetSelectedKyc("aadhar_back");
    }

    const handlePanCard = () => {
        SetUrl(panCard);
        SetModalOpen(true);
        SetSelectedKyc("pan_card");
    }

    const handlePhoto = () => {
        SetUrl(photo);
        SetModalOpen(true);
        SetSelectedKyc("photo");
    }

    const fetchData = useCallback(async () => {
        SetInfoRows([]);
        SetStatsRows([]);

        var response = await getGameUserDetails(props.userId === undefined ? (JSON.parse(localStorage.getItem("cc_player"))).userId : props.userId);

        if (response.status === 200) {
            if (response.data.status) {
                const _infoRows = [];
                const _statsRows = [];
                const _accountRows = [];

                SetAadharFront(response.data.aadharFront);
                SetAadharBack(response.data.aadharBack);
                SetPanCard(response.data.panCard);
                SetPhoto(response.data.photo);

                _infoRows.push
                    ({
                        userId: response.data.userId,
                        userName: response.data.userName,
                        mobile: response.data.mobile,
                        emailId: response.data.emailId,
                        gender: response.data.gender,
                        cash: response.data.cash,
                        win: response.data.win,
                        bonus: response.data.bonus,
                        balance: response.data.balance,
                        isBanned: response.data.isBanned ? "Yes" : "No"
                    });

                _accountRows.push
                    ({
                        accountHolder: response.data.accountHolder,
                        accountNumber: response.data.accountNumber,
                        ifscCode: response.data.ifsc,
                        bankName: response.data.bankName,
                        branchName: response.data.branchName,
                        upiId: response.data.upiId
                    });

                response.data.stats.forEach((stat, index) => {
                    _statsRows.push
                        ({
                            index: stat.gameId === 0 ? "" : index,
                            gameName: stat.gameId === 0 ? "Total" : stat.gameName,
                            gamesPlayed: stat.gamesPlayed,
                            gamesWon: stat.gamesWon,
                            totalEarnings: stat.totalEarnings,
                            highestEarnings: stat.highestEarnings,
                            winPercent: stat.winPercent
                        });
                });

                SetInfoRows(_infoRows);
                SetStatsRows(_statsRows);
                SetAccountRows(_accountRows);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }, [props]);

    const handleUploadKYC = async (image) => {
        var response = await uploadKYC(props.userId === undefined ? (JSON.parse(localStorage.getItem("cc_player"))).userId : props.userId, image, selectedKyc);

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
    };

    useEffect(() => {
        if (props.userId === undefined) {
            props.SetPageDetails({ index: 5, path: "/ViewPlayer" })
            fetchData();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (props.userId !== undefined) {
            fetchData();
        }
        // eslint-disable-next-line
    }, [props.userId]);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                mt: "100px",
                display: "flex",
                flexDirection: "column"
            }}>
            {((props.userId === undefined) || props.showBack) &&
                <Box sx={{
                    width: "90%",
                    m: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Box>
                        <Button variant='contained' onClick={() => navigateBack()} sx={{
                            fontWeight: 600,
                            p: "10px",
                        }}>
                            <ArrowBackIcon sx={{ mr: "5px" }} />Back
                        </Button>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        gap: "10px"
                    }}>
                        {/*
                        <Button variant='contained' onClick={() => handleAadharFront()} sx={{
                            fontWeight: 600,
                            p: "10px",
                        }}>
                            Aadhar Front
                        </Button>
                        <Button variant='contained' onClick={() => handleAadharBack()} sx={{
                            fontWeight: 600,
                            p: "10px",
                        }}>
                            Aadhar Back
                        </Button>
                        <Button variant='contained' onClick={() => handlePanCard()} sx={{
                            fontWeight: 600,
                            p: "10px",
                        }}>
                            Pan Card
                        </Button>
                        <Button variant='contained' onClick={() => handlePhoto()} sx={{
                            fontWeight: 600,
                            p: "10px",
                        }}>
                            Photo
                        </Button>
                    */}
                    </Box>
                </Box>
            }
            <Box sx={{
                width: "100%",
                justifyContent: "center",
                display: "flex"
            }}>
                <DataTable
                    rows={infoRows}
                    columns={infoColumns}
                />
            </Box>
            <Box sx={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                mt: "50px"
            }}>
                <DataTable
                    rows={accountRows}
                    columns={accountColumns}

                    height="50vh"
                />
            </Box>
            <Box sx={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                mt: "50px"
            }}>
                <DataTable
                    rows={statsRows}
                    columns={statsColumns}

                    height="50vh"
                />
            </Box>
            <ImageModal
                url={url}

                showSuccess={props.showSuccess}
                showError={props.showError}

                isModalOpen={isModalOpen}
                SetModalOpen={SetModalOpen}

                imageRef={imageRef}
                handleUploadKYC={handleUploadKYC}
            />
        </Box>
    )
}

export default ViewPlayer