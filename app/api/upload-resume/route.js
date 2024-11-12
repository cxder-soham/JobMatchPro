import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,  // Disable body parsing by Next.js to allow formidable to handle the file stream
  },
};

export async function POST(request) {
  try {
    // Use formidable without 'new' keyword (v2 and above)
    const form = formidable({ uploadDir: path.join(process.cwd(), 'uploads'), keepExtensions: true });

    // Parse the incoming form and extract fields and files
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    if (!files.resume) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const resumeFile = files.resume;
    const resumeFilePath = resumeFile.filepath;

    // Read the PDF and extract its text using pdf-parse
    const resumeBuffer = fs.readFileSync(resumeFilePath);
    const data = await pdfParse(resumeBuffer);

    const resumeText = data.text;  // Extracted text from the PDF

    // Optionally: Perform further processing on resumeText
    console.log(resumeText);

    // Clean up the uploaded file
    fs.unlinkSync(resumeFilePath);

    return NextResponse.json({ message: 'Resume uploaded and processed successfully', text: resumeText });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing resume' }, { status: 500 });
  }
}
