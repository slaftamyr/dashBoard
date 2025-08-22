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

export default function Products() {
  const [filters, setFilters] = useState({
    range: "12m",
    category: "all",
    q: "",
  });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProducts().then((p) => mounted && setRows(p));
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const okCategory =
        filters.category === "all" || r.category === filters.category;
      const okQ =
        !filters.q || r.name.toLowerCase().includes(filters.q.toLowerCase());
      return okCategory && okQ;
    });
  }, [rows, filters]);

  const totalStock = filtered.reduce((a, b) => a + b.stock, 0);
  const totalSold = filtered.reduce((a, b) => a + b.sold, 0);

  return (
    <Stack spacing={2}>
      <FilterBar onChange={setFilters} initial={filters} />

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
