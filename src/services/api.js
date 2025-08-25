export function getOverviewMetrics(filters = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // naive scaling based on range for mock purposes
      const range = filters.range || '12m';
      const scale = range === '30d' ? 0.2 : range === '90d' ? 0.5 : 1;
      resolve({
        totalSales: Math.round(12450 * scale),
        revenue: Math.round(325000 * scale),
        productsSold: Math.round(842 * scale),
        stockLevels: 3120, // stock not scaled by range
        customers: Math.round(1260 * scale),
        repeatBuyers: Math.round(420 * scale),
      });
    }, 400);
  });
}

export function getSalesTrend(filters = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const base = [
        { name: "Jan", sales: 120, revenue: 11000 },
        { name: "Feb", sales: 140, revenue: 12200 },
        { name: "Mar", sales: 160, revenue: 13800 },
        { name: "Apr", sales: 180, revenue: 15100 },
        { name: "May", sales: 210, revenue: 17600 },
        { name: "Jun", sales: 240, revenue: 19100 },
        { name: "Jul", sales: 230, revenue: 18750 },
        { name: "Aug", sales: 250, revenue: 19900 },
        { name: "Sep", sales: 270, revenue: 21300 },
        { name: "Oct", sales: 300, revenue: 23400 },
        { name: "Nov", sales: 350, revenue: 27500 },
        { name: "Dec", sales: 400, revenue: 32000 },
      ];
      const range = filters.range || '12m';
      const months = range === '30d' ? 1 : range === '90d' ? 3 : 12;
      resolve(base.slice(-months));
    }, 400);
  });
}

export function getProducts(filters = null) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: "P-1001",
          name: "Industrial Drill",
          category: "Tools",
          price: 199.99,
          stock: 120,
          sold: 840,
        },
        {
          id: "P-1002",
          name: "Safety Helmet",
          category: "Safety",
          price: 29.99,
          stock: 560,
          sold: 1220,
        },
        {
          id: "P-1003",
          name: "Hydraulic Pump",
          category: "Machinery",
          price: 799.0,
          stock: 45,
          sold: 89,
        },
        {
          id: "P-1004",
          name: "Conveyor Belt",
          category: "Machinery",
          price: 1299.0,
          stock: 12,
          sold: 40,
        },
        {
          id: "P-1005",
          name: "Work Gloves",
          category: "Safety",
          price: 9.99,
          stock: 980,
          sold: 3210,
        },
      ];
      if (!filters) return resolve(data);
      const q = (filters.q || '').toLowerCase();
      const filtered = data.filter((r) => {
        const okCat = !filters.category || filters.category === 'all' || r.category === filters.category;
        const okQ = !q || r.name.toLowerCase().includes(q);
        return okCat && okQ;
      });
      resolve(filtered);
    }, 450);
  });
}

export function getCustomers(filters = null) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: "C-001",
          name: "Acme Corp",
          email: "ops@acme.com",
          orders: 34,
          repeat: true,
        },
        {
          id: "C-002",
          name: "Globex",
          email: "supply@globex.com",
          orders: 12,
          repeat: true,
        },
        {
          id: "C-003",
          name: "Initech",
          email: "procurement@initech.com",
          orders: 2,
          repeat: false,
        },
        {
          id: "C-004",
          name: "Umbrella Inc",
          email: "buy@umbrella.com",
          orders: 8,
          repeat: true,
        },
        {
          id: "C-005",
          name: "Soylent",
          email: "contact@soylent.com",
          orders: 1,
          repeat: false,
        },
      ];
      if (!filters) return resolve(data);
      const q = (filters.q || '').toLowerCase();
      const filtered = data.filter((r) => !q || r.name.toLowerCase().includes(q));
      resolve(filtered);
    }, 500);
  });
}
