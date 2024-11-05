import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, Container, Grid, Box,
} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Profile() {
    const user = {
        name: "Juan Dela Cruz",
        email: "juan.dcruz@example.com",
        profileImage: " ", // sample image (link)
    };

    // Sample flashcards with visibility property
    const [flashcards, setFlashcards] = useState([
        { id: 1, title: "Flashcard 1", content: "Content for flashcard 1", visibility: "public" },
        { id: 2, title: "Flashcard 2", content: "Content for flashcard 2", visibility: "private" },
        { id: 3, title: "Flashcard 3", content: "Content for flashcard 3", visibility: "public" },
        { id: 4, title: "Flashcard 4", content: "Content for flashcard 4", visibility: "private" },
    ]);

    // State to manage visibility filter
    const [visibilityFilter, setVisibilityFilter] = useState("all");

    // Filter flashcards based on visibility
    const filteredFlashcards = flashcards.filter(card => {
        if (visibilityFilter === "public") return card.visibility === "public";
        if (visibilityFilter === "private") return card.visibility === "private";
        return true; // if "all", show all flashcards
    });

    return (
        <Container maxWidth="md">

            {/* User Profile Section */}
            <Box display="flex" alignItems="center" my={4} p={2} bgcolor="white" borderRadius={2} boxShadow={2}>
                <img 
                    src={user.profileImage} 
                    alt="Profile" 
                    style={{ width: 100, height: 100, borderRadius: '50%', border: '2px solid #3f51b5', borderColor: 'black'}} 
                />
                <Box ml={2}>
                    <Typography variant="h5">{user.name}</Typography>
                    <Typography variant="body1" color="textSecondary">{user.email}</Typography>
                </Box>
            </Box>

            {/* Visibility Filter */}
            <Box my={2}>
                <Button variant="outlined" onClick={() => setVisibilityFilter("all")} style={{ color: 'black', borderColor: 'black' }}>All Flashcards</Button>
                <Button variant="contained" onClick={() => setVisibilityFilter("public")} style={{ backgroundColor: '#808080', marginLeft: '8px' }}>
                    Public Flashcards
                </Button>
                <Button variant="contained" onClick={() => setVisibilityFilter("private")} style={{ backgroundColor: '#808080', marginLeft: '8px' }}>
                    Private Flashcards
                </Button>
            </Box>

            {/* Fashcards Section */}
            <Grid container spacing={2} mt={2}>
                {filteredFlashcards.map((card) => (
                    <Grid item xs={12} sm={6} md={4} key={card.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{card.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{card.content}</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/flashcard/${card.id}`} style={{ textDecoration: 'none' }}>
                                    <Button size="small" style={{ color: 'black'}}>View</Button>
                                    <Button size="small" style={{ color: 'black'}}>Change Visibility</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
