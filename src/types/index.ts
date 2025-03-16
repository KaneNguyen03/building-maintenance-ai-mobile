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
  PropertyDetail: undefined;
  RepairInside: { property?: Property };
  RepairReview: { property: Property; description: string; images: string[] };
  RepairSuccess: undefined;
  MyReport: undefined;
};

export interface Resident {
  id?: string;
  phone: number;
  name: string;
  property: Property[];
  otp: string;
}
export interface Staff {
  id?: string;
  email: string;
  name: string;
  otp: string;
}
export interface Property {
  building: string;
  floor: number;
  unit: string;
  status: string;
}

