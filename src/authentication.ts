// tslint:disable:max-line-length
export const authentication = {
  secret: '4dba2d3f0ef86315137b98d6996ce39cc67120e15e1dc3041b796bed4a72c2360527d2e75434699d5ff76c3719c896ce1faba22ba260f800d7c32d914663cbcea1e29c9efb27de4b5393c1dca28bdf020c9b2f2ca6c4a1b947e5e4dda9a6a1f1a225486691803c3e84aafe464e67ef2637b90983e952c0189910d0533a9a2baabff222ba674aea7c5f828231214962c2a4924384ba5032ae205162f5ecdde5fecdea66dcd8c3dae26aa6e313ae1c6e3f3b16d587bca51a7a0b70456e0f533e33e48d7b963d18edba525a79619fffbab952cedf5b2d6de296021a59ad8a00d40e985c2dc8d0a72357aee6e99c4a375275995824ca9500794fadb5c312621135ab',
  jwt: {
    header: {
      type: 'access',
      typ: 'access',
    },
    audience: 'https://yourdomain.com',
    subject: 'anonymous',
    issuer: 'feathers',
    algorithm: 'HS256',
    expiresIn: '30d',
  },
};
