import 'filepond/dist/filepond.min.css';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { ActionType } from '../types/actionType';
import ImageUploader from './ImageUploader';
import CloseIcon from '@mui/icons-material/Close';

interface ImageUploadModalProps {
  selectedAction: ActionType;
  setSelectedAction: React.Dispatch<React.SetStateAction<ActionType>>;
  setImages: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>;
}

export default function ImageUploadModal({
  selectedAction,
  setSelectedAction,
  setImages,
}: ImageUploadModalProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSelectedAction('select');
  };

  // open the dialog if upload is selected from toolbar
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
        <ImageUploader setImages={setImages} />
      </DialogContent>
    </Dialog>
  );
}
