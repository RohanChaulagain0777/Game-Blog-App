import { Mail } from 'lucide-react';
import React, { useState } from 'react';


const Contact = () => {

  const [name, setname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');


  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(message);

    setname('');
    setEmail('');
    setMessage('');
  }


  return (
    <div className='flex justify-center items-center flex-col gap-10 w-full mb-10 h-[80vh]'>
      <h1 className='font-bold text-4xl tracking-tight '>Contact us</h1>
      <div className='flex justify-between items-center gap-10 w-[80%]'>
        <form className='flex gap-8 flex-col' onSubmit={handleSubmit}>
          <input type="text" placeholder="UserName" value={name} onChange={(e) => setname(e.target.value)}  className=' py-3 px-4 rounded-2xl border border-black focus:ring-2 focus:ring-blue-500 outline-none dark:border-white dark:border-2  dark:text-white ' required/>

          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}  className=' py-3 px-4 rounded-2xl border border-black focus:ring-2 focus:ring-blue-500 outline-none dark:border-white dark:border-2  dark:text-white  ' required/>

          <textarea name="Message" id="message" value={message} onChange={(e) => setMessage(e.target.value)}  placeholder='Message here...' className=' w-70 h-30 py-2 px-3 rounded-2xl border border-black focus:ring-2 focus:ring-blue-500 outline-none dark:border-white dark:border-2  dark:text-white  ' required></textarea>

          <button className='bg-lime-500 text-white py-2 rounded-md font-semibold hover:bg-lime-600 transition cursor-pointer'>Submit</button>
          <div className='flex gap-2'>
            <h1><Mail size={40}/></h1>
            <div>
              <h3 className='font-semibold text-md'>Owner Contact</h3>
              <p className='text-sm'>Email: user@gmail.com</p>
            </div>
          </div>
          
        </form>
        <div>
          <img src="src/assets/Contact.jfif"  className='w-100 h-80 rounded-lg'/>
        </div>
      </div>
    </div>
  )
}

export default Contact
