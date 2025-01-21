import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Хэширует пароль
 * @param password Пароль для хэширования
 * @returns Хэшированный пароль
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Сравнивает пароль с хэшем
 * @param password Пароль для проверки
 * @param hash Хэшированный пароль
 * @returns Результат сравнения
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}