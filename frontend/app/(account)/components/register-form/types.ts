export interface FormValues {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  bYear: number,
  bMonth: number,
  bDay: number,
  genderType: 'Female' | 'Male' | 'Custom' | null,
  customPronoun: string,
  customGender: string,
}
