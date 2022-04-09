import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckIcon, MailIcon  } from '@heroicons/react/solid';

function ContactForm() {
	const [ formSubmitted, setFormSubmitted ] = useState(false);
  const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [comment, setComment] = useState('');

	const { register, handleSubmit, errors } = useForm();

	const encode = (data) => {
		return Object.keys(data)
			.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
			.join('&')
	};

	const onSubmit = async (data) => {
		var formattedData = {
			name: name,
			email: email,
			comment: comment
		};

		console.log(formattedData);
		await fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				'form-name': 'contact',
				...formattedData,
			}),
		})

		// submit form and then change state so icon change
		setFormSubmitted(true);
	};

	const handleChange = (event) => {
		switch(event.target.name){
			case "name":
				setName(event.target.value);
				break;
			case "email":
				setEmail(event.target.value);
				break;
			case "comment":
				setComment(event.target.value);
				break;
			default:
				console.log(event.target.value);
				break;
		}
	};

	return (
		<form 
    action="contact/?success=true"
      name="contact" method="POST" onSubmit={handleSubmit(onSubmit)} className="contact" netlify data-netlify="true" data-netlify-honeypot="bot-field">
      <label className="block">
        <span className="text-gray-700">Full name</span>
      <input             
          {...register('name', { required: true })} type="text" id="name" name="name" value={name}  className="
            mt-1
            block
            w-full
            rounded-md
            border-gray-300
            shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="" onChange={handleChange} 
      />
      </label>
      <label className="block">
        <span className="text-gray-700">Email address</span>
        <input {...register('email', { required: true })} name="email" id="email" value={email} onChange={handleChange} type="email" className="
            mt-1
            block
            w-full
            rounded-md
            border-gray-300
            shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="john@example.com" />
      </label>
      <div className='mt-2'>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Add any additional comments
        </label>
        <textarea           
          {...register('comment', { required: false })}
          value={comment} onChange={handleChange} name="comment" 
          id="comment"
          className="
          mt-1
          block
          w-full
          rounded-md
          border-gray-300
          shadow-sm
          focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
          rows={3}></textarea>
      </div>
      
      <p className='mt-4'>
        <button
          type="submit"
          onClick={onSubmit}
          disabled={formSubmitted}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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
      <input className="hidden" type="hidden" name="form-name" value="contact" />
				<p hidden className="hidden">
					<label>
						Don’t fill this out: <input name="bot-field" onChange={() => {}} />
					</label>
				</p>

    </form>
	);
}

export default ContactForm;
