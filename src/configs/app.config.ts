import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  node_env: process.env.NODE_ENV,
}));