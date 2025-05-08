import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { createProvider, createProviderGQL } from "../../services/provider.service";

export default function ProviderForm({ onProviderAdded, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createProviderGQL(formData);
      onProviderAdded();
    } catch ({ response }) {
      const message = response.data.error;
      setError(message || "Error al crear el proveedor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} sx={{ mt: 2, p: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          name="name"
          label="Nombre"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          disabled={loading}
        />

        <TextField
          name="companyName"
          label="Razón Social"
          value={formData.companyName}
          onChange={handleChange}
          fullWidth
          required
          disabled={loading}
        />

        <TextField
          name="address"
          label="Dirección"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={3}
          disabled={loading}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={onCancel} variant="outlined" disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Guardar"}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
