import { Card, CardContent, Stack, Typography, Chip } from '@mui/material';

export default function StatCard({ title, value, subtitle, trend, color = 'primary' }) {
  const trendColor = trend && trend >= 0 ? 'success' : 'error';
  return (
    <Card sx={{ ':hover': { transform: 'translateY(-2px)', boxShadow: 4 } }} elevation={1}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">{title}</Typography>
          <Typography variant="h4" fontWeight={700}>{value}</Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
          )}
          {trend !== undefined && (
            <Chip size="small" color={trendColor} label={`${trend > 0 ? '+' : ''}${trend}% vs last period`} sx={{ width: 'fit-content', mt: 0.5 }} />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
