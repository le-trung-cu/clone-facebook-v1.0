'use client'

import {  useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import * as yup from 'yup'
import { FormValues } from './types'
import Input from './Input'
import TooltipInfo from './TooltipInfo'
import Select from './Select'
import Radio from './Radio'

export default function RegisterForm() {
  const currentDate = new Date()
  const initialValues = useRef<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bYear: currentDate.getUTCFullYear(),
    bMonth: currentDate.getUTCMonth() + 1,
    bDay: currentDate.getUTCDate(),
    genderType: null,
    customPronoun: '',
    customGender: '',
  })

  const [optionYears, setOptionYears] = useState(new Array<{ value: number, label: number }>())
  const [optionMonths, setOptionMonths] = useState(new Array<{ value: number, label: number }>())
  const [optionDays, setOptionDays] = useState(new Array<{ value: number, label: number }>())

  const formik = useFormik({
    initialValues: initialValues.current,
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
    }
  })

  useEffect(() => {
    const year = currentDate.getUTCFullYear()
    const month = currentDate.getUTCMonth() + 1

    const optionYears = range(year, year - 118, -1).map(v => ({ value: v, label: v }))
    const optionMonths = range(1, 13).map(v => ({ value: v, label: v }))

    setOptionYears(optionYears)
    setOptionMonths(optionMonths)
  }, [])

  useEffect(() => {
    const year = formik.values.bYear
    const month = formik.values.bMonth
    const daysInmonth = getDaysInMonth(year, month)
    const optionDays = range(1, daysInmonth + 1).map(v => ({ value: v, label: v }))
    setOptionDays(optionDays)
    if (daysInmonth < formik.values.bDay)
      formik.setFieldValue('bDay', 1)
  }, [formik.values.bYear, formik.values.bMonth])

  return (
    <div className="max-w-[432px] mx-auto bg-white rounded-lg shadow-md p-4">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl text-center text-[#1c1e21]">Tạo tài khoản mới</h2>
        <p className="text-sm text-center text-[#606770]">Nhanh chóng và dễ dàng.</p>
        <hr className="my-4 -mx-4" />
        <div className="flex flex-wrap -m-1.5">
          <Input testId="firstName" className="basis-1/2" type="text" name="firstName"
            placeholder="Họ"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={formik.errors.firstName} />
          <Input testId="lastName" className="basis-1/2" type="text" name="lastName"
            placeholder="Tên"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={formik.errors.lastName} />
          <Input testId="email" className="flex-grow-[2]" type="text" name="email"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.errors.email}
            placement="left" />
          <Input testId="password" className="flex-grow-[2]" type="password" name="password"
            placeholder="Mật khẩu mới"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.errors.password}
            placement="left" />
        </div>
        <div>
          <TooltipInfo testId="guid_button_birth_day" text="Ngày sinh">
            <p
              className="bg-white rounded-sm max-w-[400px] text-xs p-2 shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_1px_10px_rgba(0,0,0,0.35)]">
              Cung cấp sinh nhật của bạn giúp đảm bảo bạn có được trải nghiệm Facebook phù hợp với độ tuổi của mình. Nếu bạn muốn thay đổi người nhìn thấy thông tin này, hãy đi tới phần Giới thiệu trên trang cá nhân của bạn. Để biết thêm chi tiết, vui lòng truy cập vào
              <Link href="" className="text-[#385898] font-medium"> Chính sách quyền riêng tư</Link> của chúng tôi.
            </p>
          </TooltipInfo>
          <div className="flex space-x-4">
            <Select testId="bDay" name="bDay"
              options={optionDays}
              value={formik.values.bDay}
              onChange={formik.handleChange} />
            <Select testId="bMonth" name="bMonth"
              options={optionMonths}
              value={formik.values.bMonth}
              onChange={formik.handleChange} />
            <Select testId="bYear" name="bYear"
              options={optionYears}
              value={formik.values.bYear}
              onChange={formik.handleChange} />
          </div>
        </div>

        <div>
          <TooltipInfo text="Giới tính">
            <p data-test_id=""
              className="bg-white rounded-sm max-w-[400px] text-xs p-2 shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_1px_10px_rgba(0,0,0,0.35)]">
              Bạn có thể thay đổi người nhìn thấy giới tính của mình trên trang cá nhân vào lúc khác. Chọn Tùy chỉnh nếu bạn thuộc giới tính khác hoặc không muốn tiết lộ.
            </p>
          </TooltipInfo>
          <div data-test_id="genderTypes" className="flex space-x-4">
            <Radio label="Nữ" name="genderType" value='Female' onChange={formik.handleChange} />
            <Radio label="Nam" name="genderType" value='Male' onChange={formik.handleChange} />
            <Radio label="Khác" name="genderType" value='Custom' onChange={formik.handleChange} />
          </div>
          {formik.values.genderType === 'Custom' && (
            <div data-test_id="genderCustome" className="space-y-3 mt-3">
              <div>
                <Select name="customPronoun"
                  value={formik.values.customPronoun}
                  options={[
                    { label: 'Chọn danh xưng', value: '', disabled: true },
                    { label: 'Cô ấy: "Chúc cô ấy sinh nhật vui vẻ!"', value: 'Female' },
                    { label: 'Anh ấy: "Chúc anh ấy sinh nhật vui vẻ!"', value: 'Male' },
                    { label: 'Họ: "Chúc họ sinh nhật vui vẻ!"', value: 'They' },
                  ]}
                  onChange={formik.handleChange} />
                <p className="text-xs text-[#606770] mt-1">Danh xưng của bạn hiển thị với tất cả mọi người.</p>
              </div>

              <Input testId="customGender" type="text" name="customGender" placeholder="Giới tính (không bắt buộc)"
                className="p-0"
                value={formik.values.customGender}
                onChange={formik.handleChange} />
            </div>
          )}
          <p className="text-[11px] text-[#777777] font-medium mt-2 mb-4">Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Facebook. <Link href="" className="text-[#385898] font-medium">Tìm hiểu thêm.</Link></p>
          <p className="text-[11px] text-[#777777] font-medium">Bằng cách nhấp vào Đăng ký, bạn đồng ý với <Link href="" className="text-[#385898] font-medium">Điều khoản, Chính sách quyền riêng tư</Link> và  <Link href="" className="text-[#385898] font-medium">Chính sách cookie </Link> của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.</p>
        </div>

        {formik.errors.email && formik.touched.email && formik.errors.email}
        <button type="submit" disabled={formik.isSubmitting}
          className="bg-[#00a400] text-white font-bold text-lg min-w-[194px] h-[36px] rounded-md mt-4 mx-auto block">
          Đăng ký
        </button>
        <div className="flex justify-center mt-4">
          <Link href="/login" className="text-[#385898]">Bạn đã có tài khoản ư?</Link>
        </div>
      </form>
    </div>
  )
}
const RegisterSchema = yup.object().shape({
  firstName: yup.string().min(3).max(50).required("Tên bạn là gì."),
  lastName: yup.string().min(3).max(50).required("Tên bạn là gì."),
  email: yup.string().email().required("Bạn sẽ sử dụng thông tin này khi đăng nhập hoặc khi đổi mật khẩu."),
  password: yup.string().required("Mật khấu có ít nhất 6 ký tự bao gồm số, chữ cái và đấu chấm câu như (! và &)."),
  bYear: yup.number().required(),
  bMonth: yup.number().required(),
  bDay: yup.number().required(),
})

function range(left: number, right: number, step: number = 1) {
  const result = new Array<number>()
  const flag = step > 0 ? 1 : -1
  for (let n = left; n * flag < right * flag; n += step) {
    result.push(n)
  }
  return result
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}