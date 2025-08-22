import { Card, CardContent, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Typography } from '@mui/material';

export default function StockTable({ rows = [], title = 'Top Products' }) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Sold</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell width={180}>Stock Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => {
                const capacity = r.sold + r.stock;
                const pct = capacity ? Math.round((r.stock / capacity) * 100) : 0;
                return (
                  <TableRow key={r.id} hover>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>{r.name}</Typography>
                      <Typography variant="caption" color="text.secondary">${r.price?.toFixed?.(2)}</Typography>
                    </TableCell>
                    <TableCell>{r.category}</TableCell>
                    <TableCell align="right">{r.sold}</TableCell>
                    <TableCell align="right">{r.stock}</TableCell>
                    <TableCell>
                      <LinearProgress variant="determinate" value={pct} sx={{ height: 8, borderRadius: 5 }} />
                      <Typography variant="caption" color="text.secondary">{pct}% remaining</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
