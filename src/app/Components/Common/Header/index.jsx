import React from 'react'
import Link from "next/link";

const Header = () => {
  return (
    <div className='bg-[#333333] flex border border-[#ebc032] rounded-lg justify-center gap-8 p-2.5'>
        <Link href='/'>
            {/* <img src='/front/public/logo.svg' alt='Logo' className='h-3 w-3'/> */}
            <img src="https://res.cloudinary.com/dvm6my9na/image/upload/v1759055745/KCC_LOGO_otkfkn.jpg" alt="Логотип KCC" className="h-12 w-auto" />
        </Link>ффф
    </div>
  )
}

export default Header
