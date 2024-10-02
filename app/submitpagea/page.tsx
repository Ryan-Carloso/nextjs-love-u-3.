"use client"

import React, { useState, useEffect, useCallback } from 'react'
import VideoApp from '@/components/DemoVideo'
import Header from '@/components/header'
import DateTimePicker from '@/components/datetime' 
import Compliments from '@/components/compliments' 
import ImgUpload from '@/components/imgUpload'
import Preview from '@/components/preview'
import { format } from 'date-fns'
import PricingModel from '@/components/pricing'
import AlertGoPay from '@/functions/AlertGoPay'
import HowWorks from '@/components/HowWorks'
import FAQ from '@/components/FAQ'
import SocialMedia from '@/components/SocialMedia'
import { signInUser } from '@/functions/supabase'



import { HandleSubmitComponent } from '@/functions/handlesubmit'
//will use this on the future to go to supabase
//import supabase, { signInUser } from '@/functions/supabase'

export default function App() {
  const [date, setDate] = useState(new Date())
  const [compliment, setCompliment] = useState('')
  const [imageUris, setImageUris] = useState<string[]>([])
  const [, setError] = useState<string | null>(null)
  const [couplename, setCouplename] = useState('')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const TEST_USER_EMAIL = 'admin@makedbyryan.tech'
  const TEST_USER_PASSWORD = 'adminpassword134#'

  useEffect(() => {
    const authenticateUser = async () => {
      setLoading(true)
      const { data, error } = await signInUser(TEST_USER_EMAIL, TEST_USER_PASSWORD)

      if (error) {
        setError(error.message)
        setUser(null)
      } else {
        setUser(data?.user)
        setError(null)
      }
      setLoading(false)
    }

    authenticateUser()
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

                  <Compliments compliment={compliment} setCompliment={setCompliment} couplename={couplename} setCouplename={setCouplename} />
                  <p className='text-xs text-gray-800'>Separete by "</p>


                  <ImgUpload imageUris={imageUris} pickImage={pickImage} removeImage={removeImage} />

                  <div className=' mb-16 flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:from-rose-500 hover:to-pink-600 transition-all duration-400 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400' >

                  <HandleSubmitComponent
                  user={user}
                  date={date}
                  compliment={compliment}
                  imageUris={imageUris}
                  loading={loading}
                  setLoading={setLoading}
                  couplename={couplename}
                />
                </div>


                </form>
              </div>

              <div className="mt-8 lg:mt-0 lg:w-1/2">
                <Preview 
                  imageUris={imageUris} 
                  compliment={compliment} 
                  dateTime={format(date, 'MMMM dd, yyyy HH:mm:ss')}
                  couplename={couplename}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <HowWorks /> 
        </div>
        <SocialMedia/>

      </div>
    </div>
  )
}
