import React, { ChangeEvent } from 'react';
import Image from 'next/image';

interface ImgUploadProps {
  imageUris: string[];
  pickImage: (event: ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

const ImgUpload: React.FC<ImgUploadProps> = ({ imageUris, pickImage, removeImage }) => {
  // Function to trigger the file input click
  const handleClick = () => {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div>
      <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
        Images
      </label>
      <div 
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-pink-500 border-dashed rounded-md cursor-pointer hover:bg-pink-50 transition duration-150 ease-in-out"
        onClick={handleClick} // Allow click on the whole box
      >
        <div className="space-y-2 text-center">
          <svg className="mx-auto h-12 w-12 text-pink-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium text-pink-600 cursor-pointer">Upload images</span>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
        <input
          id="image-upload"
          name="image-upload"
          type="file"
          accept="image/*"
          multiple
          className="sr-only" // Keeps the input visually hidden
          onChange={pickImage}
        />
      </div>

      {imageUris.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {imageUris.map((uri, index) => (
            <div key={index} className="relative group">
              <Image
                src={uri}
                alt={`Uploaded image ${index + 1}`}
                width={150}
                height={150}
                className="rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1 opacity-0 group-hover:opacity-100"
                aria-label="Remove image"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImgUpload;
