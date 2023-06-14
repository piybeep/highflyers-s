import { SetMetadata } from '@nestjs/common';

export const ACCESS_KEY = 'access_key';
export const AdminOnly = (isAdmin: boolean) => SetMetadata(ACCESS_KEY, isAdmin);
