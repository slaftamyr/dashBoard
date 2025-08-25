import { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Stack,
  Card,
  CardContent,
  CardHeader,
  TextField,
  MenuItem,
} from "@mui/material";
import FilterBar from "../components/FilterBar.jsx";
import StockTable from "../components/StockTable.jsx";
import StatCard from "../components/StatCard.jsx";
import { getProducts } from "../services/api.js";
import { useFilters } from "../context/FiltersContext.jsx";

export default function Products() {
  const { filters } = useFilters();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProducts(filters).then((p) => mounted && setRows(p));
    return () => { mounted = false; };
  }, [filters]);

  const filtered = rows;

  const totalStock = filtered.reduce((a, b) => a + b.stock, 0);
  const totalSold = filtered.reduce((a, b) => a + b.sold, 0);

  return (
    <Stack spacing={2}>
      <FilterBar />

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Total Products" value={filtered.length} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Units in Stock" value={totalStock} trend={-3} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Units Sold" value={totalSold} trend={7} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Price"
            value={`$${(
              filtered.reduce((a, b) => a + b.price, 0) /
              Math.max(1, filtered.length)
            ).toFixed(2)}`}
          />
        </Grid>
      </Grid>

      <StockTable rows={filtered} title="Products" />
    </Stack>
  );
}
