import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getProviders, deleteProvider } from "../../services/provider.service";
import "./Providers.css";
import ProviderForm from "../ProviderForm/ProviderForm";

export default function Providers() {
  const [providers, setProviders] = useState([]);
  const [page, setPage] = useState(0); // Page index starts from 0
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchProviders();
  }, [page, rowsPerPage]);

  const fetchProviders = async () => {
    const response = await getProviders(page + 1, rowsPerPage); // +1 if backend expects page starting at 1
    setProviders(response.items); // Or response.items based on your backend
    setTotalCount(response.total);
  };

  const handleDelete = async (id) => {
    await deleteProvider(id);
    fetchProviders();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleProviderAdded = () => {
    fetchProviders();
    handleCloseModal();
  };

  return (
    <>
      <div className="providers-content">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            Proveedores
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Nuevo Proveedor
          </Button>
        </Box>

        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
          <DialogContent>
            <ProviderForm
              onProviderAdded={handleProviderAdded}
              onCancel={handleCloseModal}
            />
          </DialogContent>
        </Dialog>

        <Paper sx={{ width: "100%", margin: "20px 0" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Razón Social</TableCell>
                  <TableCell>Dirección</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {providers.map((prov) => (
                  <TableRow key={prov.id}>
                    <TableCell>{prov.name}</TableCell>
                    <TableCell>{prov.companyName}</TableCell>
                    <TableCell>{prov.address}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDelete(prov.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {providers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No hay proveedores
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </div>
    </>
  );
}
