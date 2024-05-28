export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'facultay';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export type NewUser = {
  passwrod: string;
  role: string;
  id: string;
};
