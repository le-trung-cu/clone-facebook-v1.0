import Image from "next/image"
import RegisterForm from "../components/register-form"
import FacebookText from '@/public/facebook-text.svg'

export default function Register() {
  return (
    
    <div className="flex-grow pb-5">
      <Image className="mx-auto" src={FacebookText} alt="facebook logo" height={100} />
      <RegisterForm/>
    </div>
  )
}