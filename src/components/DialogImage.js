import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";

const DialogImage = ({ open, setopen, imgsrc }) => {
  const matches = useMediaQuery('(max-width:600px)');
  const handleClose = () => {
    setopen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            width: matches ? "85vw" : '40vw',
            maxWidth: '90vw',
            maxHeight: '90vh',
            padding: '20px'
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center', padding: 0 }}>
          <img
            src={imgsrc}
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
            }}
            alt="Dialog"
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogImage;
