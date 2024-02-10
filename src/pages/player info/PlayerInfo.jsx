import React, { useEffect, useState } from 'react'

import { Box, Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import ViewPlayer from '../players/ViewPlayer';
import Transactions from '../transactions/Transactions';
import GameHistory from '../game history/GameHistory';

const PlayerInfo = (props) => {
    const [userId, SetUserId] = useState("");

    const [userSearchValue, SetUserSearchValue] = useState("");
    const [pageName, SetPageName] = useState("");

    const handleUserSearchValue = (event) => {
        SetUserSearchValue(event.target.value)
    }

    const onClickUserSearch = () => {
        if (userSearchValue !== "") {
            SetPageName("profile");
            SetUserId(userSearchValue);
        }
    }

    const TogglePage = (pageName) => {
        if (userId !== "")
            SetPageName(pageName);
    }

    useEffect(() => {
        props.SetPageDetails({ index: 6, path: "/Player Info" })

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (userId === "")
            SetPageName("");
    }, [userId]);

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
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "25px"
                }}>
                    <TextField label="User Id" type="text" value={userSearchValue} onChange={handleUserSearchValue} />
                    <Button variant='contained' onClick={() => onClickUserSearch()} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        <SearchIcon sx={{ mr: "5px" }} />Search
                    </Button>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "25px"
                }}>
                    <Button variant='contained' onClick={() => TogglePage("profile")} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        Profile
                    </Button>
                    <Button variant='contained' onClick={() => TogglePage("transactions")} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        Transactions
                    </Button>
                    <Button variant='contained' onClick={() => TogglePage("gameHistory")} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        Game History
                    </Button>
                </Box>
            </Box>

            {(pageName === "profile") &&
                <ViewPlayer
                    showSuccess={props.showSuccess}
                    showError={props.showError}

                    userId={userId}
                />
            }

            {(pageName === "transactions") &&
                <Transactions
                    showSuccess={props.showSuccess}
                    showError={props.showError}

                    userId={userId}
                />
            }

            {(pageName === "gameHistory") &&
                <GameHistory
                    showSuccess={props.showSuccess}
                    showError={props.showError}

                    userId={userId}
                />
            }
        </Box >
    )
}

export default PlayerInfo