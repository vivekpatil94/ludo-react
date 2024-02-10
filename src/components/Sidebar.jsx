import React from 'react'

import { Box, Divider, Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group';
import LayersIcon from '@mui/icons-material/Layers';
import CategoryIcon from '@mui/icons-material/Category';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';
import PaidIcon from '@mui/icons-material/Paid';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = (props) => {

    const options = [
        [
            [27, "Statistics", "/Stats", <PaidIcon />],
        ],
        [
            [1, "Users", "/Users", <GroupIcon />],
            //[2, "Bundles", "/Bundles", <LayersIcon />],
            //[3, "Categories", "/Categories", <CategoryIcon />],
            [4, "Games", "/Games", <SportsEsportsIcon />],
        ],
        [
            [5, "Players", "/Players", <GroupIcon />],
            [6, "Player Info", "/Player Info", <InfoIcon />],
            [7, "Game History", "/Game History", <HistoryIcon />],
            [8, "Transactions", "/Transactions", <PaidIcon />],
            [13, "Withdrawals", "/Withdrawals", <PaidIcon />],
            [28, "Withdraw Commissions", "/WithdrawCommissions", <PaidIcon />],
            [14, "Earnings", "/Earnings", <PaidIcon />],
            [15, "Bot Transactions", "/Bot Transactions", <PaidIcon />],
            [16, "Tournaments", "/Tournaments", <PaidIcon />],
        ],
        [
            [21, "Reports", "/Reports", <SettingsIcon />],
            [12, "Settings", "/Settings", <SettingsIcon />],
        ],
        [
            [24, "Master Server", "/MasterServerCredentials", <SettingsIcon />],
            [25, "Game Server", "/GameServerCredentials", <SettingsIcon />],
            [26, "API Server", "/ApiCredentials", <SettingsIcon />],
        ]
    ];

    const handleOptionClick = (index, path) => {
        props.SetPageDetails({ index: index, path: path });
        props.handleDrawerToggle();
    }

    const drawer = (
        <div>
            <Toolbar
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: props.toolbarHeight,
                }}>
                <Typography variant="h6" sx={{
                    textAlign: "center"
                }}>Welcome <br />{localStorage.getItem("cc_userName")}</Typography>
            </Toolbar>

            {
                options.map((optionsArr, index) => (
                    <div key={index.toString() + "_div"}>
                        <Divider />
                        <List>
                            {
                                optionsArr.map((option) => (
                                    <ListItem key={option[1]} disablePadding>
                                        <ListItemButton onClick={() => handleOptionClick(option[0], option[2])} selected={props.pageDetails.index === option[0]}>
                                            <ListItemIcon >{option[3]}</ListItemIcon>
                                            <ListItemText primary={option[1]} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                ))
            }
        </div>
    );

    return (
        <Box
            component="nav"
            aria-label="drawer"
            sx={{
                display: { xs: 'none', md: 'block' },
            }}
        >
            <Drawer
                variant="temporary"
                open={props.mobileOpen}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    //display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            {/*
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
            */}
        </Box >
    )
}

export default Sidebar