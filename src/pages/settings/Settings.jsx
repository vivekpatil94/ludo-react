import React, { useEffect, useState } from 'react'

import { Box, Button, styled, TextField, FormControl, InputLabel, Select, MenuItem, Typography, FormControlLabel, Checkbox } from '@mui/material'

import { getSettings, updateSettings } from '../../services/api';

const StyledTextField = styled(TextField)({
    minWidth: "100px",
    width: "50%",
    marginTop: "20px"
});

const Settings = (props) => {

    const [withdraw_commission, SetWithdrawCommission] = useState(0);
    const [welcome_bonus, SetWelcomeBonus] = useState(0);
    const [referee_bonus, SetRefereeBonus] = useState(0);
    const [referrer_bonus, SetReferrerBonus] = useState(0);

    const [url, SetUrl] = useState("");
    const [version, SetVersion] = useState("");

    const [serverIp, SetServerIp] = useState("");
    const [serverPort, SetServerPort] = useState(0);

    const [min_withdrawal, SetMinWithdrawal] = useState(0);

    const [bot_difficulty, SetBotDifficulty] = useState(2);

    const [withdrawal_min_time_hours, SetWithdrawalMinTimeHours] = useState("00");
    const [withdrawal_min_time_minutes, SetWithdrawalMinTimeMinutes] = useState("00");
    const [withdrawal_max_time_hours, SetWithdrawalMaxTimeHours] = useState("00");
    const [withdrawal_max_time_minutes, SetWithdrawalMaxTimeMinutes] = useState("00");
    const [withdrawal_allowed, SetWithdrawalAllowed] = useState(false);
    const [notice, SetNotice] = useState("");
    const [notice_link, SetNoticeLink] = useState("");
    const [helpline_number, SetHelplineNumber] = useState("");

    const fetchData = async () => {
        var response = {};

        response = await getSettings();

        if (response.status === 200) {
            if (response.data.status) {
                SetWithdrawCommission(response.data.withdraw_commission);
                SetWelcomeBonus(response.data.welcome_bonus);
                SetRefereeBonus(response.data.referee_bonus);
                SetReferrerBonus(response.data.referrer_bonus);

                SetUrl(response.data.url);
                SetVersion(response.data.version);

                SetServerIp(response.data.serverIp);
                SetServerPort(response.data.serverPort);

                SetMinWithdrawal(response.data.min_withdrawal);

                SetBotDifficulty(response.data.botDifficultyLevel);

                SetWithdrawalAllowed(response.data.withdrawal_allowed);

                SetWithdrawalMinTimeHours(response.data.withdrawal_min_time.split(':')[0]);
                SetWithdrawalMinTimeMinutes(response.data.withdrawal_min_time.split(':')[1]);

                SetWithdrawalMaxTimeHours(response.data.withdrawal_max_time.split(':')[0]);
                SetWithdrawalMaxTimeMinutes(response.data.withdrawal_max_time.split(':')[1]);

                SetNotice(response.data.notice);
                SetNoticeLink(response.data.notice_link);
                SetHelplineNumber(response.data.helpline_number);

            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    const handleSaveSettings = async () => {
        var response = await updateSettings(withdraw_commission, welcome_bonus, referee_bonus, referrer_bonus, url, version, serverIp, serverPort, min_withdrawal, withdrawal_min_time_hours + ":" + withdrawal_min_time_minutes, withdrawal_max_time_hours + ":" + withdrawal_max_time_minutes, withdrawal_allowed, notice, notice_link, helpline_number, bot_difficulty);

        if (response.status === 200) {
            if (response.data.status) {
                props.showSuccess(response.data.message);
                fetchData();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    useEffect(() => {
        props.SetPageDetails({ index: 12, path: "/Settings" })
        fetchData();

        // eslint-disable-next-line
    }, []);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                m: "50px",
                mt: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>

            {
                //<StyledTextField label="Withdraw Commission (%)" type="number" value={withdraw_commission} onChange={(event) => SetWithdrawCommission(event.target.value)} />

                //<StyledTextField label="Server IP" type="text" value={serverIp} onChange={(event) => SetServerIp(event.target.value)} />
                //<StyledTextField label="Server Port" type="number" value={serverPort} onChange={(event) => SetServerPort(event.target.value)} />
            }

            <StyledTextField label="App URL" type="text" value={url} onChange={(event) => SetUrl(event.target.value)} />
            <StyledTextField label="Latest Version" type="text" value={version} onChange={(event) => SetVersion(event.target.value)} />

            <StyledTextField label="Welcome Bonus" type="number" value={welcome_bonus} onChange={(event) => SetWelcomeBonus(event.target.value)} />
            <StyledTextField label="Referee Bonus" type="number" value={referee_bonus} onChange={(event) => SetRefereeBonus(event.target.value)} />
            <StyledTextField label="Referrer Bonus" type="number" value={referrer_bonus} onChange={(event) => SetReferrerBonus(event.target.value)} />

            <StyledTextField label="Notice" type="text" value={notice} onChange={(event) => SetNotice(event.target.value)} />
            <StyledTextField label="Notice Link" type="text" value={notice_link} onChange={(event) => SetNoticeLink(event.target.value)} />
            <StyledTextField label="Helpline Number" type="text" value={helpline_number} onChange={(event) => SetHelplineNumber(event.target.value)} />

            <FormControl sx={{ width: "50%", minWidth: "100px", mt: "20px" }}>
                <InputLabel id="botDifficultyAllowed-label">Bot Difficulty</InputLabel>
                <Select
                    labelId="botDifficulty-label"
                    id="botDifficulty-select"
                    value={bot_difficulty}
                    label="Bot Difficulty"
                >
                    <MenuItem value="1" onClick={() => SetBotDifficulty(1)}>Easy</MenuItem >
                    <MenuItem value="2" onClick={() => SetBotDifficulty(2)}>Normal</MenuItem >
                    <MenuItem value="3" onClick={() => SetBotDifficulty(3)}>Hard</MenuItem >
                </Select>
            </FormControl>

            <FormControl sx={{ width: "50%", minWidth: "100px", mt: "20px" }}>
                <InputLabel id="withdrawalAllowed-label">Withdrawal Allowed</InputLabel>
                <Select
                    labelId="withdrawalAllowed-label"
                    id="withdrawalAllowed-select"
                    value={withdrawal_allowed}
                    label="Withdrawal Allowed"
                >
                    <MenuItem value="true" onClick={() => SetWithdrawalAllowed(true)}>Yes</MenuItem >
                    <MenuItem value="false" onClick={() => SetWithdrawalAllowed(false)}>No</MenuItem >
                </Select>
            </FormControl>

            <StyledTextField label="Min Withdrawal" type="number" value={min_withdrawal} onChange={(event) => SetMinWithdrawal(event.target.value)} />

            <Typography color={'white'} sx={{
                width: "50%",
                minWidth: "100px",
                mt: "20px"
            }}>Withdrawal Min Time</Typography>

            <Box sx={{
                bgcolor: "background.default",
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "left",
                width: "50%",
                minWidth: "100px",
                gap: "50px"
            }}>
                <FormControl sx={{ width: "100%", minWidth: "100px", mt: "20px" }}>
                    <InputLabel id="withdrawalMinTimeHours-label">Hours</InputLabel>
                    <Select
                        labelId="withdrawalMinTimeHours-label"
                        id="withdrawalMinTimeHours-select"
                        value={withdrawal_min_time_hours}
                        label="Hours"
                    >
                        {
                            Array.from({ length: 24 }, (_, i) => (
                                <MenuItem key={("0" + i).slice(-2)} value={("0" + i).slice(-2)} onClick={() => SetWithdrawalMinTimeHours(("0" + i).slice(-2))}> {("0" + i).slice(-2)}</MenuItem >
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ width: "100%", minWidth: "100px", mt: "20px" }}>
                    <InputLabel id="withdrawalMinTimeMinutes-label">Minutes</InputLabel>
                    <Select
                        labelId="withdrawalMinTimeMinutes-label"
                        id="withdrawalMinTimeMinutes-select"
                        value={withdrawal_min_time_minutes}
                        label="Minutes"
                    >
                        {
                            Array.from({ length: 60 }, (_, i) => (
                                <MenuItem key={("0" + i).slice(-2)} value={("0" + i).slice(-2)} onClick={() => SetWithdrawalMinTimeMinutes(("0" + i).slice(-2))}> {("0" + i).slice(-2)}</MenuItem >
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>

            <Typography color={'white'} sx={{
                width: "50%",
                minWidth: "100px",
                mt: "20px"
            }}>Withdrawal Max Time</Typography>

            <Box sx={{
                bgcolor: "background.default",
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "left",
                width: "50%",
                minWidth: "100px",
                gap: "50px"
            }}>
                <FormControl sx={{ width: "100%", minWidth: "100px", mt: "20px" }}>
                    <InputLabel id="withdrawalMaxTimeHours-label">Hours</InputLabel>
                    <Select
                        labelId="withdrawalMaxTimeHours-label"
                        id="withdrawalMaxTimeHours-select"
                        value={withdrawal_max_time_hours}
                        label="Hours"
                    >
                        {
                            Array.from({ length: 24 }, (_, i) => (
                                <MenuItem key={("0" + i).slice(-2)} value={("0" + i).slice(-2)} onClick={() => SetWithdrawalMaxTimeHours(("0" + i).slice(-2))}> {("0" + i).slice(-2)}</MenuItem >
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ width: "100%", minWidth: "100px", mt: "20px" }}>
                    <InputLabel id="withdrawalMaxTimeMaxutes-label">Minutes</InputLabel>
                    <Select
                        labelId="withdrawalMaxTimeMaxutes-label"
                        id="withdrawalMaxTimeMaxutes-select"
                        value={withdrawal_max_time_minutes}
                        label="Minutes"
                    >
                        {
                            Array.from({ length: 60 }, (_, i) => (
                                <MenuItem key={("0" + i).slice(-2)} value={("0" + i).slice(-2)} onClick={() => SetWithdrawalMaxTimeMinutes(("0" + i).slice(-2))}> {("0" + i).slice(-2)}</MenuItem >
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>

            <Button variant="contained" onClick={handleSaveSettings} sx={{
                margin: "50px",
                marginBottom: "10px",
                fontWeight: 600,
                width: "100px"
            }}>Save</Button>
        </Box>
    )
}

export default Settings