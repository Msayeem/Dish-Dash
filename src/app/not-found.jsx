import Link from 'next/link';
import React from 'react';

const notFoundPage = () => {
    return (
       <div className='flex justify-center items-center h-screen'>
         <div className='text-2xl text-center'>
            <h1>404 <br /> Page not Found!</h1>
            <br />
            <Link className='font-semibold bg-orange-400 text-white px-8 py-3 rounded-2xl' href={'/'}>Go Home</Link>
        </div>
       </div>
    );
};

export default notFoundPage;