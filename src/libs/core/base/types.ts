export interface Profile {
  id: number;
  email: string;
  nickname: string;
  memberRoles: MemberRole[];
}

export interface Me {
  AUTHORITIES: MemberRole[];
  EMAIL: string;
  NICKNAME: string;
}

export enum MemberRole {
  ROLE_USER = 'ROLE_USER',
  ROLE_GUEST = 'ROLE_GUEST'
}
