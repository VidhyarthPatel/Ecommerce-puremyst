import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check if environment variables are set
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_UPLOAD_PRESET) {
      console.error('Missing Cloudinary environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' }, 
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' }, 
        { status: 400 }
      );
    }

    console.log('Uploading file:', file.name, file.type, file.size);

    // Upload to Cloudinary using server-side credentials
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
    console.log('Uploading to:', cloudinaryUrl);

    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: uploadFormData,
    });

    const responseText = await response.text();
    console.log('Cloudinary response status:', response.status);
    console.log('Cloudinary response:', responseText);

    if (!response.ok) {
      // Try to parse error as JSON, fallback to text
      try {
        const errorData = JSON.parse(responseText);
        return NextResponse.json(
          { error: errorData.error?.message || 'Upload failed' }, 
          { status: response.status }
        );
      } catch {
        return NextResponse.json(
          { error: `Upload failed: ${response.status}` }, 
          { status: response.status }
        );
      }
    }

    const data = JSON.parse(responseText);
    return NextResponse.json({ url: data.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed - server error' }, 
      { status: 500 }
    );
  }
}