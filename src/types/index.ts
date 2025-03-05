export type BottomTabParamList = {
  Home: undefined;
  Property: undefined;
  Notification: undefined;
  Account: undefined;
};
export type RootStackParamList = {
  MainApp: undefined;
  SignIn: undefined;
  OTPScreen: {
    userType: "resident" | "staff";
    identifier: string;
  };
  More: undefined;
  PropertyDetail:undefined;
  RepairInside: undefined; 
};

export interface Resident {
  id?: string;
  phone: number;
  name: string;
  property: {
    building: string;
    floor: number;
    unit: string;
    status: string;
  }[];
  otp: string;
}
export interface Staff {
  id?: string;
  email: string;
  name: string;
  otp: string;
}

