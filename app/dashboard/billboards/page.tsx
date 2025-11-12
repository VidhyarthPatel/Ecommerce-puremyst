"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Trash2, 
  LayoutTemplate, 
  Plus, 
  ImageOff, 
  AlertCircle, 
  Save,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

// --- Mock Components (for standalone demo) ---
// In a real shadcn/ui project, you'd import these
// const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => (
//   <button
//     className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
//       variant === "destructive"
//         ? "bg-red-500 text-white hover:bg-red-600"
//         : variant === "ghost"
//         ? "hover:bg-gray-100"
//         : "bg-gray-900 text-white hover:bg-gray-800"
//     } ${
//       size === "icon" ? "h-10 w-10" : "h-10 px-4 py-2"
//     } ${className}`}
//     ref={ref}
//     {...props}
//   />
// ))
// const Input = React.forwardRef(({ className, ...props }, ref) => (
//   <input
//     className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
//     ref={ref}
//     {...props}
//   />
// ))
// const Label = React.forwardRef(({ className, ...props }, ref) => (
//   <label
//     className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
//     ref={ref}
//     {...props}
//   />
// ))
// const Card = React.forwardRef(({ className, ...props }, ref) => (
//   <div
//     className={`rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`}
//     ref={ref}
//     {...props}
//   />
// ))
// const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
//   <div
//     className={`flex flex-col space-y-1.5 p-6 ${className}`}
//     ref={ref}
//     {...props}
//   />
// ))
// const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
//   <h3
//     className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
//     ref={ref}
//     {...props}
//   />
// ))
// const CardContent = React.forwardRef(({ className, ...props }, ref) => (
//   <div className={`p-6 pt-0 ${className}`} ref={ref} {...props} />
// ))
// --- End Mock Components ---


export default function BillboardPage() {
  const [billboards, setBillboards] = React.useState<string[]>([
    "https://placehold.co/1600x600/3498db/ffffff?text=Summer+Vibes+Sale",
    "https://placehold.co/1600x600/e74c3c/ffffff?text=New+Collection+Arrived",
    "https://placehold.co/1600x600/2ecc71/ffffff?text=Free+Shipping+This+Weekend",
  ])
  const [imageUrl, setImageUrl] = React.useState("")
  const [error, setError] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)
  const [currentSlide, setCurrentSlide] = React.useState(0)

  // --- Carousel Logic ---
  React.useEffect(() => {
    if (billboards.length <= 1) return;
    // Auto-play the carousel
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === billboards.length - 1 ? 0 : prev + 1))
    }, 4000) // Change slide every 4 seconds
    return () => clearInterval(timer)
  }, [billboards.length])

  const nextSlide = () => {
    if (billboards.length === 0) return;
    setCurrentSlide((prev) => (prev === billboards.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    if (billboards.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? billboards.length - 1 : prev - 1))
  }

  // --- Form Logic ---
  const handleAdd = () => {
    if (!imageUrl) {
      setError("Please enter an image URL.")
      return
    }
    // Basic URL validation
     if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
      setError("Please enter a valid URL (e.g., https://...).");
      return;
    }
    if (billboards.length >= 5) {
      setError("You can only add up to 5 billboards.")
      return
    }
    setBillboards([...billboards, imageUrl])
    setImageUrl("")
    setError("") // Clear error on success
  }

  const handleDelete = (indexToDelete: number) => {
    setBillboards(billboards.filter((_, i) => i !== indexToDelete))
    // Adjust current slide if we delete an earlier or current slide
    if (currentSlide >= indexToDelete && currentSlide > 0) {
      setCurrentSlide(0)
    }
  }

  const handleSave = () => {
    setIsSaving(true)
    // Simulate an API call
    console.log("Saving billboards:", billboards)
    setTimeout(() => {
      setIsSaving(false)
      // In a real app, you'd show a success toast here
    }, 1500)
  }

  return (
    <>
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
          border: 2px solid #f1f5f9;
        }
      `}</style>
      
      {/* Main Content Area */}
      <div className="bg-gray-50 min-h-screen p-4 md:p-8 scrollbar-thin">
        {/* Header */}
        <header className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutTemplate className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Billboard Manager
              </h1>
              <p className="text-gray-500">Manage hero images for your store's homepage.</p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-5 py-2.5 font-semibold transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50"
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </header>

        {/* Main Grid Layout */}
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form + Live Preview */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Live Preview Card */}
            <Card className="shadow-lg rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Live Homepage Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full aspect-[16/6] bg-gray-200 rounded-lg overflow-hidden shadow-inner">
                  {billboards.length > 0 ? (
                    <>
                      {/* Billboards */}
                      {billboards.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Billboard ${index + 1}`}
                          onError={(e) => (e.currentTarget.src = 'https://placehold.co/1600x600/f87171/ffffff?text=Image+Failed+to+Load')}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      ))}
                      
                      {/* Prev/Next Controls */}
                      {billboards.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={prevSlide}
                            className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full shadow-md"
                          >
                            <ChevronLeft className="w-6 h-6 text-gray-800" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={nextSlide}
                            className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full shadow-md"
                          >
                            <ChevronRight className="w-6 h-6 text-gray-800" />
                          </Button>
                        </>
                      )}
                      
                      {/* Dot Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {billboards.map((_, index) => (
                          <div
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <ImageOff className="w-16 h-16 mb-4" />
                      <span className="text-lg font-medium">No billboards to preview.</span>
                      <span className="text-sm">Add one to get started!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Manage Billboards Card */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Current Billboards ({billboards.length}/5)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {billboards.length === 0 ? (
                  <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 text-gray-500">
                    Your billboards will appear here.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {billboards.map((url, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden shadow-md aspect-video"
                      >
                        <img
                          src={url}
                          alt={`Billboard ${index + 1}`}
                          onError={(e) => (e.currentTarget.src = 'https://placehold.co/800x450/f87171/ffffff?text=Image+Failed')}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300"></div>
                        
                        {/* Delete Button */}
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-3 right-3 rounded-full h-9 w-9 bg-white/20 text-white backdrop-blur-sm border border-white/30
                                     hover:bg-red-500 hover:text-white transition-all duration-300 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                          onClick={() => handleDelete(index)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                        
                        {/* Info Overlay */}
                        <div className="absolute bottom-0 left-0 p-4">
                          <span className="inline-block bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full mb-1.5">
                            #{index + 1}
                          </span>
                          <p className="text-white text-sm font-medium truncate max-w-xs" title={url}>
                            {url}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Add Form */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg rounded-2xl sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Add New Billboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="font-medium text-gray-700">Image URL</Label>
                  <p className="text-xs text-gray-500">
                    Use high-resolution horizontal images (e.g., 1600x600px).
                  </p>
                  <Input
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value)
                      if (error) setError("") // Clear error on typing
                    }}
                    placeholder="https://example.com/hero.jpg"
                    className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    disabled={billboards.length >= 5}
                  />
                </div>
                
                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}
                
                <Button
                  onClick={handleAdd}
                  disabled={billboards.length >= 5}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-6 py-3 font-semibold transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Billboard
                </Button>
                
                {billboards.length >= 5 && (
                   <p className="text-sm text-center text-yellow-600 font-medium">
                     You have reached the maximum limit of 5 billboards.
                   </p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}