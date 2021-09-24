const base = {};

const dev = {
  server: {
    list: '192.168.67.17:8848',
    // namespace: 'df03bed2-ebd9-45b4-bd40-4c697eb5a43a',
    namespace: 'dev',
    // group: 'koa',
    // group: 'DEFAULT_GROUP'
    group: 'BFF'
  },

  service: {
    name: 'kmsp-api',
    ip: '192.168.22.14',
    port: 3000,
  },
};

const pro = {};

module.exports = {
  // config: process.env.NODE_ENV === 'dev' ? Object.assign(dev, base) : Object.assign(pro, base)
  config: dev
};
