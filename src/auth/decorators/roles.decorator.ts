import { UserRole } from 'src/user/enum/user-role.enum';
import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles';
export const Roles = (roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
