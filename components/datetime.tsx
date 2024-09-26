// components/DateTimePicker.tsx
import React, { useRef, useCallback } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'

interface DateTimePickerProps {
  date: Date
  onDateChange: (date: Date | null) => void
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ date, onDateChange }) => {
  const datePickerRef = useRef<DatePicker | null>(null)

  const handleOpen = useCallback(() => {
    datePickerRef.current?.setOpen(true)
  }, [])

  return (
    <div>
      <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700">
        Date
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <DatePicker
          id="date-picker"
          selected={date}
          onChange={onDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="block w-full mr-10 px-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          ref={datePickerRef}
        />
        <button
          type="button"
          onClick={handleOpen}
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          aria-label="Open date picker"
        >
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <p className="mt-1 text-sm text-gray-500">{format(date, 'PPP')}</p>
    </div>
  )
}

export default DateTimePicker
