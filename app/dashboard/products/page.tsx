"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Trash, Loader2 } from "lucide-react"
import { Toaster, toast } from "sonner" // ✅ Sonner

type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number
  discount?: number
  featured: boolean
  rating: number
  units: number
  createdAt: string
  ProductsImage: { id: string; imageUrl: string }[]
}

export default function ProductsPage() {
  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)

  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    units: "",
    description: "",
    images: [] as string[],
    currentImage: "",
    rating: "",
  })

  // Fetch products
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" })
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
        const data = await res.json()
        setProducts(data)
      } catch (err: any) {
        setError(err.message)
        toast.error("❌ Failed to load products. Please try again.", {
          description: err.message,
        })
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const addImage = () => {
    if (formData.currentImage.trim() === "") return
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, prev.currentImage.trim()],
      currentImage: "",
    }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      units: "",
      description: "",
      images: [],
      currentImage: "",
      rating: "",
    })
    setEditingProduct(null)
  }

  const handleSave = async () => {
    const payload = {
      name: formData.name,
      price: Number(formData.price),
      units: Number(formData.units),
      description: formData.description,
      images: formData.images,
      rating: Number(formData.rating) || 0,
    }

    setSaving(true)
    try {
      let res
      if (editingProduct) {
        res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, slug: editingProduct.slug }),
        })
      } else {
        res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      if (!res.ok) throw new Error("Failed to save product")
      const saved = await res.json()

      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.slug === editingProduct.slug ? saved : p))
        )
        toast.success("✅ Product updated successfully!")
      } else {
        setProducts((prev) => [saved, ...prev])
        toast.success("✅ Product added successfully!")
      }

      resetForm()
      setDialogOpen(false)
    } catch (err: any) {
      // console.error(err)
      toast.error("❌ Failed to save product.", {
        description: err.message,
      })
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)

    setFormData({
      name: product.name ?? "",
      price: product.price?.toString() ?? "",
      units: product.units?.toString() ?? "",
      description: product.description ?? "",
      images: product.ProductsImage?.map((img) => img.imageUrl) || [],
      currentImage: "",
      rating: product.rating?.toString() ?? "0.0",
    })

    setDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!productToDelete) return
    setDeleting(true)
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: productToDelete.slug }),
      })
      if (!res.ok) throw new Error("Failed to delete product")

      setProducts((prev) => prev.filter((p) => p.slug !== productToDelete.slug))
      toast.success("🗑️ Product deleted successfully!")
      setProductToDelete(null)
      setDeleteDialogOpen(false)
    } catch (err: any) {
      // console.error(err)
      toast.error("❌ Failed to delete product.", {
        description: err.message,
      })
    } finally {
      setDeleting(false)
    }
  }

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
                resetForm()
                setDialogOpen(true)
              }}
            >
              + Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto py-3">
              <div className="grid gap-3">
                <div>
                  <Label>Name</Label>
                  <Input value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input type="number" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} />
                </div>
                <div>
                  <Label>Units</Label>
                  <Input type="number" value={formData.units} onChange={(e) => handleInputChange("units", e.target.value)} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea 
                    value={formData.description} 
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="min-h-[80px] max-h-[120px] resize-none"
                    placeholder="Enter product description..."
                  />
                </div>
                <div>
                  <Label>Add Images</Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.currentImage}
                      onChange={(e) => handleInputChange("currentImage", e.target.value)}
                      placeholder="Image URL"
                    />
                    <Button onClick={addImage} disabled={!formData.currentImage.trim()}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2 max-h-[100px] overflow-y-auto">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img} className="w-20 h-20 rounded border object-cover" />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 rounded-full p-1 h-6 w-6"
                          onClick={() => removeImage(idx)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Rating</Label>
                  <Input type="number" value={formData.rating} onChange={(e) => handleInputChange("rating", e.target.value)} />
                </div>
              </div>
            </div>
            <DialogFooter className="flex-shrink-0 pt-4 border-t">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {editingProduct ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  editingProduct ? "Update" : "Save"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
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
                      <div className="truncate max-w-[192px]" title={p.description}>
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
                            setProductToDelete(p)
                            setDeleteDialogOpen(true)
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
              <div key={p.id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex gap-3 mb-3">
                  {/* Images - Horizontal layout for mobile */}
                  <div className="flex gap-1 flex-shrink-0">
                    {p.ProductsImage.length > 0 ? (
                      <>
                        {p.ProductsImage.slice(0, 2).map((img) => (
                          <img 
                            key={img.id} 
                            src={img.imageUrl} 
                            className="h-12 w-12 rounded object-cover border" 
                            alt="Product"
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
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate" title={p.name}>
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-green-600">${p.price.toFixed(2)}</span>
                      <Badge variant="secondary" className="text-xs">{p.rating} ⭐</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Units: {p.units}</p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={p.description}>
                  {p.description}
                </p>
                
                {/* Actions */}
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
                      setProductToDelete(p)
                      setDeleteDialogOpen(true)
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
                  Are you sure you want to delete <strong className="break-words">{productToDelete?.name}</strong>?
                </p>
                {productToDelete?.description && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600 font-medium mb-1">Description:</p>
                    <p className="text-sm text-gray-700 break-words line-clamp-3" title={productToDelete.description}>
                      {productToDelete.description}
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
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
        </>
      )}
    </div>
  )
}
