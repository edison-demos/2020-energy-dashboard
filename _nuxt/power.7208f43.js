(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{245:function(e,t,r){"use strict";r.d(t,"c",(function(){return y})),r.d(t,"b",(function(){return h})),r.d(t,"i",(function(){return _})),r.d(t,"a",(function(){return m})),r.d(t,"d",(function(){return x})),r.d(t,"e",(function(){return D})),r.d(t,"f",(function(){return w})),r.d(t,"j",(function(){return k})),r.d(t,"g",(function(){return A})),r.d(t,"h",(function(){return C}));r(66),r(11),r(51),r(60),r(32),r(33),r(86);var n=r(43),o=(r(12),r(10),r(110),r(111),r(25),r(244)),l=r.n(o),c=r(247);function d(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return f(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var i=0,n=function(){};return{s:n,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return l=e.done,e},e:function(e){c=!0,o=e},f:function(){try{l||null==r.return||r.return()}finally{if(c)throw o}}}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}var y=["#cd256f","#ef9424","#20a7d9","#79b045","#89328a","#086db0","#c7def8","#fc2929","#fad8c7","#fbca04","#84b6eb","#00cccc","#159818","#eb6420","#bfe5bf","#f7c6c7","#d4c5f9","#cc317c","#207de5","#b1eadc"],h=[{name:"總輸入功率",key:"active_power",diffMode:!1,sumary:!0},{name:"總輸出功率",key:"loadside_power",diffMode:!1,sumary:!0},{name:"總視在功率",key:"apparent_power",diffMode:!1,sumary:!0},{name:"平均亮度",key:"device_arc",diffMode:!1,sumary:!1},{name:"平均使用時間率",key:"light_source_on_time",diffMode:!0,sumary:!1},{name:"平均能耗使用率(輸出)",key:"output_usage",diffMode:!1,sumary:!0},{name:"平均能耗使用率(輸入)",key:"input_usage",diffMode:!1,sumary:!0},{name:"啟動總次數",key:"light_source_start_count",diffMode:!0,sumary:!1},{name:"驅動器最高溫度",key:"control_gear_temperature",sumary:!1,maxMode:!0},{name:"平均頻率",key:"control_gear_voltage_frequence",sumary:!1},{name:"平均輸入電壓",key:"control_gear_voltage",sumary:!1},{name:"平均功率因數",key:"control_gear_power_factor",sumary:!1}];function v(e,t,r){var n=l()(t.created_at),o=l()(e.created_at),c=l.a.duration(o.diff(n)).asSeconds();return Math.min(100,100*(e[r]-t[r])/c)}function _(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],f=0,_={datasets:[]},m=r.gears.map((function(g){return g.id})),x=m.reduce((function(t,r){return e[t].length>e[r].length?t:r})),D=m.length,w=r.gears.map((function(g){return g.power_out})).reduce((function(a,b){return a+b})),k=r.gears.map((function(g){return g.power_in})).reduce((function(a,b){return a+b})),A=d(h);try{for(A.s();!(t=A.n()).done;){var C,M=t.value,Y=M.name,I=M.key,O=M.sumary,j=M.diffMode,S=M.maxMode,F=M.yAxisID,R=[],$=d(e[x].entries());try{for($.s();!(C=$.n()).done;){var P=Object(n.a)(C.value,2),E=P[0],T=P[1],B=l()(T.created_at),z=E+1;if(e[x][z]){var J,U=[],W=0,N=d(m);try{for(N.s();!(J=N.n()).done;){var G=J.value,H=e[G][E],K=e[G][z];if(H&&K){U.push(H[I]);var L=H[I];j&&(L=H[I]-K[I]),I.includes("on_time")&&(L=v(H,K,I)),"device_arc"===I&&(L=c.a[L]),"output_usage"===I&&(L=H.loadside_power),"input_usage"===I&&(L=H.active_power),W+=L}}}catch(e){N.e(e)}finally{N.f()}var Q=W;O||(Q=W/D),"output_usage"===I&&(Q=W/w*100),"input_usage"===I&&(Q=W/k*100),S&&(Q=Math.max.apply(Math,U)),R.push({x:B.format(),y:Q.toFixed(2)})}}}catch(e){$.e(e)}finally{$.f()}o.includes(f)?f++:_.datasets.push({yAxisID:F,label:Y,fill:!1,tension:0,borderColor:y[f++],data:[].concat(R)})}}catch(e){A.e(e)}finally{A.f()}return _}var m=["輸入耗能","視在耗能","負載耗能","平均啟動次數","平均使用率","平均亮度"];function x(e,t,r){var n,o=t.gears.map((function(g){return g.id})),c=o.reduce((function(t,r){return e[t].length>e[r].length?t:r})),f=[],h=[],_=[],m=[],x=[],D=[],w=!0,k=d(e[c]);try{var A=function(){var t=n.value;if(w)return w=!1,"continue";var r,c=l()(t.created_at),y=l()(t.created_at).subtract(1,"day"),k={l0:0,l1:0,l2:0},A=0,C=0,M=0,Y=d(o);try{for(Y.s();!(r=Y.n()).done;){var I=r.value,O=e[I].find((function(e){return c.isSame(e.created_at,"day")})),j=e[I].find((function(e){return y.isSame(e.created_at,"day")}));O&&j&&(k.l0+=O.active_energy-j.active_energy,k.l1+=O.apparent_energy-j.apparent_energy,k.l2+=O.loadside_energy-j.loadside_energy,A+=v(O,j,"light_source_on_time"),C+=O.light_source_start_count-j.light_source_start_count,M+=O.device_arc)}}catch(e){Y.e(e)}finally{Y.f()}f.push({x:c.format("YYYY-MM-DD"),y:(k.l0/o.length).toFixed(2)}),h.push({x:c.format("YYYY-MM-DD"),y:(k.l1/o.length).toFixed(2)}),_.push({x:c.format("YYYY-MM-DD"),y:(k.l2/o.length).toFixed(2)}),m.push({x:c.format("YYYY-MM-DD"),y:(C/o.length).toFixed(0)}),x.push({x:c.format("YYYY-MM-DD"),y:(A/o.length).toFixed(0)}),D.push({x:c.format("YYYY-MM-DD"),y:(M/o.length).toFixed(2)})};for(k.s();!(n=k.n()).done;)A()}catch(e){k.e(e)}finally{k.f()}return{datasets:[{yAxisID:"a",borderColor:y[0],fill:!1,tension:0,label:"輸入耗能",data:f},{yAxisID:"a",borderColor:y[1],fill:!1,tension:0,label:"視在耗能",data:h},{yAxisID:"a",borderColor:y[2],fill:!1,tension:0,label:"負載耗能",data:_},{yAxisID:"d",borderColor:y[3],fill:!1,tension:0,label:"平均啟動次數",data:m},{yAxisID:"e",borderColor:y[4],fill:!1,tension:0,label:"平均使用率",data:x},{yAxisID:"f",borderColor:y[5],fill:!1,tension:0,label:"平均亮度",data:D}].filter((function(e,t){return!r.includes(t)}))}}function D(e,t,r,n){var o=t.gears.map((function(g){return g.id})),l=[],c=Array(24).keys();r&&(c=Array(7).keys());var f,h=[],v=[],_=[],m=[],x=[],D=[],w=d(c);try{for(w.s();!(f=w.n()).done;){var k=f.value;l.push(k);var A,C={l0:0,l1:0,l2:0},M=0,Y=0,I=0,O=d(o);try{for(O.s();!(A=O.n()).done;){var j=A.value;e[j]&&(C.l0+=e[j][k].active_energy,C.l1+=e[j][k].apparent_energy,C.l2+=e[j][k].loadside_energy,M+=e[j][k].light_source_on_time,Y+=e[j][k].light_source_start_count,I+=e[j][k].device_arc)}}catch(e){O.e(e)}finally{O.f()}h.push((C.l0/o.length).toFixed(2)),v.push((C.l1/o.length).toFixed(2)),_.push((C.l2/o.length).toFixed(2)),m.push((Y/o.length).toFixed(0)),x.push((M/o.length).toFixed(0)),D.push((I/o.length).toFixed(2))}}catch(e){w.e(e)}finally{w.f()}return r&&(l=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]),{labels:l,datasets:[{yAxisID:"a",borderColor:y[0],fill:!1,tension:0,label:"輸入耗能",data:h},{yAxisID:"a",borderColor:y[1],fill:!1,tension:0,label:"視在耗能",data:v},{yAxisID:"a",borderColor:y[2],fill:!1,tension:0,label:"負載耗能",data:_},{yAxisID:"d",borderColor:y[3],fill:!1,tension:0,label:"平均啟動次數",data:m},{yAxisID:"e",borderColor:y[4],fill:!1,tension:0,label:"平均使用率",data:x},{yAxisID:"f",borderColor:y[5],fill:!1,tension:0,label:"平均亮度",data:D}].filter((function(e,t){return!n.includes(t)}))}}function w(e,t){var r=[],n=0,o=t?{device_arc:"　亮度　",light_source_voltage:"　輸出電壓　",light_source_current:"　輸出電流　",light_source_temperature:"　光源溫度　",light_source_start_count:"　輸出啟動次數　",light_source_on_time:"　輸出啟動時間　"}:{light_source_faiture_count:"輸出錯誤次數",light_source_short_count:"輸出短路次數",light_source_open_count:"輸出開路次數",light_source_thermal_derating_count:"光源降載次數",light_source_thermal_shutdown_count:"光源過熱關閉次數"},d=function(d){var label=o[d],f=[];e.forEach((function(t,i){if(e[i+1]){var r=l()(t.created_at),n=t[d];"device_arc"===d&&(n=c.a[n]),f.push({x:r.format(),y:n})}}));var v={label:label,fill:!1,tension:0,borderColor:y[n++],data:[].concat(f)};t&&(v.yAxisID=h[n].yAxisID),r.push(v)};for(var f in o)d(f);return{datasets:r}}var k=["輸入電壓","輸入電壓頻率","負載耗能"];function A(e,t,r){var n,o=t.gears.map((function(g){return g.id})),c=o.reduce((function(t,r){return e[t].length>e[r].length?t:r})),f=[],h=[],v=[],_=0,m=d(e[c]);try{var x=function(){var t,r=n.value,c=l()(r.created_at),y={l0:0,l1:0,l2:0},m=d(o);try{for(m.s();!(t=m.n()).done;){var x=t.value,D=e[x].find((function(e){return c.isSame(e.created_at,"day")}));D&&(y.l0+=D.control_gear_voltage,y.l1+=D.control_gear_voltage_frequence,y.l2+=D.loadside_energy)}}catch(e){m.e(e)}finally{m.f()}f.push({x:c.format("YYYY-MM-DD"),y:(y.l0/o.length).toFixed(2)}),h.push({x:c.format("YYYY-MM-DD"),y:(y.l1/o.length).toFixed(2)});var w=y.l2/o.length,k=w-_;_=w,v.push({x:c.format("YYYY-MM-DD"),y:k.toFixed(2)})};for(m.s();!(n=m.n()).done;)x()}catch(e){m.e(e)}finally{m.f()}h.shift(),v.shift(),f.shift();var D={datasets:[{yAxisID:"a",borderColor:y[0],fill:!1,tension:0,label:"輸入電壓",data:f},{yAxisID:"b",borderColor:y[1],fill:!1,tension:0,label:"輸入電壓頻率",data:h},{yAxisID:"c",borderColor:y[2],fill:!1,tension:0,label:"負載耗能",data:v}]};return D.datasets=D.datasets.filter((function(e,t){return!r.includes(t)})),D}function C(e,t,r,n){var o=t.gears.map((function(g){return g.id})),l=[],c=Array(24).keys();r&&(c=Array(7).keys());var f,h=[],v=[],_=[],m=d(c);try{for(m.s();!(f=m.n()).done;){var x=f.value;l.push(x);var D,w={l0:0,l1:0,l2:0},k=d(o);try{for(k.s();!(D=k.n()).done;){var A=D.value;e[A]&&(w.l0+=e[A][x].control_gear_voltage,w.l1+=e[A][x].control_gear_voltage_frequence,w.l2+=e[A][x].loadside_energy)}}catch(e){k.e(e)}finally{k.f()}h.push((w.l0/o.length).toFixed(2)),v.push((w.l1/o.length).toFixed(2)),_.push((w.l2/o.length).toFixed(2))}}catch(e){m.e(e)}finally{m.f()}return r&&(l=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]),{labels:l,datasets:[{yAxisID:"a",borderColor:y[0],fill:!1,tension:0,label:"輸入電壓",data:h},{yAxisID:"b",borderColor:y[1],fill:!1,tension:0,label:"輸入電壓頻率",data:v},{yAxisID:"c",borderColor:y[2],fill:!1,tension:0,label:"負載耗能",data:_}].filter((function(e,t){return!n.includes(t)}))}}},254:function(e,t,r){var content=r(408);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(68).default)("cfd5368a",content,!0,{sourceMap:!1})},407:function(e,t,r){"use strict";var n=r(254);r.n(n).a},408:function(e,t,r){(t=r(67)(!1)).push([e.i,".s-name[data-v-b98ea402]{margin-top:30px}.spliter[data-v-b98ea402]{padding-top:20px}.card[data-v-b98ea402]{margin:10px 0;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}.colorRec[data-v-b98ea402]{margin-top:15px;height:26px;width:100%}.m-dropdown[data-v-b98ea402]{background-color:#2d2d2d;color:#fff;border-radius:8px;padding:12px 15px;margin-top:-25px;z-index:1;opacity:.9;font-size:14px;line-height:24px}",""]),e.exports=t},430:function(e,t,r){"use strict";r.r(t);r(66),r(51),r(60),r(25),r(32),r(33),r(14),r(11),r(61);var n=r(22),o=(r(12),r(10),r(13),r(1)),l=r(245),c=r(74),d=r(244),f=r.n(d);function y(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return h(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var i=0,n=function(){};return{s:n,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return l=e.done,e},e:function(e){c=!0,o=e},f:function(){try{l||null==r.return||r.return()}finally{if(c)throw o}}}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}function v(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function _(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={data:function(){return{startDate:f()(new Date).subtract(1,"month").toISOString(),powerOptions:l.j.map((function(text){return{name:text,checked:!0}})),colors:l.c,endDate:new Date,loading:!1,activeIndex:0,analysisData:{},dayChartData:{},hourChartData:{},weekChartData:{}}},computed:_(_({},Object(c.b)(["regions","status","config"])),{},{lockRegionButton:function(){return!Object.keys(this.analysisData).length},regionsAsOption:function(){return this.regions.map((function(e,t){return _(_({},e),{},{index:t})}))},disables:function(){return this.powerOptions.map((function(e,t){return e.checked?255:t})).filter((function(e){return e<255}))},title:function(){return/day/.test(this.$route.path)?"日":/hour/.test(this.$route.path)?"區間小時":"周"}}),methods:{startAnalysis:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,o,l,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.$axios.$get("config");case 3:r=t.sent,n=y(r),t.prev=5,n.s();case 7:if((o=n.n()).done){t.next=13;break}if(o.value.id,0!==r.length){t.next=11;break}return t.abrupt("return");case 11:t.next=7;break;case 13:t.next=18;break;case 15:t.prev=15,t.t0=t.catch(5),n.e(t.t0);case 18:return t.prev=18,n.f(),t.finish(18);case 21:return l=r[0].id,c=f()(new Date(e.startDate)).subtract(1,"day").valueOf(),t.next=25,e.$axios.$get("analysis",{params:{config_id:l,start_at:c,end_at:new Date(e.endDate).getTime()}});case 25:e.analysisData=t.sent,e.loading=!1,e.changeRegion();case 28:case"end":return t.stop()}}),t,null,[[5,15,18,21]])})))()},changeRegion:function(){this.activeIndex}},mounted:function(){this.startAnalysis()}},x=(r(407),r(50)),component=Object(x.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"mt-2"},[r("b-row",[r("b-col",[r("h2",{staticClass:"s-name text-center"},[e._v("電力分析 -\b"+e._s(e.title)+"統計分析")])])],1),r("b-row",{staticClass:"mt-3",attrs:{"align-v":"end"}},[r("b-col",[r("label",{attrs:{for:"start-datepicker"}},[e._v("Start date")]),r("b-form-datepicker",{staticClass:"md-2",attrs:{id:"start-datepicker"},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}})],1),r("b-col",[r("label",{attrs:{for:"end-datepicker"}},[e._v("End date")]),r("b-form-datepicker",{staticClass:"md-2",attrs:{id:"end-datepicker"},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}})],1),r("b-col",{attrs:{cols:"1"}},[r("b-button",{attrs:{variant:"outline-primary"},on:{click:e.startAnalysis}},[e._v("統計")])],1)],1),r("b-row",{staticClass:"mt-3"},[r("b-col",[r("b-form-select",{attrs:{"text-field":"name","value-field":"index",options:e.regionsAsOption},on:{change:e.changeRegion},model:{value:e.activeIndex,callback:function(t){e.activeIndex=t},expression:"activeIndex"}})],1)],1),e.lockRegionButton?e._e():r("b-row",[r("b-col",{staticClass:"mt-2"},[r("b-overlay",{attrs:{show:e.loading}},[r("b-card",{staticClass:"card"},[r("b-row",{attrs:{"align-h":"end"}},[r("b-dropdown",{staticClass:"m-2",attrs:{text:"顯示項目",variant:"warning"}},[r("b-dropdown-form"),r("div",{staticClass:"m-dropdown"},e._l(e.powerOptions,(function(t,n){return r("div",{key:n},[r("b-form-checkbox",{model:{value:t.checked,callback:function(r){e.$set(t,"checked",r)},expression:"cl.checked"}},[e._v(e._s(t.name))])],1)})),0)],1)],1),r("b-row",[r("b-col",[r("NuxtChild",{attrs:{"analysis-data":e.analysisData,region:e.regions[e.activeIndex],disables:e.disables}})],1)],1)],1)],1)],1)],1),e.lockRegionButton?e._e():r("b-row",{staticClass:"legend"},e._l(e.powerOptions,(function(t,n){return e.disables.includes(n)?e._e():r("b-col",{key:n,attrs:{cols:"2"}},[r("div",{staticClass:"colorRec",style:{"background-color":e.colors[n]}}),r("div",{staticClass:"text-center"},[e._v(e._s(t.name))])])})),1)],1)}),[],!1,null,"b98ea402",null);t.default=component.exports}}]);