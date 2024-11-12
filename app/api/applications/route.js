import formidable from 'formidable';
import pdf from 'pdf-parse';
import dbConnect from '@/lib/dbConnect';

export async function POST(request) {
  const form = new formidable.IncomingForm();
  form.parse(request, async (err, fields, files) => {
    if (err) {
      return new Response(JSON.stringify({ success: false, error: 'Error parsing form data' }), { status: 400 });
    }

    try {
      const { jobId, fullName, email, phone, coverLetter } = fields;
      const resumeFile = files.resume[0]; // Adjust depending on the file format
      
      // Parse the PDF content
      const pdfData = await parsePDF(resumeFile.filepath); // Assuming filepath is available

      // Connect to MongoDB
      await dbConnect();

      // Save the application to MongoDB
      const application = await mongoose.models.Application.create({
        job: jobId,
        fullName,
        email,
        phone,
        coverLetter,
        resume: pdfData, // Save the parsed text data
      });

      return new Response(JSON.stringify({ success: true, data: application }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'An error occurred while submitting the application.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  });
}

async function parsePDF(filePath) {
  try {
    const buffer = fs.readFileSync(filePath); // Read the file as buffer
    const data = await pdf(buffer); // Parse the PDF data
    return data.text; // Return the extracted text
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}
