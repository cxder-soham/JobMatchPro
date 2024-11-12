// components/Navbar.js

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className="p-4 bg-gray-200 dark:bg-gray-800">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/">Home</Link>
                </li>
                {session ? (
                    <>
                        {session.user.role === 'applicant' && (
                            <li>
                                <Link href="/applicant-dashboard">Dashboard</Link>
                            </li>
                        )}
                        {session.user.role === 'hr' && (
                            <li>
                                <Link href="/hr-dashboard">HR Dashboard</Link>
                            </li>
                        )}
                        <li>
                            <button onClick={() => signOut()}>Sign Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
