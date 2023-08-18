import Image from "next/image"
import FacebookText from '@/public/facebook-text.svg'
import Link from "next/link"

export default function Register() {
  return (
    <>
      <div className="bg-white shadow-sm flex justify-between items-center px-5">
      <Image src={FacebookText} alt="facebook logo" height={50} />
      <Link href="/login" className="bg-[#166fe5] text-white text-base rounded py-1.5 px-1.5">Đăng nhập</Link>
      </div>
      <div className="py-20">
        <div className="max-w-[432px] mx-auto bg-white rounded-lg shadow-md pt-2">
          <form>
            <h2 className="text-lg text-[#1c1e21] mb-4 px-5">Tìm tài khoản của bạn</h2>
            <hr className="my-4" />
            <div className="px-5">
              <p>Vui lòng nhập email hoặc số di động để tìm kiếm tài khoản của bạn.</p>
              <input type="password" className="mt-3 p-3 text-sm border border-[#ccd0d5] rounded-md w-full focus:border-[#ccd0d5] focus:outline-none"
                placeholder="Email" />
            </div>
            <hr className="my-5" />
            <div className="flex justify-end space-x-2 pb-5 pr-5">
              <button  className="bg-[#c1c1c5] text-gray-800 text-base rounded py-1 px-3">Hủy</button>
              <button className="bg-[#166fe5] text-white text-base rounded py-1 px-3">Tìm kiếm</button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-grow bg-white"></div>
    </>
  )
}