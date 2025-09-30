import React from 'react'

const Header = () => {
  return (
    <div className='bg-[#333333] flex border border-[#ebc032] rounded-lg justify-center gap-8 p-2.5'>
        <div>
            {/* <img src='/front/public/logo.svg' alt='Logo' className='h-3 w-3'/> */}
            <img src="https://res.cloudinary.com/dvm6my9na/image/upload/v1759055745/KCC_LOGO_otkfkn.jpg" alt="Логотип KCC" className="h-12 w-auto" />
        </div>
        <h1>Head</h1>
    </div>
  )
}

export default Header
