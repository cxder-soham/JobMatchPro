// components/JobApplicantDashboard.js

'use client';


import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  Building2,
  DollarSign,
  ChevronLeft,
  Upload,
} from 'lucide-react';

const JobApplicantDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [resumeFile, setResumeFile] = useState(null); 
    // Sample job postings data
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await fetch('/api/job-postings');
        const data = await response.json();

        if (data.success) {
          setJobPostings(data.data);
        } else {
          console.error('Error fetching job postings:', data.error);
        }
      } catch (error) {
        console.error('Error fetching job postings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, []);



  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <p>Loading job postings...</p>
      </div>
    );
  }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setResumeFile(file);
            alert(`Resume uploaded: ${file.name}`);
        }
    };

  const filteredJobs = jobPostings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || job.location === locationFilter;
    const matchesDepartment =
      departmentFilter === 'all' || job.department === departmentFilter;
    return matchesSearch && matchesLocation && matchesDepartment;
  });

  const ApplicationModal = ({ job, onClose }) => {
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      coverLetter: '',
    });
    const [resumeFile, setResumeFile] = useState(null);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleResumeChange = (e) => {
      setResumeFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!resumeFile) {
        alert('Please upload your resume.');
        return;
      }

      const form = new FormData();
      form.append('jobId', job._id);
      form.append('fullName', formData.fullName);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('coverLetter', formData.coverLetter);
      form.append('resume', resumeFile);

      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          body: form,
        });

        const data = await response.json();

        if (data.success) {
          alert('Application submitted successfully!');
          onClose();
        } else {
          alert('Error submitting application: ' + data.error);
        }
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('An error occurred while submitting your application.');
      }
    };

    return (
      <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
        <DialogContent className="max-w-2xl bg-white dark:bg-black">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              Apply for {job.title}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Please fill out the following information to submit your application.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <Input
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-white dark:bg-white text-gray-900 dark:text-black"
                required
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white dark:bg-white text-gray-900 dark:text-black"
                required
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <Input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="bg-white dark:bg-white text-gray-900 dark:text-black"
              />
            </div>
            {/* Resume */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-white">
                Resume
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                required
                className="w-full"
              />
            </div>
            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Cover Letter (Optional)
              </label>
              <textarea
                name="coverLetter"
                className="w-full h-32 p-2 border rounded-md bg-white dark:bg-white text-gray-900 dark:text-black border-gray-300 dark:border-gray-600"
                placeholder="Tell us why you're interested in this position..."
                value={formData.coverLetter}
                onChange={handleChange}
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 rounded-lg min-h-screen">
      {!selectedJob ? (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-6">Available Positions</h1>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <Input
                    className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-stone-900 text-gray-900 dark:text-gray-100">
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-stone-900 text-gray-900 dark:text-gray-100">
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card
                key={job._id}
                className="cursor-pointer hover:shadow-lg transition-shadow bg-white dark:bg-stone-800 rounded-lg"
                onClick={() => setSelectedJob(job)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <Briefcase className="text-blue-500 dark:text-blue-400" />
                  </div>
                  <Badge variant="secondary">{job.type}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Building2 size={18} />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <MapPin size={18} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <DollarSign size={18} />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Clock size={18} />
                      <span>
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedJob(null)}
            className="flex items-center gap-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
          >
            <ChevronLeft size={20} />
            Back to Job Listings
          </button>

          <Card className="bg-white dark:bg-stone-900">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {selectedJob.type}
                  </Badge>
                  <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Building2 size={18} />
                      <span>{selectedJob.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <MapPin size={18} />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <DollarSign size={18} />
                      <span>{selectedJob.salary}</span>
                    </div>
                  </div>
                </div>
                <Button size="lg" onClick={() => setShowApplicationModal(true)}>
                  Apply Now
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">About the Role</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedJob.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button size="lg" onClick={() => setShowApplicationModal(true)}>
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showApplicationModal && selectedJob && (
        <ApplicationModal
          job={selectedJob}
          onClose={() => setShowApplicationModal(false)}
        />
      )}
    </div>
  );
};

export default JobApplicantDashboard;
