const request = require("request-promise");
const { proxy } = require("./utils/proxy");

const siteUrl = "https://public-ip-production-7513.up.railway.app/v4/ip";

const scrapeWithAxios = async () => {
  const response = await request.get(siteUrl, {
    proxy: `http://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port}`,
  });
  console.log(response);
};

scrapeWithAxios();
