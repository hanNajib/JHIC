import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 🟠 import icon

const Login = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  if (!loading && user) {
    navigate('/admin/dashboard');
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await login(formData.login, formData.password);
      if (response?.status === 'success') {
        await Swal.fire({
          title: 'Login Berhasil',
          icon: 'success',
        });
        navigate('/admin/dashboard');
      } else {
        await Swal.fire({
          title: 'Login Gagal',
          text: response?.message || 'Terjadi kesalahan',
          icon: 'error',
        });
      }
    } catch (err) {
      console.error(err);
      await Swal.fire({
        title: 'Login Gagal',
        text: 'Terjadi kesalahan pada server',
        icon: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='flex items-center justify-center p-6 md:p-20 lg:p-48 h-screen bg-[#eeeeee]'>
        <div className="flex items-center bg-slate-100 w-full shadow-xl rounded-4xl overflow-clip">
          <form className="w-full lg:w-1/2 py-14 md:py-20 px-10 md:px-14 flex flex-col gap-4" onSubmit={handleLogin}>
            <h1 className='font-poppins font-bold text-[#ff6000] text-center text-4xl pb-6'>LOGIN</h1>

            {/* Email / Username */}
            <div className="flex flex-col w-full gap-1">
              <p className="font-poppins font-semibold text-[#212529] text-lg">Email atau Username</p>
              <div className="border-[2px] border-[#ff6000] px-4 py-2 rounded-lg shadow">
                <input
                  type="text"
                  name="login"
                  placeholder='Masukkan Email atau Username'
                  className='border-0 outline-0 w-full font-poppins text-[#495057]'
                  onChange={handleChange}
                  value={formData.login}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col w-full gap-1">
              <p className="font-poppins font-semibold text-[#212529] text-lg">Password</p>
              <div className="relative border-[2px] border-[#ff6000] px-4 py-2 rounded-lg shadow">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder='Masukkan Password'
                  className='border-0 outline-0 w-full font-poppins text-[#495057] pr-10'
                  onChange={handleChange}
                  value={formData.password}
                  autoComplete='off'
                />

                {/* Tombol mata */}
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ff6000] text-xl hover:opacity-80"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Tombol login */}
            <button
              type='submit'
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={`cursor-pointer w-full font-poppins font-semibold text-white py-3 flex justify-center items-center rounded-lg mt-4 ${isSubmitting ? 'bg-orange-300 cursor-not-allowed' : 'bg-[#ff6000]'}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </button>

            <div className="flex justify-center w-full items-center gap-3 pt-3 lg:hidden">
              <img src="assets/images/logo-smk.png" alt="" className='w-8 md:w-10' />
              <h1 className="text-center font-poppins font-bold text-slate-800 text-lg md:text-xl">SMKN 8 Jember</h1>
            </div>
          </form>

          {/* Bagian kanan */}
          <div className="hidden w-1/2 h-full py-32 bg-[#ff6000] rounded-tl-4xl rounded-bl-4xl lg:flex flex-col px-28 gap-5">
            <img src="assets/images/logo-smk.png" alt="" />
            <h1 className="text-center font-poppins font-bold text-white text-2xl">SMKN 8 Jember</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
