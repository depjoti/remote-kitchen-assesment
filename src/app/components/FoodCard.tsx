import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FoodItem } from '../types';
import { useFoodActions } from '../../lib/hooks';

interface FoodCardProps {
  foodItem: FoodItem;
  onEdit: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ foodItem, onEdit }) => {
  const { deleteItem, fetchItems } = useFoodActions();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    await deleteItem(foodItem.id);
    await fetchItems(); // Ensure UI refreshes after deletion
    setConfirmDelete(false);
  };

  const handleClose = () => {
    setConfirmDelete(false);
  };

  // Convert price to number and handle possible errors
  const price = parseFloat(String(foodItem.price)); // Convert to string before parsing
  const formattedPrice = isNaN(price) ? 'Price not available' : `$${price.toFixed(2)}`;

  return (
    <Card variant="outlined" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="h5" component="div">
          {foodItem.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ flexGrow: 1 }}>
          {foodItem.description}
        </Typography>
        <img
          src={foodItem.imageUrl}
          alt={foodItem.name}
          style={{
            maxWidth: '100%',
            maxHeight: '200px',
            marginTop: 8,
            objectFit: 'cover',
            borderRadius: 4,
          }}
        />
        <Grid container justifyContent="space-between" alignItems="center" marginTop={1}>
          <Grid item>
            <Typography variant="h6" component="span">
              {formattedPrice}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="edit" onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDelete} onClose={handleClose}>
        <DialogTitle>Delete Food Item</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this food item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default FoodCard;
