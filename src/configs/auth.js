export default {
  meEndpoint: 'https://be33.akmal.tech/api/auth/me',
  loginEndpoint: 'https://be33.akmal.tech/api/auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
