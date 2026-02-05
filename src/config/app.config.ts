export default () => ({
    app_name: process.env.APP_NAME || 'App Name',
    bcrypt_salt: process.env.SALT || 12,
    jwt_access_secret: process.env.JWT_SECRET || '87654*&^%*&^%&^%',
    jwt_refresh_secret: process.env.JWT_SECRET || '87654*&^%*&^%&^%'
})