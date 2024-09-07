import { NextResponse,NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connection from '@/lib/admin/db';
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { ResultSetHeader } from 'mysql2';

// Ensure these are set in your environment variables
const secret = process.env.NEXTAUTH_SECRET! || 'secreat';
const tableName = process.env.HERO_SECTION! || 'm2_hero_section';

// Handle POST requests
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret });
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {

    const formData = await req.formData();
    const title = await formData.get('title') as string;
    const description = await formData.get('description') as string;
    const buttonText = await formData.get('buttonText') as string;
    const imageFile = await formData.get("image") as File || null;// file get from form data
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const relativeUploadDir = '/uploads/';

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    try {
      await stat(uploadDir);

    } catch (e: any) {
      if (e.code === "ENOENT") {
        // This is for checking the directory is exist (ENOENT : Error No Entry)
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

    try {
      const filename = `${imageFile.name}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `${relativeUploadDir}${filename}`;

      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO ${tableName} (imageUrl, title, description, buttonText) VALUES (?, ?, ?, ?)`,
        [fileUrl, title, description, buttonText]
      );
      console.log(result);
      const insertedId = result.insertId as number;
      if (insertedId) {
        // Construct an absolute URL for redirection
        return NextResponse.json({ success: true, message: 'Data Uploaded Successfully!',id:insertedId }, { status: 200 });
      }

      return NextResponse.json({ success: true, message: 'Data Uploaded Successfully!' }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }


  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('getslide');
    if (!id) {
      const data = await connection.query<ResultSetHeader>(`SELECT * FROM ${tableName}`);
      return NextResponse.json({ success: true, data: data[0] }, { status: 200 });
    } else {
      const data = await connection.query<ResultSetHeader>(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
      return NextResponse.json({ success: true, data: data[0] }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    // Extracting the query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('slide'); // Getting 'slide' param from the query

    if (!id) {
      return NextResponse.json({ success: false, message: 'No ID provided' }, { status: 400 });
    }

    // Deleting the record with the specified id from the database
    await connection.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);

    return NextResponse.json({ success: true, message: 'Data Deleted Successfully!' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const id = formData.get('id') as string;
    const description = formData.get('description') as string;
    const buttonText = formData.get('buttonText') as string;
    const imageFile = formData.get("image") as File || null; // Image file from form data

    let fileUrl = null;

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const relativeUploadDir = '/uploads/';
      const uploadDir = join(process.cwd(), "public", relativeUploadDir);

      try {
        await stat(uploadDir);
      } catch (e: any) {
        if (e.code === "ENOENT") {
          // Check if the directory exists (ENOENT: Error No Entry)
          await mkdir(uploadDir, { recursive: true });
        } else {
          console.error(
            "Error while trying to create directory when uploading a file\n",
            e
          );
          return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
          );
        }
      }

      try {
        const filename = `${imageFile.name}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        fileUrl = `${relativeUploadDir}${filename}`;
      } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }

    // Conditional SQL query based on whether an image is uploaded
    let query;
    let queryParams;
    if (fileUrl) {
      query = `UPDATE ${tableName} SET imageUrl = ?, title = ?, description = ?, buttonText = ? WHERE id = ?`;
      queryParams = [fileUrl, title, description, buttonText, id];
    } else {
      query = `UPDATE ${tableName} SET title = ?, description = ?, buttonText = ? WHERE id = ?`;
      queryParams = [title, description, buttonText, id];
    }

    // Execute query
    try {
      const [result] = await connection.query<ResultSetHeader>(query, queryParams);
      const insertedId = result.insertId;
      if(insertedId){
        return NextResponse.json({ success: true, message: 'Data Updated Successfully!',id:insertedId }, { status: 200 });
      }
      return NextResponse.json({ success: true, message: 'Data Updated Successfully!' }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
