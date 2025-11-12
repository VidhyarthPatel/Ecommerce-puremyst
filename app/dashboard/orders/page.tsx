"use client";

import { useEffect, useState, Fragment } from "react";
import { 
  Package, 
  Search, 
  Eye, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  X,
  Upload
} from "lucide-react";

// --- INTERFACES (From your code) ---
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
  id:string;
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

// --- HELPER COMPONENTS (For the new UI) ---

/**
 * A custom-styled status dropdown that looks like a badge.
 */
const StatusBadgeSelect = ({ 
  order, 
  onUpdate 
}: { 
  order: GuestOrder; 
  onUpdate: (orderId: string, newStatus: string) => void; 
}) => {
  
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

  const statusColors = getStatusColor(order.status);

  return (
    <div className="relative">
      <select
        value={order.status}
        onChange={(e) => onUpdate(order.id, e.target.value)}
        onClick={(e) => e.stopPropagation()} // Prevents modal from opening if in a clickable row
        className={`w-full md:w-auto pl-3 pr-8 py-1.5 rounded-md text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 ${statusColors}`}
      >
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <ChevronDown className={`w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${statusColors.split(' ')[1]}`} />
    </div>
  );
};


/**
 * A modal to display detailed order information.
 */
const OrderDetailsModal = ({ 
  order, 
  onClose,
  onUpdateStatus // Add this prop to update status from within the modal
}: { 
  order: GuestOrder; 
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: string) => void;
}) => {
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">
              Order #{order.orderNumber.slice(-8).toUpperCase()}
            </h2>
            <p className="text-sm text-neutral-500">
              {new Date(order.createdAt).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Customer & Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2">Customer</h3>
              <p className="font-medium text-neutral-900">{order.guestName}</p>
              <p className="text-neutral-600">{order.guestEmail}</p>
              <p className="text-neutral-600">{order.guestPhone}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2">Shipping Address</h3>
              <p className="text-neutral-600">{order.guestAddress}</p>
              <p className="text-neutral-600">{order.guestCity}, {order.guestState} {order.guestZipCode}</p>
            </div>
          </div>

          {/* Payment & Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2">Payment</h3>
              <p className="font-medium text-neutral-900 capitalize">{order.paymentMethod}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2">Status</h3>
              {/* Use the helper here, passing the update function */}
              <StatusBadgeSelect order={order} onUpdate={onUpdateStatus} />
            </div>
             <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2">Total</h3>
              <p className="text-2xl font-semibold text-neutral-900">
                ₹{order.total.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-sm font-medium text-neutral-500 mb-2">
              {totalItems} Item{totalItems > 1 ? 's' : ''}
            </h3>
            <ul className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
              {order.items.map(item => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <img 
                    src={item.productImage} 
                    alt={item.productName} 
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">{item.productName}</p>
                    <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-neutral-900">
                      ₹{(item.productPrice * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-sm text-neutral-500">
                      @ ₹{item.productPrice.toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

           {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-neutral-600">
                <p>Subtotal</p>
                <p>₹{order.subtotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between text-neutral-600">
                <p>Shipping</p>
                <p>₹{order.shipping.toLocaleString()}</p>
              </div>
              <div className="flex justify-between text-lg font-semibold text-neutral-900 pt-2 border-t">
                <p>Total</p>
                <p>₹{order.total.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---

export default function OrdersPage() {
  const [orders, setOrders] = useState<GuestOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); // Reduced for a cleaner look

  // --- Modal State ---
  const [selectedOrder, setSelectedOrder] = useState<GuestOrder | null>(null);
  const isModalOpen = !!selectedOrder;
  const openModal = (order: GuestOrder) => setSelectedOrder(order);
  const closeModal = () => setSelectedOrder(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  // --- 1. YOUR ORIGINAL fetchOrders LOGIC ---
  const fetchOrders = async () => {
    setLoading(true); // Added this from the "luxurious" version
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

  // --- 2. YOUR ORIGINAL updateOrderStatus LOGIC (with modal update added) ---
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        // Your original state update
        setOrders(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        
        // **Addition for new UI**: Update the modal state if it's open
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  // --- Filtering and Pagination Logic ---
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  
  // --- Advanced Pagination Renderer ---
  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5; // e.g., 1 ... 4 5 6 ... 10
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => goToPage(1)} className="px-4 py-2 rounded-md text-sm font-medium text-neutral-700 border border-transparent hover:bg-neutral-100">
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className="px-2 text-neutral-400">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`min-w-[40px] px-4 py-2 rounded-md border text-sm font-medium transition-all ${
            currentPage === i
              ? "bg-neutral-900 text-white border-neutral-900"
                            : "text-neutral-700 border-neutral-200 bg-white hover:bg-neutral-50"
          }`}
        >
          {i}
        </button>
      );
    }

     if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis" className="px-2 text-neutral-400">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => goToPage(totalPages)} className="px-4 py-2 rounded-md text-sm font-medium text-neutral-700 border border-transparent hover:bg-neutral-100">
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  // --- JSX RENDER ---
  return (
    <>
      <div className="min-h-screen bg-white p-4 md:p-8">
        {/* MODIFICATION HERE: 
          Removed 'max-w-7xl' to make the layout wider (fluid).
        */}
        <div className="mx-auto">
          {/* Header */}
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
                Orders
              </h1>
              <p className="text-neutral-500 text-base mt-1">
                Manage and track all customer orders.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg shadow-sm hover:bg-neutral-50 transition">
              <Upload className="w-4 h-4" />
              Export Orders
            </button>
          </header>

          {/* Main Content Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
            {/* Filters */}
            <div className="p-4 md:p-5 flex flex-col sm:flex-row gap-3 border-b border-neutral-200">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by order, name, or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-neutral-200 rounded-lg bg-white text-base focus:ring-2 focus:ring-neutral-900 outline-none"
                />
              </div>
              <div className="relative sm:w-56">
                <Filter className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-11 pr-10 py-2.5 border border-neutral-200 rounded-lg bg-white text-base focus:ring-2 focus:ring-neutral-900 outline-none cursor-pointer appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Loading / Empty / List */}
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                  <div className="w-10 h-10 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-neutral-600 text-sm font-medium">Loading orders...</p>
                </div>
              </div>
            ) : currentOrders.length === 0 ? (
              <div className="text-center py-24 px-6">
                <Package className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-1">
                  No orders found
                </h3>
                <p className="text-neutral-500 text-base">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filters."
                    : "New orders will appear here as they come in."}
                </p>
              </div>
            ) : (
              <div>
                {/* Desktop Table Header */}
                <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-4 border-b border-neutral-200 text-sm font-medium text-neutral-500">
                  <span>Order</span>
                  <span>Customer</span>
                  <span>Total</span>
                  <span>Items</span>
                  <span>Status</span>
                  <span className="text-right">Actions</span>
                </div>

                {/* Orders List (Responsive) */}
                <div className="divide-y divide-neutral-100">
                  {currentOrders.map((order) => (
                    <Fragment key={order.id}>
                      {/* Desktop Row */}
                      <div className="hidden md:grid grid-cols-6 gap-4 items-center px-6 py-5 hover:bg-neutral-50 transition-colors">
                        <button onClick={() => openModal(order)} className="text-left">
                          <p className="font-medium text-neutral-900">#{order.orderNumber.slice(-8).toUpperCase()}</p>
                          <p className="text-sm text-neutral-500">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </button>
                        <div>
                          <p className="font-medium text-neutral-900 truncate">{order.guestName}</p>
                          <p className="text-sm text-neutral-500 truncate">{order.guestEmail}</p>
                        </div>
                        <p className="font-medium text-neutral-900">
                          ₹{order.total.toLocaleString()}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {order.items.reduce((s, i) => s + i.quantity, 0)} items
                        </p>
                        <div>
                          <StatusBadgeSelect order={order} onUpdate={updateOrderStatus} />
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => openModal(order)}
                            className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Mobile Card */}
                      <div className="block md:hidden p-4 border-b border-neutral-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <button onClick={() => openModal(order)} className="text-left">
                            <h2 className="text-lg font-semibold text-neutral-900">
                              #{order.orderNumber.slice(-8).toUpperCase()}
                            </h2>
                          </button>
                          <p className="text-sm text-neutral-500">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="space-y-2">
                           <div>
                            <p className="text-sm text-neutral-500">Customer</p>
                            <p className="font-medium text-neutral-900">{order.guestName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-neutral-500">Total</p>
                            <p className="font-semibold text-lg text-neutral-900">
                              ₹{order.total.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1">
                             <StatusBadgeSelect order={order} onUpdate={updateOrderStatus} />
                          </div>
                          <button
                            onClick={() => openModal(order)}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !loading && (
              <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-4 md:px-6">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-md border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition-all disabled:text-neutral-400 disabled:border-neutral-200 disabled:cursor-not-allowed hover:bg-neutral-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <div className="hidden sm:flex items-center gap-1">
                  {renderPagination()}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 rounded-md border border-neutral-200 bg-white text-sm font-medium text-neutral-700 transition-all disabled:text-neutral-400 disabled:border-neutral-200 disabled:cursor-not-allowed hover:bg-neutral-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Render */}
      {isModalOpen && selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={closeModal}
          onUpdateStatus={updateOrderStatus} // Pass the update function to the modal
        />
      )}
    </>
  );
}