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
    priceMoney: "",
    targetAudience: "",
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
      priceMoney: '',
      targetAudience: "",
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
        //  "https://api1.d-ludo.com/api/Tournaments",
        "https://api1.d-ludo.com/api/Admin/Tournament/CreateTournament",
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
      //const response = await axios.get("https://api1.d-ludo.com/api/Tournaments");
      const response = await axios.get("https://api1.d-ludo.com/api/admin/Tournament/GetTournaments");

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

  // Edit Code Starts
  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = (tournament) => {
    setFormData({ ...tournament });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const { title, startDate, endDate, joinFee, priceMoney } = formData;

    try {
      const response = await axios.put(
        "https://api1.d-ludo.com/api/Admin/Tournament/EditTournament",
        formData
      );

      if (response.status === 200) {
        props.showSuccess("Tournament edited successfully!");
      } else {
        props.showError(response.data.message + "error");
      }
    } catch (error) {
      props.showError("An error occurred. Please try again later.");
    } finally {
      handleEditClose();
    }
  };


  //  Handle Delete 
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);

  const handleDeleteConfirmation = async (tournament) => {
    const confirmed = window.confirm("Are you sure you want to delete this tournament?");
    if (confirmed) {
      handleDelete(tournament);
    }
  };
  const handleDeleteConfirmationClose = () => {
    setTournamentToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDelete = async (tournament) => {
    try {
      const response = await axios.delete(
        `https://api1.d-ludo.com/api/Admin/Tournament/DeleteTournament/${tournament.id}`
      );
  
      if (response.status === 200) {
        props.showSuccess("Tournament deleted successfully!");
        // You may also want to remove the deleted tournament from the state
      } else {
        props.showError(response.data.message + "error");
      }
    } catch (error) {
      props.showError("An error occurred. Please try again later.");
    }
  };


  
  //  Handle Delete 





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

      {/* Edit Dialog Box */}

      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        PaperProps={{
          component: "form",
          onSubmit: handleEditFormSubmit,
        }}
      >
        <DialogTitle>Edit Tournament</DialogTitle>
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
          <TextField
            required
            margin="dense"
            id="pricePool"
            name="pricePool"
            label="Prize Pool"
            type="number"
            fullWidth
            variant="standard"
            value={formData.pricePool}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button type="submit">Edit Tournament</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog Box */}


      {/* Delete Dialog Box       */}
      <Dialog
  open={deleteConfirmationOpen}
  onClose={handleDeleteConfirmationClose}
>
  <DialogTitle>Delete Tournament</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete this tournament?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDeleteConfirmationClose} color="primary">
      Cancel
    </Button>
    <Button onClick={handleDeleteConfirmation} color="primary">
      Delete
    </Button>
  </DialogActions>
</Dialog>



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
          <TextField
            required
            margin="dense"
            id="priceMoney"
            name="priceMoney"
            label="Price Pool"
            type="number"
            fullWidth
            variant="standard"
            value={formData.priceMoney}
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
                <TableCell style={{ ...cellStyles, maxWidth: '200px' }}>Price Pool</TableCell>
                <TableCell style={{ ...cellStyles, maxWidth: '200px' }}>In Tournament</TableCell>
                <TableCell style={{ ...cellStyles, maxWidth: '200px' }}>Users Joined</TableCell>
                <TableCell style={cellStyles}>Actions</TableCell> {/* Add Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {tournaments.map((tournament, index) => (
                <TableRow key={tournament.id}>
                  <TableCell style={cellStyles}>{index + 1}</TableCell>
                  <TableCell style={cellStyles}>{tournament.title}</TableCell>
                  <TableCell style={cellStyles}>{new Date(tournament.startDate).toLocaleString('en-GB')}</TableCell>
                  <TableCell style={cellStyles}>{new Date(tournament.endDate).toLocaleString('en-GB')}</TableCell>
                  <TableCell style={{ ...cellStyles, maxWidth: '200px' }}>{tournament.joinFee}</TableCell>
                  <TableCell style={cellStyles}>{tournament.priceMoney}</TableCell>
                  <TableCell style={cellStyles}>{tournament.targetAudience}</TableCell>
                  <TableCell style={cellStyles}>
                    {tournament.isUserJoined ? "Yes" : "No"}
                  </TableCell>
                  <TableCell style={cellStyles}> {/* Add Actions buttons */}
                    <Button onClick={() => handleEditOpen(tournament)}>Edit</Button>
                    <Button onClick={() => handleDeleteConfirmation(tournament)}>Delete</Button>
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
