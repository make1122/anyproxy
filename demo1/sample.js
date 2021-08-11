// file: sample.js
// 需要编写一个规则模块，在 GET http://httpbin.org/user-agent 的返回值里加上测试信息，并延迟5秒返回
module.exports = {
    summary: 'a rule to hack response',
    *beforeSendResponse(requestDetail, responseDetail) {
      if (requestDetail.url === 'http://httpbin.org/user-agent') {
        const newResponse = responseDetail.response;
        newResponse.body += '- AnyProxy Hacked!';
  
        return new Promise((resolve, reject) => {
          setTimeout(() => { // delay
            resolve({ response: newResponse });
          }, 5000);
        });
      }
    },
  };