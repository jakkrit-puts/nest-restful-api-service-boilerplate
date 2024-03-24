import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_KEY_SECRET,
  signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRED }  ,
  // jwt_refresh_token_expired: process.env.JWT_REFRESH_TOKEN_EXPIRED,
}));