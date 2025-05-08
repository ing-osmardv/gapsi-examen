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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getProviders, deleteProvider } from "../../services/provider.service";

export default function Providers() {
  const [providers, setProviders] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchProviders();
  }, [page, rowsPerPage]);

  const fetchProviders = async () => {
    const response = await getProviders(page, rowsPerPage);
    setProviders(response.items);
    setTotalCount(response.total);
  };

  const handleDelete = async (name) => {
    await deleteProvider(name);
    fetchProviders();
  };

  const handleChangePage = (event, newPage) => {
    if (newPage < 1 || newPage > Math.ceil(totalCount / rowsPerPage)) {
      return;
    }
    setPage(newPage)
};
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Paper sx={{ width: "90%", margin: "20px auto" }}>
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
            {providers.map((prov, idx) => (
              <TableRow key={idx}>
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
      />
    </Paper>
  );
}
