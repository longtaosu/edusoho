webpackJsonp([16],{Tsm3:function(t,e){},"n/Xt":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("Dd8w"),r=s.n(i),a=s("gyMJ"),u=s("NYxO"),n=s("Du/2"),c={name:"exercise-result",mixins:[s("BX2S").a],data:function(){return{result:null,calHeight:null,items:null,title:null,color:{right:"green",none:"subjective",wrong:"orange",partRight:"orange",noAnswer:"gray"}}},computed:r()({},Object(u.mapState)({isLoading:function(t){return t.isLoading},user:function(t){return t.user}}),{usedTime:function(){var t=parseInt(this.result.usedTime)||0;return t<60?1:Math.round(t/60)},isReadOver:function(){return!(!this.result||"finished"!==this.result.status)}}),created:function(){this.getexerciseResult()},beforeRouteEnter:function(t,e,s){document.getElementById("app").style.background="#f6f6f6",s()},beforeRouteLeave:function(t,e,s){document.getElementById("app").style.background="",s()},methods:r()({},Object(u.mapMutations)({setNavbarTitle:n.k}),{getexerciseResult:function(){var e=this;a.a.exerciseResult({query:{exerciseId:this.$route.query.exerciseId,exerciseResultId:this.$route.query.exerciseResultId}}).then(function(t){e.result=t,e.setNavbarTitle(t.paperName),e.title=t.paperName,e.interruption(),e.formatData(t),e.calSubjectHeight()})},interruption:function(){var s=this;this.canDoing(this.result,this.user.id).then(function(){s.startExercise()}).catch(function(t){var e=t.answer;s.submitExercise(e)})},formatData:function(t){var e=this,s=[];t.items.forEach(function(t){"material"!=t.type&&(t.status=e.getStatus(t),s.push(t)),"material"==t.type&&t.subs.forEach(function(t){t.status=e.getStatus(t),s.push(t)})}),this.items=s},getStatus:function(t){return t.testResult&&t.testResult.status?t.testResult.status:"noAnswer"},startExercise:function(){this.$router.replace({name:"exerciseDo",query:{targetId:this.$route.query.taskId,exerciseId:this.$route.query.exerciseId,courseId:this.$route.query.courseId},params:{KeepDoing:!0}})},submitExercise:function(t){var e=this,s={answer:t,exerciseId:this.$route.query.exerciseId,userId:this.user.id,exerciseResultId:this.$route.query.exerciseResultId};this.handExercisedo(s).then(function(t){e.$router.replace({name:"exerciseResult",query:{exerciseId:e.$route.query.exerciseId,exerciseResultId:e.$route.query.exerciseResultId,courseId:e.$route.query.courseId,taskId:tthis.$route.query.taskId}})}).catch(function(t){Toast.fail(t.message)})},calSubjectHeight:function(){var s=this;this.$nextTick(function(){var t=s.$refs.data.offsetHeight+s.$refs.tag.offsetHeight+46,e=document.documentElement.clientHeight-t-(s.$refs.footer.offsetHeight||0);s.calHeight=e+"px"})},viewAnalysis:function(){this.$router.push({name:"exerciseAnalysis",query:this.$route.query})}})},l={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{staticClass:"testResults"},[s.isLoading?i("e-loading"):s._e(),s._v(" "),s.result?i("div",{ref:"data",staticClass:"result-data"},[i("div",{staticClass:"result-data__item"},[s._v("\n      客观题正确率\n      "),s.isReadOver?i("div",{staticClass:"result-data__bottom data-number-green data-medium"},[i("span",{staticClass:"data-number"},[s._v(s._s(s.result.rightRate))]),s._v("%\n      ")]):i("div",{staticClass:"result-data__bottom data-text-blue"},[s._v("待批阅")])]),s._v(" "),i("div",{staticClass:"result-data__item"},[s._v("\n      做题用时\n      "),i("div",{staticClass:"result-data__bottom data-number-gray data-medium"},[i("span",{staticClass:" data-number"},[s._v(s._s(s.usedTime))]),s._v("分钟\n      ")])])]):s._e(),s._v(" "),i("div",{ref:"tag",staticClass:"result-tag"},[s._m(0),s._v(" "),s._m(1),s._v(" "),s._m(2),s._v(" "),s._m(3)]),s._v(" "),i("div",{staticClass:"result-subject",style:{height:s.calHeight}},[i("div",{staticClass:"result-paner"},[i("ul",{staticClass:"result-list"},s._l(s.items,function(t,e){return i("li",{key:e,class:["result-list__item homework-number","circle-"+s.color[t.status]]},[s._v(s._s(t.seq)+"\n        ")])}))]),s._v(" "),i("div",{ref:"footer",staticClass:"result-footer"},[i("van-button",{staticClass:"result-footer__btn",style:{marginRight:s.isReadOver?"2vw":0},attrs:{type:"primary"},on:{click:s.viewAnalysis}},[s._v("查看解析\n      ")]),s._v(" "),s.isReadOver?i("van-button",{staticClass:"result-footer__btn",attrs:{type:"primary"},on:{click:function(t){s.startExercise()}}},[s._v("再做一次\n      ")]):s._e()],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"result-tag-item clearfix"},[e("div",{staticClass:"result-tag-item__circle circle-green"}),this._v("\n      正确\n    ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"result-tag-item clearfix"},[e("div",{staticClass:"result-tag-item__circle circle-orange"}),this._v("\n      错误\n    ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"result-tag-item clearfix"},[e("div",{staticClass:"result-tag-item__circle circle-gray"}),this._v("\n      未作答\n    ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"result-tag-item clearfix"},[e("div",{staticClass:"result-tag-item__circle circle-subjective"}),this._v("\n      主观题\n    ")])}]};var o=s("VU/8")(c,l,!1,function(t){s("Tsm3")},null,null);e.default=o.exports}});