(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{245:function(e,t,r){"use strict";r.d(t,"c",(function(){return h})),r.d(t,"b",(function(){return y})),r.d(t,"i",(function(){return v})),r.d(t,"a",(function(){return m})),r.d(t,"d",(function(){return x})),r.d(t,"e",(function(){return D})),r.d(t,"f",(function(){return Y})),r.d(t,"j",(function(){return A})),r.d(t,"g",(function(){return M})),r.d(t,"h",(function(){return C}));r(66),r(11),r(51),r(60),r(32),r(33),r(86);var n=r(43),o=(r(12),r(10),r(110),r(111),r(25),r(244)),l=r.n(o),d=r(247);function c(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return f(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var i=0,n=function(){};return{s:n,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,d=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return l=e.done,e},e:function(e){d=!0,o=e},f:function(){try{l||null==r.return||r.return()}finally{if(d)throw o}}}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}var h=["#cd256f","#ef9424","#20a7d9","#79b045","#89328a","#086db0","#c7def8","#fc2929","#fad8c7","#fbca04","#84b6eb","#00cccc","#159818","#eb6420","#bfe5bf","#f7c6c7","#d4c5f9","#cc317c","#207de5","#b1eadc"],y=[{name:"總輸入功率",key:"active_power",diffMode:!1,sumary:!0},{name:"總輸出功率",key:"loadside_power",diffMode:!1,sumary:!0},{name:"總視在功率",key:"apparent_power",diffMode:!1,sumary:!0},{name:"平均亮度",key:"device_arc",diffMode:!1,sumary:!1},{name:"平均使用時間率",key:"light_source_on_time",diffMode:!0,sumary:!1},{name:"平均能耗使用率(輸出)",key:"output_usage",diffMode:!1,sumary:!0},{name:"平均能耗使用率(輸入)",key:"input_usage",diffMode:!1,sumary:!0},{name:"啟動總次數",key:"light_source_start_count",diffMode:!0,sumary:!1},{name:"驅動器最高溫度",key:"control_gear_temperature",sumary:!1,maxMode:!0},{name:"平均頻率",key:"control_gear_voltage_frequence",sumary:!1},{name:"平均輸入電壓",key:"control_gear_voltage",sumary:!1},{name:"平均功率因數",key:"control_gear_power_factor",sumary:!1}];function _(e,t,r){var n=l()(t.created_at),o=l()(e.created_at),d=l.a.duration(o.diff(n)).asSeconds();return Math.min(100,100*(e[r]-t[r])/d)}function v(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],f=0,v={datasets:[]},m=r.gears.map((function(g){return g.id})),x=m.reduce((function(t,r){return e[t].length>e[r].length?t:r})),D=m.length,Y=r.gears.map((function(g){return g.power_out})).reduce((function(a,b){return a+b})),A=r.gears.map((function(g){return g.power_in})).reduce((function(a,b){return a+b})),M=c(y);try{for(M.s();!(t=M.n()).done;){var C,I=t.value,w=I.name,F=I.key,k=I.sumary,S=I.diffMode,j=I.maxMode,O=I.yAxisID,T=[],L=c(e[x].entries());try{for(L.s();!(C=L.n()).done;){var E=Object(n.a)(C.value,2),J=E[0],W=E[1],$=l()(W.created_at),z=J+1;if(e[x][z]){var P,R=[],U=0,B=c(m);try{for(B.s();!(P=B.n()).done;){var G=P.value,H=e[G][J],K=e[G][z];if(H&&K){R.push(H[F]);var N=H[F];S&&(N=H[F]-K[F]),F.includes("on_time")&&(N=_(H,K,F)),"device_arc"===F&&(N=d.a[N]),"output_usage"===F&&(N=H.loadside_power),"input_usage"===F&&(N=H.active_power),U+=N}}}catch(e){B.e(e)}finally{B.f()}var Q=U;k||(Q=U/D),"output_usage"===F&&(Q=U/Y*100),"input_usage"===F&&(Q=U/A*100),j&&(Q=Math.max.apply(Math,R)),T.push({x:$.format(),y:Q.toFixed(2)})}}}catch(e){L.e(e)}finally{L.f()}o.includes(f)?f++:v.datasets.push({yAxisID:O,label:w,fill:!1,tension:0,borderColor:h[f++],data:[].concat(T)})}}catch(e){M.e(e)}finally{M.f()}return v}var m=["輸入耗能","視在耗能","負載耗能","平均啟動次數","平均使用率","平均亮度"];function x(e,t,r){var n,o=t.gears.map((function(g){return g.id})),d=o.reduce((function(t,r){return e[t].length>e[r].length?t:r})),f=[],y=[],v=[],m=[],x=[],D=[],Y=!0,A=c(e[d]);try{var M=function(){var t=n.value;if(Y)return Y=!1,"continue";var r,d=l()(t.created_at),h=l()(t.created_at).subtract(1,"day"),A={l0:0,l1:0,l2:0},M=0,C=0,I=0,w=c(o);try{for(w.s();!(r=w.n()).done;){var F=r.value,k=e[F].find((function(e){return d.isSame(e.created_at,"day")})),S=e[F].find((function(e){return h.isSame(e.created_at,"day")}));k&&S&&(A.l0+=k.active_energy-S.active_energy,A.l1+=k.apparent_energy-S.apparent_energy,A.l2+=k.loadside_energy-S.loadside_energy,M+=_(k,S,"light_source_on_time"),C+=k.light_source_start_count-S.light_source_start_count,I+=k.device_arc)}}catch(e){w.e(e)}finally{w.f()}f.push({x:d.format("YYYY-MM-DD"),y:(A.l0/o.length).toFixed(2)}),y.push({x:d.format("YYYY-MM-DD"),y:(A.l1/o.length).toFixed(2)}),v.push({x:d.format("YYYY-MM-DD"),y:(A.l2/o.length).toFixed(2)}),m.push({x:d.format("YYYY-MM-DD"),y:(C/o.length).toFixed(0)}),x.push({x:d.format("YYYY-MM-DD"),y:(M/o.length).toFixed(0)}),D.push({x:d.format("YYYY-MM-DD"),y:(I/o.length).toFixed(2)})};for(A.s();!(n=A.n()).done;)M()}catch(e){A.e(e)}finally{A.f()}return{datasets:[{yAxisID:"a",borderColor:h[0],fill:!1,tension:0,label:"輸入耗能",data:f},{yAxisID:"a",borderColor:h[1],fill:!1,tension:0,label:"視在耗能",data:y},{yAxisID:"a",borderColor:h[2],fill:!1,tension:0,label:"負載耗能",data:v},{yAxisID:"d",borderColor:h[3],fill:!1,tension:0,label:"平均啟動次數",data:m},{yAxisID:"e",borderColor:h[4],fill:!1,tension:0,label:"平均使用率",data:x},{yAxisID:"f",borderColor:h[5],fill:!1,tension:0,label:"平均亮度",data:D}].filter((function(e,t){return!r.includes(t)}))}}function D(e,t,r,n){var o=t.gears.map((function(g){return g.id})),l=[],d=Array(24).keys();r&&(d=Array(7).keys());var f,y=[],_=[],v=[],m=[],x=[],D=[],Y=c(d);try{for(Y.s();!(f=Y.n()).done;){var A=f.value;l.push(A);var M,C={l0:0,l1:0,l2:0},I=0,w=0,F=0,k=c(o);try{for(k.s();!(M=k.n()).done;){var S=M.value;e[S]&&(C.l0+=e[S][A].active_energy,C.l1+=e[S][A].apparent_energy,C.l2+=e[S][A].loadside_energy,I+=e[S][A].light_source_on_time,w+=e[S][A].light_source_start_count,F+=e[S][A].device_arc)}}catch(e){k.e(e)}finally{k.f()}y.push((C.l0/o.length).toFixed(2)),_.push((C.l1/o.length).toFixed(2)),v.push((C.l2/o.length).toFixed(2)),m.push((w/o.length).toFixed(0)),x.push((I/o.length).toFixed(0)),D.push((F/o.length).toFixed(2))}}catch(e){Y.e(e)}finally{Y.f()}return r&&(l=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]),{labels:l,datasets:[{yAxisID:"a",borderColor:h[0],fill:!1,tension:0,label:"輸入耗能",data:y},{yAxisID:"a",borderColor:h[1],fill:!1,tension:0,label:"視在耗能",data:_},{yAxisID:"a",borderColor:h[2],fill:!1,tension:0,label:"負載耗能",data:v},{yAxisID:"d",borderColor:h[3],fill:!1,tension:0,label:"平均啟動次數",data:m},{yAxisID:"e",borderColor:h[4],fill:!1,tension:0,label:"平均使用率",data:x},{yAxisID:"f",borderColor:h[5],fill:!1,tension:0,label:"平均亮度",data:D}].filter((function(e,t){return!n.includes(t)}))}}function Y(e,t){var r=[],n=0,o=t?{device_arc:"　亮度　",light_source_voltage:"　輸出電壓　",light_source_current:"　輸出電流　",light_source_temperature:"　光源溫度　",light_source_start_count:"　輸出啟動次數　",light_source_on_time:"　輸出啟動時間　"}:{light_source_faiture_count:"輸出錯誤次數",light_source_short_count:"輸出短路次數",light_source_open_count:"輸出開路次數",light_source_thermal_derating_count:"光源降載次數",light_source_thermal_shutdown_count:"光源過熱關閉次數"},c=function(c){var label=o[c],f=[];e.forEach((function(t,i){if(e[i+1]){var r=l()(t.created_at),n=t[c];"device_arc"===c&&(n=d.a[n]),f.push({x:r.format(),y:n})}}));var _={label:label,fill:!1,tension:0,borderColor:h[n++],data:[].concat(f)};t&&(_.yAxisID=y[n].yAxisID),r.push(_)};for(var f in o)c(f);return{datasets:r}}var A=["輸入電壓","輸入電壓頻率","負載耗能"];function M(e,t,r){var n,o=t.gears.map((function(g){return g.id})),d=o.reduce((function(t,r){return e[t].length>e[r].length?t:r})),f=[],y=[],_=[],v=0,m=c(e[d]);try{var x=function(){var t,r=n.value,d=l()(r.created_at),h={l0:0,l1:0,l2:0},m=c(o);try{for(m.s();!(t=m.n()).done;){var x=t.value,D=e[x].find((function(e){return d.isSame(e.created_at,"day")}));D&&(h.l0+=D.control_gear_voltage,h.l1+=D.control_gear_voltage_frequence,h.l2+=D.loadside_energy)}}catch(e){m.e(e)}finally{m.f()}f.push({x:d.format("YYYY-MM-DD"),y:(h.l0/o.length).toFixed(2)}),y.push({x:d.format("YYYY-MM-DD"),y:(h.l1/o.length).toFixed(2)});var Y=h.l2/o.length,A=Y-v;v=Y,_.push({x:d.format("YYYY-MM-DD"),y:A.toFixed(2)})};for(m.s();!(n=m.n()).done;)x()}catch(e){m.e(e)}finally{m.f()}y.shift(),_.shift(),f.shift();var D={datasets:[{yAxisID:"a",borderColor:h[0],fill:!1,tension:0,label:"輸入電壓",data:f},{yAxisID:"b",borderColor:h[1],fill:!1,tension:0,label:"輸入電壓頻率",data:y},{yAxisID:"c",borderColor:h[2],fill:!1,tension:0,label:"負載耗能",data:_}]};return D.datasets=D.datasets.filter((function(e,t){return!r.includes(t)})),D}function C(e,t,r,n){var o=t.gears.map((function(g){return g.id})),l=[],d=Array(24).keys();r&&(d=Array(7).keys());var f,y=[],_=[],v=[],m=c(d);try{for(m.s();!(f=m.n()).done;){var x=f.value;l.push(x);var D,Y={l0:0,l1:0,l2:0},A=c(o);try{for(A.s();!(D=A.n()).done;){var M=D.value;e[M]&&(Y.l0+=e[M][x].control_gear_voltage,Y.l1+=e[M][x].control_gear_voltage_frequence,Y.l2+=e[M][x].loadside_energy)}}catch(e){A.e(e)}finally{A.f()}y.push((Y.l0/o.length).toFixed(2)),_.push((Y.l1/o.length).toFixed(2)),v.push((Y.l2/o.length).toFixed(2))}}catch(e){m.e(e)}finally{m.f()}return r&&(l=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]),{labels:l,datasets:[{yAxisID:"a",borderColor:h[0],fill:!1,tension:0,label:"輸入電壓",data:y},{yAxisID:"b",borderColor:h[1],fill:!1,tension:0,label:"輸入電壓頻率",data:_},{yAxisID:"c",borderColor:h[2],fill:!1,tension:0,label:"負載耗能",data:v}].filter((function(e,t){return!n.includes(t)}))}}},246:function(e,t,r){"use strict";r.r(t);var n=r(248),o=(r(245),{mixins:[n.c.reactiveProp],extends:n.b,props:["options"],mounted:function(){this.renderLineChart()},methods:{renderLineChart:function(){this.renderChart(this.chartData,this.options)}},watch:{options:{deep:!0,handler:function(){this.renderChart(this.chartData,this.options)}}}}),l=r(50),component=Object(l.a)(o,void 0,void 0,!1,null,null,null);t.default=component.exports},422:function(e,t,r){"use strict";r.r(t);var n=r(245),o={props:["analysisData","region","disables"],data:function(){return{dayChartData:{},options:{animation:{duration:0},maintainAspectRatio:!1,title:{display:!0,fontSize:16},legend:{display:!1,position:"right",align:"end"},scales:{yAxes:n.b.map((function(e){return{id:e.yAxisID,display:!1}}))}}}},computed:{chartData:function(){return Object(n.e)(this.analysisData.week,this.region,!0,this.disables)}}},l=r(50),component=Object(l.a)(o,(function(){var e=this.$createElement;return(this._self._c||e)("LineChart",{attrs:{"chart-data":this.chartData,options:this.options,disables:this.disables}})}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{LineChart:r(246).default})}}]);