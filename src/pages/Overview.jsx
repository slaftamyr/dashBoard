import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import StatCard from '../components/StatCard.jsx';
import SalesTrendChart from '../components/SalesTrendChart.jsx';
import FilterBar from '../components/FilterBar.jsx';
import StockTable from '../components/StockTable.jsx';
import { getOverviewMetrics, getSalesTrend, getProducts } from '../services/api.js';
import { useFilters } from '../context/FiltersContext.jsx';

export default function Overview() {
  const { filters } = useFilters();
  const [metrics, setMetrics] = useState(null);
  const [trend, setTrend] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    getOverviewMetrics(filters).then((m) => mounted && setMetrics(m));
    getSalesTrend(filters).then((d) => mounted && setTrend(d));
    getProducts(filters).then((p) => mounted && setTopProducts(p.slice(0, 5)));
    return () => { mounted = false; };
  }, [filters]);

  return (
    <Stack spacing={2}>
      <FilterBar />

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Total Sales" value={metrics ? metrics.totalSales : '—'} trend={8} subtitle="orders" />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Revenue" value={metrics ? `$${metrics.revenue.toLocaleString()}` : '—'} trend={12} subtitle="USD" />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Products Sold" value={metrics ? metrics.productsSold : '—'} trend={4} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard title="Stock Levels" value={metrics ? metrics.stockLevels : '—'} trend={-2} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <SalesTrendChart data={trend} />
        </Grid>
        <Grid xs={12} md={4}>
          <StockTable rows={topProducts} title="Top Products" />
        </Grid>
      </Grid>
    </Stack>
  );
}
