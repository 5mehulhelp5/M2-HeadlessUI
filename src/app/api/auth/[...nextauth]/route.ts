import connection from '@/lib/admin/db';
import { compare } from 'bcrypt';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { RowDataPacket } from 'mysql2/promise'; // Import if using mysql2 library
import { authOptions } from './authOption';
interface AdminUser {
  user_id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}


// Export the handler for GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
