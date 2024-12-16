import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

// Import images directly
import image1 from '@/public/accounts/image3.jpg';
import image2 from '@/public/accounts/image4.jpg';
import image3 from '@/public/accounts/image1.jpg';
import image4 from '@/public/accounts/image2.jpg';

const iconMap = {
  basic: ArrowRightCircleIcon,
};

const imagePaths = [
  image1,
  image2,
  image3,
  image4,
  // Add more image paths as needed
];

export default function CardWrapper() {
  const Basic_account = 'This is a normal account.';
  const Admin_account = 'This is the Admin page.';

  const cards: { title: string; value: string; type: 'basic'; path: string; image: StaticImageData; }[] = [
    { title: 'ABCD Travel Global', value: Basic_account, type: 'basic', path: '/home_account', image: imagePaths[0] },
    { title: 'Admin', value: Admin_account, type: 'basic', path: '/home_user/admin', image: imagePaths[1] },
    // Add more cards as needed
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[80vw]">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}

export function Card({
  title,
  value,
  type,
  path,
  image,
}: {
  title: string;
  value: string;
  type: keyof typeof iconMap;
  path: string;
  image: StaticImageData;
}) {
  const Icon = iconMap[type];

  return (
    <Link href={path} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Image src={image} alt={title} width={400} height={200} className="w-full h-48 object-cover" />
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Icon className="w-6 h-6 text-gray-500" />
          <span className="text-lg font-semibold">{title}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-700">{value}</p>
      </div>
      <div className="p-4 border-t">
        <div  className="text-blue-500 hover:underline">
          Click here to access this account
        </div>
      </div>
    </Link>
  );
}
