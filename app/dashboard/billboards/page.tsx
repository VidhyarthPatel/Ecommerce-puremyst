"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"

export default function BillboardPage() {
  const [billboards, setBillboards] = React.useState<string[]>([])
  const [imageUrl, setImageUrl] = React.useState("")

  const handleAdd = () => {
    if (!imageUrl) return
    if (billboards.length >= 5) {
      alert("You can only add up to 5 billboard images.")
      return
    }
    setBillboards([...billboards, imageUrl])
    setImageUrl("")
  }

  const handleDelete = (index: number) => {
    setBillboards(billboards.filter((_, i) => i !== index))
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Card className="shadow-2xl rounded-3xl overflow-hidden max-w-4xl mx-auto">
        <CardHeader className="bg-white px-8 py-6">
          <CardTitle className="text-2xl font-bold text-gray-800">
            🎯 Billboard Manager
          </CardTitle>
          <p className="text-gray-500 mt-1">Add up to 5 horizontal hero images for the homepage.</p>
        </CardHeader>
        <CardContent className="px-8 py-6 bg-gray-50 space-y-6">
          {/* Input + Add */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1">
              <Label className="mb-1 text-gray-700">Image URL</Label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/hero.jpg"
                className="rounded-xl border-gray-300 shadow-sm"
              />
            </div>
            <Button
              onClick={handleAdd}
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-6 py-3 font-semibold transition"
            >
              + Add Billboard
            </Button>
          </div>

          {/* Billboard Previews */}
          {billboards.length > 0 && (
            <>
              <p className="text-gray-600 font-medium">Preview ({billboards.length}/5)</p>
              <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {billboards.map((url, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-[500px] h-64 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
                  >
                    <img
                      src={url}
                      alt={`Billboard ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-3 right-3 rounded-full bg-white/80 hover:bg-red-500 hover:text-white transition"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

          {billboards.length === 0 && (
            <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-2xl border border-dashed border-gray-300 text-gray-400">
              No billboards yet. Add one above.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
