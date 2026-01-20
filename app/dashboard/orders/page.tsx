"use client";

import React, { useEffect, useState, useMemo, JSX } from "react";
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
  CreditCard,
  Truck,
  User,
  ExternalLink,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCcw,
} from "lucide-react";

// shadcn-like UI primitives (assuming standard tailwind)
import { Toaster, toast } from "sonner";

/* ----------------------
   Types / Interfaces
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
  paymentStatus?: string;
  status: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt?: string;
  paidAt?: string | null;
}

/* ----------------------
   UI Helpers
   ---------------------- */
const currency = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

const getStatusConfig = (status: string) => {
  const s = status.toLowerCase();
  switch (s) {
    case "pending": return { color: "bg-amber-50 text-amber-700 border-amber-200", icon: <Clock className="w-3 h-3" /> };
    case "confirmed": return { color: "bg-blue-50 text-blue-700 border-blue-200", icon: <CheckCircle2 className="w-3 h-3" /> };
    case "shipped": return { color: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: <Truck className="w-3 h-3" /> };
    case "delivered": return { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <Package className="w-3 h-3" /> };
    case "cancelled": return { color: "bg-rose-50 text-rose-700 border-rose-200", icon: <X className="w-3 h-3" /> };
    case "paid": return { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CreditCard className="w-3 h-3" /> };
    default: return { color: "bg-slate-50 text-slate-700 border-slate-200", icon: <AlertCircle className="w-3 h-3" /> };
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = getStatusConfig(status);
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
      {config.icon}
      <span className="capitalize">{status}</span>
    </div>
  );
};

/* ----------------------
   Sub-Components
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
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-3 rounded-2xl shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Order #{order.orderNumber.toUpperCase()}</h2>
              <div className="flex items-center gap-2 text-slate-500 text-sm mt-0.5">
                <Calendar className="w-4 h-4" />
                {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })} at {new Date(order.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-900">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Top Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <section className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-4 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                <User className="w-4 h-4" /> Customer Details
              </div>
              <p className="font-semibold text-slate-900 text-lg">{order.guestName}</p>
              <p className="text-slate-600 mt-1">{order.guestEmail}</p>
              <p className="text-slate-600 font-mono text-sm">{order.guestPhone}</p>
            </section>

            <section className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-4 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                <Truck className="w-4 h-4" /> Shipping Destination
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {order.guestAddress}<br />
                {order.guestCity}, {order.guestState} - {order.guestZipCode}
              </p>
            </section>

            <section className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                  <CreditCard className="w-4 h-4" /> Payment Info
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm">Method:</span>
                  <span className="font-semibold text-slate-900 capitalize">{order.paymentMethod}</span>
                </div>
              </div>
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                className="w-full mt-4 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all cursor-pointer"
              >
                <option value="pending">Mark as Pending</option>
                <option value="confirmed">Confirm Order</option>
                <option value="shipped">Set to Shipped</option>
                <option value="delivered">Set to Delivered</option>
                <option value="cancelled">Cancel Order</option>
              </select>
            </section>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4 flex items-center gap-2">
              Order Summary <span className="text-slate-400 font-normal">({order.items.length} unique items)</span>
            </h3>
            <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4 text-center">Qty</th>
                    <th className="px-6 py-4 text-right">Price</th>
                    <th className="px-6 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {order.items.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img src={item.productImage} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm" />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{item.productName}</p>
                          <p className="text-slate-400 text-xs mt-0.5">ID: {item.productId.slice(0, 8)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-slate-700">{item.quantity}</td>
                      <td className="px-6 py-4 text-right text-slate-500 text-sm">{currency(item.productPrice)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-900">{currency(item.productPrice * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50/80">
                  <tr>
                    <td colSpan={3} className="px-6 py-3 text-right text-slate-500 text-sm font-medium">Subtotal</td>
                    <td className="px-6 py-3 text-right font-bold text-slate-900">{currency(order.subtotal)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-6 py-3 text-right text-slate-500 text-sm font-medium">Shipping</td>
                    <td className="px-6 py-3 text-right font-bold text-slate-900">{currency(order.shipping)}</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td colSpan={3} className="px-6 py-5 text-right text-slate-900 text-lg font-bold">Total Paid</td>
                    <td className="px-6 py-5 text-right text-slate-900 text-xl font-bold">{currency(order.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Transactional IDs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-dashed border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Razorpay Order ID</p>
                <p className="font-mono text-xs text-slate-700 mt-1">{order.razorpayOrderId || 'N/A'}</p>
              </div>
              {order.razorpayOrderId && (
                <button onClick={() => handleCopy(order.razorpayOrderId!, 'Razorpay Order ID')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                  <Copy className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="p-4 rounded-xl border border-dashed border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internal ID</p>
                <p className="font-mono text-xs text-slate-700 mt-1">{order.id}</p>
              </div>
              <button onClick={() => handleCopy(order.id, 'Order ID')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Razorpay Payment ID</p>
                <p className="font-mono text-xs text-slate-700 mt-1">{order.razorpayPaymentId || 'N/A'}</p>
              </div>
              {order.razorpayPaymentId && (
                <button onClick={() => handleCopy(order.razorpayPaymentId!, 'Razorpay Payment ID')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                  <Copy className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t bg-white flex justify-end gap-3 px-8">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all text-sm">
            Close Panel
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all text-sm">
            <Download className="w-4 h-4" /> Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

/* ----------------------
   Main View
   ---------------------- */
export default function ProfessionalOrdersPage() {
  const [orders, setOrders] = useState<GuestOrder[]>([]);
  const [meta, setMeta] = useState<{ total: number; page: number; totalPages: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<GuestOrder | null>(null);

  const fetchOrders = async (page = 1, status = statusFilter, search = searchTerm) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), status, search });
      const res = await fetch(`/api/orders?${params.toString()}`);
      const json = await res.json();
      setOrders(json.data ?? []);
      setMeta(json.meta ?? null);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(currentPage); }, [searchTerm, statusFilter, currentPage]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const response = await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status: newStatus }),
    });

    if (response.ok) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder?.id === orderId) setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      toast.success("Order status updated successfully");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-6 font-sans text-slate-900">
      <Toaster position="bottom-right" />

      <div className="max-w-full mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400 font-semibold text-xs uppercase tracking-widest">
              <Package className="w-4 h-4" /> Commerce Management
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Order Manifest</h1>
            <p className="text-slate-500 font-medium">Fulfillment and payment verification terminal.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchOrders(currentPage)}
              className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm text-slate-600"
            >
              <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <FileText className="w-5 h-5 text-slate-400" /> Export CSV
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all">
              <Download className="w-5 h-5" /> Bulk Archive
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="Filter by customer, ID or transaction reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-300 font-medium"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 min-w-[200px]">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer w-full"
            >
              <option value="all">All Inventory Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Syncing manifests...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center space-y-4 text-slate-300">
              <Package className="w-20 h-20 opacity-10" />
              <p className="font-bold uppercase tracking-widest text-xs">No matching orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Reference</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Beneficiary</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Logistics</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 text-center">Volume</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Payment</th>
                    <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Amount</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="group hover:bg-slate-50/80 transition-all cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-100 p-2 rounded-xl text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-all">
                            <Package className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-none">#{order.orderNumber.toUpperCase()}</p>
                            <p className="text-[10px] text-slate-400 font-semibold mt-1.5 uppercase tracking-tighter">
                              {new Date(order.createdAt).toLocaleDateString('en-GB')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800 text-sm">{order.guestName}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{order.guestEmail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg font-bold text-xs">
                          {order.items.reduce((acc, curr) => acc + curr.quantity, 0)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-slate-500 capitalize">{order.paymentMethod}</span>
                          <span className={`text-[10px] font-bold uppercase ${order.paymentStatus === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>
                            {order.paymentStatus || 'Pending'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="font-bold text-slate-900 text-base tracking-tight">{currency(order.total)}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer / Pagination */}
          {!loading && meta && (
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Manifest {currentPage} of {meta.totalPages} <span className="mx-2 text-slate-200">|</span> {meta.total} Total Records
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={(e) => { e.stopPropagation(); setCurrentPage(p => p - 1); }}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-1">
                  {[...Array(meta.totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (Math.abs(page - currentPage) < 3 || page === 1 || page === meta.totalPages) {
                      return (
                        <button
                          key={page}
                          onClick={(e) => { e.stopPropagation(); setCurrentPage(page); }}
                          className={`w-9 h-9 rounded-xl font-semibold text-xs transition-all ${currentPage === page ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-900'}`}
                        >
                          {page}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
                <button
                  disabled={currentPage === meta.totalPages}
                  onClick={(e) => { e.stopPropagation(); setCurrentPage(p => p + 1); }}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateStatus}
        />
      )}
    </div>
  );
}