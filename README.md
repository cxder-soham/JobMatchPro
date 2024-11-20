# JobMatchPro - AI-Powered Resume-Job Matching Application

JobMatchPro is an intelligent application that leverages AI to match candidate resumes with job postings, streamlining the recruitment process for both job seekers and employers.

## 🚀 Features

- **AI-Powered Matching**: Utilizes Google's Gemini API for intelligent resume analysis and job matching
- **Smart Resume Parsing**: Automatically extracts key information from resumes
- **Real-time Job Matching**: Instantly matches candidates with suitable job openings
- **Modern UI Components**: Built with ShadcnUI for a polished, accessible interface
- **User-friendly Interface**: Built with React and Next.js for a smooth user experience
- **Secure Data Storage**: MongoDB integration for reliable data management
- **RESTful API**: Express.js backend for efficient data handling

## 🛠️ Tech Stack

- **Frontend**: 
  - Next.js 14
  - React
  - ShadcnUI (Component Library)
  - Modern UI/UX principles
  
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  
- **AI Integration**:
  - Google Gemini API

- **Deployment**:
  - Vercel (Frontend & Backend)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/JobMatchPro.git
cd JobMatchPro
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install ShadcnUI components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
# Add other required components as needed

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Frontend .env
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Backend .env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Run the development servers:
```bash
# Run frontend (from frontend directory)
npm run dev

# Run backend (from backend directory)
npm run dev
```

## 💻 Usage

1. **For Job Seekers**:
   - Upload your resume
   - View matched job recommendations
   - Track application status

2. **For Employers**:
   - Post job openings
   - View matched candidates
   - Manage applications

## 🚀 Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Create a Vercel account and install the Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy the project:
```bash
# Deploy frontend
cd frontend
vercel

# Deploy backend
cd ../backend
vercel
```

3. Configure environment variables in Vercel dashboard
4. Link your GitHub repository for automatic deployments

## 🔒 Environment Variables

Ensure you have the following environment variables set up:

```env
MONGODB_URI=
PORT=
GEMINI_API_KEY=
NEXT_PUBLIC_API_URL=
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📫 Contact

Your Name - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/yourusername/JobMatchPro](https://github.com/yourusername/JobMatchPro)

Live Demo: [https://job-match-pro.vercel.app](https://job-match-pro.vercel.app)

---
⭐️ From [cxder-soham](https://github.com/yourusername) and [Spandan7724](https://github.com/Spandan7724)
