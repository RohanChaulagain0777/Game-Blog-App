import { Mail } from 'lucide-react';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {

  const form = useRef<HTMLFormElement>(null);
  const [name, setname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    setStatus('sending');

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus('success');
      setname('');
      setEmail('');
      setMessage('');
    })
    .catch((error) => {
      console.error('Failed to send:', error);
      setStatus('error');
    });
  };

  return (
    <div className='flex justify-center items-center flex-col gap-10 w-full mb-10 h-[80vh]'>
      <h1 className='font-bold text-4xl tracking-tight'>Contact us</h1>
      <div className='flex justify-between items-center gap-10 w-[80%]'>
        <form ref={form} className='flex gap-8 flex-col' onSubmit={handleSubmit}>

          <input
            type="text"
            name="from_name"         
            placeholder="UserName"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className='py-3 px-4 rounded-2xl border border-black focus:ring-2 focus:ring-blue-500 outline-none dark:border-white dark:border-2 dark:text-white'
            required
          />

          <input
            type="email"
            name="from_email"        
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='py-3 px-4 rounded-2xl border border-black focus:ring-2 focus:ring-blue-500 outline-none dark:border-white dark:border-2 dark:text-white'
            required
          />

          <textarea
            name="message"           
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Message here...'
            className='w-70 h-30 py-2 px-3 rounded-2xl border border-black focus:ring-2 focus:ring-blue-500 outline-none dark:border-white dark:border-2 dark:text-white'
            required
          />


          {status === 'success' && (
            <p className='text-green-500 font-medium text-sm'>✅ Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className='text-red-500 font-medium text-sm'>❌ Failed to send. Please try again.</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className='bg-lime-500 text-white py-2 rounded-md font-semibold hover:bg-lime-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {status === 'sending' ? 'Sending...' : 'Submit'}
          </button>

          <div className='flex gap-2'>
            <h1><Mail size={40} /></h1>
            <div>
              <h3 className='font-semibold text-md'>Owner Contact</h3>
              <p className='text-sm'>Email: user@gmail.com</p>
            </div>
          </div>

        </form>
        <div>
          <img src="src/assets/Contact.jfif" className='w-100 h-80 rounded-lg' />
        </div>
      </div>
    </div>
  );
};

export default Contact;