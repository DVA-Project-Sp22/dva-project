import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckIcon, MailIcon } from '@heroicons/react/solid'

function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')

  const { register, handleSubmit, errors } = useForm()

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&')
  }

  const onSubmit = async (data) => {
    var formattedData = {
      name: 'Ryan M', // name,
      email: 'ryan10921@gmail.com', //v email,
      comment: 'Does this work?', // comment,
    }

    console.log(formattedData)
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...formattedData,
      }),
    })

    // submit form and then change state so icon change
    setFormSubmitted(true)
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value)
        break
      case 'email':
        setEmail(event.target.value)
        break
      case 'comment':
        setComment(event.target.value)
        break
      default:
        console.log(event.target.value)
        break
    }
  }

  return (
    <form
      name="contact"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="contact"
      data-netlify="true"
    >
      <input
        className="hidden"
        type="hidden"
        name="form-name"
        value="contact"
      />
      <p className="mt-4">
        <button
          type="submit"
          onClick={onSubmit}
          disabled={formSubmitted}
          className="inline-flex items-center px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-red-500 to-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {!formSubmitted && (
            <>
              <span>Submit Feedback</span>
              <MailIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
            </>
          )}

          {formSubmitted && (
            <>
              <span>Submitted</span>
              <CheckIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </p>
    </form>
  )
}

export default ContactForm
