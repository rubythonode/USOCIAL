USOCIAL.FACEBOOK_ACCESS_TOKEN=METHOD({run:function(e,t){"use strict";var r,o=e.redirectURI,n=e.code;GET({isSecure:!0,host:"graph.facebook.com",uri:"v2.3/oauth/access_token",paramStr:r="client_id="+encodeURIComponent(NODE_CONFIG.USOCIAL.Facebook.clientId)+"&redirect_uri="+encodeURIComponent(o)+"&client_secret="+encodeURIComponent(NODE_CONFIG.USOCIAL.Facebook.clientSecret)+"&code="+encodeURIComponent(n)},function(e){t(PARSE_STR(e))})}}),USOCIAL.FACEBOOK_GET_USER_DATA=METHOD({run:function(e,t){"use strict";var r,o;CHECK_IS_DATA(e)!==!0?o=e:(r=params.userId,o=params.accessToken),GET({isSecure:!0,host:"graph.facebook.com",uri:"/v2.7/"+(void 0===r?"me":r)+"/friends",paramStr:"access_token="+o},function(e){var r=PARSE_STR(e);void 0!==r&&t(r.data)})}}),USOCIAL.FACEBOOK_GET_USER_DATA=METHOD({run:function(e,t){"use strict";var r=e.userId,o=e.fields,n=e.accessToken,c="";EACH(o,function(e,t){t>0&&(c+=","),c+=e}),GET({isSecure:!0,host:"graph.facebook.com",uri:"/v2.7/"+(void 0===r?"me":r),paramStr:"fields="+c+"&access_token="+n},function(e){var r=PARSE_STR(e);void 0!==r&&t(r)})}}),USOCIAL.INSTAGRAM_ACCESS_TOKEN=METHOD({run:function(e,t){"use strict";var r,o=e.redirectURI,n=e.code;POST({isSecure:!0,host:"api.instagram.com",uri:"oauth/access_token",paramStr:r="client_id="+encodeURIComponent(NODE_CONFIG.USOCIAL.Instagram.clientId)+"&client_secret="+encodeURIComponent(NODE_CONFIG.USOCIAL.Instagram.clientSecret)+"&grant_type=authorization_code&redirect_uri="+encodeURIComponent(o)+"&code="+encodeURIComponent(n),headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":Buffer.byteLength(r)}},function(e){t(PARSE_STR(e))})}}),USOCIAL.INSTAGRAM_GET_USER_DATA=METHOD({run:function(e,t){"use strict";var r,o;CHECK_IS_DATA(e)!==!0?o=e:(r=e.userId,o=e.accessToken),GET({isSecure:!0,host:"api.instagram.com",uri:"v1/users/"+(void 0===r?"self":r),paramStr:"access_token="+o},function(e){var r=PARSE_STR(e);void 0!==r&&t(r.data)})}}),USOCIAL.TWITTER_ACCESS_TOKEN=METHOD({run:function(e,t){"use strict";var r=e.token,o=e.verifier;UOAUTH.GET_TOKEN({url:"https://api.twitter.com/oauth/access_token",method:"POST",consumerKey:NODE_CONFIG.USOCIAL.Twitter.consumerKey,consumerSecret:NODE_CONFIG.USOCIAL.Twitter.consumerSecret,token:r,verifier:o},t)}}),USOCIAL.TWITTER_DOWNLOAD_PROFILE_IMAGE=METHOD(function(){"use strict";var e=require("http"),t=require("url");return{run:function(r,o){var n,c,s,i=r.url,u=r.path,a=t.parse(i);void 0!==o&&(CHECK_IS_DATA(o)!==!0?n=o:(n=o.success,c=o.error)),s=e.get({hostname:a.hostname===TO_DELETE?void 0:a.hostname,path:a.pathname===TO_DELETE?void 0:a.pathname,agent:new e.Agent({keepAlive:!0})},function(e){var t;301===e.statusCode||302===e.statusCode?(DOWNLOAD({url:e.headers.location,path:u},{success:n,error:c}),e.destroy()):(t=[],e.on("data",function(e){t.push(e)}),e.on("end",function(){WRITE_FILE({path:u,buffer:Buffer.concat(t)},{success:n,error:c})}))}),s.on("error",function(e){var t=e.toString();void 0!==c?c(t):SHOW_ERROR("[USOCIAL] TWITTER_DOWNLOAD_PROFILE_IMAGE FAILED: "+t,r)})}}}),USOCIAL.TWITTER_GET_USER_DATA=METHOD({run:function(e,t){"use strict";var r=e.userId,o=e.token,n=e.tokenSecret;GET({isSecure:!0,host:"api.twitter.com",uri:"1.1/users/show.json",paramStr:"user_id="+r,headers:{Authorization:UOAUTH.GENERATE_AUTHORIZATION({url:"https://api.twitter.com/1.1/users/show.json",method:"GET",paramStr:"user_id="+r,consumerKey:NODE_CONFIG.USOCIAL.Twitter.consumerKey,consumerSecret:NODE_CONFIG.USOCIAL.Twitter.consumerSecret,token:o,tokenSecret:n})}},function(e){t(PARSE_STR(e))})}}),USOCIAL.TWITTER_REQUEST_TOKEN=METHOD({run:function(e){"use strict";UOAUTH.GET_TOKEN({url:"https://api.twitter.com/oauth/request_token",method:"POST",consumerKey:NODE_CONFIG.USOCIAL.Twitter.consumerKey,consumerSecret:NODE_CONFIG.USOCIAL.Twitter.consumerSecret},function(t){e(t.oauth_token)})}});