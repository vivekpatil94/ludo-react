// import React from 'react'

// import { Box, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
// import dayjs from 'dayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// import StyledModal from '../../components/StyledModal'

// const AddModal = (props) => {

//     const handleModalClose = () => {
//         props.SetModalOpen(false);
//     }

//     const onChangeStatus = (value) => {
//         props.SetStatus(value);
//     }

//     const handleSave = () => {
//         props.handleEditQuery();
//     }

//     return (
//         <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose} handleSave={handleSave}>
//             <Box sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 mt: "25px"
//             }}>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <Stack spacing={3} sx={{
//                         width: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                     }}>
//                         <DateTimePicker
//                             disabled={true}
//                             label="Create Time"
//                             value={dayjs(props.createTime)}
//                             renderInput={(params) => <TextField {...params}
//                                 sx={{ width: "80%" }}
//                             />}
//                         />
//                         <DateTimePicker
//                             disabled={true}
//                             label="Update Time"
//                             value={dayjs(props.updateTime)}
//                             renderInput={(params) => <TextField {...params}
//                                 sx={{ width: "80%" }}
//                             />}
//                         />
//                     </Stack>
//                 </LocalizationProvider>
//                 <TextField label="Title" type="text" value={props.title} sx={{ width: "80%", mt: "20px" }} />
//                 <TextField label="Description" type="text" value={props.description} sx={{ width: "80%", mt: "20px" }}
//                     floatingLabelText="Description"
//                     multiline
//                     rows={4}
//                 />
//                 <TextField disabled={true} label="User Id" type="text" value={props.userId} sx={{ width: "80%", mt: "20px" }} />
//                 <Box sx={{ width: "80%", mt: "20px" }}>
//                     <FormControl fullWidth>
//                         <InputLabel id="status-label">Status</InputLabel>
//                         <Select
//                             labelId="status-label"
//                             id="status-select"
//                             value={props.status}
//                             label="Status"
//                         >
//                             <MenuItem value={"Pending"} onClick={() => onChangeStatus("Pending")}>{"Pending"}</MenuItem>
//                             <MenuItem value={"Resolved"} onClick={() => onChangeStatus("Resolved")}>{"Resolved"}</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Box>
//             </Box>
//         </StyledModal >
//     )
// }

// export default AddModal