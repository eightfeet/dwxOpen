import  request  from "request";
import wechat from "./wechat";

export async function requestCloudFunc<T>(data:any):Promise<T> {
  const access_token = await wechat.getAccessToken();
  return new Promise<T>((resolve,reject) => {
    request({
      url:`https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${process.env.cloudenv}&name=${process.env.functionName}`,

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        json: true,
        body:data,
    },function (error:any, response:any, body:any) {

      if (!error && response.statusCode == 200 && body.errcode == 0) {

        const jsondata = JSON.parse(body.resp_data);
        if (jsondata.code == 200 || jsondata.msg == "找不到任何用户"){
          resolve(jsondata) // 请求成功的处理逻辑
        } else {
          reject(jsondata) // 请求失败的处理逻辑
        }
      }
      // console.log(error)
      reject(response)
  }
    );
  }).catch((err) => {
    throw err;
  })
}
