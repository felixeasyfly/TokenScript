import React, { useReducer } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from './../DatePicker';
import Card from './../Card';

export default function FormDialog({ roomType, applyDiscount, discount, price, tokens, book }) {
  const [open, setOpen] = React.useState(false);

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      reference: "",
      from: "",
      to: ""
    }
  );

  const formIsValid = () => {
    return !(
      (formInput.reference.length > 0) &&
      (formInput.from instanceof Date) &&
      (formInput.to instanceof Date)
    );
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    book(formInput);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const viewPrice = discount.value ? (price / discount.value).toFixed(5) : price;

  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Book
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle style={{ fontSize: "0.8rem", marginBottom: "12px", paddingBottom: 0 }} disableTypography={true}>
          {roomType}
        </DialogTitle>
        <DialogTitle style={{ fontSize: "1rem", margin: 0, paddingTop: 0 }} disableTypography={true}>
          {viewPrice} ETH per night.
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="booking-name"
              label="Booking Reference Name"
              type="text"
              fullWidth
              name="reference"
              onChange={handleInput}
            />
            <DatePicker
              name={'from'}
              label={'from'}
              handleInput={handleInput}
            />
            <DatePicker
              name={'to'}
              label={'to'}
              handleInput={handleInput}
            />
            {tokens.length > 0 &&
              <p style={{ fontSize: "0.8rem" }}>Select a ticket to apply discount:</p>
            }
            {tokens &&
              tokens.map((token, index) => {
                return <Card key={index} applyDiscount={applyDiscount} tokenInstance={token} discount={discount}></Card>
              })
            }
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={formIsValid()}>
            Book Now
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}