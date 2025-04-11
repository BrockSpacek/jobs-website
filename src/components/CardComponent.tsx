import Image, { StaticImageData } from 'next/image';
import steamLogo from '@/assets/steam.png';
import metaLogo from '@/assets/meta.png';
import bestpeersLogo from '@/assets/bestpeers.png';
import blizzardLogo from '@/assets/blizzard.png';
import defaultLogo from '@/assets/default.png';
import adobeLogo from '@/assets/adobe.png';

interface CardProps {
  id: number;
  company: string;
  position: string;
  salary: string;
  onClick: () => void;
}

// Per Jacob's Recommendation to comment this out, I wanted to stop using Type anys for images. I needed each image to be on the correct mapping. 
// We define an ImageMap interface. It has string keys (company names) and values that are StaticImageData (the logo images).
// We have a company name
// We convert the name to lowercase and get rid of spaces using .toLowerCase() and .replace()
// We look up the key "name" in the imageMap object to find the same logo i.e. steam, meta, etc...
// We use the image in the card component by calling on it
interface ImageMap {
  [key: string]: StaticImageData;
}

const imageMap: ImageMap = {
  steam: steamLogo,
  meta: metaLogo,
  bestpeers: bestpeersLogo,
  blizzard: blizzardLogo,
  adobe: adobeLogo,
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