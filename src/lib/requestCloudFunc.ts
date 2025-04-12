import  request  from "request";
import wechat from "./wechat";
export const requestCloudFunc = async ( data: any) => {

  const access_token = await wechat.getAccessToken();
  return new Promise((resolve,reject) => {
    request({
      url:`https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${process.env.cloudenv}&name=${process.env.functionName}`,

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        json: true,
        body:data,
    },function (error, response, body) {
      console.log(response.statusCode)
      if (!error && response.statusCode == 200 && body.errcode == 0) {
          resolve(JSON.parse(body.resp_data)) // 请求成功的处理逻辑
      }
      // console.log(error)
      reject(response)
  }
    );
  }).catch((err) => {
    throw err;
  }
}
