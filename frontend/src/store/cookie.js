// Cookie

var raw_cookie = document.cookie;
var output = {};

raw_cookie.split(/\s*;\s*/).forEach(function(pair) {
  pair = pair.split(/\s*=\s*/);
  output[pair[0]] = pair.splice(1).join('=');
});

var string_cookie = JSON.stringify(output, null, 4);
var json_cookie = JSON.parse(string_cookie);

if (json_cookie.access_token === "undefined") json_cookie.access_token="";
if (json_cookie.user_id === 'undefined') json_cookie.user_id="";

export default json_cookie;