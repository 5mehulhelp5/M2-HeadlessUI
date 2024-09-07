// app/api/route.ts
import connection from '@/lib/admin/db';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password, firstname, lastname , username} = await req.json();
    const hashed = await hash(password, 12);

    // Create a new user in the database
    const [result] = await connection.execute(
      'INSERT INTO admin_user (email, firstname, lastname,username, password) VALUES (?, ?,?,?,?)',
      [email, firstname,lastname ,username,hashed ]
    );

    // You may want to check if the insertion was successful
    if (result) {
      return NextResponse.json({
        user: {
          email
        },
        status: true
      });
    }

    throw new Error('Failed to create user');

  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: err.message
      }),
      {
        status: 500
      }
    );
  }
}
