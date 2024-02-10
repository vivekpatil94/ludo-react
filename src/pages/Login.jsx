import { useEffect, useState } from "react";

import { Box, Button, Card, CardContent, CardActions, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

import logo from "../assets/logo.png";
import { verifyUser } from "../services/api";

const StyledTextField = styled(TextField)({
    width: "100%",
    marginTop: "10px"
});

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = event => {
        setUsername(event.target.value);
    };

    const onChangePassword = event => {
        setPassword(event.target.value);
    };

    const onClickSubmit = async () => {
        const _username = username;
        var response = await verifyUser(username, password);
        if (response.status === 200) {
            console.log("insde if block..");
            if (response.data.status) {
                localStorage.setItem("cc_token", response.data.token);
                localStorage.setItem("cc_userId", response.data.userId);
                localStorage.setItem("cc_userName", _username);

                window.location.href = "/Stats"
            } else {
                console.log("response is  ",response.data);
                props.showError(response.data.message);
            }
        } else {
            console.log("error",response.data.message)
            props.showError(response.data.message);
        }
    }

    useEffect(() => {
        localStorage.clear();
    });

    return (
        <Box sx={{
            bgcolor: "background.default",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly"
        }}>
            <Card sx={{
                width: 400,
                display: "flex",
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: "center",
                //marginTop: "100px"
            }}>
                <CardContent sx={{
                    width: "90%",
                }}>
                    <Typography variant="h5" align="center">Welcome</Typography>

                    <Box sx={{
                        marginTop: "20px"
                    }}>
                        <StyledTextField label="Username" type="text" onChange={onChangeUsername} value={username}></StyledTextField>
                        <StyledTextField label="Password" type="password" onChange={onChangePassword} value={password}></StyledTextField>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={onClickSubmit} sx={{
                        margin: "20px",
                        marginBottom: "10px",
                        fontWeight: 600
                    }}>Login</Button>
                </CardActions>
            </Card>
            <Box sx={{
                display: { xs: 'none', md: 'block' },
            }}>
                <img src={logo} alt="logo" width={500 * 0.75} height={500 * 0.75} />
            </Box>
        </Box>
    )
}

export default Login