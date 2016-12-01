webpackJsonp(["web/task-manage/create/index"],{0:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),r=i("a1097697ef38c4380d66"),d=a(r),o=function(){function e(t){s(this,e),this.$element=t,this.$task_manage_content=$("#task-create-content"),this.$task_manage_type=$("#task-create-type"),this.$frame=null,this.$iframe_body=null,this.iframe_jQuery=null,this.iframe_name="task-create-content-iframe",this.mode=this.$task_manage_type.data("editorMode"),this.type=this.$task_manage_type.data("editorType"),this.step=1,this.loaded=!1,this.contentUrl="",this._init(),this._initEvent()}return n(e,[{key:"_initEvent",value:function(){var e=this;$("#course-tasks-submit").click(function(t){return e._onSave(t)}),$("#course-tasks-next").click(function(t){return e._onNext(t)}),$("#course-tasks-prev").click(function(t){return e._onPrev(t)}),"edit"!=this.mode&&$(".js-course-tasks-item").click(function(t){return e._onSetType(t)})}},{key:"_init",value:function(){this._inItStep1form(),this._renderContent(this.step),"edit"==this.mode&&(this.contentUrl=this.$task_manage_type.data("editorStep2Url"),this.step=2,this._switchPage())}},{key:"_onNext",value:function(e){3!==this.step&&this._validator(this.step)&&(this.step+=1,this._switchPage())}},{key:"_onPrev",value:function(){1!==this.step&&this._validator(this.step)&&(this.step-=1,this._switchPage())}},{key:"_onSetType",value:function(e){var t=$(e.currentTarget).addClass("active");t.siblings().removeClass("active");var i=t.data("type");$('[name="mediaType"]').val(i),this.contentUrl=t.data("contentUrl"),this.type!==i?this.loaded=!1:this.loaded=!0,this.type=i,this._renderNext(!0)}},{key:"_onSave",value:function(e){var t=this;if(this._validator(this.step)){$(e.currentTarget).attr("disabled","disabled");var i=$("#step1-form").serializeArray().concat(this.$iframe_body.find("#step2-form").serializeArray()).concat(this.$iframe_body.find("#step3-form").serializeArray());$.post(this.$task_manage_type.data("saveUrl"),i).done(function(e){t.$element.modal("hide")}).fail(function(e){t.$element.modal("hide")})}}},{key:"_switchPage",value:function(){this._renderStep(this.step),this._renderContent(this.step),this._rendStepIframe(this.step),this._rendButton(this.step),2!=this.step||this.loaded||this._initIframe()}},{key:"_initIframe",value:function(){var e=this,t='<iframe class="'+this.iframe_name+'" id="'+this.iframe_name+'" name="'+this.iframe_name+'" scrolling="no" src="'+this.contentUrl+'"></iframe>';this.$task_manage_content.html(t).show(),this.$frame=$("#"+this.iframe_name).iFrameResize();var i=function(){e.loaded=!0;var t={};e.iframe_jQuery=e.$frame[0].contentWindow.$,e.$iframe_body=e.$frame.contents().find("body").addClass("task-iframe-body"),e._rendButton(2),e.$iframe_body.find("#step2-form").data("validator",t),e.$iframe_body.find("#step3-form").data("validator",t)};this.$frame.load((0,d.default)(i,this.$task_manage_content))}},{key:"_inItStep1form",value:function(){var e=$("#step1-form"),t=e.validate({rules:{mediaType:{required:!0}},messages:{mediaType:"请选择%display%"}});e.data("validator",t)}},{key:"_validator",value:function(e){var t=null;if(1===e)t=$("#step1-form").data("validator");else if(this.loaded){var i=this.$iframe_body.find("#step"+e+"-form");t=this.iframe_jQuery.data(i[0],"validator")}return!(t&&!t.form())}},{key:"_rendButton",value:function(e){if(1===e)this._renderPrev(!1),this._rendSubmit(!1),this._renderNext(!0);else if(2===e){if(this._renderPrev(!0),"edit"===this.mode&&this._renderPrev(!1),!this.loaded)return this._rendSubmit(!1),void this._renderNext(!1);this._rendSubmit(!0),this._renderNext(!0)}else 3===e&&(this._renderNext(!1),this._renderPrev(!0))}},{key:"_rendStepIframe",value:function(e){this.loaded&&(2===e?this.$iframe_body.find(".js-step2-view").addClass("active"):this.$iframe_body.find(".js-step2-view").removeClass("active"),3===e?this.$iframe_body.find(".js-step3-view").addClass("active"):this.$iframe_body.find(".js-step3-view").removeClass("active"))}},{key:"_renderStep",value:function(e){$("#task-create-step").find("li:eq("+(e-1)+")").addClass("doing").prev().addClass("done").removeClass("doing"),$("#task-create-step").find("li:eq("+(e-1)+")").next().removeClass("doing").removeClass("done")}},{key:"_renderContent",value:function(e){1===e?this.$task_manage_type.removeClass("hidden"):this.$task_manage_type.addClass("hidden"),1!==e?this.$task_manage_content.removeClass("hidden"):this.$task_manage_content.addClass("hidden")}},{key:"_renderNext",value:function(e){e?$("#course-tasks-next").removeClass("hidden").removeAttr("disabled"):$("#course-tasks-next").addClass("hidden")}},{key:"_renderPrev",value:function(e){e?$("#course-tasks-prev").removeClass("hidden"):$("#course-tasks-prev").addClass("hidden")}},{key:"_rendSubmit",value:function(e){e?$("#course-tasks-submit").removeClass("hidden"):$("#course-tasks-submit").addClass("hidden")}}]),e}();new o($("#modal"))},a1097697ef38c4380d66:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=arguments,a=function(e,t){var a=$('<div class="load-animation"></div>');a.prependTo(t).nextAll().hide(),t.append();var s=[],n=e.length;return function(t){return s.push(t),a.hide().nextAll().show(),s.length<n?i.callee:e.apply(null,s)}};t.default=a}});