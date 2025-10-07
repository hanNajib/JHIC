import React from 'react'

const Login = () => {
  return (
    <>
    
        <div className='flex items-center justify-center p-6 md:p-20 lg:p-48 h-screen bg-[#eeeeee]'>
            <div className="flex items-center bg-slate-100 w-full shadow-xl rounded-4xl overflow-clip">
                <div className="w-full lg:w-1/2 py-14 md:py-20 px-10 md:px-14 flex flex-col gap-4">
                    <h1 className='font-poppins font-bold text-[#ff6000] text-center text-4xl pb-6'>LOGIN</h1>
                    <div className="flex flex-col w-full gap-1">
                        <p className="font-poppins font-semibold text-[#212529] text-lg">Email</p>
                        <div className="border-[2px] border-[#ff6000] px-4 py-2 rounded-lg shadow">
                            <input type="email" name="" id="" placeholder='Masukkan Email' className='border-0 outline-0 w-full font-poppins text-[#495057]' />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <p className="font-poppins font-semibold text-[#212529] text-lg">Password</p>
                        <div className="border-[2px] border-[#ff6000] px-4 py-2 rounded-lg shadow">
                            <input type="password" name="" id="" placeholder='Masukkan Password' className='border-0 outline-0 w-full font-poppins text-[#495057]' />
                        </div>
                    </div>
                    <button type='submit' className='cursor-pointer w-full bg-[#ff6000] font-poppins font-semibold text-white py-3 flex justify-center items-center rounded-lg mt-4'>
                        Masuk ke akun
                    </button>
                    <div className="flex justify-center w-full items-center gap-3 pt-3 lg:hidden">
                        <img src="assets/images/logo-smk.png" alt="" className='w-8 md:w-10'/>
                        <h1 className="text-center font-poppins font-bold text-slate-800 text-lg md:text-xl">SMKN 8 Jember</h1>
                    </div>

                </div>

                <div className="hidden w-1/2 h-full py-32 bg-[#ff6000] rounded-tl-4xl rounded-bl-4xl lg:flex flex-col px-28 gap-5">
                    <img src="assets/images/logo-smk.png" alt="" />
                    <h1 className="text-center font-poppins font-bold text-white text-2xl">SMKN 8 Jember</h1>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Login;
