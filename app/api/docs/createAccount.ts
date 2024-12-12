import { NextApiRequest, NextApiResponse } from 'next';
import { createAccount } from '@/app/lib/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const formData = new FormData();
    Object.entries(req.body).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const response = await createAccount({}, formData);
    if (response.errors) {
      res.status(400).json({ errors: response.errors });
    } else {
      res.status(200).json({ message: 'Account created successfully' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}