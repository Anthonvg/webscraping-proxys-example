const puppeteer = require("puppeteer");
const { proxy } = require("./utils/proxy");

const siteUrl = ""; // TEST https://public-ip-production-7513.up.railway.app/v4/ip

async function scrapeWithPuppeteer() {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      `--proxy-server=${proxy.ip}:${proxy.port}`,
    ],
    headless: false, // CAMBIAR A true SI SE DESEA QUE NO SE ABRA EL NAVEGADOR
  });

  try {
    const page = await browser.newPage();

    // SET VIEWPORT
    await page.setViewport({ width: 1280, height: 800 });

    // PROXY AUTHENTICATION
    await page.authenticate({
      username: proxy.username,
      password: proxy.password,
    });

    await page.goto(siteUrl);
    await page.screenshot({ path: "output.png" });

    const content = await page.content();
    console.log(content);

    await browser.close();
  } catch (error) {
    browser.close();
    console.error(error);
  }
}

scrapeWithPuppeteer();
