import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');

    const uploadedFiles = [];

    // "uploads" klasörü yoksa oluştur
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Dosyaları yükle
    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, Buffer.from(buffer));
      uploadedFiles.push(`/uploads/${fileName}`);
    }

    return NextResponse.json({ success: true, urls: uploadedFiles }, { status: 200 });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload files' }, { status: 500 });
  }
}