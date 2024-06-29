package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	"webscraping-proxy/utils"
)

func logf(format string, args ...interface{}) {
	fmt.Printf(format, args...)
}

func httpRequestUsingProxy() {
	proxyUrl, _ := url.Parse(utils.ProxyURL)

	transport := &http.Transport{
		Proxy: http.ProxyURL(proxyUrl),
	}

	client := &http.Client{
		Transport: transport,
	}

	// HTTP request using the proxy
	resp, err := client.Get("https://public-ip-production-7513.up.railway.app/v4/ip")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	fmt.Println(string(body))
}

func main() {
	httpRequestUsingProxy()
}
