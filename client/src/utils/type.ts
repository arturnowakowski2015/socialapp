import {User} from "../model/Interface";
  
  export interface GenericResponse {
    status: string;
    message: string;
  }
  
  export interface ILoginResponse {
    status: string;
    access_token: string;
  }
  
  export interface IUserResponse {
    status: string;
    data: {
      user: User;
    };
  }