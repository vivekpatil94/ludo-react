import React from 'react'

import { AppBar, Toolbar, IconButton, Divider, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = (props) => {

    const logout = () => {
        window.location.href = "/Login";
    }

    return (
        <AppBar
            position="fixed">
            <Toolbar sx={{
                height: props.toolbarHeight,
                width: "100%",
                //width: { md: `calc(100% - ${props.drawerWidth}px)` },
                //ml: { md: `${props.drawerWidth}px` },
                justifyContent: "space-between",
            }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2/*, display: { md: 'none' }*/ }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography ></Typography>
                <Button variant="contained" onClick={logout} sx={{
                    mr: "5%",
                    backgroundColor: "maroon",
                    color: "white",
                    fontWeight: 800,
                    ":hover": {
                        backgroundColor: "red"
                    }
                }}>
                    Logout
                </Button>
            </Toolbar>
            <Divider />
        </AppBar >
    )
}

export default Navbar