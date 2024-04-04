export interface ILoginProps {
  username?: string;
  password?: string;
}

export interface IEmailUsernameCheckProps {
  status: string;
  message: boolean;
}

export interface IRegisterProps {
  status: string;
  message: string;
}

export interface ISignUpProps {
  isAdmin: boolean;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  address3: string;
  poscode: number;
  city: string;
  state: string;
  age: number;
  phoneNumber: number;
  dateOfBirth: Date;
  profileImage: string;
}

//Login Data Return Start
export interface ILoginJWTData {
  data?: Data;
  token?: Token;
  status?: string;
  message: string;
}


export interface ILogoutProps {
  revoked: boolean;
  message: string;
}

export interface Data {
  user: User;
  profile: Profile;
}

export interface User {
  id: number;
  role_id: number;
  username: string;
  email: string;
  remember_me_token: any;
  created_at: string;
  updated_at: string;
  stripe_customer_id: string;
}

export interface Profile {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  address1: string;
  address2: string;
  address3: string;
  age: string;
  phone_number: string;
  date_of_birth: string;
  profile_image: string;
  created_at: string;
  updated_at: string;
  poscode: string;
  city: string;
  state: string;
  is_email_verified: boolean;
}

export interface Token {
  type: string;
  token: string;
  expires_at: string;
}
//Login Data Return End


export interface ICars {
  data: ICar[];
  message: string;
}

export interface ICar {
  id: number;
  user_id: number;
  car_name: string;
  color: string;
  engine_capacity: string;
  year_made: string;
  seat: string;
  location: string;
  car_main_pic: string;
  car_image_one: string;
  car_image_two: string;
  car_image_three: string;
  car_image_four: string;
  car_plate: string;
  price: string;
  available_to_date: string;
  available_from_date: string;
  created_at: string;
  updated_at: string;
  is_electric: boolean;
}


export interface ICarDetail {
  data?: ICar;
  status: string;
  message: string;
}

export interface IHost {
  data: IUser[];
  status: string;
  message: string;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address1: string;
  address2: string;
  address3: string;
  phone_number: string;
  profile_image: string;
  poscode: string;
  city: string;
  state: string;
}

