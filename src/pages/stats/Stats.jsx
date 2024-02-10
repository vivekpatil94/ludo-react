import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'

import { getStats } from '../../services/api';
import Stats_Card from './Stats_Card';

const Stats = (props) => {

    const [todayDeposit, SetTodayDeposit] = useState(0);
    const [todayWithdraw, SetTodayWithdraw] = useState(0);
    const [todayWithdrawRequest, SetWithdrawRequest] = useState(0);
    const [todayBets, SetTodayBets] = useState(0);
    const [todayBonus, SetTodayBonus] = useState(0);
    const [todayCommission, SetTodayCommission] = useState(0);
    const [todayBotWinnings, SetTodayBotWinnings] = useState(0);
    const [totalPlayers, SetTotalPlayers] = useState(0);
    const [totalPlayersBalance, SetTotalPlayersBalance] = useState(0);

    const fetchData = async () => {
        var response = {};

        response = await getStats();

        if (response.status === 200) {
            if (response.data.status) {
                SetTodayDeposit(response.data.todayDeposit);
                SetTodayWithdraw(response.data.todayWithdraw);
                SetWithdrawRequest(response.data.todayWithdrawRequest);
                SetTodayBets(response.data.todayBets);
                SetTodayBonus(response.data.todayBonus);
                SetTodayCommission(response.data.todayCommission);
                SetTodayBotWinnings(response.data.todayBotWinnings);
                SetTotalPlayers(response.data.totalPlayers);
                SetTotalPlayersBalance(response.data.totalPlayersBalance);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    useEffect(() => {
        props.SetPageDetails({ index: 27, path: "/Stats" })
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

            <Grid container spacing={5}>
                <Grid item xs={4}>
                    <Stats_Card
                        title="Today Deposit"
                        value={todayDeposit}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Stats_Card
                        title="Today Withdraw"
                        value={todayWithdraw}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Stats_Card
                        title="Today Withdraw Request"
                        value={todayWithdrawRequest}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Stats_Card
                        title="Today Bets"
                        value={todayBets}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Stats_Card
                        title="Today Bonus"
                        value={todayBonus}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Stats_Card
                        title="Today Commission"
                        value={todayCommission}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Stats_Card
                        title="Today Bot Winnings"
                        value={todayBotWinnings}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Stats_Card
                        title="Total Players"
                        value={totalPlayers}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Stats_Card
                        title="Total Players Balance"
                        value={totalPlayersBalance}
                    />
                </Grid>
            </Grid>

        </Box>
    )
}

export default Stats