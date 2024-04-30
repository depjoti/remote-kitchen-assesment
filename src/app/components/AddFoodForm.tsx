  // src/app/components/AddFoodForm.tsx
  import React, { useState, useEffect } from 'react';
  import { TextField, Button, Grid, Typography, Modal, Box } from '@mui/material';
  import { useFoodActions } from '../../lib/hooks';
  import { FoodItem } from '../types';

  interface AddFoodFormProps {
  initialData?: FoodItem | null;
  onClose: () => void; 
  }

  const AddFoodForm: React.FC<AddFoodFormProps> = ({ initialData, onClose, }) => {
  const { addItem,editItem } = useFoodActions();
  const [formData, setFormData] = useState<FoodItem>({
  id: initialData ? initialData.id : 0,
  name: initialData ? initialData.name : '',
  description: initialData ? initialData.description : '',
  price: initialData ? initialData.price : 0,
  });
  const [errors, setErrors] = useState<Partial<FoodItem>>({});


  useEffect(() => {
  if (initialData) {
    setFormData(initialData);
  }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: '',
  }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const newErrors: Partial<FoodItem> = {};

  if (!formData.name) {
    newErrors.name = 'Name is required';
  }
  if (!formData.description) {
    newErrors.description = 'Description is required';
  }
  if (!formData.price || isNaN(parseFloat(formData.price.toString()))) {
    newErrors.price = 'Price is required';
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  if (initialData) {
    editItem({ ...initialData, ...formData });
  } else {
    addItem({ ...formData, id: Math.floor(Math.random() * 1000000) }); // Generate random ID
  }

  setFormData({
    id: 0,
    name: '',
    description: '',
    price: 0,
  });

  onClose();
  };

  return (

      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {initialData ? 'Edit Food Item' : 'Add New Food Item'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="price"
              label="Price"
              type="number"
              variant="outlined"
              fullWidth
              value={formData.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {initialData ? 'Save Changes' : 'Add Food'} 
            </Button>
          </Grid>
        </Grid>
      </form>
  );
  };

  export default AddFoodForm;

