export default {
  meEndpoint: 'http://localhost:3333/api/auth/me',
  loginEndpoint: 'http://localhost:3333/api/auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
