import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className='flex justify-center items-center flex-col gap-10 w-full mb-10'>
      <h1 className='font-bold text-3xl tracking-tight '>Contact Us</h1>
      <div className='flex justify-between items-center gap-10 w-[80%]'>
        <div className='flex gap-8 flex-col'>
          <input type="text" placeholder="UserName" className=' py-3 px-4 rounded-2xl border border-black focus:ring-2 focus:ring-blue-500 outline-none dark:border-white dark:border-2  dark:text-white '/>
          <input type="email" placeholder="Email Address" className=' py-3 px-4 rounded-2xl border border-black focus:ring-2 focus:ring-blue-500 outline-none dark:border-white dark:border-2  dark:text-white  '/>
          <textarea name="Message" id="message" placeholder='Message here...' className=' w-70 h-30 py-2 px-3 rounded-2xl border border-black focus:ring-2 focus:ring-blue-500 outline-none dark:border-white dark:border-2  dark:text-white  '></textarea>
          <button  className='bg-lime-500 text-white py-2 rounded-md font-semibold hover:bg-lime-600 transition cursor-pointer'>Submit</button>
          <div className='flex gap-2'>
            <h1><Mail size={40}/></h1>
            <div>
              <h3 className='font-semibold text-md'>Owner Contact</h3>
              <p className='text-sm'>Email: user@gmail.com</p>
            </div>
          </div>
          
        </div>
        <div>
          <img src="src/assets/Contact.jfif"  className='w-100 h-80 rounded-lg'/>
        </div>
      </div>
    </div>
  )
}

export default Contact
