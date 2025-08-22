export function getOverviewMetrics(filters = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalSales: 12450,
        revenue: 325000,
        productsSold: 842,
        stockLevels: 3120,
        customers: 1260,
        repeatBuyers: 420,
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
      resolve(base);
    }, 400);
  });
}

export function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
      ]);
    }, 450);
  });
}

export function getCustomers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
      ]);
    }, 500);
  });
}
