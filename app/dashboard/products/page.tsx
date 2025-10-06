"use client";

import React from "react";
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
import { Badge } from "@/components/ui/badge";
import { Trash, Loader2, Upload, X } from "lucide-react";
import { Toaster, toast } from "sonner";

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  featured: boolean;
  rating: number;
  units: number;
  createdAt: string;
  ProductsImage: { id: string; imageUrl: string }[];
};

export default function ProductsPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(
    null
  );
  const [saving, setSaving] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    units: "",
    description: "",
    images: [] as string[],
    currentImage: "",
    rating: "",
  });

  // Fetch products
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
        toast.error("❌ Failed to load products. Please try again.", {
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Cloudinary upload function with better error handling
 // Updated client-side upload using API route with better error handling
const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    // First, check if we got a valid response
    if (!response.ok) {
      // Try to get error message from response
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      
      // Check if it's HTML (starts with <!DOCTYPE)
      if (errorText.trim().startsWith('<!DOCTYPE') || errorText.trim().startsWith('<html')) {
        throw new Error('Server error: API route not working properly');
      }
      
      // Try to parse as JSON
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || `Upload failed: ${response.status}`);
      } catch {
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }
    }

    // If response is OK, parse as JSON
    const result = await response.json();
    
    if (!result.url) {
      throw new Error('No URL returned from server');
    }

    return result.url;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error(
      `Failed to upload image: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error("❌ Please upload only image files");
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("❌ Image size should be less than 5MB");
          continue;
        }

        try {
          const imageUrl = await uploadToCloudinary(file);
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, imageUrl],
          }));
          toast.success(`✅ Image "${file.name}" uploaded successfully!`);
        } catch (err: any) {
          toast.error(`❌ Failed to upload "${file.name}"`, {
            description: err.message,
          });
        }
      }
    } catch (err: any) {
      toast.error("❌ Failed to process images", {
        description: err.message,
      });
    } finally {
      setUploading(false);
      // Clear the file input
      event.target.value = "";
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addImage = () => {
    if (formData.currentImage.trim() === "") return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, prev.currentImage.trim()],
      currentImage: "",
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      units: "",
      description: "",
      images: [],
      currentImage: "",
      rating: "",
    });
    setEditingProduct(null);
  };

  const handleSave = async () => {
    // Validation
    if (!formData.name.trim() || !formData.price || !formData.units) {
      toast.error("❌ Please fill in all required fields");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      price: Number(formData.price),
      units: Number(formData.units),
      description: formData.description.trim(),
      images: formData.images,
      rating: Number(formData.rating) || 0,
    };

    setSaving(true);
    try {
      let res;
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

      if (!res.ok) throw new Error("Failed to save product");
      const saved = await res.json();

      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.slug === editingProduct.slug ? saved : p))
        );
        toast.success("✅ Product updated successfully!");
      } else {
        setProducts((prev) => [saved, ...prev]);
        toast.success("✅ Product added successfully!");
      }

      resetForm();
      setDialogOpen(false);
    } catch (err: any) {
      toast.error("❌ Failed to save product.", {
        description: err.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name ?? "",
      price: product.price?.toString() ?? "",
      units: product.units?.toString() ?? "",
      description: product.description ?? "",
      images: product.ProductsImage?.map((img) => img.imageUrl) || [],
      currentImage: "",
      rating: product.rating?.toString() ?? "0.0",
    });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: productToDelete.slug }),
      });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) =>
        prev.filter((p) => p.slug !== productToDelete.slug)
      );
      toast.success("🗑️ Product deleted successfully!");
      setProductToDelete(null);
      setDeleteDialogOpen(false);
    } catch (err: any) {
      toast.error("❌ Failed to delete product.", {
        description: err.message,
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6">
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: "0.5rem",
            background: "white",
            border: "1px solid #e5e7eb",
            padding: "12px 16px",
          },
          className: "shadow-lg",
        }}
      />

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📦 Products Dashboard</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="cursor-pointer"
              onClick={() => {
                resetForm();
                setDialogOpen(true);
              }}
            >
              + Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add Product"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto py-3">
              <div className="grid gap-3">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
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
                <div>
                  <Label>Units *</Label>
                  <Input
                    type="number"
                    value={formData.units}
                    onChange={(e) => handleInputChange("units", e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="min-h-[80px] max-h-[120px] resize-none"
                    placeholder="Enter product description..."
                  />
                </div>

                {/* Cloudinary Upload Section */}
                <div>
                  <Label>Upload Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      disabled={uploading}
                    />
                    <Label
                      htmlFor="file-upload"
                      className={`cursor-pointer flex flex-col items-center gap-2 ${
                        uploading ? "opacity-50" : ""
                      }`}
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <div>
                        <span className="text-sm font-medium text-blue-600">
                          {uploading ? "Uploading..." : "Click to upload"}
                        </span>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, WEBP up to 5MB
                        </p>
                      </div>
                    </Label>
                    {uploading && (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-gray-600">
                          Uploading images...
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Manual URL input as fallback */}
                  <div className="mt-3">
                    <Label>Or add image by URL</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={formData.currentImage}
                        onChange={(e) =>
                          handleInputChange("currentImage", e.target.value)
                        }
                        placeholder="Paste image URL"
                        disabled={uploading}
                      />
                      <Button
                        onClick={addImage}
                        disabled={!formData.currentImage.trim() || uploading}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {formData.images.length > 0 && (
                    <div className="mt-3">
                      <Label>Image Previews ({formData.images.length})</Label>
                      <div className="flex flex-wrap gap-2 mt-2 max-h-[150px] overflow-y-auto p-2 border rounded-md">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img}
                              className="w-20 h-20 rounded border object-cover"
                              alt={`Preview ${idx + 1}`}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%239ca3af'%3EImage%3C/text%3E%3C/svg%3E";
                              }}
                            />
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

                <div>
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    value={formData.rating}
                    onChange={(e) =>
                      handleInputChange("rating", e.target.value)
                    }
                    placeholder="0.0"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="flex-shrink-0 pt-4 border-t">
              <Button onClick={handleSave} disabled={saving || uploading}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {editingProduct ? "Updating..." : "Saving..."}
                  </>
                ) : editingProduct ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading products...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-medium">Error loading products</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Images</TableHead>
                  <TableHead className="w-40">Name</TableHead>
                  <TableHead className="w-24">Price</TableHead>
                  <TableHead className="w-20">Units</TableHead>
                  <TableHead className="w-48">Description</TableHead>
                  <TableHead className="w-24">Rating</TableHead>
                  <TableHead className="w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="w-32">
                      <div className="flex gap-1 flex-wrap">
                        {p.ProductsImage.length > 0 ? (
                          <>
                            {p.ProductsImage.slice(0, 3).map((img) => (
                              <img
                                key={img.id}
                                src={img.imageUrl}
                                className="h-10 w-10 rounded object-cover border"
                                alt="Product"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='8' fill='%239ca3af'%3EImage%3C/text%3E%3C/svg%3E";
                                }}
                              />
                            ))}
                            {p.ProductsImage.length > 3 && (
                              <div className="h-10 w-10 rounded border bg-gray-100 flex items-center justify-center text-xs font-medium">
                                +{p.ProductsImage.length - 3}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="h-10 w-10 rounded border bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="w-40">
                      <div className="truncate max-w-[160px]" title={p.name}>
                        {p.name}
                      </div>
                    </TableCell>
                    <TableCell className="w-24">
                      <span className="font-medium">${p.price.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="w-20">
                      <span className="font-medium">{p.units}</span>
                    </TableCell>
                    <TableCell className="w-48">
                      <div
                        className="truncate max-w-[192px]"
                        title={p.description}
                      >
                        {p.description}
                      </div>
                    </TableCell>
                    <TableCell className="w-24">
                      <Badge variant="secondary">{p.rating} ⭐</Badge>
                    </TableCell>
                    <TableCell className="w-32">
                      <div className="flex gap-2 items-center">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEdit(p)}
                          className="h-8 cursor-pointer"
                          disabled={saving}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setProductToDelete(p);
                            setDeleteDialogOpen(true);
                          }}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 bg-red-100 hover:bg-red-200 cursor-pointer"
                          disabled={deleting}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white border rounded-lg p-4 shadow-sm"
              >
                <div className="flex gap-3 mb-3">
                  <div className="flex gap-1 flex-shrink-0">
                    {p.ProductsImage.length > 0 ? (
                      <>
                        {p.ProductsImage.slice(0, 2).map((img) => (
                          <img
                            key={img.id}
                            src={img.imageUrl}
                            className="h-12 w-12 rounded object-cover border"
                            alt="Product"
                            onError={(e) => {
                              e.currentTarget.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%239ca3af'%3EImage%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        ))}
                        {p.ProductsImage.length > 2 && (
                          <div className="h-12 w-12 rounded border bg-gray-100 flex items-center justify-center text-xs font-medium">
                            +{p.ProductsImage.length - 2}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="h-12 w-12 rounded border bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate" title={p.name}>
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-green-600">
                        ${p.price.toFixed(2)}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {p.rating} ⭐
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Units: {p.units}
                    </p>
                  </div>
                </div>

                <p
                  className="text-sm text-gray-600 mb-3 line-clamp-2"
                  title={p.description}
                >
                  {p.description}
                </p>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(p)}
                    className="flex-1 h-8"
                    disabled={saving}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setProductToDelete(p);
                      setDeleteDialogOpen(true);
                    }}
                    className="h-8 w-8 p-0"
                    disabled={deleting}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="sm:max-w-sm max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="break-words">
                  Are you sure you want to delete{" "}
                  <strong className="break-words">
                    {productToDelete?.name}
                  </strong>
                  ?
                </p>
                {productToDelete?.description && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      Description:
                    </p>
                    <p
                      className="text-sm text-gray-700 break-words line-clamp-3"
                      title={productToDelete.description}
                    >
                      {productToDelete.description}
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                  disabled={deleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleting}
                >
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
        </>
      )}
    </div>
  );
}
