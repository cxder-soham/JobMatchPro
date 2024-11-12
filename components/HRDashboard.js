// components/HRDashboard.js

'use client';
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    MessageSquare,
    Users,
    Briefcase,
    TrendingUp,
    ChevronLeft,
    MapPin,
    Star,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
// Define these outside of HRDashboard
const InputField = ({ name, value, onChange, label }) => (
    <div>
        <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">{label}</label>
        <Input name={name} value={value} onChange={onChange} required />
    </div>
);

const TextareaField = ({ name, value, onChange, label }) => (
    <div>
        <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">{label}</label>
        <Textarea name={name} value={value} onChange={onChange} required />
    </div>
);

const HRDashboard = () => {
    const [setSelectedJob] = useState(null);
    const [jobPostings, setJobPostings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState({
        title: '',
        department: '',
        location: '',
        salary: '',
        description: '',
        requirements: '',
        responsibilities: '',
        type: '',
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await fetch('/api/job-postings');
                const data = await response.json();
                if (data.success) {
                    setJobPostings(data.data);
                } else {
                    throw new Error(data.error);
                }
            } catch (err) {
                setError('Failed to load job postings.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobPostings();
    }, []);

    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await fetch('/api/job-postings');
                const data = await response.json();
                if (data.success) {
                    setJobPostings(data.data);
                } else {
                    throw new Error(data.error);
                }
            } catch (err) {
                setError('Failed to load job postings.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobPostings();
    }, []);

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high':
                return 'text-red-500';
            case 'medium':
                return 'text-yellow-500';
            default:
                return 'text-green-500';
        }
    };

    const getMatchRateColor = (rate) => {
        if (rate >= 90) return 'text-green-600';
        if (rate >= 80) return 'text-blue-600';
        return 'text-yellow-600';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        e.target.focus();
    };

    const handleSubmitJob = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/job-postings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formValues,
                    requirements: formValues.requirements.split('\n'),
                    responsibilities: formValues.responsibilities.split('\n'),
                }),
            });
            const data = await response.json();
            if (data.success) {
                setJobPostings([data.data, ...jobPostings]);
                setFormValues({
                    title: '',
                    department: '',
                    location: '',
                    salary: '',
                    description: '',
                    requirements: '',
                    responsibilities: '',
                });
                setIsFormOpen(false); // Close form on success
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Failed to create job:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-8">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HR Dashboard</h1>
                    <p className="text-gray-500 dark:text-white">Manage your job postings and applicants</p>
                </div>
                <Button onClick={() => setIsFormOpen(!isFormOpen)}>
                    {isFormOpen ? 'Close Form' : 'Create Job Listing'}
                </Button>
            </div>

            {isFormOpen && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Create a Job Posting</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitJob} className="space-y-4">
                            <InputField
                                name="title"
                                value={formValues.title}
                                onChange={handleInputChange}
                                label="Job Title"
                            />
                            <InputField
                                name="department"
                                value={formValues.department}
                                onChange={handleInputChange}
                                label="Department"
                            />
                            <InputField
                                name="location"
                                value={formValues.location}
                                onChange={handleInputChange}
                                label="Location"
                            />
                            <InputField
                                name="salary"
                                value={formValues.salary}
                                onChange={handleInputChange}
                                label="Salary"
                            />
                            <InputField
                                name="type"
                                value={formValues.type}
                                onChange={handleInputChange}
                                label="Job Type (e.g., Full-Time, Part-Time)"
                            />
                            <TextareaField
                                name="description"
                                value={formValues.description}
                                onChange={handleInputChange}
                                label="Description"
                            />
                            <TextareaField
                                name="requirements"
                                value={formValues.requirements}
                                onChange={handleInputChange}
                                label="Requirements (newline-separated)"
                            />
                            <TextareaField
                                name="responsibilities"
                                value={formValues.responsibilities}
                                onChange={handleInputChange}
                                label="Responsibilities (newline-separated)"
                            />
                            <Button type="submit">Post Job</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                                <p className="text-2xl font-bold">{jobPostings.length}</p>
                            </div>
                            <Briefcase className="h-8 w-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Applicants</p>
                                <p className="text-2xl font-bold">
                                    {jobPostings.reduce((sum, job) => sum + job.applicants, 0)}
                                </p>
                            </div>
                            <Users className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Avg Match Rate</p>
                                <p className="text-2xl font-bold">
                                    {jobPostings.length > 0
                                        ? Math.round(
                                            jobPostings.reduce(
                                                (sum, job) => sum + job.matchRate,
                                                0
                                            ) / jobPostings.length
                                        )
                                        : 0}
                                    %
                                </p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">High Priority</p>
                                <p className="text-2xl font-bold">
                                    {
                                        jobPostings.filter(
                                            (job) => job.priority?.toLowerCase() === 'high'
                                        ).length
                                    }
                                </p>
                            </div>
                            <Star className="h-8 w-8 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-semibold mb-4">Active Job Postings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading && <p>Loading job postings...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {jobPostings.map((job) => (
                    <Card
                        key={job.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setSelectedJob(job)}
                    >
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>{job.title}</CardTitle>
                                <Badge variant="outline">{job.department}</Badge>
                            </div>
                            <CardDescription className="mt-2">{job.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-500" />
                                        <span className="text-gray-600">{job.location}</span>
                                    </div>
                                    <div
                                        className={`flex items-center gap-1 ${getPriorityColor(
                                            job.priority
                                        )}`}
                                    >
                                        <Star size={16} />
                                        <span>{job.priority}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Users size={16} />
                                        <span>{job.applicants} applicants</span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {new Date(job.postedDate).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Match Rate</span>
                                        <span
                                            className={`font-medium ${getMatchRateColor(
                                                job.matchRate
                                            )}`}
                                        >
                                            {job.matchRate}%
                                        </span>
                                    </div>
                                    <Progress value={job.matchRate} className="h-2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HRDashboard;
