import React, { useState } from 'react';
import Modal from './modal'; // Modal componentini ekliyoruz

export default function ListingCard({ listing }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal durumu

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="group relative">
        
        <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
        <p className="text-gray-500"> Kategori: {listing.fortuneType}</p>
        <p className="text-gray-500"> Yükleyen: {listing.user_id}</p>


          <img src={listing.imageSrc} alt={listing.imageAlt} className="object-cover object-center" />
          <div className="flex items-end p-4 opacity-0 group-hover:opacity-100" aria-hidden="true">
            
            <button
              onClick={openModal} // Modal'ı aç
              className="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter cursor-pointer"
            >
              View Product
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
          <h3>
            <button onClick={openModal}> {/* Modal'ı aç */}
              <span aria-hidden="true" className="absolute inset-0" />
              {listing.name} {/* İlan adını burada gösteriyoruz */}
            </button>
          </h3>
          <p>{listing.price}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">{listing.category}</p>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold mb-4">{listing.name}</h2>
        <img src={listing.imageSrc} alt={listing.imageAlt} className="w-full h-64 object-cover mb-4" />
        <p className="text-gray-700">{listing.description}</p>
        <p className="text-gray-900 font-bold mt-4">Fiyat: {listing.price}</p>
        <p className="text-gray-500">Kategori: {listing.fortuneType}</p>
        <p className="text-gray-500">Açıklama: {listing.question}</p>

      </Modal>
    </>
  );
}