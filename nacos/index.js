const NacosNamingClient = require('nacos').NacosNamingClient;
const { config } = require('./config.js');
const logger = console;
const http = require('http');

const serviceName = config.service.name;

const nacos = () => {
  const client = new NacosNamingClient({
    logger,
    serverList: config.server.list,
    namespace: config.server.namespace,
  });
  return client;
};

const register = async () => {
  const client = nacos();
  await client.ready();
  client.registerInstance(
    serviceName,
    {
      ip: config.service.ip,
      port: config.service.port,
    },
    config.server.group
  );
};

const discovery = async () => {
  const client = nacos();
  await client.ready();
  const instances = await client.getAllInstances('file-service', config.server.group);

  const [instance] = instances.filter((item) => {
    return item.healthy;
  });

  const { ip, port } = instance;
  // console.log('==', instances);

  http.get(
    {
      hostname: ip,
      port: port,
      path: `/integration-module-demo-biz/apis/v1/files/884474756995219456`,
    },
    (res) => {
      var str = '';
      res.on('data', (data) => {
        str += data;
      });

      res.on('end', () => {
        console.log(JSON.parse(str));
      });
    }
  );
};

module.exports = { register, discovery };
