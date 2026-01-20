"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search, Plus, Edit3, Trash2,
  Package, Filter, AlertTriangle, CheckCircle,
  Image as ImageIcon, MoreVertical, Settings,
  ChevronRight, Info
} from "lucide-react";

// shadcn/ui components (Ensure these are installed)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";

// --- Types ---
type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  featured: boolean;
  rating: number;
  units: number;
  category: string;
  keyFeatures: string[];
  faqs?: { question: string; answer: string }[];
  ProductsImage?: { id: string; imageUrl: string }[];
};

const CATEGORIES = [
  "RO Water Purifier",
  "Commercial Water Purifier",
  "Washing Machine Cleaner",
  "Accessories",
];

export default function EnhancedInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "", price: "", units: "", description: "",
    category: CATEGORIES[0], images: [] as string[],
    rating: "0", featured: false, keyFeatures: [] as string[],
    faqs: [] as { question: string; answer: string }[],
  });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [products, searchTerm, categoryFilter]);

  const handleOpenSheet = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        units: product.units.toString(),
        description: product.description,
        category: product.category,
        images: product.ProductsImage?.map(img => img.imageUrl) || [],
        rating: product.rating.toString(),
        featured: product.featured,
        keyFeatures: product.keyFeatures || [],
        faqs: product.faqs || [],
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "", price: "", units: "", description: "",
        category: CATEGORIES[0], images: [], rating: "0",
        featured: false, keyFeatures: [], faqs: [],
      });
    }
    setIsSheetOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Upload failed");

      const { url } = await res.json();
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }));
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        units: parseInt(formData.units) || 0,
        rating: parseFloat(formData.rating) || 0,
        slug: editingProduct?.slug, // Only for update
      };

      const res = await fetch("/api/products", {
        method: editingProduct ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save product");
      }

      toast.success(editingProduct ? "Product updated" : "Product created");
      fetchProducts();
      setIsSheetOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: productToDelete.slug }),
      });
      if (res.ok) {
        toast.success("Product removed from inventory");
        setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
        setProductToDelete(null);
      }
    } catch (err) {
      toast.error("Could not delete product");
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-slate-50/30">
        <Toaster position="top-center" richColors />

        {/* --- Header Section --- */}
        <header className="bg-white border-b px-4 md:px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-600" /> Inventory Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Total Catalog: {products.length} Products</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative group flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                placeholder="Search by name..."
                className="pl-9 w-full sm:w-64 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all shadow-sm text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => handleOpenSheet()} className="h-10 px-4 bg-blue-600 hover:bg-blue-700 shadow-sm font-semibold text-sm w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </div>
        </header>

        {/* --- Quick Stats Bar --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b bg-white">
          <div className="px-4 md:px-6 py-3 border-r border-b lg:border-b-0 hover:bg-slate-50 transition-colors cursor-default">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Categories</span>
            <p className="text-lg font-bold text-slate-800">{CATEGORIES.length}</p>
          </div>
          <div className="px-4 md:px-6 py-3 border-r lg:border-r border-b lg:border-b-0 hover:bg-slate-50 transition-colors cursor-default">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Out of Stock</span>
            <p className={`text-lg font-bold ${products.filter(p => p.units === 0).length > 0 ? 'text-red-600' : 'text-slate-800'}`}>
              {products.filter(p => p.units === 0).length}
            </p>
          </div>
          <div className="px-4 md:px-6 py-3 border-r hover:bg-slate-50 transition-colors cursor-default">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Low Stock Alert</span>
            <p className="text-lg font-bold text-amber-600">{products.filter(p => p.units > 0 && p.units < 10).length}</p>
          </div>
          <div className="px-4 md:px-6 py-3 flex flex-col justify-center bg-blue-50/30">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-0.5">Filter View</span>
            <select
              className="bg-transparent font-bold text-sm text-slate-700 focus:outline-none appearance-none cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Inventory Items</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* --- Main Content Area --- */}
        <main className="flex-1 overflow-hidden p-4 md:p-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
            <ScrollArea className="flex-1">
              <div className="min-w-[1000px] lg:min-w-full">
                <Table className="table-fixed w-full">
                  <TableHeader className="bg-slate-50/80 sticky top-0 z-10">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-20 pl-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Preview</TableHead>
                      <TableHead className="py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Product Information</TableHead>
                      <TableHead className="w-44 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Category</TableHead>
                      <TableHead className="w-32 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Stock Level</TableHead>
                      <TableHead className="w-24 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Price</TableHead>
                      <TableHead className="w-40 text-right py-4 pr-8 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array(5).fill(0).map((_, i) => (
                        <TableRow key={i}><TableCell colSpan={6} className="h-20 animate-pulse bg-slate-50/50" /></TableRow>
                      ))
                    ) : filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-64 text-center">
                          <div className="flex flex-col items-center justify-center opacity-40">
                            <Package className="w-16 h-16 mb-4" />
                            <p className="text-lg font-medium">No products found matching your search.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((p) => (
                        <TableRow key={p.id} className="hover:bg-slate-50/80 transition-all border-b group">
                          <TableCell className="pl-6 py-3">
                            <div className="w-12 h-12 rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center group-hover:border-blue-300 transition-colors">
                              {p.ProductsImage?.[0] ? (
                                <img src={p.ProductsImage[0].imageUrl} className="w-full h-full object-cover" alt={p.name} />
                              ) : (
                                <ImageIcon className="w-5 h-5 text-slate-300" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="py-3 overflow-hidden">
                            <div className="flex flex-col gap-0.5 max-w-full">
                              <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors truncate block">{p.name}</span>
                              <span className="text-[11px] text-slate-500 line-clamp-1 italic block max-w-[400px]">{p.description || "No description provided."}</span>
                              {p.featured && <Badge className="w-fit bg-indigo-50 text-indigo-700 border-indigo-100 text-[9px] uppercase font-bold px-1.5 py-0 mt-1">Featured</Badge>}
                            </div>
                          </TableCell>
                          <TableCell className="py-3">
                            <Badge variant="outline" className="text-[11px] px-2 py-0.5 font-medium bg-white text-slate-600 border-slate-200 shadow-sm">
                              {p.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-1.5">
                                <span className={`text-xs font-bold ${p.units < 5 ? 'text-red-600' : 'text-slate-800'}`}>
                                  {p.units} Units
                                </span>
                                {p.units < 10 && <AlertTriangle className="w-3 h-3 text-amber-500" />}
                              </div>
                              <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                <div
                                  className={`h-full transition-all duration-500 ${p.units < 10 ? 'bg-amber-500' : 'bg-green-500'}`}
                                  style={{ width: `${Math.min(p.units * 5, 100)}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 text-sm font-bold text-slate-900">
                            ₹{p.price.toLocaleString()}
                          </TableCell>
                          <TableCell className="py-3 text-right pr-8">
                            <div className="flex justify-end items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium text-xs flex items-center gap-1.5"
                                onClick={() => handleOpenSheet(p)}
                              >
                                <Edit3 className="w-3.5 h-3.5" /> Edit
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-3 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium text-xs flex items-center gap-1.5"
                                onClick={() => setProductToDelete(p)}
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>
        </main>

        {/* --- Editor Side-Sheet --- */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col border-l-0 shadow-2xl h-full">
            <SheetHeader className="p-8 border-b bg-slate-50/80">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <SheetTitle className="text-xl font-bold">{editingProduct ? "Modify Product" : "New Inventory Entry"}</SheetTitle>
                  <SheetDescription>Configure specifications for the catalog.</SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <ScrollArea className="flex-1 px-8 py-6">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full grid grid-cols-4 mb-8 h-10 bg-slate-100 p-1">
                  <TabsTrigger value="general" className="text-xs font-bold">General</TabsTrigger>
                  <TabsTrigger value="specs" className="text-xs font-bold">Specs</TabsTrigger>
                  <TabsTrigger value="faqs" className="text-xs font-bold">FAQs</TabsTrigger>
                  <TabsTrigger value="media" className="text-xs font-bold">Media</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6 animate-in fade-in-50 duration-300">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Display Name</Label>
                    <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="h-11 text-md" placeholder="e.g. AquaPure 7-Stage RO" />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Market Price (INR)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                        <Input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="h-11 pl-8 text-md" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Initial Stock</Label>
                      <Input type="number" value={formData.units} onChange={e => setFormData({ ...formData, units: e.target.value })} className="h-11 text-md" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Catalog Category</Label>
                      <select
                        className="w-full h-11 px-3 rounded-md border border-slate-200 bg-white text-md font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Rating (0-5)</Label>
                      <Input type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={e => setFormData({ ...formData, rating: e.target.value })} className="h-11 text-md" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Marketing Description</Label>
                    <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="text-md min-h-[120px] leading-relaxed" placeholder="Highlight the key benefits..." />
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-xl bg-blue-50/50 border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <Info className="w-5 h-5 text-blue-600" />
                      <div className="flex flex-col">
                        <Label className="text-sm font-bold text-blue-900">Featured Placement</Label>
                        <p className="text-xs text-blue-700">Pin this product to the main showcase.</p>
                      </div>
                    </div>
                    <Switch checked={formData.featured} onCheckedChange={v => setFormData({ ...formData, featured: v })} />
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-wider text-slate-400">Key Features List</Label>
                    {formData.keyFeatures.map((f, i) => (
                      <div key={i} className="flex gap-3 animate-in slide-in-from-left-2 duration-200">
                        <Input value={f} onChange={e => {
                          const newF = [...formData.keyFeatures];
                          newF[i] = e.target.value;
                          setFormData({ ...formData, keyFeatures: newF });
                        }} className="h-10 text-sm" placeholder="e.g. 10L Capacity" />
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => setFormData({ ...formData, keyFeatures: formData.keyFeatures.filter((_, idx) => idx !== i) })}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-dashed h-10 border-slate-300 hover:bg-slate-50 text-xs" onClick={() => setFormData({ ...formData, keyFeatures: [...formData.keyFeatures, ""] })}>
                      <Plus className="w-3 h-3 mr-2" /> Add Feature
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="faqs" className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-wider text-slate-400">Product FAQs</Label>
                    {formData.faqs.map((faq, i) => (
                      <div key={i} className="space-y-2 p-4 border rounded-lg bg-slate-50/50 relative group">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setFormData({ ...formData, faqs: formData.faqs.filter((_, idx) => idx !== i) })}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="space-y-1">
                          <Label className="text-[10px] font-bold text-slate-500 uppercase">Question</Label>
                          <Input
                            value={faq.question}
                            onChange={e => {
                              const newFaqs = [...formData.faqs];
                              newFaqs[i] = { ...newFaqs[i], question: e.target.value };
                              setFormData({ ...formData, faqs: newFaqs });
                            }}
                            className="h-9 text-sm"
                            placeholder="e.g. Is it easy to install?"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] font-bold text-slate-500 uppercase">Answer</Label>
                          <Textarea
                            value={faq.answer}
                            onChange={e => {
                              const newFaqs = [...formData.faqs];
                              newFaqs[i] = { ...newFaqs[i], answer: e.target.value };
                              setFormData({ ...formData, faqs: newFaqs });
                            }}
                            className="text-sm min-h-[60px]"
                            placeholder="Provide a clear answer..."
                          />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-dashed h-10 border-slate-300 hover:bg-slate-50 text-xs" onClick={() => setFormData({ ...formData, faqs: [...formData.faqs, { question: "", answer: "" }] })}>
                      <Plus className="w-3 h-3 mr-2" /> Add FAQ Item
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="media" className="mt-0">
                  <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((img, i) => (
                      <div key={i} className="group relative aspect-square border-2 border-slate-100 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
                        <img src={img} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <button
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setFormData({ ...formData, images: formData.images.filter((_, idx) => idx !== i) })}
                        >
                          <Trash2 className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    ))}
                    <label className="border-3 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center aspect-square cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-400 hover:text-blue-500">
                      {uploading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                      ) : (
                        <>
                          <Plus className="w-8 h-8 mb-2" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">Add Photo</span>
                        </>
                      )}
                      <input type="file" className="hidden" onChange={handleImageUpload} disabled={uploading} accept="image/*" />
                    </label>
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>

            <SheetFooter className="p-8 border-t bg-slate-50/80 backdrop-blur-sm">
              <Button variant="ghost" className="h-12 px-6 font-bold text-slate-500 hover:text-slate-900" onClick={() => setIsSheetOpen(false)}>Discard Changes</Button>
              <Button disabled={saving || uploading} onClick={handleSubmit} className="h-12 px-10 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-200">
                {saving ? "Processing..." : "Commit to Inventory"}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* --- Delete Verification --- */}
        <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
          <AlertDialogContent className="sm:max-w-[450px] p-8">
            <AlertDialogHeader>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl font-bold text-slate-900">Permanently Delete Product?</AlertDialogTitle>
              <AlertDialogDescription className="text-md leading-relaxed py-2 text-slate-600">
                You are about to remove <strong>{productToDelete?.name}</strong> from the store database. This action cannot be reversed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 gap-3">
              <AlertDialogCancel className="h-12 px-6 font-bold border-slate-200">Keep Product</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 h-12 px-8 font-bold shadow-lg shadow-red-100">
                Yes, Delete Item
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}