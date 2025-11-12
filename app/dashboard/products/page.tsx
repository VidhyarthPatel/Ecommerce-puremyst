"use client";

import React from "react";
// --- NEW IMPORTS ---
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Loader2,
  Upload,
  X,
  Star,
  MoreHorizontal,
  PackageSearch, // For empty state
  AlertCircle,  // For low stock
  CheckCircle2, // For in stock
  XCircle,      // For out of stock
  Filter,
} from "lucide-react";
// --- ORIGINAL IMPORTS ---
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";

// Updated Type to make 'featured' non-optional
type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  featured: boolean; // Changed from optional
  rating: number;
  units: number;
  category: string;
  createdAt?: string;
  ProductsImage?: { id: string; imageUrl: string }[];
};

// --- ✨ NEW HELPER COMPONENTS (for a richer UI) ---

/**
 * Displays a visual rating using Star icons.
 */
const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
      {/* Note: shadcn doesn't have a half-star, so we'll just use full/empty for simplicity */
      /* {halfStar && <StarHalf className="w-4 h-4 text-yellow-500 fill-yellow-500" />} */}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      <span className="ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span>
    </div>
  );
};

/**
 * Displays a colored badge based on stock (units)
 */
const StockBadge: React.FC<{ units: number }> = ({ units }) => {
  if (units === 0) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <XCircle className="w-3 h-3" />
        Out of Stock
      </Badge>
    );
  }
  if (units < 10) {
    return (
      <Badge variant="outline" className="text-yellow-600 border-yellow-500 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        Low Stock ({units})
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-green-600 border-green-500 flex items-center gap-1">
      <CheckCircle2 className="w-3 h-3" />
      In Stock ({units})
    </Badge>
  );
};

// --- MAIN COMPONENT ---

export default function ProductsPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // --- ✨ NEW STATE for Search, Filter, and Pagination ---
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("All");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null);

  const [saving, setSaving] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const categoryOptions = [
    "RO Water Purifier",
    "Commercial Water Purifier",
    "Washing Machine Cleaner",
    "Accessories",
  ];

  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    units: "",
    description: "",
    category: categoryOptions[0],
    images: [] as string[],
    currentImage: "",
    rating: "",
    featured: false, // ✨ Added featured
  });

  // --- Fetch products ---
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err?.message || "Unknown error");
        toast.error("❌ Failed to load products. Please try again.", {
          description: typeof err === "string" ? err : err?.message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- ✨ NEW COMPUTED VALUES for filtering and pagination ---
  const filteredProducts = React.useMemo(() => {
    return products
      .filter((p) => {
        // Search filter
        const searchLower = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      })
      .filter((p) => {
        // Category filter
        return categoryFilter === "All" || p.category === categoryFilter;
      });
  }, [products, searchTerm, categoryFilter]);

  const paginatedProducts = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // --- Upload helper (unchanged) ---
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    // ... (rest of the function is unchanged)
    try {
      const response = await fetch("/api/upload", { method: "POST", body: uploadForm });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }
      const result = await response.json();
      if (!result.url) throw new Error("No URL returned from server");
      return result.url;
    } catch (error: any) {
      console.error("Upload error:", error);
      throw new Error(error?.message || "Failed to upload image");
    }
  };

  // --- File input handler (unchanged) ---
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      // ... (rest of the function is unchanged)
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) { /* ... */ continue; }
        if (file.size > 5 * 1024 * 1024) { /* ... */ continue; }
        try {
          const imageUrl = await uploadToCloudinary(file);
          setFormData((prev) => ({ ...prev, images: [...prev.images, imageUrl] }));
          toast.success(`✅ Image "${file.name}" uploaded successfully!`);
        } catch (err: any) {
          toast.error(`❌ Failed to upload "${file.name}"`, { description: err?.message });
        }
      }
    } catch (err: any) {
      toast.error("❌ Failed to process images", { description: err?.message });
    } finally {
      setUploading(false);
      if (event.target) event.target.value = "";
    }
  };

  // --- Form helpers ---
  const handleInputChange = (key: string, value: string | boolean) => // Updated to accept boolean
    setFormData((prev) => ({ ...prev, [key]: value }));

  const addImage = () => {
    if (!formData.currentImage.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, prev.currentImage.trim()],
      currentImage: "",
    }));
  };

  const removeImage = (index: number) =>
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      units: "",
      description: "",
      category: categoryOptions[0],
      images: [],
      currentImage: "",
      rating: "",
      featured: false, // ✨ Reset featured
    });
    setEditingProduct(null);
  };

  // --- Save (create/update) ---
  const handleSave = async () => {
    if (!formData.name.trim() || !formData.price || !formData.units) {
      toast.error("❌ Please fill in all required fields");
      return;
    }
    // --- ✨ UPDATED PAYLOAD ---
    const payload = {
      name: formData.name.trim(),
      price: Number(formData.price),
      units: Number(formData.units),
      description: formData.description.trim(),
      category: formData.category,
      images: formData.images,
      rating: Number(formData.rating) || 0,
      featured: formData.featured, // ✨ Added featured
    };
    // ... (rest of the function is unchanged, it will work as-is)
    setSaving(true);
    try {
      let res: Response;
      if (editingProduct) {
        res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, slug: editingProduct.slug }),
        });
      } else {
        res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Failed to save product");
      }
      const saved = await res.json();
      if (editingProduct) {
        setProducts((prev) => prev.map((p) => (p.slug === editingProduct.slug ? saved : p)));
        toast.success("✅ Product updated successfully!");
      } else {
        setProducts((prev) => [saved, ...prev]);
        toast.success("✅ Product added successfully!");
      }
      resetForm();
      setDialogOpen(false);
    } catch (err: any) {
      toast.error("❌ Failed to save product.", { description: err?.message });
    } finally {
      setSaving(false);
    }
  };

  // --- Edit ---
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    // --- ✨ UPDATED FORM POPULATION ---
    setFormData({
      name: product.name ?? "",
      price: product.price?.toString() ?? "",
      units: product.units?.toString() ?? "",
      description: product.description ?? "",
      category: product.category ?? categoryOptions[0],
      images: product.ProductsImage?.map((img) => img.imageUrl) ?? [],
      currentImage: "",
      rating: product.rating?.toString() ?? "0.0",
      featured: product.featured ?? false, // ✨ Added featured
    });
    setDialogOpen(true);
  };

  // --- Delete (unchanged) ---
  const handleDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    // ... (rest of the function is unchanged)
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: productToDelete.slug }),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Failed to delete product");
      }
      setProducts((prev) => prev.filter((p) => p.slug !== productToDelete.slug));
      toast.success("🗑️ Product deleted successfully!");
      setProductToDelete(null);
      setDeleteDialogOpen(false);
    } catch (err: any) {
      toast.error("❌ Failed to delete product.", { description: err?.message });
    } finally {
      setDeleting(false);
    }
  };

  // --- UI helpers ---
  const truncateDescription = (text: string, maxLength = 60) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const ImageStack: React.FC<{ images?: string[]; size?: number }> = ({ images = [], size = 36 }) => {
    if (!images || images.length === 0) {
      return (
        <div
          className="w-9 h-9 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-500"
          style={{ width: size, height: size }}
        >
          No
        </div>
      );
    }
    const visible = images.slice(0, 2);
    const remaining = images.length - visible.length;
    return (
      <div className="flex items-center" style={{ gap: 6 }}>
        {visible.map((src, idx) => (
          <div key={idx} className="relative" style={{ width: size, height: size }}>
            <img
              src={src}
              alt={`img-${idx}`}
              className="rounded border object-cover"
              style={{ width: size, height: size }}
            />
            {idx === visible.length - 1 && remaining > 0 && (
              <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center text-white text-xs font-medium">
                +{remaining}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  // --- ✨ RENDER ERROR/LOADING STATES ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin mr-3 text-primary" />
        <span className="text-lg text-muted-foreground">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-700 font-semibold text-lg">Error loading products</p>
          <p className="text-red-600 text-sm mt-2">{error}</p>
          <Button onClick={() => window.location.reload()} variant="destructive" className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // --- ✨ NEW MAIN RENDER ---
  return (
    <TooltipProvider>
      <div className="p-4 md:p-6">
        <Toaster position="top-right" richColors closeButton />

        {/* --- ✨ Page Header --- */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">📦 Products</h2>
            <p className="text-muted-foreground">Manage your product inventory.</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setDialogOpen(true);
                }}
              >
                + Add Product
              </Button>
            </DialogTrigger>

            {/* --- ✨ DIALOG (FORM) with TABS --- */}
            <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="details" className="flex-1 overflow-y-hidden flex flex-col">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                </TabsList>

                {/* --- TAB 1: Details --- */}
                <TabsContent value="details" className="flex-1 overflow-y-auto py-3 px-1">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name *</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="e.g., AquaPure Pro"
                        />
                      </div>
                       <div className="space-y-2">
                        <Label>Category *</Label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange("category", e.target.value)}
                          className="w-full border rounded p-2 h-10 text-sm"
                        >
                          {categoryOptions.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Price *</Label>
                        <Input
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Units (Stock) *</Label>
                        <Input
                          type="number"
                          value={formData.units}
                          onChange={(e) => handleInputChange("units", e.target.value)}
                          placeholder="0"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="min-h-[100px] max-h-[200px] resize-y"
                        placeholder="Enter product description..."
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* --- TAB 2: Images --- */}
                <TabsContent value="images" className="flex-1 overflow-y-auto py-3 px-1">
                  <div className="space-y-4">
                    <div>
                      <Label>Upload Images</Label>
                      <div className="border-2 border-dashed border-gray-300 mt-2 rounded-lg p-4 text-center">
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                        <label
                          htmlFor="file-upload"
                          className={`cursor-pointer flex flex-col items-center gap-2 ${uploading ? "opacity-50" : ""}`}
                        >
                          <Upload className="w-8 h-8 text-gray-400" />
                          <div>
                            <span className="text-sm font-medium text-blue-600">{uploading ? "Uploading..." : "Click to upload"}</span>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
                          </div>
                        </label>
                        {uploading && (
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm text-gray-600">Uploading images...</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Or add image by URL</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          value={formData.currentImage}
                          onChange={(e) => handleInputChange("currentImage", e.target.value)}
                          placeholder="Paste image URL"
                          disabled={uploading}
                        />
                        <Button onClick={addImage} disabled={!formData.currentImage.trim() || uploading}>
                          Add
                        </Button>
                      </div>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="mt-3">
                        <Label>Image Previews ({formData.images.length})</Label>
                        <div className="flex flex-wrap gap-2 mt-2 max-h-[250px] overflow-y-auto p-2 border rounded-md">
                          {formData.images.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <img src={img} className="w-24 h-24 rounded border object-cover" alt={`Preview ${idx + 1}`} />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute -top-2 -right-2 rounded-full p-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(idx)}
                                disabled={uploading}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {/* --- TAB 3: Metadata --- */}
                <TabsContent value="metadata" className="flex-1 overflow-y-auto py-3 px-1">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Rating (0-5)</Label>
                      <Input
                        type="number"
                        value={formData.rating}
                        onChange={(e) => handleInputChange("rating", e.target.value)}
                        placeholder="0.0"
                        min="0"
                        max="5"
                        step="0.1"
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <Label>Featured Product</Label>
                        <p className="text-xs text-muted-foreground">
                          Display this product on the homepage.
                        </p>
                      </div>
                      <Switch
                        checked={formData.featured}
                        onCheckedChange={(checked) => handleInputChange("featured", checked)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="flex-shrink-0 pt-4 border-t">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving || uploading}>
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {editingProduct ? "Updating..." : "Saving..."}
                    </>
                  ) : editingProduct ? (
                    "Update Product"
                  ) : (
                    "Save Product"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* --- ✨ NEW Controls: Search & Filter --- */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or description..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                {categoryFilter === "All" ? "Filter by category" : categoryFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setCategoryFilter("All")}>All</DropdownMenuItem>
              {categoryOptions.map((cat) => (
                <DropdownMenuItem key={cat} onClick={() => setCategoryFilter(cat)}>
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* --- ✨ Content Area (wrapped in Card) --- */}
        <Card>
          <CardContent className="p-0">
            {/* --- Desktop Table --- */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Images</TableHead>
                    <TableHead className="w-48">Name</TableHead>
                    <TableHead className="w-36">Category</TableHead>
                    <TableHead className="w-36">Stock</TableHead>
                    <TableHead className="w-24">Price</TableHead>
                    <TableHead className="w-32">Rating</TableHead>
                    <TableHead className="w-24">Featured</TableHead>
                    <TableHead className="w-16 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <ImageStack images={p.ProductsImage?.map((i) => i.imageUrl)} size={36} />
                        </TableCell>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{p.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <StockBadge units={p.units} />
                        </TableCell>
                        <TableCell>₹{p.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <RatingStars rating={p.rating} />
                        </TableCell>
                        <TableCell>
                          {p.featured ? (
                            <Badge className="bg-green-100 text-green-700">Yes</Badge>
                          ) : (
                            <Badge variant="outline">No</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {/* ✨ NEW Action Dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(p)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setProductToDelete(p);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No products found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* --- ✨ Mobile Cards (upgraded) --- */}
            <div className="grid md:hidden gap-4 p-4">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p) => (
                  <Card key={p.id} className="shadow-sm">
                    <CardHeader className="flex flex-row items-start justify-between p-4">
                      <div className="flex gap-3">
                        <ImageStack images={p.ProductsImage?.map((i) => i.imageUrl)} size={48} />
                        <div>
                          <p className="font-semibold">{p.name}</p>
                          <Badge variant="secondary" className="mt-1">
                            {p.category}
                          </Badge>
                        </div>
                      </div>
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="-mt-2 -mr-2">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(p)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setProductToDelete(p);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Price</Label>
                        <p className="font-medium">₹{p.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Rating</Label>
                        <RatingStars rating={p.rating} />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs">Stock</Label>
                        <StockBadge units={p.units} />
                      </div>
                       <div className="col-span-2">
                        <Label className="text-xs">Description</Label>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {p.description || "No description."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <PackageSearch className="w-12 h-12 text-muted-foreground" />
                  <p className="mt-2 font-medium">No Products Found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter.</p>
                </div>
              )}
            </div>
          </CardContent>
          
          {/* --- ✨ NEW Pagination Controls --- */}
          {totalPages > 1 && (
            <CardFooter className="flex items-center justify-between p-4 border-t">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>

        {/* --- Delete Confirmation Dialog (Unchanged) --- */}
        <Dialog open={deleteDialogOpen} onOpenChange={(open) => setDeleteDialogOpen(open)}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p>
              Are you sure you want to delete <strong>{productToDelete?.name}</strong>?
            </p>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}