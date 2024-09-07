// src/app/lib/session.ts

import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = process.env.SESSION_SECRET || 'default_secret_key';
const iv = Buffer.alloc(16, 0);

interface SessionData {
  email?: string;
  userId?: string;
  // Add other session fields here if necessary
}

export async function decrypt(encryptedText: string | undefined): Promise<SessionData | null> {
  if (!encryptedText) return null;

  try {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  } catch (error) {
    return null;
  }
}
