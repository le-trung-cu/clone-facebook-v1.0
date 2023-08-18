'use client'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
const API_URL = 'http://localhost:8000'

export default function LoginForm() {
  const session = useSession()
  console.log('session', session)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function loginHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    signIn('credentials', {email, password})
  }

  return (
    <div className="max-w-[432px] mx-auto bg-white rounded-lg shadow-md p-4">
      <form onSubmit={loginHandler}>
        <h2 className="text-lg text-center text-[#1c1e21] mb-4">Đăng nhập Facebook</h2>
        <div className="space-y-3">
          <input type="text" className="p-3 text-sm border border-[#ccd0d5] rounded-md w-full focus:border-[#ccd0d5] focus:outline-none"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)} />
          <input type="password" className="p-3 text-sm border border-[#ccd0d5] rounded-md w-full focus:border-[#ccd0d5] focus:outline-none"
            placeholder="Mật khẩu" 
            onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="block w-full p-3 text-center rounded-md text-white text-xl bg-[#166fe5]">Đăng nhập</button>
          <div className="flex justify-center items-center space-x-1">
            <Link className="text-[#1877f2] text-sm font-light" href="/login/identify">Quên tài khoản?</Link> <span className="text-[8px]">-</span> <Link className="text-[#1877f2] text-sm font-light" href="/reg">Đăng ký Facebook</Link>
          </div>
        </div>
      </form>
    </div>
  )
}