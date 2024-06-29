from seleniumwire import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from utils.proxy import proxy_config
import requests

siteUrl = "https://public-ip-production-7513.up.railway.app/v4/ip"

def scrape_with_selenium():
    options = Options()
    options.add_argument("--headless=new")

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        seleniumwire_options={
            "proxy": proxy_config
        },
        options=options
    )

    driver.get(siteUrl)
    driver.save_screenshot("output.png")
    content = driver.page_source
    print(content)
    driver.quit()


def scrape_with_requests():
    response = requests.get(siteUrl, proxies=proxy_config)
    print(response.text)

scrape_with_selenium()
scrape_with_requests()
