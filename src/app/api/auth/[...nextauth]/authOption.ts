import connection from '@/lib/admin/db';
import { compare } from 'bcrypt';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { RowDataPacket } from 'mysql2/promise'; // Import if using mysql2 library
interface AdminUser {
    user_id: number;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
  }
export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/admin/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'hello@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                try {
                    // Query the user from MySQL database
                    const [rows] = await connection.execute<AdminUser[] & RowDataPacket[]>(
                        'SELECT * FROM admin_user WHERE email = ? OR username = ?',
                        [credentials.email, credentials.email]
                    );

                    const user = rows[0];

                    if (!user) {
                        return null;
                    }

                    // Check password
                    const isPasswordValid = await compare(credentials.password, user.password);

                    if (!isPasswordValid) {
                        return null;
                    }

                    return {
                        id: user.user_id.toString(),
                        email: user.email,
                        name: `${user.firstname} ${user.lastname}`,
                        randomKey: 'Hey Dev',
                    };
                } catch (err) {
                    console.error('Authorization error:', err);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
    },
};