import { ArrowUpRight, BarChart3, BriefcaseBusiness, Building2, CreditCard, Gauge, LayoutDashboard, Shield, Users, Wallet, FileText } from "lucide-react";

export const publicNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const adminNavSections = [
  {
    title: "Main Trading",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/strategies", label: "Strategies", icon: BarChart3 },
      { href: "/orders", label: "Orders", icon: BriefcaseBusiness },
      { href: "/positions", label: "Positions", icon: Wallet },
      { href: "/reports", label: "Reports", icon: BarChart3 },
      { href: "/brokers", label: "Brokers", icon: Building2 },
      { href: "/risk-management", label: "Risk Management", icon: Shield },
    ],
  },
  {
    title: "Administration",
    items: [
      { href: "/admin/leads", label: "Leads", icon: FileText },
      { href: "/admin/employees", label: "Employees", icon: Users },
      { href: "/admin/clients", label: "Clients / Users", icon: Users },
      { href: "/admin/sales", label: "Sales Management", icon: BarChart3 },
      { href: "/admin/payroll", label: "Payroll", icon: CreditCard },
      { href: "/admin/management", label: "Management", icon: Building2 },
      { href: "/admin/audit", label: "Audit / Security", icon: Shield },
      { href: "/settings", label: "Settings", icon: Gauge },
    ],
  },
  {
    title: "Billing",
    items: [{ href: "/billing", label: "Billing", icon: CreditCard }],
  },
];

export const employeeNavSections = [
  {
    title: "Employee Workspace",
    items: [
      { href: "/employee/dashboard", label: "My Dashboard", icon: LayoutDashboard },
      { href: "/employee/leads", label: "My Leads", icon: FileText },
      { href: "/employee/clients", label: "My Clients", icon: Users },
      { href: "/employee/follow-ups", label: "Follow Ups", icon: Shield },
      { href: "/employee/target", label: "My Target", icon: Gauge },
      { href: "/employee/my-sales", label: "My Sales", icon: BarChart3 },
      { href: "/employee/reports", label: "Reports", icon: BarChart3 },
      { href: "/employee/profile", label: "My Profile", icon: CreditCard },
    ],
  },
];

export const clientNavSections = [
  {
    title: "Trading",
    items: [
      { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/client/strategies", label: "My Strategies", icon: BarChart3 },
      { href: "/client/broker", label: "Connect Broker", icon: Building2 },
      { href: "/client/orders", label: "Orders", icon: BriefcaseBusiness },
      { href: "/client/positions", label: "Positions", icon: Wallet },
    ],
  },
  {
    title: "Analytics",
    items: [
      { href: "/client/reports", label: "Reports", icon: BarChart3 },
      { href: "/client/risk", label: "Risk Management", icon: Shield },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/client/broker", label: "Broker", icon: Building2 },
      { href: "/client/notifications", label: "Notifications", icon: ArrowUpRight },
      { href: "/client/profile", label: "Profile", icon: CreditCard },
      { href: "/client/settings", label: "Settings", icon: Gauge },
    ],
  },
];
