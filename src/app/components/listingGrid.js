import React from 'react';
import ListingCard from './listingCard';

export default function ListingGrid({ listings }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
      
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
        
      ))}
    </div>
  );
}
