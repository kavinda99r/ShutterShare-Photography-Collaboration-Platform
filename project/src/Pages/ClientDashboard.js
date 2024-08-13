import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDoc, doc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { TextField, Button, Container, Avatar, Typography, Box, Grid, Card, CardContent, IconButton, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

function ClientDashboard() {
  const { currentUser } = useAuth();
  const usernameRef = useRef();
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allPhotographers, setAllPhotographers] = useState([]);
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [contactedPhotographers, setContactedPhotographers] = useState([]);
  const [viewPhotographer, setViewPhotographer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewImage, setViewImage] = useState(''); // State for viewing an image
  const [openImageDialog, setOpenImageDialog] = useState(false); // State for opening the image dialog

  useEffect(() => {
    const fetchData = async () => {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      const userData = userDoc.data();
      usernameRef.current.value = userData.username;
      setProfilePicture(userData.profilePicture);

      const photographersQuery = query(collection(db, 'users'), where('role', '==', 'photographer'));
      const querySnapshot = await getDocs(photographersQuery);
      const photographers = querySnapshot.docs.map(doc => doc.data());
      setAllPhotographers(photographers);

      // Fetch contacted photographers
      const contacts = userData.contacts || [];
      setContactedPhotographers(contacts);
    };

    fetchData();
  }, [currentUser]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const fileRef = ref(storage, `profilePictures/${currentUser.uid}/${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      await updateDoc(doc(db, 'users', currentUser.uid), {
        profilePicture: downloadURL
      });

      setProfilePicture(downloadURL);
      Swal.fire('Success', 'Profile picture updated!', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }

    setLoading(false);
  };


  const checkUsernameExists = async (username) => {
    const userCollection = collection(db, 'users');
    const q = query(userCollection, where('username', '==', username));
    const userSnapshot = await getDocs(q);
    return !userSnapshot.empty;
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

      // Check if the username already exists
      const usernameExists = await checkUsernameExists(newUsername);
      if (usernameExists) {
        Swal.fire('Error', 'Username already taken', 'error');
        setLoading(false);
        return;
      }

      await updateDoc(doc(db, 'users', currentUser.uid), {
        username: newUsername
      });

      Swal.fire('Success', 'Profile updated!', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }

    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);

    try {
      const photographersQuery = query(collection(db, 'users'), where('role', '==', 'photographer'));
      const querySnapshot = await getDocs(photographersQuery);
      const results = querySnapshot.docs
        .map(doc => doc.data())
        .filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));
      
      setSearchResults(results);
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }

    setLoading(false);
  };

  const handleCloseSearchResults = () => {
    setSearchResults([]);
  };

  const handleViewDetails = (photographer) => {
    setViewPhotographer(photographer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleImageClick = (imageUrl) => {
    setViewImage(imageUrl);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };


  
  
  const handleContact = async (photographer) => {
    // Check if the photographer is already contacted
    const isAlreadyContacted = contactedPhotographers.some(contact => contact.username === photographer.username);
  
    if (isAlreadyContacted) {
      // If already contacted, switch to the chat interface for that photographer
      setSelectedPhotographer(photographer);
      return;
    }
  
    // If not already contacted, add them to the list and update Firestore
    const updatedContacts = [...contactedPhotographers, photographer];
    setContactedPhotographers(updatedContacts);
  
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        contacts: updatedContacts
      });
      setSelectedPhotographer(photographer);
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };
  
  const handleBack = () => {
    setSelectedPhotographer(null);
  };

  const handleContactClick = (photographer) => {
    setSelectedPhotographer(photographer);
  };

  const handleDeleteContact = async (photographer) => {
    const updatedContacts = contactedPhotographers.filter(contact => contact.username !== photographer.username);
    setContactedPhotographers(updatedContacts);

    // Save updated contacts to Firestore
    await updateDoc(doc(db, 'users', currentUser.uid), {
      contacts: updatedContacts
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xl">
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={3}>
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
                  <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="upload-file" />
                  <label htmlFor="upload-file">
                    <Button variant="contained" color="primary" component="span" sx={{ mt: 2 }}>
                      Choose Profile Picture
                    </Button>
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={loading || !file}
                    sx={{ mt: 2, p: '12px 12px' }}
                  >
                    Upload Profile Picture
                  </Button>
                </Box>
                {/* Messages Section */}
                <Box sx={{ mt: 4 }}>
                  <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Messages
                  </Typography>
                  <List>
                    {contactedPhotographers.map((photographer, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteContact(photographer)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemButton onClick={() => handleContactClick(photographer)}>
                          <ListItemAvatar>
                            <Avatar src={photographer.profilePicture} alt={photographer.username} />
                          </ListItemAvatar>
                          <ListItemText primary={photographer.username} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            {!selectedPhotographer ? (
              <Card sx={{ p: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Search Photographers
                  </Typography>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      id="search"
                      label="Search by Username"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSearch}
                      disabled={loading}
                      sx={{ ml: 2, p: '12px 12px' }}
                    >
                      Search
                    </Button>
                    {searchResults.length > 0 && (
                      <IconButton color="secondary" onClick={handleCloseSearchResults}>
                        <CloseIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    {(searchResults.length > 0 ? searchResults : allPhotographers).map((photographer, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ boxShadow: 3 }}>
                          <CardContent>
                            <Avatar src={photographer.profilePicture} alt={photographer.username} sx={{ width: 80, height: 80, margin: '0 auto' }} />
                            <Typography variant="h6" component="div" sx={{ textAlign: 'center', mt: 1 }}>
                              {photographer.username}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', mt: 1 }}>
                              {photographer.shortDescription}
                            </Typography>
                            <Typography color="text.secondary" sx={{ textAlign: 'center', color: photographer.isAvailable ? 'green' : 'red' }}>
                                {photographer.isAvailable ? 'Available' : 'Not Available'}
                              </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              sx={{ mt: 2, p: '12px 12px' }}
                              onClick={() => handleContact(photographer)}
                            >
                              Contact
                            </Button>
                            <Button
                              variant="outlined"
                              color="primary"
                              fullWidth
                              sx={{ mt: 1, p: '12px 12px' }}
                              onClick={() => handleViewDetails(photographer)}
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            ) : (
              <Card sx={{ p: 2, boxShadow: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold' }}>
                      Chat with {selectedPhotographer.username}
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={handleBack}>
                      Back
                    </Button>
                  </Box>
                  {/* Chat interface will go here */}
                  <Box sx={{ mt: 2 }}>Chat interface</Box>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Photographer Details</DialogTitle>
        <DialogContent>
          {viewPhotographer && (
            <>
              <Avatar src={viewPhotographer.profilePicture} alt={viewPhotographer.username} sx={{ width: 100, height: 100, margin: '0 auto' }} />
              <Typography variant="h6" component="div" sx={{ textAlign: 'center', mt: 1 }}>
                {viewPhotographer.username}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', mt: 1 }}>
                {viewPhotographer.shortDescription}
              </Typography>
              <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 2 }}>
                {viewPhotographer?.price ? `Price: $${viewPhotographer?.price}` : 'Price not available'}
              </Typography>
              <Typography variant="body1" color="textPrimary" sx={{ mt: 2 }}>
                {viewPhotographer.detailedDescription}
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Portfolio
                </Typography>
                <Grid container spacing={2}>
                  {viewPhotographer.portfolioImages && viewPhotographer.portfolioImages.length > 0 ? (
                    viewPhotographer?.portfolioImages.slice(1).map((image, index) => (
                      <Grid item xs={6} sm={3} key={index}>
                      <Box
                        component="img"
                        src={image}
                        alt={`Portfolio Image ${index}`}
                        sx={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleImageClick(image)}
                      />
                    </Grid>
                    ))
                  ) : (
                    <Typography>No portfolio images available</Typography>
                  )}
                </Grid>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Viewer Dialog */}
      <Dialog open={openImageDialog} onClose={handleCloseImageDialog} maxWidth="md" fullWidth>
        <DialogTitle>View Image</DialogTitle>
        <DialogContent>
          {viewImage && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src={viewImage} alt="Portfolio" style={{ width: '100%', height: 'auto' }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ClientDashboard;
