'use client';

import React from 'react';
import { PublicationsDatabase, Publication, Author } from '../components/PublicationsDatabase';
import { useTranslations } from 'next-intl';

// 示例数据 - 实际使用时可以从API或数据库获取
const publicationsData: Publication[] = [
  {
    id: '1',
    title: 'Enhanced Stability in Perovskite Solar Cells Through Interface Engineering',
    authors: [
      { id: 'tt1', name: 'Tian Tian' },
      { id: 'abc', name: 'John Doe' },
      { id: 'def', name: 'Jane Smith' }
    ],
    journal: 'Advanced Materials',
    year: 2023,
    volume: '35',
    issue: '10',
    pages: '2201-2210',
    doi: '10.1002/adma.202200001',
    abstract: 'In this study, we develop a novel interface passivation strategy to significantly enhance the stability of perovskite solar cells under high humidity conditions. The modified devices maintain over 90% of their initial efficiency after 1000 hours of operation at 85% relative humidity.',
    keywords: ['perovskite', 'solar cells', 'stability', 'interface engineering'],
    pdfUrl: '/papers/example1.pdf',
    isHighlighted: true,
    citations: 24
  },
  {
    id: '2',
    title: 'Self-Assembly of Organic Nonlinear Optical Nanowires',
    authors: [
      { id: 'tt1', name: 'Tian Tian' },
      { id: 'ghi', name: 'Robert Johnson' }
    ],
    journal: 'ACS Nano',
    year: 2022,
    volume: '16',
    issue: '5',
    pages: '7890-7902',
    doi: '10.1021/acsnano.1c00001',
    abstract: 'We report a one-drop self-assembly method for producing high-quality organic nonlinear optical nanowires with controlled orientation and exceptional optical properties. These nanowires exhibit strong second-harmonic generation and can be integrated into various optical sensing platforms.',
    keywords: ['nonlinear optics', 'nanowires', 'self-assembly'],
    isHighlighted: true,
    citations: 17
  },
  {
    id: '3',
    title: 'Multi-photon Excited Luminescence in Pyrazolate Gold Clusters',
    authors: [
      { id: 'tt1', name: 'Tian Tian' },
      { id: 'jkl', name: 'Sarah Williams' },
      { id: 'mno', name: 'Mark Brown' }
    ],
    journal: 'Journal of the American Chemical Society',
    year: 2022,
    volume: '144',
    issue: '3',
    pages: '1234-1245',
    doi: '10.1021/jacs.1c00002',
    abstract: 'This work investigates the mechanism of multi-photon excited luminescence in pyrazolate trinuclear gold clusters. We elucidate the relationship between electronic structure and photophysical properties, providing insights for the development of new bio-imaging agents.',
    keywords: ['gold clusters', 'luminescence', 'multi-photon excitation', 'bio-imaging'],
    pdfUrl: '/papers/example3.pdf',
    citations: 11
  },
  {
    id: '4',
    title: 'Large-Area Waterproof Perovskite Luminescent Textiles',
    authors: [
      { id: 'tt1', name: 'Tian Tian' },
      { id: 'pqr', name: 'Emily Chen' }
    ],
    journal: 'Advanced Functional Materials',
    year: 2021,
    volume: '31',
    issue: '18',
    pages: '2100600-2100612',
    doi: '10.1002/adfm.202100001',
    abstract: 'We develop perovskite luminescent textiles with excellent water resistance and wash durability through innovative encapsulation techniques. These smart textiles retain high photoluminescence quantum yields even after multiple washing cycles, offering new possibilities for wearable display technologies.',
    keywords: ['perovskite', 'luminescent materials', 'smart textiles', 'waterproofing'],
    isHighlighted: true,
    citations: 35
  },
  {
    id: '5',
    title: 'In-situ Monitoring of Defect Formation in Perovskite Films',
    authors: [
      { id: 'tt1', name: 'Tian Tian' },
      { id: 'stu', name: 'David Zhang' },
      { id: 'vwx', name: 'Laura Lopez' }
    ],
    journal: 'Nature Communications',
    year: 2021,
    volume: '12',
    pages: '3456-3470',
    doi: '10.1038/s41467-021-00001-z',
    abstract: 'Using advanced in-situ characterization techniques, we reveal the dynamic processes of defect formation in perovskite films during fabrication and operation. Our findings provide crucial insights for designing more efficient and stable perovskite-based optoelectronic devices.',
    keywords: ['perovskite', 'defects', 'in-situ characterization'],
    pdfUrl: '/papers/example5.pdf',
    citations: 48
  },
  {
    id: '6',
    title: 'Lead-Free Perovskites with Enhanced Optoelectronic Properties',
    authors: [
      { id: 'tt1', name: 'Tian Tian' },
      { id: 'stu', name: 'David Zhang' }
    ],
    journal: 'Energy & Environmental Science',
    year: 2020,
    volume: '13',
    issue: '9',
    pages: '2989-3001',
    doi: '10.1039/D0EE00001A',
    abstract: 'We develop environmentally friendly lead-free perovskites with improved optoelectronic properties through molecular engineering and interface optimization. The resulting materials show promising performance in solar cells and light-emitting devices.',
    keywords: ['lead-free perovskites', 'environmental chemistry', 'solar cells'],
    pdfUrl: '/papers/example6.pdf',
    citations: 73
  },
  {
    id: '7',
    title: 'Thermal Stability Enhancement in Organic Nonlinear Optical Materials',
    authors: [
      { id: 'tt1', name: 'Tian Tian' },
      { id: 'abc', name: 'John Doe' }
    ],
    journal: 'Chemistry of Materials',
    year: 2020,
    volume: '32',
    issue: '5',
    pages: '2066-2075',
    doi: '10.1021/acs.chemmater.0c00001',
    abstract: 'This study presents strategies for improving the thermal stability of organic nonlinear optical materials using host-guest supramolecular chemistry. The resulting materials maintain their optical performance at temperatures up to 200°C, expanding their potential applications.',
    keywords: ['nonlinear optics', 'thermal stability', 'supramolecular chemistry'],
    isHighlighted: false,
    citations: 29
  },
  {
    id: '8',
    title: 'Spectroscopic Characterization of Carrier Dynamics in Perovskite Solar Cells',
    authors: [
      { id: 'tt1', name: 'Tian Tian' },
      { id: 'def', name: 'Jane Smith' },
      { id: 'yz', name: 'Thomas Wilson' }
    ],
    journal: 'Journal of Physical Chemistry Letters',
    year: 2019,
    volume: '10',
    issue: '15',
    pages: '4310-4320',
    doi: '10.1021/acs.jpclett.9c00001',
    abstract: 'We employ a comprehensive suite of spectroscopic techniques to unravel the complex carrier dynamics in perovskite solar cells with different interface materials. Our findings reveal critical factors determining charge extraction efficiency and recombination processes.',
    keywords: ['spectroscopy', 'carrier dynamics', 'perovskite solar cells'],
    pdfUrl: '/papers/example8.pdf',
    citations: 86
  }
];

export default function PublicationsPage() {
  const t = useTranslations('Publications');
  
  return (
    <div className="min-h-screen">
      <PublicationsDatabase publications={publicationsData} />
    </div>
  );
} 