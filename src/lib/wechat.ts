import fs from "fs";
import path from "path";
import request from "request";

class Wechat {
  appId: string;
  appSecret: string;
  constructor() {
    this.appId = process.env.appId!;
    console.log(this.appId);
    this.appSecret = process.env.appSecret!;
  }
  getAccessToken: () => Promise<string> = async () => {

    try {

    const data = fs.readFileSync(path.resolve(__dirname, "./token.txt"));
      const accessToken = JSON.parse((data as unknown) as string);
      if (accessToken.expires_in > Date.parse((new Date() as unknown) as string)) {
        return Promise.resolve(accessToken.access_token);
      } else {
        //已过期
        return this.updateAccessToken();
      }
    } catch (err) {
      //文件为空
      return this.updateAccessToken();
    }
  };
  updateAccessToken: () => Promise<string> = async () => {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.appSecret}`;
    // 返回accesstoken格式如下
    // {
    //     "access_token":"string",
    //     "expires_in":7200
    // }
    return new Promise((resolve, reject) => {
      request(url, function (err: any, response: any) {
        const accessToken = JSON.parse(response.body);
        accessToken["expires_in"] =
          Date.parse((new Date() as unknown) as string) + (7200 - 20) * 1000;
        fs.writeFileSync(path.resolve(__dirname, "./token.txt"), JSON.stringify(accessToken));
        resolve(accessToken.access_token);
      });
    });
  };
}

export default new Wechat();
