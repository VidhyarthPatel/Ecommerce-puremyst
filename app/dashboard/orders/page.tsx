"use client";

import { useEffect, useState, Fragment, JSX } from "react";
import {
  Package,
  Search,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Upload,
  Copy,
  FileText,
  Download,
} from "lucide-react";

/* ----------------------
   Types / Interfaces (extended)
   ---------------------- */
interface OrderItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
}

interface GuestOrder {
  id: string;
  orderNumber: string;
  receipt?: string;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress: string;
  guestCity: string;
  guestState: string;
  guestZipCode: string;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentStatus?: string; // "pending" | "Paid" etc
  status: string; // order status: pending/confirmed/etc
  items: OrderItem[];
  createdAt: string;
  updatedAt?: string;
  paidAt?: string | null;
}

/* ----------------------
   Small helpers
   ---------------------- */
const currency = (n: number) => `₹${Number(n).toLocaleString()}`;

const statusBadge = (text: string) => {
  const t = (text || "").toLowerCase();
  if (t === "pending") return "bg-amber-100 text-amber-800";
  if (t === "confirmed") return "bg-blue-100 text-blue-800";
  if (t === "shipped") return "bg-purple-100 text-purple-800";
  if (t === "delivered") return "bg-emerald-100 text-emerald-800";
  if (t === "cancelled") return "bg-rose-100 text-rose-800";
  if (t === "paid") return "bg-emerald-100 text-emerald-800";
  if (t === "failed") return "bg-rose-100 text-rose-800";
  return "bg-gray-100 text-gray-800";
};

const short = (s = "", n = 40) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

/* ----------------------
   Status select (same as before, but a little cleaner)
   ---------------------- */
const StatusBadgeSelect = ({
  order,
  onUpdate,
}: {
  order: GuestOrder;
  onUpdate: (orderId: string, newStatus: string) => void;
}) => {
  const statusColors = statusBadge(order.status);
  return (
    <div className="relative w-full md:w-auto">
      <select
        value={order.status}
        onChange={(e) => onUpdate(order.id, e.target.value)}
        onClick={(e) => e.stopPropagation()}
        className={`w-full md:w-auto pl-3 pr-8 py-1.5 rounded-md text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 ${statusColors}`}
      >
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <ChevronDown className={`w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none`} />
    </div>
  );
};

/* ----------------------
   Modal (enhanced)
   ---------------------- */
const OrderDetailsModal = ({
  order,
  onClose,
  onUpdateStatus,
}: {
  order: GuestOrder;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: string) => void;
}) => {
  const totalItems = order.items.reduce((s, it) => s + it.quantity, 0);

  const copy = async (txt: string) => {
    try {
      await navigator.clipboard.writeText(txt);
      // small UX feedback could be added
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Order #{order.orderNumber.slice(-8).toUpperCase()}</h2>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()} • {order.id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copy(order.id)}
              title="Copy order id"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm border rounded bg-gray-50 hover:bg-gray-100"
            >
              <Copy className="w-4 h-4" /> Copy ID
            </button>
            <button onClick={onClose} className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Customer</h3>
              <div className="text-sm">
                <div className="font-medium">{order.guestName}</div>
                <div className="text-gray-600">{order.guestEmail}</div>
                <div className="text-gray-600">{order.guestPhone}</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping</h3>
              <div className="text-sm text-gray-700">
                <div>{order.guestAddress}</div>
                <div>
                  {order.guestCity}, {order.guestState} {order.guestZipCode}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Payment & Status</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="block text-xs text-gray-400">Method</span>
                  <div className="font-medium capitalize">{order.paymentMethod}</div>
                </div>

                <div>
                  <span className="block text-xs text-gray-400">Payment status</span>
                  <div className={`inline-block px-2 py-1 rounded text-sm ${statusBadge(order.paymentStatus ?? order.status)}`}>
                    {order.paymentStatus ?? "pending"}
                  </div>
                </div>

                <div>
                  <span className="block text-xs text-gray-400">Order status</span>
                  <StatusBadgeSelect order={order} onUpdate={onUpdateStatus} />
                </div>

                <div>
                  <span className="block text-xs text-gray-400">Paid at</span>
                  <div className="text-sm">{order.paidAt ? new Date(order.paidAt).toLocaleString() : "Not paid"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Items ({totalItems}) • Subtotal {currency(order.subtotal)}
            </h3>

            <ul className="divide-y border rounded">
              {order.items.map((it) => (
                <li key={it.id} className="flex items-center gap-4 p-3">
                  <img src={it.productImage} alt={it.productName} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{it.productName}</div>
                    <div className="text-sm text-gray-500">Slug: {it.productSlug}</div>
                    <div className="text-sm text-gray-500">Product ID: {it.productId}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{currency(it.productPrice * it.quantity)}</div>
                    <div className="text-sm text-gray-500">Qty {it.quantity} • ₹{it.productPrice.toLocaleString()}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Meta & actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="text-xs text-gray-400 block">Receipt</span>
                <div className="flex items-center gap-2">
                  <div className="font-medium">{order.receipt ?? "-"}</div>
                  <button title="Copy receipt" onClick={() => navigator.clipboard.writeText(order.receipt ?? "")} className="p-1 rounded hover:bg-gray-100">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-400 block">Razorpay Order</span>
                <div className="flex items-center gap-2">
                  <div className="font-medium">{order.razorpayOrderId ?? "-"}</div>
                  <button onClick={() => navigator.clipboard.writeText(order.razorpayOrderId ?? "")} title="Copy" className="p-1 rounded hover:bg-gray-100">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-400 block">Razorpay Payment</span>
                <div className="flex items-center gap-2">
                  <div className="font-medium">{order.razorpayPaymentId ?? "-"}</div>
                  <button onClick={() => navigator.clipboard.writeText(order.razorpayPaymentId ?? "")} title="Copy" className="p-1 rounded hover:bg-gray-100">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <a href={`/api/orders/${order.id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">
                <FileText className="w-4 h-4" /> View raw
              </a>
              <button
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded hover:opacity-95"
                onClick={() => {
                  // simple invoice download: JSON fallback
                  const blob = new Blob([JSON.stringify(order, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `order-${order.orderNumber}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Download className="w-4 h-4" /> Download JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------------
   Main Page Component
   ---------------------- */
export default function OrdersPage() {
  const [orders, setOrders] = useState<GuestOrder[]>([]);
  const [meta, setMeta] = useState<{ total: number; page: number; perPage: number; totalPages: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState<GuestOrder | null>(null);
  const isModalOpen = !!selectedOrder;
  const openModal = (order: GuestOrder) => setSelectedOrder(order);
  const closeModal = () => setSelectedOrder(null);

  // Fetch page from server with filters
  const fetchOrders = async (page = 1, perPage = ordersPerPage, status = statusFilter, search = searchTerm) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        perPage: String(perPage),
        status: status ?? "all",
        search: search ?? "",
      });
      const res = await fetch(`/api/orders?${params.toString()}`);
      if (!res.ok) {
        console.error("fetch orders failed", await res.text());
        setOrders([]);
        setMeta(null);
        return;
      }
      const json = await res.json();
      setOrders(json.data ?? []);
      setMeta(json.meta ?? null);
      setCurrentPage(json.meta?.page ?? page);
    } catch (err) {
      console.error("fetchOrders error", err);
      setOrders([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchOrders(1, ordersPerPage, statusFilter, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        console.error("Failed to update status:", await response.text());
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  const totalPages = meta?.totalPages ?? Math.max(1, Math.ceil((meta?.total ?? orders.length) / ordersPerPage));
  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > (meta?.totalPages ?? totalPages)) return;
    setCurrentPage(pageNumber);
    fetchOrders(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // export visible page to CSV
  const exportPageCsv = () => {
    if (!orders || orders.length === 0) return;
    const rows = [
      ["orderNumber", "id", "guestName", "guestEmail", "guestPhone", "total", "paymentStatus", "status", "createdAt"],
      ...orders.map((o) => [
        o.orderNumber,
        o.id,
        o.guestName,
        o.guestEmail,
        o.guestPhone,
        o.total,
        o.paymentStatus ?? "",
        o.status,
        o.createdAt,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-page-${currentPage}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // For table display: server returns current page
  const currentOrders = orders;

  const renderPagination = () => {
    const pages: JSX.Element[] = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => goToPage(1)} className="px-3 py-1 rounded-md text-sm border hover:bg-gray-50">
          1
        </button>
      );
      if (startPage > 2) pages.push(<span key="s-ell" className="px-2 text-gray-400">…</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => goToPage(i)} className={`px-3 py-1 rounded-md text-sm border ${i === currentPage ? "bg-neutral-900 text-white" : "hover:bg-gray-50"}`}>
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<span key="e-ell" className="px-2 text-gray-400">…</span>);
      pages.push(
        <button key={totalPages} onClick={() => goToPage(totalPages)} className="px-3 py-1 rounded-md text-sm border hover:bg-gray-50">
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1300px] mx-auto">
          <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">Orders</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and review customer orders — payment & fulfillment details.</p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="hidden sm:flex gap-2">
                <button onClick={exportPageCsv} className="inline-flex items-center gap-2 px-3 py-2 border rounded bg-white hover:bg-gray-50">
                  <FileText className="w-4 h-4" /> Export visible
                </button>
                <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 px-3 py-2 border rounded bg-white hover:bg-gray-50">
                  Refresh
                </button>
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-2 bg-neutral-900 text-white rounded hover:opacity-95">
                <Upload className="w-4 h-4" /> Full export
              </button>
            </div>
          </header>

          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by order, name, or email" className="w-full pl-10 pr-4 py-2 border rounded outline-none" />
              </div>

              <div className="flex gap-3 items-center">
                <div className="relative">
                  <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="pl-9 pr-3 py-2 border rounded outline-none">
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="text-sm text-gray-500">{meta ? `${meta.total} orders` : ""}</div>
              </div>
            </div>

            {loading ? (
              <div className="p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto" />
                  <div className="mt-3 text-sm text-gray-600">Loading orders…</div>
                </div>
              </div>
            ) : currentOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-600">No orders found for your filters.</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse">
                    <thead className="bg-white sticky top-0 z-10">
                      <tr className="text-sm text-gray-500">
                        <th className="p-3 text-left w-[14%]">Order</th>
                        <th className="p-3 text-left w-[22%]">Customer / Contact</th>
                        <th className="p-3 text-left w-[18%]">Shipping</th>
                        <th className="p-3 text-left w-[10%]">Items</th>
                        <th className="p-3 text-left w-[8%]">Payment</th>
                        <th className="p-3 text-left w-[8%]">Status</th>
                        <th className="p-3 text-right w-[10%]">Amount</th>
                        <th className="p-3 text-right w-[10%]">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50 border-b last:border-b-0 align-top">
                          <td className="p-3 align-top">
                            <div className="font-medium">#{o.orderNumber.slice(-8).toUpperCase()}</div>
                            <div className="text-xs text-gray-400">{new Date(o.createdAt).toLocaleString()}</div>
                            <div className="mt-2 text-xs text-gray-500">ID: <span className="font-mono">{short(o.id, 12)}</span></div>
                            <div className="mt-1 text-xs">
                              <button onClick={() => navigator.clipboard.writeText(o.id)} className="text-xs text-gray-500 inline-flex items-center gap-1 py-1 px-2 rounded hover:bg-gray-100">
                                <Copy className="w-3 h-3" /> Copy ID
                              </button>
                              <button onClick={() => navigator.clipboard.writeText(o.receipt ?? "")} className="ml-2 text-xs text-gray-500 inline-flex items-center gap-1 py-1 px-2 rounded hover:bg-gray-100">
                                <Copy className="w-3 h-3" /> Receipt
                              </button>
                            </div>
                          </td>

                          <td className="p-3 align-top">
                            <div className="font-medium">{o.guestName}</div>
                            <div className="text-sm text-gray-500">{o.guestEmail}</div>
                            <div className="text-sm text-gray-500">{o.guestPhone}</div>
                          </td>

                          <td className="p-3 align-top">
                            <div className="text-sm">{short(`${o.guestAddress} ${o.guestCity} ${o.guestState} ${o.guestZipCode}`, 80)}</div>
                            <div className="text-xs text-gray-400 mt-1">{o.paidAt ? `Paid: ${new Date(o.paidAt).toLocaleString()}` : "Not paid"}</div>
                          </td>

                          <td className="p-3 align-top">
                            <div className="text-sm">{o.items.reduce((s, i) => s + i.quantity, 0)} items</div>
                            <div className="text-xs text-gray-500 mt-1">{o.items.map((it) => it.productName).slice(0, 3).join(", ")}{o.items.length > 3 ? "…" : ""}</div>
                          </td>

                          <td className="p-3 align-top">
                            <div className="text-sm capitalize">{o.paymentMethod}</div>
                            <div className={`inline-block mt-2 px-2 py-1 rounded text-xs ${statusBadge(o.paymentStatus ?? "")}`}>{o.paymentStatus ?? "pending"}</div>
                          </td>

                          <td className="p-3 align-top">
                            <div className={`inline-block px-2 py-1 rounded text-sm ${statusBadge(o.status)}`}>{o.status}</div>
                          </td>

                          <td className="p-3 text-right align-top font-medium">{currency(o.total)}</td>

                          <td className="p-3 text-right align-top">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => openModal(o)} title="View details" className="p-2 rounded hover:bg-gray-100">
                                <Eye className="w-4 h-4" />
                              </button>

                              <button title="Copy razorpay order id" onClick={() => navigator.clipboard.writeText(o.razorpayOrderId ?? "")} className="p-2 rounded hover:bg-gray-100">
                                <Copy className="w-4 h-4" />
                              </button>

                              <button title="Download order JSON" onClick={() => {
                                const blob = new Blob([JSON.stringify(o, null, 2)], { type: "application/json" });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = `order-${o.orderNumber}.json`;
                                a.click();
                                URL.revokeObjectURL(url);
                              }} className="p-2 rounded hover:bg-gray-100">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50">
                      <ChevronLeft className="w-4 h-4 inline" /> Prev
                    </button>
                    <div className="hidden sm:flex items-center gap-2">{renderPagination()}</div>
                    <button onClick={nextPage} disabled={currentPage === totalPages} className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50">
                      Next <ChevronRight className="w-4 h-4 inline" />
                    </button>
                  </div>

                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages} • {meta ? `${meta.total} total` : `${orders.length} shown`}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeModal} onUpdateStatus={updateOrderStatus} />
      )}
    </>
  );
}
