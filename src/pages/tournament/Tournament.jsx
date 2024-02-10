import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Define CSS styles for TableCell with border and padding
const cellStyles = {
  border: '1px solid #dddddd',
  padding: '15px',
};

const Tournament = (props) => {
  const [open, setOpen] = React.useState(false);
  const [showTournaments, setShowTournaments] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    joinFee: "",
  });

  useEffect(() => {
    // Add any additional initialization logic here
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleClose = () => {
    setOpen(false);
    // Reset the form data when the dialog is closed
    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      joinFee: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { title, startDate, endDate, joinFee } = formData;

    try {
      const response = await axios.post(
        "https://api1.d-ludo.com/api/Tournaments",
        formData
      );

      console.log("response is ", response);

      if (response.status === 200) {
        console.log("response data is ", response.data);
        props.showSuccess("Tournament created Successfully!!");

      } else {
        // Use response.data directly
        props.showError(response.data.message + "error");
      }
    } catch (error) {
      props.showError("An error occurred. Please try again later.");
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    if (showTournaments) {
      fetchTournaments();
    }
  }, [showTournaments]);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get("https://api1.d-ludo.com/api/Tournaments");
      setTournaments(response.data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleListTournaments = () => {
    setShowTournaments(!showTournaments);
  };

  const handleCloseList = () => {
    setShowTournaments(false);
  };
  const handleEdit = (tournament) => {
    // Implement your logic to handle editing the tournament
    console.log("Editing tournament:", tournament);
  };

  const handleCopy = (tournament) => {
    // Implement your logic to handle copying the tournament
    console.log("Copying tournament:", tournament);
  };

  const handleDelete = (tournament) => {
    // Implement your logic to handle deleting the tournament
    console.log("Deleting tournament:", tournament);
  };

  const formatDateTimeString = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return date.toLocaleString('en-US', options);
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.default",
          m: "50px",
          mt: "140px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white" }}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Create Tournament
          </Button>
        </div>
        <div style={{ color: "white" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleListTournaments}
          >
            List of Tournaments
          </Button>
        </div>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleFormSubmit,
        }}
      >
        <DialogTitle>Create Tournament</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="startDate"
            name="startDate"
            label="Start Date"
            type="datetime-local"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.startDate}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="endDate"
            name="endDate"
            label="End Date"
            type="datetime-local"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.endDate}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="joinFee"
            name="joinFee"
            label="Join Fee"
            type="number"
            fullWidth
            variant="standard"
            value={formData.joinFee}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create Tournament</Button>
        </DialogActions>
      </Dialog>
      {showTournaments && (
        <div>
          <Button onClick={handleCloseList}>Close</Button>

          <TableContainer component={Paper} sx={{ textAlign: '-webkit-center' }}>
            <TableHead>
              <TableRow >
                <TableCell>Sr. No</TableCell>
                <TableCell style={cellStyles}>Title</TableCell>
                <TableCell style={{ ...cellStyles, maxWidth: '200px' }}>Start Date</TableCell>
                <TableCell style={{ ...cellStyles, maxWidth: '200px' }}>End Date</TableCell>
                <TableCell style={{ ...cellStyles, maxWidth: '200px' }}>Join Fee</TableCell>
                <TableCell style={{ ...cellStyles, maxWidth: '200px' }}>Users Joined</TableCell>
                <TableCell style={cellStyles}>Actions</TableCell> {/* Add Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {tournaments.map((tournament, index) => (
                <TableRow key={tournament.id}>
                  <TableCell style={cellStyles}>{index + 1}</TableCell>
                  <TableCell style={cellStyles}>{tournament.title}</TableCell>
                  <TableCell style={cellStyles}>{new Date(tournament.startDate).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell style={cellStyles}>{new Date(tournament.endDate).toLocaleString('en-GB')}</TableCell>
                  <TableCell style={{ ...cellStyles, maxWidth: '200px' }}>{tournament.joinFee}</TableCell>
                  <TableCell style={cellStyles}>N/A</TableCell>
                  <TableCell style={cellStyles}> {/* Add Actions buttons */}
                    <Button onClick={() => handleEdit(tournament)}>Edit</Button>
                    <Button onClick={() => handleDelete(tournament)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default Tournament;
