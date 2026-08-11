import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export default async function ClientOrdersPage() {
  const session = await getSessionUser();
  if (!session) return null;

  const [orders, orderCount, filledCount, pendingCount] = await Promise.all([
    prisma.order.findMany({ where: { clientId: session.id }, orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.order.count({ where: { clientId: session.id } }),
    prisma.order.count({ where: { clientId: session.id, status: "FILLED" } }),
    prisma.order.count({ where: { clientId: session.id, status: "PENDING" } }),
  ]);

  return (
    <AppShell title="Orders" subtitle="Your trading order history" variant="client">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Total orders</div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">{orderCount}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Filled</div>
          <div className="mt-3 text-3xl font-semibold text-emerald-600">{filledCount}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Pending</div>
          <div className="mt-3 text-3xl font-semibold text-amber-600">{pendingCount}</div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-5">
        <div className="text-sm font-semibold text-slate-900">Recent orders</div>
        {orders.length === 0 ? (
          <div className="mt-5 text-sm text-slate-500">You have no orders yet.</div>
        ) : (
          <table className="mt-4 min-w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3">Symbol</th>
                <th className="px-3 py-3">Side</th>
                <th className="px-3 py-3">Quantity</th>
                <th className="px-3 py-3">Price</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-3 py-3 font-semibold text-slate-900">{order.symbol}</td>
                  <td className="px-3 py-3 text-slate-700">{order.side}</td>
                  <td className="px-3 py-3">{order.quantity}</td>
                  <td className="px-3 py-3">₹{order.price.toLocaleString()}</td>
                  <td className="px-3 py-3 text-slate-700">{order.status}</td>
                  <td className="px-3 py-3 text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppShell>
  );
}
