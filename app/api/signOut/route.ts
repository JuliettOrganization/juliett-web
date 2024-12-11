'use server';

import { NextResponse } from 'next/server';
import { signOut } from '@/auth';

export async function POST() {
  try {
    await signOut();
    return NextResponse.json({ message: 'Signed out successfully' }, { status: 200 });
  } catch (error) {
    console.error('Sign out error:', error);
    return NextResponse.json({ message: 'Failed to sign out' }, { status: 500 });
  }
};
