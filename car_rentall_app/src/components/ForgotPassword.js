import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ForgotPassword(props) {
  return (
    <React.Fragment>

      <Dialog
        open={props.open}
        onClose={props.handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            props.handleClose();
          },
        }}
      >
        <DialogTitle>Set Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            For Marking Purposes, please set the password
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="password"
            label="Password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Set</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
