// components/withAuth.js

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent, requiredRole) => {
    return (props) => {
        const { data: session, status } = useSession();
        const router = useRouter();

        if (status === 'loading') {
            return <p>Loading...</p>;
        }

        if (!session) {
            signIn(); // Redirect to login
            return null;
        }

        if (requiredRole && session.user.role !== requiredRole) {
            router.replace('/unauthorized');
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
