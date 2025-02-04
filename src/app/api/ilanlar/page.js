"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import ListingGrid from '../../components/listingGrid';

export default function Example() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // İlanları API'den çek
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/auth/listings'); // API endpoint'iniz
        const data = await response.json();
        if (data.success) {
          setListings(data.listings); // İlanları ayarla
        } else {
          console.error('Hata:', data.error);
        }
      } catch (error) {
        console.error('İlanlar çekilirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="bg-white">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-lg font-medium text-gray-900">Customers also viewed</h2>
          <a href="#" className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View all
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ListingGrid listings={listings} />
        )}
      </div>
    </div>
  );
}
