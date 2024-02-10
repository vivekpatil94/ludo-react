import React, { useState } from 'react'

import Login from "./pages/Login";
import Root from "./pages/Root";
import Users from "./pages/users/Users";
import Bundles from "./pages/bundles/Bundles";
import Categories from "./pages/categories/Categories";
import Games from "./pages/games/Games";
import GameVariations from './pages/game variations/GameVariations';
import ParametersRooms from './pages/parameters & rooms/ParametersRooms';
import Players from "./pages/players/Players";
import ViewPlayer from "./pages/players/ViewPlayer";
import PlayerInfo from "./pages/player info/PlayerInfo";
import GameHistory from "./pages/game history/GameHistory";
import Transactions from "./pages/transactions/Transactions";
import Withdrawals from './pages/withdrawals/Withdrawals';
import WithdrawCommissions from './pages/withdrawCommissions/WithdrawCommissions';
import Earnings from './pages/earnings/Earnings';
import BotTransactions from "./pages/bot transactions/BotTransactions";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";
import MasterServerCredentials from "./pages/master server credentials/MasterServerCredentials";
import GameServerCredentials from "./pages/game server credentials/GameServerCredentials";
import ApiCredentials from "./pages/api credentials/ApiCredentials";
import Stats from "./pages/stats/Stats";
import Tournament from './pages/tournament/Tournament';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Button, createTheme, styled, ThemeProvider } from '@mui/material';
import { useSnackbar } from 'notistack';

const StyledButton = styled(Button)({
    color: 'white',
    fontWeight: 500
});

const App = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [pageDetails, SetPageDetails] = useState({ index: 0, path: "/Stats" });

    const theme = createTheme({
        palette: {
            mode: "dark",
            table: {
                head: "#353535"
            }
        },
    });

    const showMessage = (message, variant, hideDuration) => {
        enqueueSnackbar(message, {
            variant: variant, autoHideDuration: hideDuration, action: (snackbarId) => (
                <StyledButton onClick={() => closeSnackbar(snackbarId)}>
                    Dismiss
                </StyledButton>
            ),
            anchorOrigin: { horizontal: 'right', vertical: 'top' }
        });
    }

    const showSuccess = (message) => {
        showMessage(message, "success", 3000);
    }

    const showError = (message) => {
        showMessage(message, "error", 3000);
    }

    const router = createBrowserRouter([
        {
            path: "/Login",
            element: <Login
                showSuccess={showSuccess}
                showError={showError} />
        },
        {
            path: "/",
            element: <Root
                showSuccess={showSuccess}
                showError={showError}
                pageDetails={pageDetails}
                SetPageDetails={SetPageDetails}
            />,
            children: [
                {
                    path: "Users", element: <Users
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Bundles", element: <Bundles
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Categories", element: <Categories
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Games", element: <Games
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "GameVariations", element: <GameVariations
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "ParametersRooms", element: <ParametersRooms
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Players", element: <Players
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "ViewPlayer", element: <ViewPlayer
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Player Info", element: <PlayerInfo
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Game History", element: <GameHistory
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Transactions", element: <Transactions
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Withdrawals", element: <Withdrawals
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "WithdrawCommissions", element: <WithdrawCommissions
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Earnings", element: <Earnings
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Bot Transactions", element: <BotTransactions
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Reports", element: <Reports
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Settings", element: <Settings
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "MasterServerCredentials", element: <MasterServerCredentials
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "GameServerCredentials", element: <GameServerCredentials
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "ApiCredentials", element: <ApiCredentials
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Stats", element: <Stats
                        showSuccess={showSuccess}
                        showError={showError}
                        SetPageDetails={SetPageDetails}
                    />
                },
                {
                    path: "Tournaments", element: <Tournament
                       showSuccess={showSuccess}
                        showError={showError}
                    />
                },
            ]
        }
    ]);

    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App