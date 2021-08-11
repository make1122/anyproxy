module.exports = {
    // 模块介绍
    summary: 'my customized rule for AnyProxy',
    // 发送请求前拦截处理 AnyProxy向服务端发送请求前，会调用beforeSendRequest，并带上参数requestDetail
    *beforeSendRequest(requestDetail) {
        
         /**
            以下几种返回都是合法的
            不做任何处理，返回null
            return null;
            修改请求协议，如强制改用https发起请求
            return {
            protocol: 'https'
            };
            修改请求参数
            var newOption = Object.assign({}, requestDetail.requestOptions);
            newOption.path = '/redirect/to/another/path';
            return {
            requestOptions: newOption
            };
            修改请求body
            return {
            requestData: 'my new request data'
            //这里也可以同时加上requestOptions
            };
            直接返回客户端，不再发起请求，其中statusCode header 是必选字段
            return {
            response: {
                statusCode: 200,
                header: { 'content-type': 'text/html' },
                body: 'this could be a <string> or <buffer>'
            }
            };
         * 
         */
        // console.log("发送请求前拦截处理");
        // console.log(requestDetail);
       
        return null;

    },
    // 发送响应前处理
    *beforeSendResponse(requestDetail, responseDetail) {
        /* ... */ 
        console.log("发送响应前处理");
        // console.log(requestDetail);
        // console.log(responseDetail);
        
    },
    // 是否处理https请求
    // AnyProxy收到https请求时，会调用beforeDealHttpsRequest，并带上参数requestDetail
    // 如果配置了全局解析https的参数，则AnyProxy会略过这个调用
    // 只有返回true时，AnyProxy才会尝试替换证书、解析https。否则只做数据流转发，无法看到明文数据。
    // 注意：https over http的代理模式中，这里的request是CONNECT请求
    // requestDetail
    // host {string} 请求目标的Host，受制于协议，这里无法获取完整url
    // _req {object} 请求的原始request
    // 返回值
    // true或者false，表示是否需要AnyProxy替换证书并解析https
    *beforeDealHttpsRequest(requestDetail) {
        /* ... */ 
        console.log("是否处理https请求");
        // console.log(requestDetail);
        return false;
    },
    // 请求出错的事件
    // 在请求处理过程中发生错误时，AnyProxy会调用onError方法，并提供对应的错误信息
    // 多数场景下，错误会在请求目标服务器的时候发生，比如DNS解析失败、请求超时等
    // requestDetail 同beforeSendRequest中的参数
    // 以下几种返回都是合法的

    // 不做任何处理。此时AnyProxy会返回一个默认的错误页。
    // return null;
    // 返回自定义错误页
    // return {
    // response: {
    //     statusCode: 200,
    //     header: { 'content-type': 'text/html' },
    //     body: 'this could be a <string> or <buffer>'
    // }
    // };
    *onError(requestDetail, error) {
        /* ... */
        console.log("请求出错的事件");
        // console.log(requestDetail);
        // console.log(error);
    },
    // https连接服务器出错
    // AnyProxy在与目标HTTPS服务器建立连接的过程中，如果发生错误，AnyProxy会调用这个方法
    // requestDetail 同beforeDealHttpsRequest中的参数
    // 此处无法控制向客户端的返回信息，无需返回值。
    *onConnectError(requestDetail, error) {
        /* ... */ 
        // console.log("https连接服务器出错");
        // console.log(requestDetail);
        console.log(error);
    }
  };