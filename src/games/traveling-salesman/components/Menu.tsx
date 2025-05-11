import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';

type MenuProps = {
    onStart: () => void;
};

function Menu({ onStart }: MenuProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');  // navigates to the root URL
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mb={4} gap={1}>
            <Button
                variant="contained"
                color="primary"
                onClick={onStart}
                sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: 18,
                    background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
                    borderRadius: 2,
                    boxShadow: "0 2px 8px #1976d222"
                }}
            >
                Start TSP Game
            </Button>
            <Button
                variant="outlined"
                size="large"
                color="error"
                onClick={handleBack}>
                Back to Main Menu
            </Button>
        </Box>
    );
}

export default Menu;
