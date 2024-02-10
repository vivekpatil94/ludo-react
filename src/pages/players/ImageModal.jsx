import React from 'react'

import { Box, Button } from '@mui/material'
import StyledModal from '../../components/StyledModal'

const ImageModal = (props) => {

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const handleUpload = () => {
        const newImage = props.imageRef.current.files[0];

        if (newImage) {
            props.handleUploadKYC(newImage);
        } else {
            props.showError("Invalid Image");
        }
    }

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={""} handleModalClose={handleModalClose}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "25px"
            }}>
                <img
                    src={props.url}
                    alt=""
                    width={500}
                    height={250}
                    style={{ objectFit: "contain" }}
                />
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                mt: "40px",
                gap: "20px"
            }}>
                <input accept="image/*" type="file" id="select-image" style={{ color: 'white' }} ref={props.imageRef} />
                <Button onClick={handleUpload} variant="contained" sx={{ width: "100px", fontWeight: 600 }}>Upload</Button>
            </Box>
        </StyledModal>
    )
}

export default ImageModal