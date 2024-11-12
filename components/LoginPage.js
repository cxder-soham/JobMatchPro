// components/LoginPage.js

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    UserCircle2,
    Building2,
    Lock,
    Mail,
    AlertCircle,
    User,
} from 'lucide-react';

const LoginPage = () => {
    const [userType, setUserType] = useState('applicant');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'applicant',
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const router = useRouter();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (email && password) {
                // Success simulation
                console.log('Logged in as:', userType);
                if (userType === 'applicant') {
                    router.push('/applicant-dashboard');
                } else {
                    router.push('/hr-dashboard');
                }
            } else {
                setError('Please fill in all fields');
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validate passwords match
        if (signupData.password !== signupData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            console.log('Signed up:', signupData);
            setIsLoading(false);
            setIsSignUpOpen(false);
            // Reset form
            setSignupData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                userType: 'applicant',
            });
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-stone-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">JobMatch</h1>
                    <p className="text-gray-600 dark:text-gray-300">Find your perfect match</p>
                </div>

                <Card className="border-0 shadow-xl bg-white dark:bg-white-500">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl text-center text-gray-900 dark:text-black-100">Sign in</CardTitle>
                        <CardDescription className="text-center text-gray-600 dark:text-black-300">
                            Choose your account type to continue
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* User Type Selection */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <Button
                                variant={userType === 'applicant' ? 'default' : 'outline'}
                                className="w-full h-24 flex flex-col items-center justify-center"
                                onClick={() => setUserType('applicant')}
                            >
                                <UserCircle2 className="h-6 w-6 mb-1" />
                                <span>Job Applicant</span>
                            </Button>
                            <Button
                                variant={userType === 'hr' ? 'default' : 'outline'}
                                className="w-full h-24 flex flex-col items-center justify-center"
                                onClick={() => setUserType('hr')}
                            >
                                <Building2 className="h-6 w-6 mb-1" />
                                <span>HR Professional</span>
                            </Button>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            {error && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 dark:text-black">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-9"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700 dark:text-black">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-black-500" />
                                    <Input
                                        id="password"   
                                        type="password"
                                        placeholder="Enter your password"
                                        className="pl-9 bg-white dark:bg-black-700 text-gray-900 dark:text-black-100"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    `Sign in as ${userType === 'applicant' ? 'Job Applicant' : 'HR Professional'}`
                                )}
                            </Button>

                            <div className="text-center space-y-2">
                                <Button variant="link" className="text-sm text-gray-600 dark:text-black">
                                    Forgot password?
                                </Button>
                                <div className="text-sm text-black">
                                    Don't have an account?{' '}
                                    <Button
                                        variant="link"
                                        className="p-0 text-blue-600 dark:text-blue-400"
                                        onClick={() => setIsSignUpOpen(true)}
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Sign Up Modal */}
            <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-black">
                    <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-gray-100">Create an Account</DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-300">
                            Join JobMatch to start your journey
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSignupSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="signup-fullname">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="signup-fullname"
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="pl-9"
                                    value={signupData.fullName}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, fullName: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="signup-email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pl-9"
                                    value={signupData.email}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, email: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="signup-password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="signup-password"
                                    type="password"
                                    placeholder="Create a password"
                                    className="pl-9"
                                    value={signupData.password}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, password: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="signup-confirm-password"
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="pl-9"
                                    value={signupData.confirmPassword}
                                    onChange={(e) =>
                                        setSignupData({
                                            ...signupData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Account Type</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    type="button"
                                    variant={
                                        signupData.userType === 'applicant' ? 'default' : 'outline'
                                    }
                                    className="w-full"
                                    onClick={() =>
                                        setSignupData({ ...signupData, userType: 'applicant' })
                                    }
                                >
                                    <UserCircle2 className="h-4 w-4 mr-2" />
                                    Job Applicant
                                </Button>
                                <Button
                                    type="button"
                                    variant={signupData.userType === 'hr' ? 'default' : 'outline'}
                                    className="w-full"
                                    onClick={() =>
                                        setSignupData({ ...signupData, userType: 'hr' })
                                    }
                                >
                                    <Building2 className="h-4 w-4 mr-2" />
                                    HR Professional
                                </Button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LoginPage;
