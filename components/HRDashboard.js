// components/HRDashboard.js

'use client';

import React, { useState } from 'react';
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

const HRDashboard = () => {
    const [selectedJob, setSelectedJob] = useState(null);

    // Sample data for demonstration
    const jobPostings = [
        {
            id: 1,
            title: 'Senior Software Engineer',
            department: 'Engineering',
            location: 'Remote',
            description: 'Looking for an experienced software engineer with strong backend skills',
            applicants: 45,
            postedDate: '2024-03-15',
            priority: 'High',
            matchRate: 78,
            candidates: [
                {
                    id: 1,
                    name: 'Alice Johnson',
                    matchRate: 95,
                    experience: '5 years',
                    skills: ['React', 'Node.js', 'TypeScript'],
                    education: 'MS Computer Science',
                },
                {
                    id: 2,
                    name: 'Bob Smith',
                    matchRate: 88,
                    experience: '4 years',
                    skills: ['Python', 'Django', 'AWS'],
                    education: 'BS Software Engineering',
                },
            ],
        },
        {
            id: 2,
            title: 'Product Designer',
            department: 'Design',
            location: 'New York',
            description: 'Seeking a creative product designer with 3+ years of experience',
            applicants: 32,
            postedDate: '2024-03-10',
            priority: 'Medium',
            matchRate: 65,
            candidates: [
                {
                    id: 3,
                    name: 'Carol Williams',
                    matchRate: 92,
                    experience: '6 years',
                    skills: ['Figma', 'UI/UX', 'Prototyping'],
                    education: 'BFA Design',
                },
            ],
        },
        {
            id: 3,
            title: 'Marketing Manager',
            department: 'Marketing',
            location: 'San Francisco',
            description: 'Expert in digital marketing strategies and team leadership',
            applicants: 28,
            postedDate: '2024-03-18',
            priority: 'Low',
            matchRate: 82,
            candidates: [
                {
                    id: 4,
                    name: 'David Brown',
                    matchRate: 89,
                    experience: '7 years',
                    skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
                    education: 'MBA Marketing',
                },
            ],
        },
    ];

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
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

    if (selectedJob) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-8">
                <button
                    onClick={() => setSelectedJob(null)}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-6"
                >
                    <ChevronLeft size={20} />
                    Back to Dashboard
                </button>

                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl">{selectedJob.title}</CardTitle>
                                <CardDescription className="mt-2">
                                    {selectedJob.department} · {selectedJob.location}
                                </CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-semibold">{selectedJob.applicants} Applicants</div>
                                <div className="text-sm text-gray-500">
                                    Posted on {new Date(selectedJob.postedDate).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 dark:text-white mb-4">{selectedJob.description}</p>
                        <div className="flex items-center gap-4 mb-6">
                            <Badge variant="outline">{selectedJob.department}</Badge>
                            <Badge variant="outline">{selectedJob.location}</Badge>
                            <Badge
                                variant="outline"
                                className={getPriorityColor(selectedJob.priority)}
                            >
                                {selectedJob.priority} Priority
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Candidates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {selectedJob.candidates.map((candidate) => (
                                <div
                                    key={candidate.id}
                                    className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-zinc-800"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-2">
                                            <div className="font-semibold text-lg">{candidate.name}</div>
                                            <div className="text-sm text-gray-600 dark:text-white">Experience: {candidate.experience}</div>
                                            <div className="text-sm text-gray-600 dark:text-white">Education: {candidate.education}</div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {candidate.skills.map((skill, index) => (
                                                    <Badge key={index} variant="secondary">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <div className={`text-2xl font-bold ${getMatchRateColor(candidate.matchRate)}`}>
                                                    {candidate.matchRate}%
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-white">Match Rate</div>
                                            </div>
                                            <Button variant="ghost" size="icon" title="Message candidate">
                                                <MessageSquare className="text-blue-500" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Progress value={candidate.matchRate} className="h-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HR Dashboard</h1>
                <p className="text-gray-500 dark:text-white">Manage your job postings and applicants</p>
            </div>

            {/* Stats Overview */}
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
                                    {Math.round(
                                        jobPostings.reduce((sum, job) => sum + job.matchRate, 0) / jobPostings.length
                                    )}
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
                                        jobPostings.filter((job) => job.priority.toLowerCase() === 'high').length
                                    }
                                </p>
                            </div>
                            <Star className="h-8 w-8 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Job Postings */}
            <div className="space-y-6">
                <h2 className="text-xl font-semibold">Active Job Postings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                            className={`flex items-center gap-1 ${getPriorityColor(job.priority)}`}
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
                                                className={`font-medium ${getMatchRateColor(job.matchRate)}`}
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
        </div>
    );
};

export default HRDashboard;
