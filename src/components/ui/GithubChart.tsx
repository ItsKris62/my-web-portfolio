'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export default function GitHubChart() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/github');
      const data = await response.json();
      if (data.contributions) {
        setContributions(data.contributions);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="github" className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-display text-center mb-8">GitHub Contributions</h2>
        <div className="flex flex-wrap gap-1 justify-center p-6 rounded-lg bg-white/5 border border-white/10">
          {contributions.map((day, index) => (
            <motion.div
              key={index}
              className={`w-4 h-4 rounded-sm ${day.level === 0 ? 'bg-muted' : day.level === 1 ? 'bg-primary/20' : day.level === 2 ? 'bg-primary/40' : day.level === 3 ? 'bg-primary/60' : 'bg-primary'}`}
              title={`${day.date}: ${day.count} contributions`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.01 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}