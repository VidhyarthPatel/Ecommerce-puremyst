"use client";

import { useEffect, useState } from "react";
import { Package, Search, Eye, Filter, ChevronLeft, ChevronRight } from "lucide-react";

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
  status: string;
  items: OrderItem[];
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<GuestOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(20);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        setOrders(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-amber-100 text-amber-800",
      confirmed: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-emerald-100 text-emerald-800",
      cancelled: "bg-rose-100 text-rose-800",
    };
    return map[status] || "bg-gray-100 text-gray-800";
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-neutral-600 text-base font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight mb-1">
            Orders
          </h1>
          <p className="text-neutral-500 text-base">
            {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
            {filteredOrders.length > ordersPerPage && ` • Page ${currentPage} of ${totalPages}`}
          </p>
        </header>

        {/* Search + Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by order, name, or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl bg-white text-base focus:ring-2 focus:ring-neutral-900 outline-none"
            />
          </div>
          <div className="relative sm:w-56">
            <Filter className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-neutral-200 rounded-xl bg-white text-base focus:ring-2 focus:ring-neutral-900 outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {currentOrders.length === 0 ? (
          <div className="text-center py-24">
            <Package className="w-14 h-14 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-1">
              No orders found
            </h3>
            <p className="text-neutral-500 text-base">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "Orders will appear here soon"}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-5 mb-8">
              {currentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-neutral-200 rounded-2xl p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    {/* Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-neutral-900">
                          #{order.orderNumber.slice(-8).toUpperCase()}
                        </h2>
                        <span className="text-sm text-neutral-500">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-sm text-neutral-500">Customer</p>
                          <p className="font-medium text-neutral-900">{order.guestName}</p>
                          <p className="text-sm text-neutral-500 truncate">{order.guestEmail}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Items</p>
                          <p className="font-medium text-neutral-900">
                            {order.items.length} product{order.items.length > 1 ? "s" : ""}
                          </p>
                          <p className="text-sm text-neutral-500">
                            Qty: {order.items.reduce((s, i) => s + i.quantity, 0)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Payment</p>
                          <p className="font-medium uppercase">{order.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500">Total</p>
                          <p className="font-semibold text-lg text-neutral-900">
                            ₹{order.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-center gap-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className={`text-sm px-3 py-2 rounded-md font-medium ${getStatusColor(
                          order.status
                        )} focus:ring-2 focus:ring-neutral-900 cursor-pointer`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <a
                        href={`/order-confirmation/${order.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-neutral-200 pt-8">
                <div className="text-sm text-neutral-500">
                  Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                      currentPage === 1
                        ? "text-neutral-400 border-neutral-200 cursor-not-allowed"
                        : "text-neutral-700 border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first 3 pages, last 3 pages, and pages around current page
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`min-w-[40px] px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                              currentPage === page
                                ? "bg-neutral-900 text-white border-neutral-900"
                                : "text-neutral-700 border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="px-2 text-neutral-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                      currentPage === totalPages
                        ? "text-neutral-400 border-neutral-200 cursor-not-allowed"
                        : "text-neutral-700 border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}