'use client';

import { useState } from 'react';
import jobData from '@/utils/JobEntries.json';
import CardComponent from '@/components/CardComponent';
import Image, { StaticImageData } from 'next/image';
import steamLogo from '@/assets/steam.png';
import metaLogo from '@/assets/meta.png';
import bestpeersLogo from '@/assets/bestpeers.png';
import blizzardLogo from '@/assets/blizzard.png';
import defaultLogo from '@/assets/default.png';
import adobeLogo from '@/assets/adobe.png';


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

export default function Home() {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('');

  const selectedJob = jobData.find((job) => job.id === selectedJobId);

  const filteredJobs = jobData.filter(
    (job) =>
      job.position.toLowerCase().includes(filter.toLowerCase()) ||
      job.company.toLowerCase().includes(filter.toLowerCase())
  );

  const getCompanyLogo = (company: string) => {
    const key = company.toLowerCase().replace(/\s/g, '');
    return imageMap[key] || defaultLogo;
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-900">
      <h1 className="text-4xl font-extrabold mb-8 text-center">🌟 Dream Job Board 🌟</h1>

      {!selectedJob && (
        <div className="mb-6 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      )}

      {selectedJob ? (
        <div className="relative p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-purple-300">
          <button
            onClick={() => setSelectedJobId(null)}
            className="absolute top-1 right-1 text-2xl text-black font-bold hover:text-red-700"
            title="Close"
          >
            X
          </button>

          <div className="mb-4">
            <div className="h-32 w-full bg-purple-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative">
              <Image
                src={getCompanyLogo(selectedJob.company)}
                alt={selectedJob.company}
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold">{selectedJob.position}</h2>
            <p className="text-lg text-purple-700 font-medium mb-2">{selectedJob.company}</p>
            <p className="text-sm font-medium italic text-gray-600">{selectedJob.salary}</p>
          </div>

          <div className="space-y-4 text-gray-800">
            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-1">Why I am Interested:</h3>
              <p>{selectedJob.whyInterested}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-1">Requirements:</h3>
              <ul className="list-disc list-inside space-y-1">
                {selectedJob.requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-1">Benefits:</h3>
              <ul className="list-disc list-inside space-y-1">
                {selectedJob.benefits.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-1">Skills I Need to Learn:</h3>
              <p>{selectedJob.skillsToLearn}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-1">My Goals:</h3>
              <p>{selectedJob.goals}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <CardComponent
              key={job.id}
              id={job.id}
              company={job.company}
              position={job.position}
              salary={job.salary}
              onClick={() => setSelectedJobId(job.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}