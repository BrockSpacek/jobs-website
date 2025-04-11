import Image, { StaticImageData } from 'next/image';
import steamLogo from '@/assets/steam.png'
import metaLogo from '@/assets/meta.png'
import bestpeersLogo from '@/assets/bestpeers.png'
import blizzardLogo from '@/assets/blizzard.png'
import defaultLogo from '@/assets/default.png';

interface CardProps {
  id: number;
  company: string;
  position: string;
  salary: string;
  onClick: () => void;
}

interface ImageMap {
  [key: string]: StaticImageData;
}

const imageMap: ImageMap = {
  steam: steamLogo,
  meta: metaLogo,
  bestpeers: bestpeersLogo,
  blizzard: blizzardLogo,
};

export default function CardComponent({ company, position, salary, onClick }: CardProps) {
  const key = company.toLowerCase().replace(/\s/g, '');
  const imageSrc = imageMap[key] || defaultLogo;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white border border-purple-200 hover:border-purple-500 rounded-xl p-5 shadow-md hover:shadow-xl"
    >
      <div className="h-24 bg-purple-100 mb-3 rounded flex items-center justify-center overflow-hidden relative">
        <Image
          src={imageSrc}
          alt={`${company} logo`}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-xl font-bold text-purple-700">{position}</h3>
      <p className="text-sm text-gray-700">{company}</p>
      <p className="text-xs text-gray-500">{salary}</p>
    </div>
  );
}