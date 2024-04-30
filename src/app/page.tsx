
'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddFoodForm from './components/AddFoodForm';
import FoodCard from './components/FoodCard';
import { useFoodItems, useFoodActions } from '../lib/hooks';
import { FoodItem } from './types';

const Page: React.FC = () => {
  const foodItems = useFoodItems();
  const { setItems } = useFoodActions();
  const [editFormData, setEditFormData] = useState<FoodItem | null>(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      fetch('http://localhost:5000/foodItems')
        .then((response) => response.json())
        .then((data: FoodItem[]) => {
          setItems(data);
          setDataFetched(true);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [dataFetched, setItems]);

  const handleEditFoodItem = (foodItem: FoodItem) => {
    setEditFormData(foodItem);
    setShowAddFoodModal(true);
  };

  const handleToggleModal = () => {
    setShowAddFoodModal(!showAddFoodModal);
    setEditFormData(null);
  };


  return (
    <Box minHeight="100vh" padding={2}>
      <Typography variant="h4" gutterBottom>
        Food Items
      </Typography>

      <Grid container spacing={2}>
        {foodItems.map((item: FoodItem) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <FoodCard foodItem={item} onEdit={() => handleEditFoodItem(item)} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ m: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="contained" onClick={handleToggleModal}>
          {' '}
          Add Food
        </Button>
      </Box>


      <Modal open={showAddFoodModal} onClose={handleToggleModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
            }}
            onClick={handleToggleModal}
          >
            <CloseIcon />
          </IconButton>
          <AddFoodForm initialData={editFormData} onClose={handleToggleModal} />
        </Box>
      </Modal>

    </Box>
  );
};

export default Page;


