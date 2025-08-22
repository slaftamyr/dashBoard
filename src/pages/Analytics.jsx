import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import { getSalesTrend, getProducts } from "../services/api.js";

const PINKS = ["#F1D5E5", "#D09DB6", "#9E9A91", "#C8C3BA"];

export default function Analytics() {
  const [trend, setTrend] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    getSalesTrend().then((d) => mounted && setTrend(d));
    getProducts().then((p) => mounted && setProducts(p));
    return () => {
      mounted = false;
    };
  }, []);

  const categoryBreakdown = Object.values(
    products.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || { name: p.category, value: 0 };
      acc[p.category].value += p.sold;
      return acc;
    }, {})
  );

  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <Card sx={{ height: 360 }}>
            <CardHeader title="Revenue by Month" />
            <CardContent sx={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={trend}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#9E9A91" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          <Card sx={{ height: 360 }}>
            <CardHeader title="Sold by Category" />
            <CardContent sx={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}>
                    {categoryBreakdown.map((_, idx) => (
                      <Cell key={idx} fill={PINKS[idx % PINKS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
