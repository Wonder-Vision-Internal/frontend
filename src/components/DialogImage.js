import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

const DialogImage = ({ open, setopen, imgsrc }) => {
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
            width: '40vw',
            height: '50vh',
            maxWidth: '90vw',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ alignSelf: 'end' }}>
          <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <img
            src={imgsrc}
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
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
