/*
 * 
 * Legacy support for GEO Location API
 * http://geo-location-javascript.googlecode.com/svn/trunk/js/geo.js
 * http://code.google.com/p/geo-location-javascript/
 * 
 */

var bb_success,bb_error,bb_blackberryTimeout_id=-1;function handleBlackBerryLocationTimeout(){bb_blackberryTimeout_id!=-1&&bb_error({message:"Timeout error",code:3})}
function handleBlackBerryLocation(){clearTimeout(bb_blackberryTimeout_id);bb_blackberryTimeout_id=-1;if(bb_success&&bb_error){if(blackberry.location.latitude==0&&blackberry.location.longitude==0)bb_error({message:"Position unavailable",code:2});else{var a=null;blackberry.location.timestamp&&(a=new Date(blackberry.location.timestamp));bb_success({timestamp:a,coords:{latitude:blackberry.location.latitude,longitude:blackberry.location.longitude}})}bb_error=bb_success=null}}
var geo_position_js=function(){var a={},c=null;a.showMap=function(a,f){typeof blackberry!="undefined"?blackberry.launch.newMap({latitude:a*1E5,longitude:-f*1E5}):window.location="http://maps.google.com/maps?q=loc:"+a+","+f};a.getCurrentPosition=function(a,f,e){c.getCurrentPosition(a,f,e)};a.init=function(){try{if(typeof geo_position_js_simulator!="undefined")c=geo_position_js_simulator;else if(typeof bondi!="undefined"&&typeof bondi.geolocation!="undefined")c=bondi.geolocation;else if(typeof navigator.geolocation!=
"undefined")c=navigator.geolocation,a.getCurrentPosition=function(a,e,d){c.getCurrentPosition(function(b){typeof b.latitude!="undefined"?a({timestamp:b.timestamp,coords:{latitude:b.latitude,longitude:b.longitude}}):a(b)},e,d)};else if(typeof window.blackberry!="undefined"&&blackberry.location.GPSSupported){if(typeof blackberry.location.setAidMode=="undefined")return!1;blackberry.location.setAidMode(2);a.getCurrentPosition=function(a,e,d){bb_success=a;bb_error=e;bb_blackberryTimeout_id=d.timeout?setTimeout("handleBlackBerryLocationTimeout()",
d.timeout):setTimeout("handleBlackBerryLocationTimeout()",6E4);blackberry.location.onLocationUpdate("handleBlackBerryLocation()");blackberry.location.refreshLocation()};c=blackberry.location}else if(typeof window.google!="undefined"&&typeof google.gears!="undefined")c=google.gears.factory.create("beta.geolocation"),a.getCurrentPosition=function(a,e,d){c.getCurrentPosition(function(b){typeof b.latitude!="undefined"?a({timestamp:b.timestamp,coords:{latitude:b.latitude,longitude:b.longitude}}):a(b)},
e,d)};else if(typeof Mojo!="undefined"&&typeof Mojo.Service.Request!="Mojo.Service.Request")c=!0,a.getCurrentPosition=function(a,e,d){parameters={};if(d){if(d.enableHighAccuracy&&d.enableHighAccuracy==!0)parameters.accuracy=1;if(d.maximumAge)parameters.maximumAge=d.maximumAge;if(d.responseTime)d.responseTime<5?parameters.responseTime=1:d.responseTime<20?parameters.responseTime=2:parameters.timeout=3}r=new Mojo.Service.Request("palm://com.palm.location",{method:"getCurrentPosition",parameters:parameters,
onSuccess:function(b){a({timestamp:b.timestamp,coords:{latitude:b.latitude,longitude:b.longitude,heading:b.heading}})},onFailure:function(a){a.errorCode==1?e({code:3,message:"Timeout"}):a.errorCode==2?e({code:2,message:"Position unavailable"}):e({code:0,message:"Unknown Error: webOS-code"+errorCode})}})};else if(typeof device!="undefined"&&typeof device.getServiceObject!="undefined")c=device.getServiceObject("Service.Location","ILocation"),a.getCurrentPosition=function(a,e){c.ILocation.GetLocation({LocationInformationClass:"BasicLocationInformation"},
function(d,b,c){b==4?e({message:"Position unavailable",code:2}):a({timestamp:null,coords:{latitude:c.ReturnValue.Latitude,longitude:c.ReturnValue.Longitude,altitude:c.ReturnValue.Altitude,heading:c.ReturnValue.Heading}})})}}catch(g){return typeof console!="undefined"&&console.log(g),!1}return c!=null};return a}();