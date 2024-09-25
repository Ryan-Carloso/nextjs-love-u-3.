"use client"

import React, { useState, useEffect } from 'react'
import { createClient, User } from '@supabase/supabase-js'
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'

import Auth from '@/components/auth'
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
  const [email, setEmail] = useState('')

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDate(date)
    }
  }

  const pickImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const uris = Array.from(files).map(file => URL.createObjectURL(file))
      setImageUris(prevUris => [...prevUris, ...uris])
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            {!user ? (
              <div>
                <Auth value={email} onChangeText={setEmail} />

                <div className="mt-4">
                  <VideoApp />
                </div>
              </div>
            ) : (
              <>
                <Header user={user} />

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <DatePicker
                        selected={date}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                        className="form-input block w-full sm:text-sm sm:leading-5 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="mt-1 block text-sm text-gray-500">{format(date, 'PPP')}</span>
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
                      className="mt-1 block w-full sm:text-sm border-gray-500 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Separate your compliments with quotation marks (") to distinguish between them.
                    </p>                    
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Images</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={pickImage}
                      className="mt-1 w-full inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    />
                    {imageUris.length > 0 && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {imageUris.map((uri, index) => (
                          <div key={index} className="relative">
                            <Image
                              width={50}
                              height={50}
                              src={uri}
                              alt={`Selected image ${index + 1}`}
                              className="object-cover w-full h-32 rounded"
                            />
                              
                          </div>
                          
                        ))}
                      </div>
                      
                    )}
                  <p className="mt-1 text-sm text-gray-500">
                    Select the photos you want to display every day for your loved one.
                  </p>
              
                  </div>

                  <HandleSubmitComponent
                    user={user}
                    date={date}
                    compliment={compliment}
                    imageUris={imageUris}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}