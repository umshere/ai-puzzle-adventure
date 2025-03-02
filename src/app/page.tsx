"use client";

import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import Footer from '@/components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureCards />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
