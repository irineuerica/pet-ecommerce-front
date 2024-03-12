import { Breakpoint, Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import DialogAnimate from './DialogAnimate';

export interface OpenConfirmation {
  title: string;
  description: string | ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';
  size?: Breakpoint;
  cancelColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';
  confirmActionText?: string;
  cancelactionText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface ConfirmActionRef {
  confirm: () => void;
}

export interface IDialogConfirmationWithRef {
  openConfirmation: (props: OpenConfirmation) => void;
}

export const DialogConfirmationWithRef = forwardRef((_, ref: React.Ref<IDialogConfirmationWithRef | undefined>) => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string | ReactNode>('');
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});
  const [confirmActionText, setConfirmActionText] = useState('Confirmar');
  const [cancelActionText, setCancelActionText] = useState('Cancelar');
  const [color, setColor] = useState<'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit'>(
    'primary',
  );
  const [size, setSize] = useState<Breakpoint>('xs');
  const [cancelColor, setCancelColor] = useState<
    'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit'
  >('primary');

  const setup = () => {
    setOpen(false);
    setOnCancel(() => {});
    setOnConfirm(() => {});
    setTimeout(() => {
      setDescription('');
      setTitle('');
      setColor('primary');

      setCancelColor('primary');
      setSize('xs');
      setConfirmActionText('Confirmar');
      setCancelActionText('Cancelar');
    }, 300);
  };

  useEffect(() => () => setup(), []);

  useImperativeHandle(ref, () => ({
    openConfirmation({
      description: newDescription,
      onConfirm: newOnConfirm,
      title: newTitle,
      onCancel: newOnCancel,
      color: newColor,
      size: newSize,
      cancelColor: newCancelColor,
      confirmActionText: newConfirmActionText,
      cancelactionText: newCancelactionText,
    }) {
      setOpen(true);
      setTitle(newTitle);
      setDescription(newDescription);
      setOnConfirm(() => newOnConfirm);
      if (newOnCancel) {
        setOnCancel(() => newOnCancel);
      }
      if (newSize) {
        setSize(newSize);
      }
      if (newColor) {
        setColor(newColor);
      }
      if (newCancelColor) {
        setCancelColor(newCancelColor);
      }
      if (newConfirmActionText) {
        setConfirmActionText(newConfirmActionText);
      }
      if (newCancelactionText) {
        setCancelActionText(newCancelactionText);
      }
    },
  }));

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setup();
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setup();
  };

  return (
    <DialogAnimate open={open} fullWidth maxWidth={size} onClose={setup}>
      <DialogTitle sx={{ fontWeight: '500', fontSize: '20px' }}>{title}</DialogTitle>
      <DialogContent>
        {typeof description === 'string' ? <Typography>{description}</Typography> : description}
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: confirmActionText === 'OK' ? 'center' : 'end' }}>
        {cancelActionText !== 'disabled' && (
          <Button onClick={handleCancel} color={cancelColor} variant="outlined">
            {cancelActionText}
          </Button>
        )}

        <Button variant="contained" color={color} onClick={handleConfirm}>
          {confirmActionText}
        </Button>
      </DialogActions>
    </DialogAnimate>
  );
});
