import { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import FilterBar from "../components/FilterBar.jsx";
import StatCard from "../components/StatCard.jsx";
import { getCustomers } from "../services/api.js";

export default function Customers() {
  const [filters, setFilters] = useState({
    range: "12m",
    category: "all",
    q: "",
  });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let mounted = true;
    getCustomers().then((c) => mounted && setRows(c));
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return rows.filter(
      (r) =>
        !filters.q || r.name.toLowerCase().includes(filters.q.toLowerCase())
    );
  }, [rows, filters]);

  const total = filtered.length;
  const repeat = filtered.filter((r) => r.repeat).length;

  return (
    <Stack spacing={2}>
      <FilterBar onChange={setFilters} initial={filters} />

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Customers" value={total} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Repeat Buyers" value={repeat} trend={6} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Repeat Rate"
            value={`${Math.round((repeat / Math.max(1, total)) * 100)}%`}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Orders/Customer"
            value={(
              filtered.reduce((a, b) => a + b.orders, 0) / Math.max(1, total)
            ).toFixed(1)}
          />
        </Grid>
      </Grid>

      <Card>
        <CardHeader title="Customers" />
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Orders</TableCell>
                  <TableCell>Repeat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell align="right">{r.orders}</TableCell>
                    <TableCell>{r.repeat ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Stack>
  );
}
