!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(global,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=17)}([function(e,t,n){const o=n(6),r=["fr_FR","en_EN"];e.exports=new class{_is(e,t){const{source:n}=e.message;return n===t}isFacebook(e){return this._is(e,"facebook")||this._is(e,"messenger")}isAlexa(e){return this._is(e,"alexa")}isGactions(e){return this._is(e,"gactions")}isViber(e){return this._is(e,"viber")}isSlack(e){return this._is(e,"slack")}isTelegram(e){return this._is(e,"telegram")}isTwitter(e){return this._is(e,"twitter")}isLine(e){return this._is(e,"line")}isBottender(e){return"bottender"===e.message.agent}isBotBuilder(e){return"botbuilder"===e.message.agent}isBotBuilderFacebook(e){return this.isFacebook(e)&&this.isBotBuilder(e)}isBottenderViber(e){return this.isViber(e)&&this.isBottender(e)}isBottenderFacebook(e){return this.isFacebook(e)&&this.isBottender(e)}isBottenderSlack(e){return this.isSlack(e)&&this.isBottender(e)}isBottenderTelegram(e){return this.isTelegram(e)&&this.isBottender(e)}isBottenderLine(e){return this.isLine(e)&&this.isBottender(e)}isWebSite(e){return"website"===e.message.source}getByLang(e,t,n){const o=t.getLang();if(e&&o){if(e[o])return e[o];if(e[this.defaultLanguage])return e[this.defaultLanguage];{const[t]=Object.keys(e);if(-1!=r.indexOf(t))return e[t]}}return n?e[n]:e}toByLang(e,t){if("string"==typeof e)return e;for(let n in e)e[n]=this.getByLang(e[n],t);return e}async sizeFile(e){const{headers:t}=await o({url:e,method:"GET",resolveWithFullResponse:!0});return t["content-length"]}}},function(e,t){e.exports=require("botbuilder")},function(e,t){e.exports=require("lodash")},function(e,t,n){const o=n(1),r=n(0),{heroCard:i}=n(9);function a(e,t,n,a){const s=i(e,{buttons:n},a);if(r.isWebSite(e))return{text:t,buttons:n};if(r.isGactions(e))return[t,...s.buttons.map(e=>{let t,n;switch(e.type){case"postback":t="Suggestions",n=e.msg||e.title;break;case"url":case"web_url":t="LinkOutSuggestion",n={name:e.title,url:e.url}}return{method:t,params:[n]}})];if(r.isTwitter(e))return{text:t,ctas:s.buttons};const l={attachment:{type:"template",payload:{template_type:"button",text:t,buttons:s.buttons}}};return r.isBotBuilderFacebook(e)?new o.Message(e).sourceEvent({facebook:l}):r.isBottenderFacebook(e)?{method:"sendButtonTemplate",params:[t,s.buttons]}:r.isBottenderTelegram(e)?{method:"sendMessage",params:[t,{reply_markup:JSON.stringify({inline_keyboard:s.buttons})}]}:r.isFacebook(e)?l:r.isBotBuilder(e)?new o.Message(e).text(t).addAttachment(s):t}e.exports={buttons:a,format:(e,[t],{session:n},o)=>a(n,e,t,o)}},function(e,t){e.exports=require("chrono-node")},function(e,t){e.exports=require("@microsoft/recognizers-text-choice")},function(e,t){e.exports=require("request-promise")},function(e,t,n){const o=n(1),r=n(0),i=n(2),a=n(8),s=n(19);function l(e,t,n){if(!t)return;const a=e=>r.toByLang(e,n);if(r.isWebSite(e))return t.map(a);if(r.isFacebook(e))return t=t.map(e=>i.isString(e)?{content_type:"text",title:e,payload:e}:((e=a(e)).type||(e.type="text"),e.action&&(e.payload=`action?${s.stringify(e.action)}`),e.payload||(e.payload=e.text),{content_type:e.type,title:e.text,payload:e.payload,image_url:e.image}));if(r.isBotBuilder(e))return t.map(t=>(t=a(t),o.CardAction.imBack(e,t,t)));if(r.isBottenderLine(e))return t.map(e=>i.isString(e)?{type:"action",action:{type:"message",label:e}}:((e=a(e)).type||(e.type="message"),e.action&&(e.payload=`action?${s.stringify(e.action)}`),{type:"action",action:{type:e.type,label:e.text,text:e.payload}}));if(r.isBottenderTelegram(e))return t.map(e=>i.isString(e)?{text:e}:[{text:(e=a(e)).text}]);if(r.isTwitter(e))return t.map(e=>i.isString(e)?{label:e}:{label:(e=a(e)).text,metadata:e.payload});const l=t.map(e=>(e=a(e),i.isString(e)?e:e.text));return r.isGactions(e)?{method:"Suggestions",params:l}:l}e.exports={quickReplies:l,format(e,[t],{session:n},i){if(t=l(n,[t],i),r.isWebSite(n))return a.formats.quickReplies(e,t);if(r.isGactions(n))return[e,t];if(r.isTwitter(n))return{text:e,quick_reply:{type:"options",options:t}};const s={text:e,quick_replies:t};return r.isBotBuilderFacebook(n)?new o.Message(n).sourceEvent({facebook:s}):r.isBottenderFacebook(n)?{method:"sendText",params:[e,{quick_replies:t}]}:r.isFacebook(n)?s:r.isBottenderLine(n)?{method:"replyText",params:[e,{items:t}]}:r.isBottenderTelegram(n)?{method:"sendMessage",params:[e,{reply_markup:JSON.stringify({keyboard:t,one_time_keyboard:!0})}]}:r.isBotBuilder(n)?new o.Message(n).text(e).suggestedActions(o.SuggestedActions.create(n,t)):`${e} (${t.reduce((e,t)=>e+", "+t)})`}}},function(e,t){e.exports={formats:{quickReplies:(e,[t])=>({text:e,actions:t}),email:e=>({text:e,email:!0}),phone:e=>({text:e,phone:!0}),image:(e,t)=>({text:e,image:t}),video:(e,t)=>({text:e,video:t}),buttons:(e,[t])=>({text:e,buttons:t}),carousel:(e,[t,n])=>({text:e,cards:t,actions:n})},shareFormats:!0}},function(e,t,n){const o=n(1),r=n(2),i=n(0);e.exports={heroCard:function(e,t,n){const a=e=>((e=i.toByLang(e,n)).event||(e.type||e.url?e.type||(e.type="web_url"):e.type="postback"),e);if(t=i.toByLang(t,n),i.isWebSite(e)||i.isGactions(e))return t.buttons&&(t.buttons=t.buttons.map(e=>a(e))),t;if(i.isTwitter(e))return t.buttons&&(t.buttons=t.buttons.map(e=>{switch((e=a(e)).type){case"url":case"web_url":return{type:"web_url",url:e.url,label:e.title};case"share":if(!e.tweet)return void console.warn('Specify "tweet" property to use shared button on twitter platform');let{url:t,text:o,via:r,hashtags:a}=e.tweet;return o&&(o=`text=${o}`),t&&(t=`&url=${t}`),r&&(r=`&via=${r}`),a&&(a=`&hashtags=${a.split(",")}`),{type:"web_url",url:`https://twitter.com/intent/tweet?${t}${r}${o}${a}`,label:e.title||i.getByLang({fr_FR:"Partager",en_EN:"Share"},n,"en_EN")}}})),t;if(i.isBottenderViber(e)){let e="",n=[],o=0;if(t.buttons){const r=t.buttons[0];r.url&&(e=r.url),o=t.buttons.length,n=t.buttons.map(t=>{let n,o;switch((t=a(t)).type){case"url":case"web_url":n="open-url",o=t.title;break;case"postback":n="reply",o=t.msg||t.title}return{Columns:6,Rows:1,ActionType:n,ActionBody:t.url||e,Text:o}})}return r.flatten([{Columns:6,Rows:3-(3==o?1:0),ActionType:"open-url",ActionBody:e,Image:t.image},{Columns:6,Rows:2,ActionType:"open-url",ActionBody:e,Text:`<font color=#323232><b>${t.title}</b></font>\n                <font color=#777777><br>${t.subtitle}</font>`,TextSize:"medium",TextVAlign:"middle",TextHAlign:"left"},...n])}if(i.isBottenderTelegram(e)){const e={};return t.buttons&&(e.buttons=t.buttons.map(e=>{let t={text:(e=a(e)).title,callback_data:e.msg||e.title};switch(e.type){case"url":case"web_url":t.url=e.url}return[t]})),e}if(i.isBottenderLine(e)){const e={thumbnailImageUrl:t.image,title:t.title,text:t.subtitle};return t.buttons&&(e.actions=t.buttons.filter(e=>e).map(e=>{switch((e=a(e)).type){case"url":case"web_url":return{type:"uri",uri:e.url,label:e.title};case"postback":return{type:"postback",label:e.title,data:e.msg||e.title}}})),e}if(i.isFacebook(e)){const e={title:r.truncate(t.title||"(empty)",{length:75}),subtitle:r.truncate(t.subtitle,{length:75}),image_url:t.image};return t.buttons&&(e.buttons=t.buttons.filter(e=>e).map(e=>{switch((e=a(e)).type){case"url":case"web_url":return{type:"web_url",url:e.url,title:e.title};case"share":return{type:"element_share"};case"postback":return{type:"postback",title:e.title,payload:e.msg||e.title};case"webview":return{type:"web_url",url:e.url,title:e.title,webview_height_ratio:e.height||"full",messenger_extensions:!0};case"phone":return{type:"phone_number",title:e.title,payload:e.phone_number};case"account_link":return{type:"account_link",url:e.url};default:return e}})),e}if(i.isBotBuilder(e)){const r=new o.HeroCard(e);return["title","subtitle","text","image","buttons"].forEach(a=>{if(t[a]&&"buttons"===a)return t[a]=t[a].map(t=>(t=i.toByLang(t,n)).url?o.CardAction.openUrl(e,t.url,t.title):o.CardAction.imBack(e,t.msg||t.title,t.title)),void r.buttons(t[a]);t[a]&&"image"===a?r.images([o.CardImage.create(e,t[a])]):t[a]&&r[a](t[a])}),r}return t}}},function(e,t){e.exports=(e,t)=>({type:"Connections.SendRequest",name:e,payload:{InSkillProduct:{productId:t}},token:"correlationToken"})},function(e,t){e.exports=require("validator/lib/isEmail")},function(e,t,n){const o=n(0),r=n(18);e.exports=e=>(o.defaultLanguage=e,{shareFormats:!0,formats:r,functions:{Typing:{$params:["data"],$call({session:e}){o.isWebSite(e)||e.sendTyping()}},profile:{$params:["data","user"],async $call({session:e},t){let n={};if(o.isBottenderFacebook(e)){const t=await e.context.getUserProfile();n={name:t.first_name,fullname:`${t.first_name} ${t.last_name}`,image:t.profile_pic,lang:t.locale,gender:t.gender}}else if(o.isBottenderLine(e)){const t=await e.context.getUserProfile();n={name:t.name,image:t.pictureUrl}}else if(o.isBottenderViber(e)){const t=await e.context.getUserDetails();n={name:t.name,image:t.avatar,lang:t.language,country:t.country}}else if(o.isBottenderTelegram(e)){const{from:t}=e.context.event.inlineQuery();n={name:t.first_name,fullname:`${t.first_name} ${t.last_name}`,lang:t.language_code}}t.setMagicVariable("profile",n)}}}})},function(e,t){e.exports=require("@microsoft/recognizers-text-number")},function(e,t){e.exports=require("@microsoft/recognizers-text-sequence")},function(e){e.exports=JSON.parse('[{"what is your email":"what is your email?","what is your phone":"what is your phone number?","your email is invalid":"your email is invalid!","your phone is invalid":"your phone number is invalid!","give me date":"give me a date","yes":"yes","no":"no","not understand confirmation":"i did not understand the confirmation","number max":"Give a number less than %d","number min":"Give a number greater than %d"}]')},function(e){e.exports=JSON.parse('[{"what is your email":"quel est votre email ?","what is your phone":"quel est votre numéro de téléphone ?","your email is invalid":"votre email est invalide !","your phone is invalid":"votre numéro de téléphone est invalide !","give me date":"donnez-moi une date","yes":"oui","no":"non","not understand confirmation":"je n\'ai pas compris la confirmation","number max":"Donnez-un nombre inférieur à %d","number min":"Donnez-un nombre supérieur à %d"}]')},function(e,t,n){e.exports=n(33)},function(e,t,n){const{format:o}=n(7),r=n(20),i=n(21),a=n(22),{format:s}=n(3),l=n(23),u=n(24),c=n(25),m=n(26),p=n(27),d=n(28),f=n(29),b=n(30);e.exports={quickReplies:o,carousel:r,gif:i,buttons:s,markdown:l,image:a,video:u,contact:c,location:m,signin:p,webview:d,...b,email:f("email"),phone:f("phone")}},function(e,t){e.exports=require("querystring")},function(e,t,n){const o=n(1),r=n(0),{heroCard:i}=n(9),{quickReplies:a}=n(7),s=n(2);e.exports=(e,[t,n],{session:l},u)=>{if(n=a(l,n),!s.isArray(t))return e;if(t=t.map(e=>i(l,e,u)).slice(0,10),r.isWebSite(l))return{text:e,cards:t,actions:n};const c={attachment:{type:"template",payload:{template_type:"generic",elements:t}},quick_replies:n};return r.isBotBuilderFacebook(l)?new o.Message(l).sourceEvent({facebook:c}):r.isGactions(l)?[e,{method:"Carousel",items:[]}]:r.isBottenderViber(l)?{method:"sendCarouselContent",params:[{Type:"rich_media",ButtonsGroupColumns:6,ButtonsGroupRows:7,Buttons:s.flatten(t)}]}:r.isBottenderLine(l)?{method:"replyCarouselTemplate",params:[e,t]}:r.isBottenderFacebook(l)?[e,{method:"sendGenericTemplate",params:[t]}]:r.isFacebook(l)?c:r.isBotBuilder(l)?new o.Message(l).attachmentLayout(o.AttachmentLayout.carousel).suggestedActions(o.SuggestedActions.create(l,n)).attachments(t):e}},function(e,t,n){const o=n(1),r=n(0);e.exports=(e,[t],{session:n})=>r.isWebSite(n)?{text:e,image:image}:r.isBotBuilder(n)?new o.Message(n).attachments([new o.AnimationCard(n).text(e).media([{url:t}])]):e},function(e,t,n){const o=n(1),r=n(0),i=n(2);e.exports=async(e,[t,n,a,s],{session:l})=>{if(a||(a=i.last(t.split("/"))),!n){let e=i.last(a.split("."));e=e.toLowerCase(),["gif","png","jpeg","jpg"].indexOf(e)&&(n="image/"+e)}const u={attachment:{type:"image",payload:{url:t}}};return r.isWebSite(l)?{text:e,image:t}:r.isTwitter(l)?{text:e,attachment:{type:"media"},_data:{url:t,size:await r.sizeFile(t),type:n,category:"dm_image"}}:r.isGactions(l)?[e,{method:"Image",params:[{url:t,alt:e}]}]:r.isAlexa(l)?{type:"image",text:e,image:{smallImageUrl:t,largeImageUrl:t}}:r.isBottenderViber(l)?{method:"sendPicture",params:[{text:e,media:t,thumbnail:s}]}:r.isBottenderTelegram(l)?[e,{method:"sendPhoto",params:[t,{caption:a}]}]:r.isBottenderFacebook(l)?[e,{method:"sendImage",params:[t]}]:r.isBottenderLine(l)?{method:"replyImage",params:[t]}:r.isFacebook(l)&&!r.isBotBuilderFacebook(l)?u:r.isBotBuilder(l)?new o.Message(l).text(e).addAttachment({contentUrl:t,contentType:n,name:a}):e}},function(e,t,n){const o=n(1),r=n(0);e.exports=(e,t,{session:n})=>r.isFacebook(n)&&!r.isBotBuilderFacebook(n)?{text:e}:r.isWebSite(n)?{text:e,markdown:!0}:r.isBotBuilder(n)?new o.Message(n).text(e).textFormat("markdown"):e},function(e,t,n){const o=n(1),r=n(0),i=n(2);n(6);e.exports=async(e,[t,n,a,{thumbnail:s,duration:l,size:u}={}],{session:c},m)=>{if(a||(a=i.last(t.split("/"))),!n){let e=i.last(a.split("."));e=e.toLowerCase(),["mp4"].indexOf(e)&&(n="image/"+e)}if(r.isWebSite(c))return{text:e,video:t};if(r.isBottenderViber(c)){const n=await r.sizeFile(t);return[e,{method:"sendVideo",params:[{media:t,thumbnail:s,duration:l,size:u||n}]}]}return r.isGactions(c)?[e,{method:"BasicCard",params:[{text:a,buttons:{title:r.getByLang({fr_FR:"Voir la vidéo",en_EN:"View video"},m,"en_EN"),url:t}}]}]:r.isBottenderLine(c)?[e,{method:"replyVideo",params:[t,s]}]:r.isBottenderTelegram(c)?{method:"sendVideo",params:[t,{thumb:s,duration:l,caption:e}]}:r.isBottenderFacebook(c)?[{method:"sendText",params:[e]},{method:"sendVideo",params:[t]}]:r.isBottenderLine(c)?{method:"replyImage",params:[t]}:r.isFacebook(c)&&!r.isBotBuilderFacebook(c)?facebook:r.isBotBuilder(c)?new o.Message(c).text(e).addAttachment({contentUrl:t,contentType:n,name:a}):e}},function(e,t,n){n(1);const o=n(0);n(2);e.exports=(e,[t,n],{session:r})=>o.isWebSite(r)?{text:e,contact:{phone:t,name:n}}:o.isBottenderViber(r)?[e,{method:"sendContact",params:[{name:n,phone_number:t}]}]:o.isBottenderTelegram(r)?[e,{method:"sendContact",params:[{first_name:n,phone_number:t}]}]:o.isBottenderFacebook(r)?{method:"sendTemplate",params:{template_type:"button",text:n,buttons:[{type:"phone_number",title:"Call",payload:t}]}}:o.isBottenderLine(r)||o.isBotBuilder(r)?void 0:e},function(e,t,n){n(1);const o=n(0);n(2);e.exports=(e,[t,n,{title:r,address:i}={}],{session:a})=>o.isWebSite(a)?{text:e,location:{latitude:t,longitude:n}}:o.isBottenderViber(a)?[e,{method:"sendLocation",params:[{lat:t,lon:n}]}]:o.isBottenderTelegram(a)?[e,{method:"sendLocation",params:[{latitude:t,longitude:n}]}]:o.isBottenderLine(a)?[e,{method:"replyLocation",params:[{title:r,address:i,latitude:t,longitude:n}]}]:o.isAlexa(a)?{type:"AskForPermissionsConsent",permissions:["read::alexa:device:all:address"]}:o.isBottenderFacebook(a)||o.isBotBuilder(a)?void 0:e},function(e,t,n){n(1);const o=n(0),{buttons:r}=(n(2),n(3));e.exports=(e,t={},{session:n},i)=>o.isGactions(n)?[{method:"SignIn",params:[e]}]:o.isAlexa(n)?{type:"LinkAccount",text:e}:r(n,e,[{type:"account_link",url:t.url}],i)},function(e,t,n){n(1);const o=n(0),{buttons:r}=(n(2),n(3));e.exports=(e,[t={}],{session:n},i)=>{let{url:a,data:s}=t;if(!a.startsWith("http")){const e=process.env.SERVER_URL;a=(e||"")+a}var l;return a+=`?data=${encodeURIComponent((l=JSON.stringify(s||{}),Buffer.from(l).toString("base64")))}&webview=true`,o.isWebSite(n)?{text:e,webview:{url:a,height:t.height}}:r(n,e,[{type:"webview",url:a,title:t.button,height:t.height}],i)}},function(e,t,n){const o=n(1),r=n(8).default,i=n(0);e.exports=function(e){return(t,n,{session:a})=>{if(i.isWebSite(a))return r.formats[e](t);let s;switch(e){case"phone":s="user_phone_number";break;case"email":s="user_email"}const l={text:t,quick_replies:[{content_type:s}]};return i.isBotBuilderFacebook(a)?new o.Message(a).sourceEvent({facebook:l}):i.isBottenderFacebook(a)?{method:"sendText",params:[t,{quick_replies:l.quick_replies}]}:i.isFacebook(a)?l:t}}},function(e,t,n){const o=n(31),r=n(32);e.exports={"Amazon.Purchase.Buy":o,"Amazon.Purchase.Cancel":r}},function(e,t,n){const o=n(0),r=n(10);e.exports=(e,[t],{session:n})=>o.isAlexa(n)?r("Buy",t):e},function(e,t,n){const o=n(0),r=n(10);e.exports=(e,[t],{session:n})=>o.isAlexa(n)?r("Cancel",t):e},function(e,t,n){"use strict";n.r(t);var o=n(11),r=n.n(o),i=n(12),a=n.n(i),s=n(4),l=n.n(s),u=n(5),c=n.n(u),m=n(13),p=n.n(m),d=n(14),f=n.n(d),b={code:"email() {\n    @Format('email')\n    > what is your email\n\n    Prompt()\n\n    bool = isEmail(:text)\n    if (not bool) {\n        > your email is invalid\n        email()\n    }\n    return :text\n}\n\nphone() {\n    @Format('phone')\n    > what is your phone\n\n     Prompt()\n\n     phone = parsePhone(:text)\n\n      if (unknown phone) {\n        > your phone is invalid\n        phone()\n    }\n\n    return phone\n}\n\ntime(text) {\n    @Format('date')\n    > { text }\n\n    Prompt()\n\n    value = parseDate(:text)\n\n    if (not value) {\n        > give me date\n        time(text)\n    }\n\n    return value\n}\n\nconfirm(text) {\n    @Format('quickReplies', ['#yes', '#no'])\n    > { text }\n\n    Prompt()\n\n    bool = parseChoice(:text)\n\n    if (unknown bool) {\n        > not understand confirmation\n        confirm(text)\n    }\n\n    return bool\n}\n\nnumber(text, options) {\n    min = options.min\n    max = options.max\n\n    @Format('number', min, max)\n    > { text }\n\n    Prompt()\n\n    number = parseNumber(:text)\n\n    if (unknown number) {\n        > not understand confirmation\n        number(text, options)\n    }\n    else {\n        if (defined min && number < min) {\n            > number min [min]\n            number(text, options)\n        }\n        else if (defined max && number > max) {\n            > number max [max]\n            number(text, options)\n        }\n    }\n\n    return number\n}\n\n",compiled:[{name:"email",params:null,type:"function",instructions:[{output:"what is your email",params:null,decorators:[{name:"Format",params:["email"]}]},{type:"executeFn",name:"Prompt",params:[],_file:{start:{offset:61,line:5,column:5},end:{offset:75,line:7,column:5}},decorators:[]},{type:"executeFn",name:"isEmail",params:[{variable:":text"}]},{variable:"bool",value:{variable:"__return_isEmail"},_file:{start:{offset:75,line:7,column:5},end:{offset:101,line:8,column:5}},decorators:[]},{condition:{variables:[{variable:"bool"}],expression:"not {0}"},instructions:[{output:"your email is invalid",params:null,decorators:[]},{type:"executeFn",name:"email",params:[],_file:{start:{offset:157,line:10,column:9},end:{offset:169,line:11,column:5}},decorators:[]}],conditionsElse:null,_file:{start:{offset:101,line:8,column:5},end:{offset:175,line:12,column:5}},decorators:[]},{return:{variable:":text"}}],_file:{start:{offset:0,line:1,column:1},end:{offset:191,line:15,column:1}},decorators:[]},{name:"phone",params:null,type:"function",instructions:[{output:"what is your phone",params:null,decorators:[{name:"Format",params:["phone"]}]},{type:"executeFn",name:"Prompt",params:[],_file:{start:{offset:253,line:19,column:6},end:{offset:268,line:21,column:6}},decorators:[]},{type:"executeFn",name:"parsePhone",params:[{variable:":text"}]},{variable:"phone",value:{variable:"__return_parsePhone"},_file:{start:{offset:268,line:21,column:6},end:{offset:301,line:23,column:7}},decorators:[]},{condition:{variable:"phone"},instructions:[{output:"your phone is invalid",params:null,decorators:[]},{type:"executeFn",name:"phone",params:[],_file:{start:{offset:362,line:25,column:9},end:{offset:374,line:26,column:5}},decorators:[]}],conditionsElse:null,keyword:"unknown",_file:{start:{offset:301,line:23,column:7},end:{offset:381,line:28,column:5}},decorators:[]},{return:{variable:"phone"}}],_file:{start:{offset:191,line:15,column:1},end:{offset:397,line:31,column:1}},decorators:[]},{name:"time",params:["text"],type:"function",instructions:[{output:{text:"{0}",variables:[{value:{variable:"text"}}]},params:null,decorators:[{name:"Format",params:["date"]}]},{type:"executeFn",name:"Prompt",params:[],_file:{start:{offset:450,line:35,column:5},end:{offset:464,line:37,column:5}},decorators:[]},{type:"executeFn",name:"parseDate",params:[{variable:":text"}]},{variable:"value",value:{variable:"__return_parseDate"},_file:{start:{offset:464,line:37,column:5},end:{offset:494,line:39,column:5}},decorators:[]},{condition:{variables:[{variable:"value"}],expression:"not {0}"},instructions:[{output:"give me date",params:null,decorators:[]},{type:"executeFn",name:"time",params:[{variable:"text"}],_file:{start:{offset:542,line:41,column:9},end:{offset:557,line:42,column:5}},decorators:[]}],conditionsElse:null,_file:{start:{offset:494,line:39,column:5},end:{offset:564,line:44,column:5}},decorators:[]},{return:{variable:"value"}}],_file:{start:{offset:397,line:31,column:1},end:{offset:580,line:47,column:1}},decorators:[]},{name:"confirm",params:["text"],type:"function",instructions:[{output:{text:"{0}",variables:[{value:{variable:"text"}}]},params:null,decorators:[{name:"Format",params:["quickReplies",["#yes","#no"]]}]},{type:"executeFn",name:"Prompt",params:[],_file:{start:{offset:661,line:51,column:5},end:{offset:675,line:53,column:5}},decorators:[]},{type:"executeFn",name:"parseChoice",params:[{variable:":text"}]},{variable:"bool",value:{variable:"__return_parseChoice"},_file:{start:{offset:675,line:53,column:5},end:{offset:706,line:55,column:5}},decorators:[]},{condition:{variable:"bool"},instructions:[{output:"not understand confirmation",params:null,decorators:[]},{type:"executeFn",name:"confirm",params:[{variable:"text"}],_file:{start:{offset:772,line:57,column:9},end:{offset:790,line:58,column:5}},decorators:[]}],conditionsElse:null,keyword:"unknown",_file:{start:{offset:706,line:55,column:5},end:{offset:797,line:60,column:5}},decorators:[]},{return:{variable:"bool"}}],_file:{start:{offset:580,line:47,column:1},end:{offset:812,line:63,column:1}},decorators:[]},{name:"number",params:["text","options"],type:"function",instructions:[{variable:"min",value:{variable:"options",deep:["min"],type:"object"},_file:{start:{offset:840,line:64,column:5},end:{offset:862,line:65,column:5}},decorators:[]},{variable:"max",value:{variable:"options",deep:["max"],type:"object"},_file:{start:{offset:862,line:65,column:5},end:{offset:885,line:67,column:5}},decorators:[]},{output:{text:"{0}",variables:[{value:{variable:"text"}}]},params:null,decorators:[{name:"Format",params:["number",{variable:"min"},{variable:"max"}]}]},{type:"executeFn",name:"Prompt",params:[],_file:{start:{offset:933,line:70,column:5},end:{offset:947,line:72,column:5}},decorators:[]},{type:"executeFn",name:"parseNumber",params:[{variable:":text"}]},{variable:"number",value:{variable:"__return_parseNumber"},_file:{start:{offset:947,line:72,column:5},end:{offset:980,line:74,column:5}},decorators:[]},{condition:{variable:"number"},instructions:[{output:"not understand confirmation",params:null,decorators:[]},{type:"executeFn",name:"number",params:[{variable:"text"},{variable:"options"}],_file:{start:{offset:1048,line:76,column:9},end:{offset:1074,line:77,column:5}},decorators:[]}],conditionsElse:{instructions:[{condition:{variables:[{variable:"min"},{variable:"number"},{variable:"min"}],expression:"{0} and {1} < {2}"},instructions:[{output:"number min",params:[{variable:"min"}],decorators:[]},{type:"executeFn",name:"number",params:[{variable:"text"},{variable:"options"}],_file:{start:{offset:1173,line:81,column:13},end:{offset:1203,line:82,column:9}},decorators:[]}],conditionsElse:{instructions:[{condition:{variables:[{variable:"max"},{variable:"number"},{variable:"max"}],expression:"{0} and {1} > {2}"},instructions:[{output:"number max",params:[{variable:"max"}],decorators:[]},{type:"executeFn",name:"number",params:[{variable:"text"},{variable:"options"}],_file:{start:{offset:1296,line:85,column:13},end:{offset:1326,line:86,column:9}},decorators:[]}],conditionsElse:null,keyword:"defined",_file:{start:{offset:1218,line:83,column:14},end:{offset:1332,line:87,column:5}},decorators:[]}]},keyword:"defined",_file:{start:{offset:1095,line:79,column:9},end:{offset:1332,line:87,column:5}},decorators:[]}]},keyword:"unknown",_file:{start:{offset:980,line:74,column:5},end:{offset:1339,line:89,column:5}},decorators:[]},{return:{variable:"number"}}],_file:{start:{offset:812,line:63,column:1},end:{offset:1356,line:92,column:1}},decorators:[]}]},g={packages:{en_EN:n(15),fr_FR:n(16)}};const x=function(e){const{user:t}=e;let n,o=t.getLang();switch(o=o?o.split("_")[0]:"en",l.a[o]||(o="en"),o){case"en":n="English";break;case"fr":n="French"}return{langId:o,langName:n}},h=function(e,t,n){let o;const{langName:r}=x(n);switch(e){case"number":o=p.a.recognizeNumber;break;case"bool":o=c.a.recognizeBoolean;break;case"phone":o=f.a.recognizePhoneNumber}const i=o(t,c.a.Culture[r]);return i.length>0?i[0].resolution.value:null},y=function(e,t,{session:n}){return"website"===n.message.source?{text:e,...t}:e};t.default={code:b,languages:g,functions:{isEmail:r.a,parseDate(e){const{langId:t}=x(this.converse);return l.a[t].parseDate(e)},parseChoice(e){return h("bool",e,this.converse)},parseNumber(e){return h("number",e,this.converse)},parsePhone(e){return h("phone",e,this.converse)}},skills:{formats:a.a},formats:{date:(e,t,n)=>y(e,{date:!0},n),number:(e,[t,n],o)=>y(e,{number:{min:t,max:n}},o)}}}]).default}));