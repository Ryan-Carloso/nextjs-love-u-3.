import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does the love message delivery work?",
      answer: "Once you create your personalized love messages, we schedule them to be delivered to your loved one's app or email at the specified times. They'll receive a notification for each new message."
    },
    {
      question: "Can I change my messages or photos after I've set them up?",
      answer: "Yes! You can edit, add, or remove messages at any time through your account dashboard. Changes will be reflected in future deliveries."
    },
    {
        question: "How do I receive my personalized app after payment?",
        answer: "After the payment will be an page that you can personalize your app    , and then will generate a code that will can paste into the mobile or web to acess your page"
    },
    {
        question: "Does the personalized page have an expiration date?",
        answer: "If you choose the basic plan yes, one year. If you choose the Eternal plan the personalized app will be available to you for life."
      },
    {
      question: "Can I include photos or videos in my messages?",
      answer: "Yes, you can! in Basic or Eternal plan allows you to attach photos and short video clips to your messages, making them even more personal and memorable."
    },
    {
        question: "What is the cost to create a page on LOVEU365?",
        answer: "Currently, the cost to create a page on Loveyuu is only 12.99 in the basic plan and 17.99 in the PRO plan."
    },
    {
        question: "How long does it take to receive the Code for personalize the app?",
        answer: "Credit card payments are processed immediately."
    },
    {
        question: "How can I contact customer support?",
        answer: "You can contact our customer support via email at support@makebyryan.tech"
    },
  ]

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-pink-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-pink-600 mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-pink-100 overflow-hidden">
            <button
              className="w-full text-left p-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-pink-300"
              onClick={() => toggleQuestion(index)}
            >
              <span className="font-medium text-pink-600">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-pink-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-pink-600" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-pink-50 text-gray-600 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}