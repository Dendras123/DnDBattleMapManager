import 'filepond/dist/filepond.min.css';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { ActionType } from '../types/actionType';
import ImageUploader from './ImageUploader';
import CloseIcon from '@mui/icons-material/Close';

interface ImageUploadModalProps {
  selectedAction: ActionType;
  setSelectedAction: React.Dispatch<React.SetStateAction<ActionType>>;
}

export default function ImageUploadModal({
  selectedAction,
  setSelectedAction,
}: ImageUploadModalProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSelectedAction('draw');
  };

  useEffect(() => {
    if (selectedAction === 'upload') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selectedAction]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'}>
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
        {'Image upload'}
        <IconButton
          onClick={handleClose}
          style={{ padding: 0, backgroundColor: 'transparent' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ImageUploader />
      </DialogContent>
    </Dialog>
  );
}
