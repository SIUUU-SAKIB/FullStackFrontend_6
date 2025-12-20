export enum Role {
  admin = "admin",
  super_admin = 'super_admin',
  sender = "sender",
  receiver= "receiver",
  public= "public"
}

export interface IUser  {
    _id:string,
    name:string,
    email:string,
    password?:string,
    accessToken?:string,
    refreshToken?:string,
    role:Role,
    phone?:number,
    profileImage?:string,
    isVerified?:boolean,
    address?:{
     street:string,
     city:string,
     postalCode:number,
     country:string,
    },
    blocked?:boolean
    parcelId:string
}