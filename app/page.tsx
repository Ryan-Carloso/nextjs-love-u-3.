"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { createClient, User } from '@supabase/supabase-js'
import VideoApp from '@/components/DemoVideo'
import Header from '@/components/header'
import { HandleSubmitComponent } from '@/functions/handlesubmit'
import DateTimePicker from '@/components/datetime' 
import Compliments from '@/components/compliments' 
import ImgUpload from '@/components/imgUpload'
import Preview from '@/components/preview'
import { format } from 'date-fns'
import PricingModel from '@/components/pricing'

// Access the environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

export default function DatePickerWithSupabase() {
  const [date, setDate] = useState(new Date())
  const [compliment, setCompliment] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUris, setImageUris] = useState<string[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [, setError] = useState<string | null>(null)

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
    <div className="min-h-screen bg-pink-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-pink-200">
          <div className="px-4 py-5 sm:p-6">
            <Header />

            <div className="lg:flex lg:space-x-8">
              <div className="lg:w-1/2">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <div className="mb-4">
                    <h2 className="text-center text-pink-600 text-xl font-bold">Pick a special date ❤️</h2>
                  </div>

                  <DateTimePicker date={date} onDateChange={handleDateChange} />

                  <Compliments compliment={compliment} setCompliment={setCompliment} />

                  <ImgUpload imageUris={imageUris} pickImage={pickImage} removeImage={removeImage} />
                  
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

              <div className="mt-8 lg:mt-0 lg:w-1/2">
                <Preview 
                  imageUris={imageUris} 
                  compliment={compliment} 
                  dateTime={format(date, 'MMMM dd, yyyy HH:mm:ss')}
                />
              </div>
            </div>
          </div>
        </div>

        <VideoApp />
      </div>

      <div className="mt-8">
        <PricingModel/>
      </div>
    </div>
  )
}