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

export const dashboardMetrics = [
  { label: "Net Worth", value: "₹12,48,500", change: "+4.6%" },
  { label: "Today's P&L", value: "+₹8,420", change: "+0.68%" },
  { label: "Live Strategies", value: "04", change: "2 running" },
  { label: "Open Positions", value: "07", change: "3 profitable" },
];

export const pnlBreakdown = [
  { name: "Winning Days", value: 52, color: "#22c55e" },
  { name: "Losing Days", value: 31, color: "#ef4444" },
  { name: "Breakeven Days", value: 17, color: "#8b5cf6" },
];

export const strategyRows = [
  { name: "EMA + RSI", status: "RUNNING", type: "Momentum", pnl: "+₹3,420" },
  { name: "ORB Breakout", status: "RUNNING", type: "Breakout", pnl: "+₹2,690" },
  { name: "VWAP Mean Revert", status: "PAUSED", type: "Mean Reversion", pnl: "-₹1,120" },
  { name: "Supertrend", status: "DRAFT", type: "Trend", pnl: "₹0" },
];

export const activityRows = [
  { time: "09:15 AM", action: "Order Filled", strategy: "EMA + RSI", status: "FILLED" },
  { time: "10:30 AM", action: "Backtest Run", strategy: "ORB Breakout", status: "COMPLETED" },
  { time: "11:45 AM", action: "Risk Alert", strategy: "VWAP Mean Revert", status: "WARN" },
  { time: "12:25 PM", action: "Strategy Paused", strategy: "Supertrend", status: "PAUSED" },
];

export const salesData = [
  { name: "Jan", sales: 32 },
  { name: "Feb", sales: 38 },
  { name: "Mar", sales: 46 },
  { name: "Apr", sales: 43 },
  { name: "May", sales: 51 },
  { name: "Jun", sales: 58 },
  { name: "Jul", sales: 63 },
  { name: "Aug", sales: 69 },
];

export const metricCards = [
  { label: "Total Employees", value: "48" },
  { label: "Active Clients", value: "2,184" },
  { label: "Monthly Sales", value: "₹38.6L" },
  { label: "Live Algos", value: "1,284" },
];

export const employeeRows = [
  { id: "EMP-1042", name: "Amit Kumar", role: "Manager", team: "North Team", salary: "₹22K", sales: "₹4.2L", target: "₹5.0L", status: "ACTIVE" },
  { id: "EMP-1098", name: "Priya Singh", role: "Employee", team: "Inside Sales", salary: "₹32K", sales: "₹3.1L", target: "₹3.5L", status: "ACTIVE" },
  { id: "EMP-1124", name: "Rahul Sharma", role: "Employee", team: "West Team", salary: "₹48K", sales: "₹4.8L", target: "₹5.0L", status: "ACTIVE" },
  { id: "EMP-1155", name: "Neha Verma", role: "Manager", team: "East Team", salary: "₹36K", sales: "₹3.5L", target: "₹4.0L", status: "ON LEAVE" },
];

export const clientRows = [
  { id: "CL-100842", name: "Rahul Mehta", phone: "+91 98765 43210", owner: "Amit Kumar", broker: "Angel One", api: "Connected", totp: "Enabled", status: "Active" },
  { id: "CL-100851", name: "Pooja Nair", phone: "+91 98765 43211", owner: "Priya Singh", broker: "Zerodha", api: "Connected", totp: "Enabled", status: "Active" },
  { id: "CL-100863", name: "Karan Shah", phone: "+91 98765 43212", owner: "Amit Kumar", broker: "FYERS", api: "Pending", totp: "Disabled", status: "Pending" },
  { id: "CL-100890", name: "Sonia Patel", phone: "+91 98765 43213", owner: "Rahul Sharma", broker: "Upstox", api: "Connected", totp: "Enabled", status: "Active" },
];

export const auditRows = [
  { user: "Amit Kumar", role: "ADMIN", action: "Login", entity: "User", result: "SUCCESS" },
  { user: "Priya Singh", role: "EMPLOYEE", action: "Client Assigned", entity: "Client", result: "SUCCESS" },
  { user: "Rahul Sharma", role: "MANAGER", action: "Strategy Deployment", entity: "Strategy", result: "SUCCESS" },
  { user: "Amit Kumar", role: "ADMIN", action: "Broker Connection", entity: "Broker", result: "SUCCESS" },
];

export const brokerCards = [
  { name: "Zerodha", status: "CONNECTED" },
  { name: "Angel One", status: "CONNECTED" },
  { name: "Upstox", status: "PENDING" },
  { name: "ICICI Direct", status: "REVOKED" },
  { name: "FYERS", status: "ERROR" },
];

export const orders = [
  { time: "09:15 AM", symbol: "RELIANCE", type: "BUY", quantity: 80, price: 2975, status: "FILLED", pnl: "+₹18,200" },
  { time: "10:40 AM", symbol: "TCS", type: "SELL", quantity: 60, price: 4120, status: "FILLED", pnl: "+₹9,560" },
  { time: "11:05 AM", symbol: "INFY", type: "BUY", quantity: 120, price: 1658, status: "PENDING", pnl: "-" },
  { time: "12:18 PM", symbol: "HDFCBANK", type: "SELL", quantity: 70, price: 1768, status: "REJECTED", pnl: "-" },
];

export const positions = [
  { symbol: "NIFTY", type: "LONG", quantity: 120, avg: 24940, ltp: 25080, pnl: "+₹16,800" },
  { symbol: "BANKNIFTY", type: "SHORT", quantity: 50, avg: 53250, ltp: 52890, pnl: "+₹18,000" },
  { symbol: "RELIANCE", type: "LONG", quantity: 80, avg: 2950, ltp: 2998, pnl: "+₹3,840" },
  { symbol: "TCS", type: "LONG", quantity: 90, avg: 4070, ltp: 4018, pnl: "-₹4,680" },
];

export const riskSettings = [
  { label: "Daily Loss Limit", value: "₹1.5L" },
  { label: "Max Exposure", value: "₹25L" },
  { label: "Max Positions", value: "05" },
  { label: "Max Drawdown", value: "12%" },
  { label: "Auto Square Off", value: "Enabled" },
  { label: "Trade Frequency", value: "Moderate" },
];
