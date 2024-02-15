import React from 'react'

export default function NotFound() {
  return (
    <div className='container flex justify-center items-center h-[80dvh]'>
        <div className='bg-slate-700 h-60 max-w-md text-white p-12 rounded-xl'>
            <h1 className='text-5xl'>404 Not Found</h1>
            <p className='text-2xl'>It seems you are looking for a page that does not exist on my site...</p>
        </div>
    </div>
  )
}
