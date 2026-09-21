import { ConfigService } from '@nestjs/config';

/** Срок жизни токена. Refresh-токенов нет: протух — логинимся заново. */
export const TOKEN_TTL = '12h';

/**
 * Достаёт обязательную переменную окружения. Пустое значение считается
 * отсутствующим: бэк с пустым `JWT_SECRET` или паролем должен падать
 * на старте, а не молча принимать любой токен.
 */
export const requireEnv = (config: ConfigService, key: string) => {
  const value = config.get<string>(key);
  if (!value) {
    throw new Error(
      `Переменная окружения ${key} не задана — без неё админка не защищена. См. .env.example`,
    );
  }
  return value;
};
