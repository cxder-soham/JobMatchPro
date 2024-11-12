"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    UserCircle2,
    Building2,
    Lock,
    Mail,
    AlertCircle,
    User,
} from "lucide-react";

const LoginPage = () => {
    const [userType, setUserType] = useState("applicant");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "applicant",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const router = useRouter();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log("Login submit triggered");
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginData.email,
                    password: loginData.password,
                }),
            });

            const data = await response.json();

            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token or user info in local storage or context if using JWT for session
            document.cookie = `auth-token=${data.token}; path=/; HttpOnly; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''
                }`;


            // Redirect based on user role
            if (data.role === 'applicant') {
                console.log("Redirecting to applicant dashboard");
                await router.push('/applicant-dashboard');
            } else if (data.role === 'hr') {
                console.log("Redirecting to HR dashboard");
                await router.push('/hr-dashboard');
            }

        } catch (err) {
            setError(err.message || 'Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Validate passwords match
        if (signupData.password !== signupData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: signupData.username,
                    email: signupData.email,
                    password: signupData.password,
                    role: signupData.role,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            // Close signup modal and show success message
            setIsSignUpOpen(false);
            // Reset form
            setSignupData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "applicant",
            });

            // Optional: Auto-fill login form with registration email
            setLoginData((prev) => ({
                ...prev,
                email: data.email,
            }));
        } catch (err) {
            setError(err.message || "Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-stone-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        JobMatch
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Find your perfect match
                    </p>
                </div>

                <Card className="border-0 shadow-xl bg-white dark:bg-white-500">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl text-center text-gray-900 dark:text-black-100">
                            Sign in
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600 dark:text-black-300">
                            Choose your account type to continue
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* User Type Selection */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <Button
                                variant={userType === "applicant" ? "default" : "outline"}
                                className="w-full h-24 flex flex-col items-center justify-center"
                                onClick={() => {
                                    setUserType("applicant");
                                    setLoginData((prev) => ({ ...prev, role: "applicant" }));
                                }}
                            >
                                <UserCircle2 className="h-6 w-6 mb-1" />
                                <span>Job Applicant</span>
                            </Button>
                            <Button
                                variant={userType === "hr" ? "default" : "outline"}
                                className="w-full h-24 flex flex-col items-center justify-center"
                                onClick={() => {
                                    setUserType("hr");
                                    setLoginData((prev) => ({ ...prev, role: "hr" }));
                                }}
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
                                <Label
                                    htmlFor="email"
                                    className="text-gray-700 dark:text-black"
                                >
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-9"
                                        value={loginData.email}
                                        onChange={(e) =>
                                            setLoginData({ ...loginData, email: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-gray-700 dark:text-black"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="pl-9"
                                        value={loginData.password}
                                        onChange={(e) =>
                                            setLoginData({ ...loginData, password: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                                onClick={handleLoginSubmit}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    `Sign in as ${userType === "applicant"
                                        ? "Job Applicant"
                                        : "HR Professional"
                                    }`
                                )}
                            </Button>

                            <div className="text-center space-y-2">
                                <Button
                                    variant="link"
                                    className="text-sm text-gray-600 dark:text-black"
                                >
                                    Forgot password?
                                </Button>
                                <div className="text-sm text-black">
                                    Don't have an account?{" "}
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
                <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800">
                    <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-gray-100">
                            Create an Account
                        </DialogTitle>
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
                            <Label htmlFor="signup-username">Username</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="signup-username"
                                    type="text"
                                    placeholder="Choose a username"
                                    className="pl-9"
                                    value={signupData.username}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, username: e.target.value })
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
                                        signupData.role === "applicant" ? "default" : "outline"
                                    }
                                    className="w-full"
                                    onClick={() =>
                                        setSignupData({ ...signupData, role: "applicant" })
                                    }
                                >
                                    <UserCircle2 className="h-4 w-4 mr-2" />
                                    Job Applicant
                                </Button>
                                <Button
                                    type="button"
                                    variant={signupData.role === "hr" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setSignupData({ ...signupData, role: "hr" })}
                                >
                                    <Building2 className="h-4 w-4 mr-2" />
                                    HR Professional
                                </Button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating account...
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LoginPage;