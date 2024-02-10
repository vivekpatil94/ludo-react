import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material'

import { getUserDetails } from "../services/api";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const drawerWidth = 240;
const toolbarHeight = 80;

const Root = (props) => {
    const navigate = useNavigate();

    const loadPage = useCallback(() => {
        navigate(props.pageDetails.path);
    }, [navigate, props.pageDetails.path]);

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            var response = await getUserDetails(localStorage.getItem("cc_userId"));

            if (response.status === 200) {
                if (!response.data.status) {
                    window.location.href = "/Login";
                } else if (window.location.href === "/") {
                    window.location.href = "/Earnings";
                }
            } else {
                window.location.href = "/Login";
            }
        }

        // fetchDetails();
    }, []);

    useEffect(() => {
        loadPage();
    }, [loadPage]);

    return (
        <Box sx={{
            bgcolor: "background.default",
            minHeight: "100vh",
            //minHeight: `calc(100vh - 140px)`,
            display: "flex",
        }} >
            <Box sx={{
                //minWidth: { xs: 0, md: drawerWidth }
            }}>
                <Sidebar
                    drawerWidth={drawerWidth}
                    toolbarHeight={toolbarHeight}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    {...props}
                />
            </Box>
            <Box sx={{
                bgcolor: "background.default",
                width: "100%"
                //height: "100vh"
            }}>
                <Navbar
                    drawerWidth={drawerWidth}
                    toolbarHeight={toolbarHeight}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    {...props}
                />
                <Outlet />
            </Box>
        </Box >
    )
}

export default Root