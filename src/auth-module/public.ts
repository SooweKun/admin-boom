import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Открывает роут без токена. `JwtGuard` висит глобально, поэтому всё,
 * что не помечено `@Public()`, по умолчанию требует авторизации.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
