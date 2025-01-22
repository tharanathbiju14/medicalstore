import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const style = {
  position: 'absolute',
  fontFamily: 'Montserrat, sans-serif',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  color: 'black',
  p: 4,
};

const StoreDetailsModal = ({ open, handleClose, store }) => {
  console.log("Modal open state:", open);
  console.log("Store details:", store);

  if (!store) return null;

  return (
    <Modal
      open={open}
      onClose={() => {
        console.log("Modal closed");
        handleClose();
      }}
      aria-labelledby="store-details-title"
      aria-describedby="store-details-description"
    >
      <Box sx={style}>
        <Typography id="store-details-title" variant="h6" component="h2">
          {store.storeName}
        </Typography>
        <Typography id="store-details-description" sx={{ mt: 2 }}>
          <strong>Contact:</strong> {store.contactNo}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Address:</strong> {store.storeAddress}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>License No:</strong> {store.licenseNo}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Status:</strong> {store.verificationStatus || "NOT_VERIFIED"}
        </Typography>
      </Box>
    </Modal>
  );
};

export default StoreDetailsModal;