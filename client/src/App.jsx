import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-gray-600 h-screen w-screen text-center '>
        <div className='py-1/2 text-white font-serif tracking-wide'>
           <h1 className='text-7xl'>This is TechJobs</h1>
           <p className='text-md'>An Online Job Portal for Tech Jobs</p>
        </div>
      </div>
    </>
  )
}

export default App
