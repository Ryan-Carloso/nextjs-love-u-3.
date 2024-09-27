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

import PricingModel from '@/components/pricing'

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
  const [, setError] = useState<string | null>(null)

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
    <div className="min-h-screen bg-pink-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-pink-200">
          <div className="px-4 py-5 sm:p-6">
            <Header />

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="mb-4">
                <h2 className="text-center text-pink-600 text-xl font-bold">Pick a special date ❤️</h2>
              </div>

              <DateTimePicker date={date} onDateChange={handleDateChange} />

              <Compliments compliment={compliment} setCompliment={setCompliment} />

              <ImgUpload imageUris={imageUris} pickImage={pickImage} removeImage={removeImage} />
              <Preview imageUris={imageUris} compliment={compliment} dateTime={date} />

              <HandleSubmitComponent
                user={user}
                date={date}
                compliment={compliment}
                imageUris={imageUris}
                loading={loading}
                setLoading={setLoading}
              />

            </form>
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
