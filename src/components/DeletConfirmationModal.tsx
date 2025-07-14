import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface DeletePropTypes {
    open : boolean,
    onClose : () => void,
    onConfirm : () => void,

}
export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
}: DeletePropTypes) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="delete-dialog-title" className="text-xl font-semibold text-red-600">
        Confirm Deletion
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="text-gray-700">
          Are you sure you want to delete this employee? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="flex justify-end space-x-2 px-4 pb-4">
        <Button
          onClick={onClose}
          variant="outlined"
          className="!text-gray-700 hover:!bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          className="!text-white"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
