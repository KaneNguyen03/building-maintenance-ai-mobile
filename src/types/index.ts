// src/types/index.ts

export type BottomTabParamList = {
  Home: undefined;
  Property: undefined;
  Notification: undefined;
  Account: undefined;
};
export type RootStackParamList = {
  GuestApp: undefined;   // Luồng Guest
  ResidentApp: undefined; // Luồng Resident
  MoreScreen: undefined;
  MainApp: undefined;
  SignIn: undefined;
  OTPScreen: {
    userType: "resident" | "staff";
    identifier: string;
  };
};

