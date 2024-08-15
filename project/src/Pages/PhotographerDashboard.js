// src/components/PhotographerDashboard.js
import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, getDocs, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import { TextField, Button, Container, Avatar, Typography, Box, Grid, Card, CardContent, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Switch, FormControlLabel, List, ListItem, ListItemButton, ListItemAvatar,ListItemText } from '@mui/material';
import Swal from 'sweetalert2';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Link as LinkRouter } from 'react-router-dom';
import logo from '../Assets/Logo2.png';

function PhotographerDashboard() {
  const { currentUser } = useAuth();
  const usernameRef = useRef();
  const shortDescriptionRef = useRef();
  const detailedDescriptionRef = useRef();
  const priceRef = useRef(); // New ref for price details
  const [profilePicture, setProfilePicture] = useState('');
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewImage, setViewImage] = useState('');
  const [contactedClients, setContactedClients] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [notifications, setNotifications] = useState([]); // New state for notifications

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const userData = userDoc.data();
        usernameRef.current.value = userData.username;
        shortDescriptionRef.current.value = userData.shortDescription || '';
        detailedDescriptionRef.current.value = userData.detailedDescription || '';
        priceRef.current.value = userData.price || ''; // Set price details
        setProfilePicture(userData.profilePicture);
        setPortfolioImages(userData.portfolioImages || []);
        
        setIsAvailable(userData.isAvailable || false);
      } catch (error) {
        Swal.fire('Error', 'Failed to load user data', 'error');
      }
    };

    fetchData();
  }, [currentUser]);

//--------------------##############################
  useEffect(() => {
    const fetchNotifications = async () => {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      const userData = userDoc.data();
      setNotifications(userData.notifications || []);
    };
  
    fetchNotifications();
  }, [currentUser]);


//--------------------##############################

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      Swal.fire('Warning', 'No files selected', 'warning');
      return;
    }

    setLoading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const fileRef = ref(storage, `profilePictures/${currentUser.uid}/${file.name}`);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
      });

      const downloadURLs = await Promise.all(uploadPromises);

      await updateDoc(doc(db, 'users', currentUser.uid), {
        profilePicture: downloadURLs[0]
      });

      setProfilePicture(downloadURLs[0]);
      Swal.fire('Success', 'Profile picture updated!', 'success');
    } catch (error) {
      Swal.fire('Error', `Failed to upload profile picture: ${error.message}`, 'error');
    }

    setLoading(false);
  };

  const handleImageUpload = async () => {
    if (files.length === 0) {
      Swal.fire('Warning', 'No images selected', 'warning');
      return;
    }

    setLoading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const fileRef = ref(storage, `portfolio/${currentUser.uid}/${file.name}`);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
      });

      const downloadURLs = await Promise.all(uploadPromises);

      setPortfolioImages((prev) => [...prev, ...downloadURLs]);
      await updateDoc(doc(db, 'users', currentUser.uid), {
        portfolioImages: arrayUnion(...downloadURLs)
      });

      Swal.fire('Success', 'Images added to portfolio!', 'success');
    } catch (error) {
      Swal.fire('Error', `Failed to upload images: ${error.message}`, 'error');
    }

    setLoading(false);
  };

  const handleRemoveImage = async (imageURL) => {
    setLoading(true);
    try {
      // Delete the image from storage
      const fileRef = ref(storage, imageURL);
      await deleteObject(fileRef);

      // Remove the image from the portfolio
      setPortfolioImages((prev) => prev.filter((img) => img !== imageURL));
      await updateDoc(doc(db, 'users', currentUser.uid), {
        portfolioImages: arrayRemove(imageURL)
      });

      Swal.fire('Success', 'Image removed from portfolio!', 'success');
    } catch (error) {
      Swal.fire('Error', `Failed to remove image: ${error.message}`, 'error');
    }

    setLoading(false);
  };

  const handleOpenDialog = (imageURL) => {
    setViewImage(imageURL);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setViewImage('');
  };

  const checkUsernameExists = async (username) => {
    const usersQuerySnapshot = await getDocs(collection(db, 'users'));
    const usernames = usersQuerySnapshot.docs.map(doc => doc.data().username);
    return usernames.includes(username);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const newUsername = usernameRef.current.value;
      if (!newUsername) {
        Swal.fire('Error', 'Username cannot be empty', 'error');
        setLoading(false);
        return;
      }

      // Check if the new username already exists
      if (await checkUsernameExists(newUsername)) {
        Swal.fire('Error', 'Username already exists', 'error');
        setLoading(false);
        return;
      }

      await updateDoc(doc(db, 'users', currentUser.uid), {
        username: newUsername,
      });

      Swal.fire('Success', 'Profile updated!', 'success');
    } catch (error) {
      Swal.fire('Error', `Failed to update profile: ${error.message}`, 'error');
    }

    setLoading(false);
  };


  const handleUpdatedescription = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {  

      await updateDoc(doc(db, 'users', currentUser.uid), {
        shortDescription: shortDescriptionRef.current.value,
        detailedDescription: detailedDescriptionRef.current.value,
        price: priceRef.current.value, // Update price details
      });

      Swal.fire('Success', 'Profile updated!', 'success');
    } catch (error) {
      Swal.fire('Error', `Failed to update profile: ${error.message}`, 'error');
    }

    setLoading(false);

  }


  const handleAvailabilityChange = async (event) => {
    const newAvailability = event.target.checked;
    setIsAvailable(newAvailability);

    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        isAvailable: newAvailability
      });
    } catch (error) {
      Swal.fire('Error', `Failed to update availability: ${error.message}`, 'error');
    }
  };






  /*
  const handleViewClientChat = (client) => {
    // Implement the logic to view chat with the selected client
    console.log('View chat with client:', client);
  };
  */

  


  const handleDeleteContact = (client) => {
    // Implementation to delete the contact
  };
  
  const handleContactClick = (client) => {
    // Implementation to handle the contact click
  };


  const handleAccept = async (clientId, notificationIndex) => {
    // Update the notification status to "accepted"
    const photographerRef = doc(db, 'users', currentUser.uid);
  
    try {
      const userDoc = await getDoc(photographerRef);
      const userData = userDoc.data();
      const updatedNotifications = [...userData.notifications];
      updatedNotifications[notificationIndex].status = 'accepted';
  
      await updateDoc(photographerRef, {
        notifications: updatedNotifications
      });
  
      // Add client to the list of contacted clients
      const clientDocRef = doc(db, 'users', clientId);
      const clientDoc = await getDoc(clientDocRef);
      const clientData = clientDoc.data();
  
      const updatedClients = [...(userData.contactedClients || []), clientData];
      await updateDoc(photographerRef, {
        contactedClients: updatedClients
      });
  
      Swal.fire('Success', 'Client contact accepted!', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };
  

  return (

    <>

      <div className='nav-section'>
        <nav className='navbar-dash'>
          <div className='logo-head'>
            <img src={logo} alt="" className='logo'/>
            <div className='logo-text'>
              <h2>ShutterShare</h2>
              <p>Future Photography</p>
            </div>
          </div>
          <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0 }}>
              <LinkRouter to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="primary" sx={{ p: 1, width: '100px', border: 'solid', borderWidth: 2, '&:hover': { borderWidth: 2 } }}>
                  Logout
                </Button>
              </LinkRouter>
            
            <li>
              <Avatar src={profilePicture} alt="Profile Picture" sx={{ width: 50, height: 50, margin: '0 auto' }} />
            </li>
          </ul>
        </nav>
      </div>
    <Container component="main" maxWidth="xl">
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={3} sx={{ flexBasis: '25%' }}>
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Profile Details
              </Typography>
              <Box component="form" onSubmit={handleUpdate} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  inputRef={usernameRef}
                />
                <FormControlLabel
                  control={<Switch checked={isAvailable} onChange={handleAvailabilityChange} />}
                  label="Available"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2, p: '12px 12px' }}
                >
                  
                  Update Profile
                </Button>
              </Box>
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Avatar src={profilePicture} alt="Profile Picture" sx={{ width: 100, height: 100, margin: '0 auto' }} />
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="upload-file" multiple />
                <label htmlFor="upload-file">
                  <Button variant="outlined" color="primary" component="span" sx={{ mt: 2, p: '12px 12px' }}>
                    Choose Profile Picture(s)
                  </Button>
                </label>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  disabled={loading || files.length === 0}
                  sx={{ mt: 2, p: '12px 12px' }}
                >
                  Upload Profile Picture(s)
                </Button>
              </Box>
              <Box sx={{ mt: 4 }}>
                  <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Messages
                  </Typography>
                  <List>
                    {contactedClients.map((client, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteContact(client)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemButton onClick={() => handleContactClick(client)}>
                          <ListItemAvatar>
                            <Avatar src={client.profilePicture} alt={client.username} />
                          </ListItemAvatar>
                          <ListItemText primary={client.username} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
              </Box>

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={9} sx={{ flexBasis: '75%' }}>
        <Card sx={{ p: 2, boxShadow: 3 }}>
    <CardContent>
      {/* Notifications Section */}
      <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Notifications
      </Typography>
      <Box sx={{ mb: 2 }}>
        {notifications.length > 0 ? (
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index} secondaryAction={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAccept(notification.clientId, index)}
                >
                  Accept
                </Button>
              }>
                <ListItemText primary={notification.message} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No notifications</Typography>
        )}
      </Box>
      {/* Rest of the content */}
    </CardContent>
  </Card>

          <Card sx={{ p: 2, boxShadow: 3, mt: 4 }}>
            <CardContent>  
              <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Edit Descriptions
              </Typography>
              <Box component="form" onSubmit={handleUpdatedescription} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="shortDescription"
                  label="Short Description"
                  name="shortDescription"
                  autoComplete="short-description"
                  inputRef={shortDescriptionRef}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="detailedDescription"
                  label="Detailed Description"
                  name="detailedDescription"
                  autoComplete="detailed-description"
                  multiline
                  rows={4}
                  inputRef={detailedDescriptionRef}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="price"
                  label="Price Details"
                  name="price"
                  autoComplete="price"
                  inputRef={priceRef}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2, p: '12px 12px' }}
                >
                  Update Descriptions
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Portfolio Showcase Section */}
          <Card sx={{ p: 2, boxShadow: 3, mt: 4 }}>
            <CardContent>
              <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Portfolio Showcase
              </Typography>
              <Box sx={{ mb: 2 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="upload-images"
                  multiple
                />
                <label htmlFor="upload-images">
                  <Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    sx={{ mt: 2, mr: 1, p: '12px 12px' }}
                  >
                    Add Images
                  </Button>
                </label>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleImageUpload}
                  disabled={loading || files.length === 0}
                  sx={{ mt: 2, p: '12px 12px' }}
                >
                  Upload Images
                </Button>
              </Box>
              <Grid container spacing={2} sx={{ overflowY: 'auto', maxHeight: '400px' }}>
                {portfolioImages.length > 0 && portfolioImages.slice(1).map((imgURL, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                  <Box sx={{ position: 'relative', paddingTop: '100%', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                    <img
                      src={imgURL}
                      alt={`Portfolio ${index}`}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '100%',
                        height: '100%',
                        transform: 'translate(-50%, -50%)',
                        objectFit: 'cover',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleOpenDialog(imgURL)}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(imgURL)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* View Image Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>View Image</DialogTitle>
        <DialogContent>
          <img src={viewImage} alt="View" style={{ width: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>

    </>
  );
}

export default PhotographerDashboard;
