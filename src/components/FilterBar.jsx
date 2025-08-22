import { Stack, TextField, MenuItem, Button } from '@mui/material';
import { useState } from 'react';

const ranges = [
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '12m', label: 'Last 12 months' },
];

export default function FilterBar({ onChange, initial = { range: '12m', category: 'all', q: '' } }) {
  const [filters, setFilters] = useState(initial);

  const update = (patch) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    onChange?.(next);
  };

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <TextField select size="small" label="Range" value={filters.range} onChange={(e) => update({ range: e.target.value })} sx={{ minWidth: 180 }}>
        {ranges.map((o) => (
          <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
        ))}
      </TextField>
      <TextField select size="small" label="Category" value={filters.category} onChange={(e) => update({ category: e.target.value })} sx={{ minWidth: 180 }}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="Tools">Tools</MenuItem>
        <MenuItem value="Safety">Safety</MenuItem>
        <MenuItem value="Machinery">Machinery</MenuItem>
      </TextField>
      <TextField size="small" label="Search" value={filters.q} onChange={(e) => update({ q: e.target.value })} placeholder="Find products/customers" sx={{ flex: 1 }} />
      <Button variant="contained" color="secondary" onClick={() => onChange?.(filters)}>Apply</Button>
    </Stack>
  );
}
