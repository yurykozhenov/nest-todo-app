export interface Credentials {
  strategy: 'local' | 'jwt';
  username?: string;
  password?: string;
}
