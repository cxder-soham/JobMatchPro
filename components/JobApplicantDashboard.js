// components/JobApplicantDashboard.js

'use client';

import React, { useState } from 'react';
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
    const jobPostings = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            department: "Engineering",
            location: "Remote",
            salary: "$120,000 - $150,000",
            type: "Full-time",
            postedDate: "2024-03-15",
            description: "We're seeking an experienced Frontend Developer to join our engineering team. The ideal candidate will have strong expertise in React, TypeScript, and modern web technologies.",
            requirements: [
                "5+ years of experience with React",
                "Strong understanding of TypeScript",
                "Experience with state management (Redux, Context API)",
                "Knowledge of responsive design and CSS frameworks"
            ],
            responsibilities: [
                "Develop new user-facing features",
                "Build reusable components and libraries",
                "Optimize applications for maximum performance",
                "Collaborate with back-end developers and designers"
            ]
        },
        {
            id: 2,
            title: "Product Manager",
            department: "Product",
            location: "New York",
            salary: "$130,000 - $160,000",
            type: "Full-time",
            postedDate: "2024-03-10",
            description: "Looking for a Product Manager to drive product strategy and execution. You'll work closely with engineering, design, and business teams to deliver exceptional products.",
            requirements: [
                "5+ years of product management experience",
                "Strong analytical and problem-solving skills",
                "Excellent communication and leadership abilities",
                "Experience with agile methodologies"
            ],
            responsibilities: [
                "Define product strategy and roadmap",
                "Gather and analyze user feedback",
                "Coordinate with cross-functional teams",
                "Drive product launches and iterations"
            ]
        },
        {
            id: 3,
            title: "UX Designer",
            department: "Design",
            location: "San Francisco",
            salary: "$100,000 - $130,000",
            type: "Full-time",
            postedDate: "2024-03-18",
            description: "Join our design team to create beautiful and intuitive user experiences. You'll be responsible for the entire design process from research to implementation.",
            requirements: [
                "3+ years of UX design experience",
                "Proficiency in Figma and design tools",
                "Portfolio showcasing end-to-end design process",
                "Experience with user research and testing"
            ],
            responsibilities: [
                "Create user flows and wireframes",
                "Conduct user research and testing",
                "Design intuitive user interfaces",
                "Collaborate with developers and stakeholders"
            ]
        }
    ];
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

  const ApplicationModal = ({ job, onClose }) => (
    <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
      <DialogContent className="max-w-2xl bg-white dark:bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Apply for {job.title}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Please fill out the following information to submit your application.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <Input
              placeholder="Enter your full name"
                          className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
                          className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
                          className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Resume
            </label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center border-gray-300 dark:border-gray-600">
              <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <div className="mt-2">
                <Button variant="outline">Upload Resume</Button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  PDF, DOC, or DOCX up to 5MB
                </p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Cover Letter (Optional)
            </label>
            <textarea
              className="w-full h-32 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              placeholder="Tell us why you're interested in this position..."
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>Submit Application</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

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
                key={job.id}
                className="cursor-pointer hover:shadow-lg transition-shadow bg-white dark:bg-stone-900"
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
