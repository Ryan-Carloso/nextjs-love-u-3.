'use client'

import React, { useEffect, useState } from 'react'
import { ArrowBigDown } from 'lucide-react';
import Image from 'next/image'

interface PreviewProps {
  imageUris: string[]
  compliment: string
  dateTime: string
  couplename: string
  
}

export default function Preview({ imageUris, couplename, compliment, dateTime }: PreviewProps) {
  return (
    <div className="">
       <div className='flex justify-center items-center	'>
      <h1 className='text-lg flex justify-center mb-2'>Here's a preview 👇      </h1>
      </div> 
      
      <IPhoneMockup>
        <div className="relative h-full w-full ">
          <Notification compliment={compliment} />
          <ImageSection imageUris={imageUris} couplename={couplename}  />
          <ComplimentSection compliment={compliment} />
          <TimeElapsedSection date={dateTime} />
        </div>
      </IPhoneMockup>
    </div>
  )
}

function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
      {/* iPhone mockup contents */}
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
        <div className="absolute top-0 inset-x-0">
          <div className="mx-auto bg-black w-[40%] h-[24px] rounded-b-[1rem]"></div>
        </div>
        <div className="h-full w-full bg-white">
          <div className="flex items-center justify-center h-full text-gray-800 -z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function Notification({ compliment }: { compliment: string }) {
  return (
    <div className="absolute top-8 left-4 right-4 z-10">
      <div className="bg-gray-200 rounded-lg p-2 flex items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Image
            src="/icon.png"
            width={500}
            height={500}
            alt="Picture of the author"
          />
                  </div>
        <div className="ml-2 flex-1">
          <h1 className=" flex justify-end text-xs -mb-1 mr-1">now</h1>
          <h1 className="text-sm font-bold -mt-2">LOVEU365</h1>
          <p className="text-xs text-gray-600 truncate">{compliment}</p>

        </div>
      </div>
    </div>
  )
}

function ImageSection({ imageUris, couplename }: { imageUris: string[], couplename: string  }) {
  return (
    <div>
    <p className="text-sm text-gray-700 absolute top-[100px] left-4 right-4 flex justify-center items-center">{couplename}</p>
    <div className="absolute top-[125px] left-4 right-4 flex justify-center items-center">
      <div className="w-full h-[300px]">
        {imageUris.length > 0 ? (
          <img
            src={imageUris[0]}
            alt="Special moment"
            className="rounded-lg object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">No image loaded.</p>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

function ComplimentSection({ compliment }: { compliment: string}) {
  return (
    <div className="absolute left-4 right-4 bottom-24 text-center">
      <p className="text-sm text-gray-700">{compliment}</p>

    </div>
  )
}

function TimeElapsedSection({ date }: { date: string }) {
  const [elapsedTime, setElapsedTime] = useState<string>('')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const pastDate = new Date(date)
      const diff = now.getTime() - pastDate.getTime()
      
      // Calculate time differences
      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      const months = Math.floor(days / 30) // Simplified month calculation
      const years = Math.floor(months / 12)

      // Prepare the elapsed time string
      const timeParts: string[] = []
      if (years > 0) timeParts.push(`${years} year${years > 1 ? 's' : ''}`)
      if (months % 12 > 0) timeParts.push(`${months % 12} month${months % 12 > 1 ? 's' : ''}`)
      if (days % 30 > 0) timeParts.push(`${days % 30} day${days % 30 > 1 ? 's' : ''}`)
      if (hours % 24 > 0) timeParts.push(`${hours % 24} hour${hours % 24 > 1 ? 's' : ''}`)
      if (minutes % 60 > 0) timeParts.push(`${minutes % 60} minute${minutes % 60 > 1 ? 's' : ''}`)
      if (seconds % 60 > 0) timeParts.push(`${seconds % 60} second${seconds % 60 > 1 ? 's' : ''}`)

      setElapsedTime(timeParts.join(', '))
    }, 1000)

    return () => clearInterval(interval)
  }, [date])

  return (
    <div className="absolute left-4 right-4 bottom-10 text-center">
      <p className="text-xs text-gray-500">
      We've been together for: {elapsedTime}
      </p>
    </div>
  )
}
