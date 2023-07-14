import React, { useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './ProductForm.css';
import { createProduct } from "../../api/index";
import CircularProgress from '@mui/material/CircularProgress';


export const ProductForm = ({ setShowForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    rating: "",
    warranty: "",
    avalaible: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const result = await createProduct(formData);

    if (result.code === 201) {
      setShowForm(false);
    }

    setIsLoading(false);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <form>
        <div>
          <TextField
            label="Name"
            id="filled-size-small"
            defaultValue=""
            variant="filled"
            size="small"
            onChange={handleChange}
            value={formData.name}
            name="name"
          />
          <TextField
            label="Type"
            id="filled-size-small"
            defaultValue=""
            variant="filled"
            size="small"
            onChange={handleChange}
            value={formData.type}
            name="type"
          />
          <TextField
            label="Price"
            id="filled-size-small"
            defaultValue=""
            variant="filled"
            size="small"
            onChange={handleChange}
            value={formData.price}
            name="price"
          />
        </div>
        <div>
          <TextField
            label="Rating"
            id="filled-size-small"
            defaultValue=""
            variant="filled"
            size="small"
            onChange={handleChange}
            value={formData.rating}
            name="rating"
          />
          <TextField
            label="Warranty"
            id="filled-size-small"
            defaultValue=""
            variant="filled"
            size="small"
            onChange={handleChange}
            value={formData.warranty_year}
            name="warranty"
          />
        </div>
        <div>
          <TextField
            label="Available"
            id="filled-size-small"
            defaultValue=""
            variant="filled"
            size="small"
            onChange={handleChange}
            value={formData.avalaible}
            name="avalaible"
          />
        </div>

        <ul className={`${styles.ul}`}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="success"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? "En cours..." : "Ajouter"}
          </Button>

          <Button onClick={() => setShowForm(false)} variant="contained" color="error">
            Annuler
          </Button>
        </ul>
      </form>
    </Box>
  );
};
