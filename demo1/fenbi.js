/**
 * 粉笔拦答题会员pc截器
 * 
 * 实现目的能够观看会员解析 
 * 
 * clsss = "question-video-member ng-tns-c78-2" 去除框
 * 
 */

module.exports= {

    summary: 'a rule to hack response',
    *beforeSendRequest(requestDetail, responseDetail) {
        // 获取视频播放连接
        // https://ke.fenbi.com/api/gwy/v3/episodes/1403692/mediafile/meta?content_id=0&biz_type=100&app=web&kav=12&version=3.0.0.0
      if (requestDetail.url.indexOf("https://ke.fenbi.com/api/gwy/v3/episodes/") === 0) {
        let cookie = "sid=1072151163865136018; sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22179ef5f4df092-0c45da7c736eaf-1f3a6255-1296000-179ef5f4df1241%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fcn.bing.com%2F%22%7D%2C%22%24device_id%22%3A%22179ef5f4df092-0c45da7c736eaf-1f3a6255-1296000-179ef5f4df1241%22%7D; sess=Vk88YzJwjLVv1vIeq/X6+RFJChmZ5L81wf9Mc8upM11k5r2dwG9977+njEHXfGqQgbTqeT0AWnkvcd06P/TLBkgry6mMAvkT2sFDniszWsY=; userid=85858597; persistent=BW83TaFFRoN6T/SUkbWG4CwTGjG0ZOVTp5EuWzweE5LpJ6LxLfLulMwA7UyZKuPAd+wEnJftXdTYfEyLu6xlEw=="
        const newRequestOptions = requestDetail.requestOptions;
        newRequestOptions.headers['Cookie'] = cookie;
        return {
            requestOptions: newRequestOptions
        };
      }
      
    },
    *beforeSendResponse(requestDetail, responseDetail) {
        // 删掉 class 为question-video-member ng-tns-c78-2 的元素
        if(requestDetail.url.indexOf("https://www.fenbi.com/spa/tiku/report/exam/solution/xingce/xingce/") === 0) {
        //   加入一段js删除视频遮罩
        const newResponse = responseDetail.response;
        newResponse.body += `<script>window.onload=function(){
            var qvm=document.getElementsByClassName("question-video-member")
            for(var i=0;i<qvm.length;i++){
                qvm[i].style.display="none";
            }
        }</script>`;
        // return newResponse;
        return {
            response: newResponse
          };
      }
    },


    
}

