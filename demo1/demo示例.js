// 拦截发送到 http://httpbin.org 的请求，使用本地数据代替服务端返回
// anyproxy --rule rule_sample/sample_use_local_response.js
/* 
  sample: 
    intercept all requests toward httpbin.org, use a local response
  test:
    curl http://httpbin.org/user-agent --proxy http://127.0.0.1:8001
*/
module.exports = {
    *beforeSendRequest(requestDetail) {
      const localResponse = {
        statusCode: 200,
        header: { 'Content-Type': 'application/json' },
        body: '{"hello": "this is local response"}'
      };
      if (requestDetail.url.indexOf('http://httpbin.org') === 0) {
        return {
          response: localResponse
        };
      }
    },
  };

  
/**
 * 修改请求头
 * 修改发送到 httpbin.org 的user-agent
 * anyproxy --rule rule_sample/sample_modify_request_header.js
 */


/* 
  sample: 
    modify the user-agent in requests toward httpbin.org
  test:
    curl http://httpbin.org/user-agent --proxy http://127.0.0.1:8001
*/
module.exports = {
  *beforeSendRequest(requestDetail) {
    if (requestDetail.url.indexOf('http://httpbin.org') === 0) {
      const newRequestOptions = requestDetail.requestOptions;
      newRequestOptions.headers['User-Agent'] = 'AnyProxy/0.0.0';
      return {
        requestOptions: newRequestOptions
      };
    }
  },
};


/**
 * 修改请求数据
 * 修改发送到 http://httpbin.org/post 的post数据
 * anyproxy --rule rule_sample/sample_modify_request_data.js
 */

/*
  sample:
    modify the post data towards http://httpbin.org/post
  test:
    curl -H "Content-Type: text/plain" -X POST -d 'original post data' http://httpbin.org/post --proxy http://127.0.0.1:8001
  expected response:
    { "data": "i-am-anyproxy-modified-post-data" }
*/
module.exports = {
  summary: 'Rule to modify request data',
  *beforeSendRequest(requestDetail) {
    if (requestDetail.url.indexOf('http://httpbin.org/post') === 0) {
      return {
        requestData: 'i-am-anyproxy-modified-post-data'
      };
    }
  },
};



/**
 * 修改请求的目标地址
 * 把所有发送到 http://httpbin.org/ 的请求全部改到 http://httpbin.org/user-agent
 * anyproxy --rule rule_sample/sample_modify_request_path.js
 */

/*
  sample:
    redirect all https://httpbin.org/user-agent requests to http://localhost:8008/index.html
  test:
    curl https://httpbin.org/user-agent --proxy http://127.0.0.1:8001
  expected response:
    'hello world' from 127.0.0.1:8001/index.html
*/
module.exports = {
  *beforeSendRequest(requestDetail) {
    if (requestDetail.url.indexOf('https://httpbin.org/user-agent') === 0) {
      const newRequestOptions = requestDetail.requestOptions;
      requestDetail.protocol = 'http';
      newRequestOptions.hostname = '127.0.0.1'
      newRequestOptions.port = '8008';
      newRequestOptions.path = '/index.html';
      newRequestOptions.method = 'GET';
      return requestDetail;
    }
  },
  *beforeDealHttpsRequest(requestDetail) {
    return true;
  }
};

/**
 * 修改请求协议
 * 把用http协议请求的 http://httpbin.org 改成https并发送
 * anyproxy --rule rule_sample/sample_modify_request_protocol.js
 */


/* 
  sample: 
    redirect all http requests of httpbin.org to https
  test:
    curl 'http://httpbin.org/get?show_env=1' --proxy http://127.0.0.1:8001
  expected response:
    { "X-Forwarded-Protocol": "https" }
*/
module.exports = {
  *beforeSendRequest(requestDetail) {
    if (requestDetail.url.indexOf('http://httpbin.org') === 0) {
      const newOption = requestDetail.requestOptions;
      newOption.port = 443;
      return {
        protocol: 'https',
        requestOptions: newOption
      };
    }
  }
};


/**
 * 修改返回状态码
 * 把 所有http://httpbin.org 的返回状态码都改成404
 * anyproxy --rule rule_sample/sample_modify_response_statuscode.js
 */


/* 
  sample: 
    modify all status code of http://httpbin.org/ to 404
  test:
    curl -I 'http://httpbin.org/user-agent' --proxy http://127.0.0.1:8001
  expected response:
    HTTP/1.1 404 Not Found
*/
module.exports = {
  *beforeSendResponse(requestDetail, responseDetail) {
    if (requestDetail.url.indexOf('http://httpbin.org') === 0) {
      const newResponse = responseDetail.response;
      newResponse.statusCode = 404;
      return {
        response: newResponse
      };
    }
  }
};






/**
 * 修改返回头
 * 在 http://httpbin.org/user-agent 的返回头里加上 X-Proxy-By:AnyProxy
 * anyproxy --rule rule_sample/sample_modify_response_header.js
 */


/* 
  sample: 
    modify response header of http://httpbin.org/user-agent
  test:
    curl -I 'http://httpbin.org/user-agent' --proxy http://127.0.0.1:8001
  expected response:
    X-Proxy-By: AnyProxy
*/
module.exports = {
  *beforeSendResponse(requestDetail, responseDetail) {
    if (requestDetail.url.indexOf('http://httpbin.org/user-agent') === 0) {
      const newResponse = responseDetail.response;
      newResponse.header['X-Proxy-By'] = 'AnyProxy';
      return {
        response: newResponse
      };
    }
  }
};