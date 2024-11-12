import { useState } from 'react';

const ResumeUpload = () => {
  const [resume, setResume] = useState(null);

  // Handle file change and update the state
  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  // Handle the form submission to upload the resume
  const handleResumeSubmit = async (event) => {
    event.preventDefault(); // Prevent the default behavior of the button

    if (!resume) {
      console.error('No resume selected');
      return;
    }

    // Create a new FormData instance and append the resume file
    const formData = new FormData();
    formData.append('resume', resume); // Use the correct state variable 'resume'
  
    try {
      // Send the file to the server using the fetch API
      const response = await fetch('/api/applications', { // Ensure this is the correct API endpoint
        method: 'POST',
        body: formData,
      });
  
      // Check for the response status
      if (response.ok) {
        console.log('Resume uploaded successfully');
        // Optionally, update the application state or show a success message
      } else {
        console.error('Error uploading resume');
        // Handle the error case
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      // Handle the error case
    }
  };

  return (
    <div>
      <input type="file" onChange={handleResumeChange} />
      <button onClick={handleResumeSubmit}>Upload Resume</button>
    </div>
  );
};

export default ResumeUpload;
