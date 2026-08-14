export const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/strategies", label: "Strategies" },
  { href: "/orders", label: "Orders" },
  { href: "/positions", label: "Positions" },
  { href: "/reports", label: "Reports" },
  { href: "/brokers", label: "Brokers" },
  { href: "/risk-management", label: "Risk Management" },
  { href: "/admin/dashboard", label: "Admin Dashboard" },
  { href: "/employee/dashboard", label: "Employee Dashboard" },
  { href: "/settings", label: "Settings" },
];

export const dashboardStats = [
  { label: "Net Worth", value: "₹12,48,500", trend: "+4.6%" },
  { label: "Today's P&L", value: "+₹8,420", trend: "+0.68%" },
  { label: "Live Strategies", value: "04", trend: "2 running" },
  { label: "Open Positions", value: "07", trend: "3 profitable" },
];

export const equityCurve = [
  { month: "Jan", value: 8200 },
  { month: "Feb", value: 9000 },
  { month: "Mar", value: 10120 },
  { month: "Apr", value: 11250 },
  { month: "May", value: 12180 },
  { month: "Jun", value: 12480 },
  { month: "Jul", value: 13220 },
  { month: "Aug", value: 13980 },
  { month: "Sep", value: 14600 },
  { month: "Oct", value: 15020 },
  { month: "Nov", value: 15350 },
  { month: "Dec", value: 15840 },
];

export const pnlBreakdown = [
  { name: "Winning Days", value: 52, color: "#22c55e" },
  { name: "Losing Days", value: 31, color: "#ef4444" },
  { name: "Breakeven Days", value: 17, color: "#8b5cf6" },
];

export const strategyRows = [
  { name: "EMA + RSI", status: "RUNNING", type: "Momentum", pnl: "+₹3,420", action: "View" },
  { name: "ORB Breakout", status: "RUNNING", type: "Breakout", pnl: "+₹2,690", action: "View" },
  { name: "VWAP Mean Revert", status: "PAUSED", type: "Mean Reversion", pnl: "-₹1,120", action: "View" },
  { name: "Supertrend", status: "DRAFT", type: "Trend", pnl: "₹0", action: "View" },
];

export const activityRows = [
  { time: "09:15 AM", action: "Order Filled", strategy: "EMA + RSI", status: "FILLED" },
  { time: "10:30 AM", action: "Backtest Run", strategy: "ORB Breakout", status: "COMPLETED" },
  { time: "11:45 AM", action: "Risk Alert", strategy: "VWAP Mean Revert", status: "WARN" },
  { time: "12:25 PM", action: "Strategy Paused", strategy: "Supertrend", status: "PAUSED" },
];

export const orders = [
  { time: "09:15", symbol: "NIFTY", type: "BUY", quantity: 80, price: 24820, status: "FILLED", pnl: "+₹1,240" },
  { time: "10:32", symbol: "BANKNIFTY", type: "SELL", quantity: 35, price: 51840, status: "PENDING", pnl: "—" },
  { time: "11:40", symbol: "RELIANCE", type: "BUY", quantity: 150, price: 2845, status: "FILLED", pnl: "+₹420" },
  { time: "12:05", symbol: "TCS", type: "SELL", quantity: 100, price: 3895, status: "REJECTED", pnl: "—" },
];

export const positions = [
  { symbol: "NIFTY", type: "LONG", quantity: 80, avg: 24820, ltp: 24930, pnl: "+₹8,800" },
  { symbol: "RELIANCE", type: "LONG", quantity: 150, avg: 2825, ltp: 2870, pnl: "+₹6,750" },
  { symbol: "TCS", type: "SHORT", quantity: 100, avg: 3960, ltp: 3915, pnl: "+₹4,500" },
  { symbol: "INFY", type: "SHORT", quantity: 210, avg: 1480, ltp: 1452, pnl: "-₹5,880" },
];

export const brokerCards = [
  { name: "Zerodha", status: "CONNECTED" },
  { name: "Upstox", status: "PENDING" },
  { name: "Angel One", status: "CONNECTED" },
  { name: "FYERS", status: "DISCONNECTED" },
  { name: "Alice Blue", status: "REVOKED" },
];

export const employeeRows = [
  { id: "EMP-1042", name: "Amit Kumar", role: "Manager", team: "North", salary: "₹22K", sales: "₹4.2L", target: "₹5L", status: "ACTIVE" },
  { id: "EMP-1098", name: "Priya Singh", role: "Employee", team: "Inside Sales", salary: "₹32K", sales: "₹3.1L", target: "₹3.5L", status: "ACTIVE" },
  { id: "EMP-1124", name: "Rahul Sharma", role: "Employee", team: "West", salary: "₹48K", sales: "₹4.8L", target: "₹5L", status: "ACTIVE" },
  { id: "EMP-1155", name: "Neha Verma", role: "Manager", team: "East", salary: "₹36K", sales: "₹3.5L", target: "₹4L", status: "ON LEAVE" },
];

export const clientRows = [
  { id: "CL-100842", name: "Rahul Mehta", owner: "Amit Kumar", broker: "Angel One", api: "Connected", totp: "Enabled", status: "Active" },
  { id: "CL-100851", name: "Pooja Nair", owner: "Priya Singh", broker: "Zerodha", api: "Connected", totp: "Enabled", status: "Active" },
  { id: "CL-100863", name: "Karan Shah", owner: "Amit Kumar", broker: "FYERS", api: "Pending", totp: "Disabled", status: "Pending" },
  { id: "CL-100890", name: "Sonia Patel", owner: "Rahul Sharma", broker: "Upstox", api: "Connected", totp: "Enabled", status: "Active" },
];

export const salesTrend = [
  { name: "Jan", sales: 32 },
  { name: "Feb", sales: 38 },
  { name: "Mar", sales: 46 },
  { name: "Apr", sales: 43 },
  { name: "May", sales: 51 },
  { name: "Jun", sales: 58 },
  { name: "Jul", sales: 63 },
  { name: "Aug", sales: 69 },
];

export const managementHierarchy = [
  "ADMIN",
  "MANAGER",
  "TEAM LEAD",
  "EXECUTIVE",
];

export const riskSettings = [
  { label: "Daily Loss Limit", value: "₹1.5L" },
  { label: "Max Drawdown", value: "8.0%" },
  { label: "Max Open Positions", value: "12" },
  { label: "Max Exposure", value: "₹25L" },
  { label: "Max Trades / Day", value: "40" },
  { label: "Square Off Time", value: "15:10" },
];

export const auditRows = [
  { time: "09:02 AM", user: "Amit Kumar", role: "ADMIN", action: "Login", entity: "User", result: "SUCCESS" },
  { time: "09:15 AM", user: "Priya Singh", role: "EMPLOYEE", action: "Client Assigned", entity: "Client", result: "SUCCESS" },
  { time: "10:21 AM", user: "Rahul Sharma", role: "MANAGER", action: "Strategy Deployment", entity: "Strategy", result: "SUCCESS" },
  { time: "11:42 AM", user: "Amit Kumar", role: "ADMIN", action: "Broker Connection", entity: "Broker", result: "SUCCESS" },
];

export const payrollRows = [
  { employee: "Amit Kumar", salary: "₹22K", incentive: "₹4.2K", deduction: "₹0", net: "₹26.2K", status: "APPROVED" },
  { employee: "Priya Singh", salary: "₹32K", incentive: "₹8.5K", deduction: "₹1.2K", net: "₹39.3K", status: "PENDING" },
  { employee: "Rahul Sharma", salary: "₹48K", incentive: "₹12.4K", deduction: "₹0", net: "₹60.4K", status: "APPROVED" },
];
