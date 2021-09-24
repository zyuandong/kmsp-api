const NacosNamingClient = require("nacos").NacosNamingClient;
const { config } = require("./config.js");
const logger = console;
const axios = require("axios");
// const http = require("http");

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
  const instances = await client.getAllInstances(
    "integration-cico-service",
    //config.server.group,
    "default"
  );

  const [instance] = instances.filter((item) => {
    return item.healthy;
  });

  const { ip, port } = instance;
  console.log("==", instances);

  axios({
    method: "get",
    url: `http://${ip}:${port}/reg/apply/890658571694374912`,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

module.exports = { register, discovery };
