"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createClient, User } from '@supabase/supabase-js'
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'

import VideoApp from '@/components/DemoVideo'
import Header from '@/components/header'
import { HandleSubmitComponent } from '@/functions/handlesubmit'

// Supabase client setup
const supabase = createClient(
  'https://laqxbdncmapnhorlbbkg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcXhiZG5jbWFwbmhvcmxiYmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjg2MTcyNSwiZXhwIjoyMDQyNDM3NzI1fQ.Xr3j4FThRX5C0Zk5txIqobebk6v5FBf2K5Mahe8vdzY'
)

export default function DatePickerWithSupabase() {
  const [date, setDate] = useState(new Date())
  const [compliment, setCompliment] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUris, setImageUris] = useState<string[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  const datePickerRef = useRef<DatePicker | null>(null)

  // Hardcoded email and password for testing
  const TEST_USER_EMAIL = 'admin@makedbyryan.tech'
  const TEST_USER_PASSWORD = 'adminpassword134#'

  useEffect(() => {
    const signInUser = async () => {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
      })

      if (error) {
        setError(error.message)
        setUser(null)
      } else {
        setUser(data.user)
        setError(null)
      }
      setLoading(false)
    }

    signInUser()
  }, [])

  const handleDateChange = useCallback((selectedDate: Date | null) => {
    if (selectedDate) {
      setDate(selectedDate)
    }
  }, [])

  const pickImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const uris = Array.from(files).map(file => URL.createObjectURL(file))
      setImageUris(prevUris => [...prevUris, ...uris])
    }
  }, [])

  const removeImage = useCallback((index: number) => {
    setImageUris(prevUris => prevUris.filter((_, i) => i !== index))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <Header />
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div>
                  <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700">Date</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <DatePicker
                      id="date-picker"
                      selected={date}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select a date"
                      className="block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      ref={datePickerRef}
                    />
                    <button
                      type="button"
                      onClick={() => datePickerRef.current?.setOpen(true)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      aria-label="Open date picker"
                    >
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{format(date, 'PPP')}</p>
                </div>

                <div>
                  <label htmlFor="compliment" className="block text-sm font-medium text-gray-700">
                    Compliment
                  </label>
                  <textarea
                    id="compliment"
                    value={compliment}
                    onChange={(e) => setCompliment(e.target.value)}
                    placeholder='Enter your compliments here. Separate them with quotation marks, e.g., "I will love you every day for the rest of my life." "I want to spend every moment by your side. I love you!"'
                    rows={4}
                    className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    aria-describedby="compliment-description"
                  />
                  <p id="compliment-description" className="mt-1 text-sm text-gray-500">
                    Separate your compliments with quotation marks (") to distinguish between them.
                  </p>
                </div>

                <div>
                  <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">Images</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Upload images</span>
                          <input
                            id="image-upload"
                            name="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="sr-only"
                            onChange={pickImage}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
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
              <div className='flex items-center justify-center w-full py-1 px-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:from-rose-500 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 ' >
                <HandleSubmitComponent
                  user={user}
                  date={date}
                  compliment={compliment}
                  imageUris={imageUris}
                  loading={loading}
                  setLoading={setLoading}
                />
                </div>

                
              </form>
            
          </div>
        </div>
        <VideoApp />
      </div>
    </div>
  )
}
