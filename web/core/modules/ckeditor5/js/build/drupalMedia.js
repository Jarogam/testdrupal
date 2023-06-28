!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.drupalMedia=t())}(self,(function(){return function(){var e={"ckeditor5/src/core.js":function(e,t,i){e.exports=i("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/engine.js":function(e,t,i){e.exports=i("dll-reference CKEditor5.dll")("./src/engine.js")},"ckeditor5/src/ui.js":function(e,t,i){e.exports=i("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/utils.js":function(e,t,i){e.exports=i("dll-reference CKEditor5.dll")("./src/utils.js")},"ckeditor5/src/widget.js":function(e,t,i){e.exports=i("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":function(e){"use strict";e.exports=CKEditor5.dll}},t={};function i(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,i),r.exports}i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};var n={};return function(){"use strict";i.d(n,{default:function(){return se}});var e=i("ckeditor5/src/core.js"),t=i("ckeditor5/src/widget.js");class a extends e.Command{execute(e){const t=this.editor.plugins.get("DrupalMediaEditing"),i=Object.entries(t.attrs).reduce(((e,[t,i])=>(e[i]=t,e)),{}),n=Object.keys(e).reduce(((t,n)=>(i[n]&&(t[i[n]]=e[n]),t)),{});if(this.editor.plugins.has("DrupalElementStyleEditing")){const t=this.editor.plugins.get("DrupalElementStyleEditing");for(const i of t.normalizedStyles)if(e[i.attributeName]&&i.attributeValue===e[i.attributeName]){n.drupalElementStyle=i.name;break}}this.editor.model.change((e=>{this.editor.model.insertContent(function(e,t){return e.createElement("drupalMedia",t)}(e,n))}))}refresh(){const e=this.editor.model,t=e.document.selection,i=e.schema.findAllowedParent(t.getFirstPosition(),"drupalMedia");this.isEnabled=null!==i}}function r(e){return!!e&&e.is("element","drupalMedia")}function o(e){return(0,t.isWidget)(e)&&!!e.getCustomProperty("drupalMedia")}function l(e){const t=e.getSelectedElement();return r(t)?t:e.getFirstPosition().findAncestor("drupalMedia")}function s(e){const t=e.getSelectedElement();if(t&&o(t))return t;let i=e.getFirstPosition().parent;for(;i;){if(i.is("element")&&o(i))return i;i=i.parent}return null}function d(e){const t=typeof e;return null!=e&&("object"===t||"function"===t)}function u(e){for(const t of e){if(t.hasAttribute("data-drupal-media-preview"))return t;if(t.childCount){const e=u(t.getChildren());if(e)return e}}return null}class c extends e.Plugin{static get requires(){return[t.Widget]}init(){this.attrs={drupalMediaAlt:"alt",drupalMediaEntityType:"data-entity-type",drupalMediaEntityUuid:"data-entity-uuid",drupalMediaViewMode:"data-view-mode"};const e=this.editor.config.get("drupalMedia");if(!e)return;const{previewURL:t,themeError:i}=e;this.previewUrl=t,this.labelError=Drupal.t("Preview failed"),this.themeError=i||`\n      <p>${Drupal.t("An error occurred while trying to preview the media. Please save your work and reload this page.")}<p>\n    `,this._defineSchema(),this._defineConverters(),this.editor.commands.add("insertDrupalMedia",new a(this.editor))}async _fetchPreview(e){const t={text:this._renderElement(e),uuid:e.getAttribute("drupalMediaEntityUuid")},i=await fetch(`${this.previewUrl}?${new URLSearchParams(t)}`,{headers:{"X-Drupal-MediaPreview-CSRF-Token":this.editor.config.get("drupalMedia").previewCsrfToken}});if(i.ok){return{label:i.headers.get("drupal-media-label"),preview:await i.text()}}return{label:this.labelError,preview:this.themeError}}_defineSchema(){this.editor.model.schema.register("drupalMedia",{allowWhere:"$block",isObject:!0,isContent:!0,isBlock:!0,allowAttributes:Object.keys(this.attrs)}),this.editor.editing.view.domConverter.blockElements.push("drupal-media")}_defineConverters(){const e=this.editor.conversion;e.for("upcast").elementToElement({view:{name:"drupal-media"},model:"drupalMedia"}),e.for("dataDowncast").elementToElement({model:"drupalMedia",view:{name:"drupal-media"}}),e.for("editingDowncast").elementToElement({model:"drupalMedia",view:(e,{writer:i})=>{const n=i.createContainerElement("figure",{class:"drupal-media"});if(!this.previewUrl){const e=i.createRawElement("div",{"data-drupal-media-preview":"unavailable"});i.insert(i.createPositionAt(n,0),e)}return i.setCustomProperty("drupalMedia",!0,n),(0,t.toWidget)(n,i,{label:Drupal.t("Media widget")})}}).add((e=>{const t=(e,t,i)=>{const n=i.writer,a=t.item,r=i.mapper.toViewElement(t.item);let o=u(r.getChildren());if(o){if("ready"!==o.getAttribute("data-drupal-media-preview"))return;n.setAttribute("data-drupal-media-preview","loading",o)}else o=n.createRawElement("div",{"data-drupal-media-preview":"loading"}),n.insert(n.createPositionAt(r,0),o);this._fetchPreview(a).then((({label:e,preview:t})=>{o&&this.editor.editing.view.change((i=>{const n=i.createRawElement("div",{"data-drupal-media-preview":"ready","aria-label":e},(e=>{e.innerHTML=t}));i.insert(i.createPositionBefore(o),n),i.remove(o)}))}))};return e.on("attribute:drupalMediaEntityUuid:drupalMedia",t),e.on("attribute:drupalMediaViewMode:drupalMedia",t),e.on("attribute:drupalMediaEntityType:drupalMedia",t),e.on("attribute:drupalMediaAlt:drupalMedia",t),e})),e.for("editingDowncast").add((e=>{e.on("attribute:drupalElementStyle:drupalMedia",((e,t,i)=>{const n={alignLeft:"drupal-media-style-align-left",alignRight:"drupal-media-style-align-right",alignCenter:"drupal-media-style-align-center"},a=i.mapper.toViewElement(t.item),r=i.writer;n[t.attributeOldValue]&&r.removeClass(n[t.attributeOldValue],a),n[t.attributeNewValue]&&i.consumable.consume(t.item,e.name)&&r.addClass(n[t.attributeNewValue],a)}))})),Object.keys(this.attrs).forEach((t=>{const i={model:{key:t,name:"drupalMedia"},view:{name:"drupal-media",key:this.attrs[t]}};e.for("dataDowncast").attributeToAttribute(i),e.for("upcast").attributeToAttribute(i)}))}_renderElement(e){const t=this.editor.model.change((t=>{const i=t.createDocumentFragment(),n=t.cloneElement(e,!1);return["linkHref"].forEach((e=>{t.removeAttribute(e,n)})),t.append(n,i),i}));return this.editor.data.stringify(t)}static get pluginName(){return"DrupalMediaEditing"}}var m=i("ckeditor5/src/ui.js");class p extends e.Plugin{init(){const e=this.editor,t=this.editor.config.get("drupalMedia");if(!t)return;const{libraryURL:i,openDialog:n,dialogSettings:a={}}=t;i&&"function"==typeof n&&e.ui.componentFactory.add("drupalMedia",(t=>{const r=e.commands.get("insertDrupalMedia"),o=new m.ButtonView(t);return o.set({label:Drupal.t("Insert Drupal Media"),icon:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.1873 4.86414L10.2509 6.86414V7.02335H10.2499V15.5091C9.70972 15.1961 9.01793 15.1048 8.34069 15.3136C7.12086 15.6896 6.41013 16.8967 6.75322 18.0096C7.09631 19.1226 8.3633 19.72 9.58313 19.344C10.6666 19.01 11.3484 18.0203 11.2469 17.0234H11.2499V9.80173L18.1803 8.25067V14.3868C17.6401 14.0739 16.9483 13.9825 16.2711 14.1913C15.0513 14.5674 14.3406 15.7744 14.6836 16.8875C15.0267 18.0004 16.2937 18.5978 17.5136 18.2218C18.597 17.8877 19.2788 16.8982 19.1773 15.9011H19.1803V8.02687L19.1873 8.0253V4.86414Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5039 0.743652H0.386932V12.1603H13.5039V0.743652ZM12.3379 1.75842H1.55289V11.1454H1.65715L4.00622 8.86353L6.06254 10.861L9.24985 5.91309L11.3812 9.22179L11.7761 8.6676L12.3379 9.45621V1.75842ZM6.22048 4.50869C6.22048 5.58193 5.35045 6.45196 4.27722 6.45196C3.20398 6.45196 2.33395 5.58193 2.33395 4.50869C2.33395 3.43546 3.20398 2.56543 4.27722 2.56543C5.35045 2.56543 6.22048 3.43546 6.22048 4.50869Z" fill="black"/></svg>\n',tooltip:!0}),o.bind("isOn","isEnabled").to(r,"value","isEnabled"),this.listenTo(o,"execute",(()=>{n(i,(({attributes:t})=>{e.execute("insertDrupalMedia",t)}),a)})),o}))}}class g extends e.Plugin{static get requires(){return[t.WidgetToolbarRepository]}static get pluginName(){return"DrupalMediaToolbar"}afterInit(){const{editor:e}=this;var i;e.plugins.get(t.WidgetToolbarRepository).register("drupalMedia",{ariaLabel:Drupal.t("Drupal Media toolbar"),items:(i=e.config.get("drupalMedia.toolbar"),i.map((e=>d(e)?e.name:e))||[]),getRelatedElement:e=>s(e)})}}const h="METADATA_ERROR";class f extends e.Command{refresh(){const e=l(this.editor.model.document.selection);this.isEnabled=!!e&&e.getAttribute("drupalMediaIsImage")&&e.getAttribute("drupalMediaIsImage")!==h,this.isEnabled?this.value=e.getAttribute("drupalMediaAlt"):this.value=!1}execute(e){const{model:t}=this.editor,i=l(t.document.selection);e.newValue=e.newValue.trim(),t.change((t=>{e.newValue.length>0?t.setAttribute("drupalMediaAlt",e.newValue,i):t.removeAttribute("drupalMediaAlt",i)}))}}class b extends e.Plugin{init(){this._data=new WeakMap}getMetadata(e){if(this._data.get(e))return new Promise((t=>{t(this._data.get(e))}));const t=this.editor.config.get("drupalMedia");if(!t)return new Promise(((e,t)=>{t(new Error("drupalMedia configuration is required for parsing metadata."))}));if(!e.hasAttribute("drupalMediaEntityUuid"))return new Promise(((e,t)=>{t(new Error("drupalMedia element must have drupalMediaEntityUuid attribute to retrieve metadata."))}));const{metadataUrl:i}=t;return(async e=>{const t=await fetch(e);if(t.ok)return JSON.parse(await t.text());throw new Error("Fetching media embed metadata from the server failed.")})(`${i}&${new URLSearchParams({uuid:e.getAttribute("drupalMediaEntityUuid")})}`).then((t=>(this._data.set(e,t),t)))}static get pluginName(){return"DrupalMediaMetadataRepository"}}class w extends e.Plugin{static get requires(){return[b]}static get pluginName(){return"MediaImageTextAlternativeEditing"}_upcastDrupalMediaIsImage(e){const{model:t,plugins:i}=this.editor;i.get("DrupalMediaMetadataRepository").getMetadata(e).then((i=>{e&&t.enqueueChange({isUndoable:!1},(t=>{t.setAttribute("drupalMediaIsImage",!!i.imageSourceMetadata,e)}))})).catch((i=>{e&&(console.warn(i.toString()),t.enqueueChange({isUndoable:!1},(t=>{t.setAttribute("drupalMediaIsImage",h,e)})))}))}init(){const{editor:e,editor:{model:t,conversion:i}}=this;t.schema.extend("drupalMedia",{allowAttributes:["drupalMediaIsImage"]}),this.listenTo(t,"insertContent",((e,[t])=>{r(t)&&this._upcastDrupalMediaIsImage(t)})),i.for("upcast").add((e=>{e.on("element:drupal-media",((e,t)=>{const[i]=t.modelRange.getItems();r(i)&&this._upcastDrupalMediaIsImage(i)}),{priority:"lowest"})})),i.for("editingDowncast").add((e=>{e.on("attribute:drupalMediaIsImage",((e,t,i)=>{const{writer:n,mapper:a}=i,r=a.toViewElement(t.item);if(t.attributeNewValue!==h){const e=Array.from(r.getChildren()).find((e=>e.getCustomProperty("drupalMediaMetadataError")));return void(e&&(n.setCustomProperty("widgetLabel",e.getCustomProperty("drupalMediaOriginalWidgetLabel"),e),n.removeElement(e)))}const o=Drupal.t("Not all functionality may be available because some information could not be retrieved."),l=new m.TooltipView;l.text=o,l.position="sw";const s=new m.Template({tag:"span",children:[{tag:"span",attributes:{class:"drupal-media__metadata-error-icon"}},l]}).render(),d=n.createRawElement("div",{class:"drupal-media__metadata-error"},((e,t)=>{t.setContentOf(e,s.outerHTML)}));n.setCustomProperty("drupalMediaMetadataError",!0,d);const u=r.getCustomProperty("widgetLabel");n.setCustomProperty("drupalMediaOriginalWidgetLabel",u,d),n.setCustomProperty("widgetLabel",`${u} (${o})`,r),n.insert(n.createPositionAt(r,0),d)}),{priority:"low"})})),e.commands.add("mediaImageTextAlternative",new f(this.editor))}}function v(e){const t=e.editing.view,i=m.BalloonPanelView.defaultPositions;return{target:t.domConverter.viewToDom(t.document.selection.getSelectedElement()),positions:[i.northArrowSouth,i.northArrowSouthWest,i.northArrowSouthEast,i.southArrowNorth,i.southArrowNorthWest,i.southArrowNorthEast]}}var y=i("ckeditor5/src/utils.js");class E extends m.View{constructor(t){super(t),this.focusTracker=new y.FocusTracker,this.keystrokes=new y.KeystrokeHandler,this.labeledInput=this._createLabeledInputView(),this.set("defaultAltText",void 0),this.defaultAltTextView=this._createDefaultAltTextView(),this.saveButtonView=this._createButton(Drupal.t("Save"),e.icons.check,"ck-button-save"),this.saveButtonView.type="submit",this.cancelButtonView=this._createButton(Drupal.t("Cancel"),e.icons.cancel,"ck-button-cancel","cancel"),this._focusables=new m.ViewCollection,this._focusCycler=new m.FocusCycler({focusables:this._focusables,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this.setTemplate({tag:"form",attributes:{class:["ck","ck-media-alternative-text-form","ck-vertical-form"],tabindex:"-1"},children:[this.defaultAltTextView,this.labeledInput,this.saveButtonView,this.cancelButtonView]}),(0,m.injectCssTransitionDisabler)(this)}render(){super.render(),this.keystrokes.listenTo(this.element),(0,m.submitHandler)({view:this}),[this.labeledInput,this.saveButtonView,this.cancelButtonView].forEach((e=>{this._focusables.add(e),this.focusTracker.add(e.element)}))}_createButton(e,t,i,n){const a=new m.ButtonView(this.locale);return a.set({label:e,icon:t,tooltip:!0}),a.extendTemplate({attributes:{class:i}}),n&&a.delegate("execute").to(this,n),a}_createLabeledInputView(){const e=new m.LabeledFieldView(this.locale,m.createLabeledInputText);return e.label=Drupal.t("Alternative text override"),e}_createDefaultAltTextView(){const e=m.Template.bind(this,this);return new m.Template({tag:"div",attributes:{class:["ck-media-alternative-text-form__default-alt-text",e.if("defaultAltText","ck-hidden",(e=>!e))]},children:[{tag:"strong",attributes:{class:"ck-media-alternative-text-form__default-alt-text-label"},children:[Drupal.t("Default alternative text:")]}," ",{tag:"span",attributes:{class:"ck-media-alternative-text-form__default-alt-text-value"},children:[{text:[e.to("defaultAltText")]}]}]})}}class M extends e.Plugin{static get requires(){return[m.ContextualBalloon]}static get pluginName(){return"MediaImageTextAlternativeUi"}init(){this._createButton(),this._createForm()}destroy(){super.destroy(),this._form.destroy()}_createButton(){const t=this.editor;t.ui.componentFactory.add("mediaImageTextAlternative",(i=>{const n=t.commands.get("mediaImageTextAlternative"),a=new m.ButtonView(i);return a.set({label:Drupal.t("Override media image alternative text"),icon:e.icons.lowVision,tooltip:!0}),a.bind("isVisible").to(n,"isEnabled"),this.listenTo(a,"execute",(()=>{this._showForm()})),a}))}_createForm(){const e=this.editor,t=e.editing.view.document;this._balloon=this.editor.plugins.get("ContextualBalloon"),this._form=new E(e.locale),this._form.render(),this.listenTo(this._form,"submit",(()=>{e.execute("mediaImageTextAlternative",{newValue:this._form.labeledInput.fieldView.element.value}),this._hideForm(!0)})),this.listenTo(this._form,"cancel",(()=>{this._hideForm(!0)})),this._form.keystrokes.set("Esc",((e,t)=>{this._hideForm(!0),t()})),this.listenTo(e.ui,"update",(()=>{s(t.selection)?this._isVisible&&function(e){const t=e.plugins.get("ContextualBalloon");if(s(e.editing.view.document.selection)){const i=v(e);t.updatePosition(i)}}(e):this._hideForm(!0)})),(0,m.clickOutsideHandler)({emitter:this._form,activator:()=>this._isVisible,contextElements:[this._balloon.view.element],callback:()=>this._hideForm()})}_showForm(){if(this._isVisible)return;const e=this.editor,t=e.commands.get("mediaImageTextAlternative"),i=e.plugins.get("DrupalMediaMetadataRepository"),n=this._form.labeledInput;this._form.disableCssTransitions(),this._isInBalloon||this._balloon.add({view:this._form,position:v(e)}),n.fieldView.element.value=t.value||"",n.fieldView.value=n.fieldView.element.value,this._form.defaultAltText="";const a=e.model.document.selection.getSelectedElement();r(a)&&i.getMetadata(a).then((e=>{this._form.defaultAltText=e.imageSourceMetadata?e.imageSourceMetadata.alt:""})).catch((e=>{console.warn(e.toString())})),this._form.labeledInput.fieldView.select(),this._form.enableCssTransitions()}_hideForm(e){this._isInBalloon&&(this._form.focusTracker.isFocused&&this._form.saveButtonView.focus(),this._balloon.remove(this._form),e&&this.editor.editing.view.focus())}get _isVisible(){return this._balloon.visibleView===this._form}get _isInBalloon(){return this._balloon.hasView(this._form)}}class k extends e.Plugin{static get requires(){return[w,M]}static get pluginName(){return"MediaImageTextAlternative"}}function C(e,t,i){if(t.attributes)for(const[n,a]of Object.entries(t.attributes))e.setAttribute(n,a,i);t.styles&&e.setStyle(t.styles,i),t.classes&&e.addClass(t.classes,i)}function _(e,t,i){if(!i.consumable.consume(t.item,e.name))return;const n=i.mapper.toViewElement(t.item);C(i.writer,t.attributeNewValue,n)}class A extends e.Plugin{constructor(e){if(super(e),!e.plugins.has("GeneralHtmlSupport"))return;e.plugins.has("DataFilter")&&e.plugins.has("DataSchema")||console.error("DataFilter and DataSchema plugins are required for Drupal Media to integrate with General HTML Support plugin.");const{schema:t}=e.model,{conversion:i}=e,n=this.editor.plugins.get("DataFilter");this.editor.plugins.get("DataSchema").registerBlockElement({model:"drupalMedia",view:"drupal-media"}),n.on("register:drupal-media",((e,a)=>{"drupalMedia"===a.model&&(t.extend("drupalMedia",{allowAttributes:["htmlLinkAttributes","htmlAttributes"]}),i.for("upcast").add(function(e){return t=>{t.on("element:drupal-media",((t,i,n)=>{function a(t,a){const r=e._consumeAllowedAttributes(t,n);r&&n.writer.setAttribute(a,r,i.modelRange)}const r=i.viewItem,o=r.parent;a(r,"htmlAttributes"),o.is("element","a")&&a(o,"htmlLinkAttributes")}),{priority:"low"})}}(n)),i.for("editingDowncast").add((e=>{e.on("attribute:linkHref:drupalMedia",((e,t,i)=>{if(!i.consumable.consume(t.item,"attribute:htmlLinkAttributes:drupalMedia"))return;const n=i.mapper.toViewElement(t.item),a=function(e,t,i){const n=e.createRangeOn(t);for(const{item:e}of n.getWalker())if(e.is("element",i))return e}(i.writer,n,"a");C(i.writer,t.item.getAttribute("htmlLinkAttributes"),a)}),{priority:"low"})})),i.for("dataDowncast").add((e=>{e.on("attribute:linkHref:drupalMedia",((e,t,i)=>{if(!i.consumable.consume(t.item,"attribute:htmlLinkAttributes:drupalMedia"))return;const n=i.mapper.toViewElement(t.item).parent;C(i.writer,t.item.getAttribute("htmlLinkAttributes"),n)}),{priority:"low"}),e.on("attribute:htmlAttributes:drupalMedia",_,{priority:"low"})})),e.stop())}))}static get pluginName(){return"DrupalMediaGeneralHtmlSupport"}}class x extends e.Plugin{static get requires(){return[c,A,p,g,k]}static get pluginName(){return"DrupalMedia"}}var D=i("ckeditor5/src/engine.js");function S(e){return Array.from(e.getChildren()).find((e=>"drupal-media"===e.name))}function V(e){return t=>{t.on(`attribute:${e.id}:drupalMedia`,((t,i,n)=>{const a=n.mapper.toViewElement(i.item);let r=Array.from(a.getChildren()).find((e=>"a"===e.name));if(r=!r&&a.is("element","a")?a:Array.from(a.getAncestors()).find((e=>"a"===e.name)),r){for(const[t,i]of(0,y.toMap)(e.attributes))n.writer.setAttribute(t,i,r);e.classes&&n.writer.addClass(e.classes,r);for(const t in e.styles)Object.prototype.hasOwnProperty.call(e.styles,t)&&n.writer.setStyle(t,e.styles[t],r)}}))}}function I(e,t){return e=>{e.on("element:a",((e,i,n)=>{const a=i.viewItem;if(!S(a))return;const r=new D.Matcher(t._createPattern()).match(a);if(!r)return;if(!n.consumable.consume(a,r.match))return;const o=i.modelCursor.nodeBefore;n.writer.setAttribute(t.id,!0,o)}),{priority:"high"})}}class T extends e.Plugin{static get requires(){return["LinkEditing","DrupalMediaEditing"]}static get pluginName(){return"DrupalLinkMediaEditing"}init(){const{editor:e}=this;e.model.schema.extend("drupalMedia",{allowAttributes:["linkHref"]}),e.conversion.for("upcast").add((e=>{e.on("element:a",((e,t,i)=>{const n=t.viewItem,a=S(n);if(!a)return;if(!i.consumable.consume(n,{attributes:["href"],name:!0}))return;const r=n.getAttribute("href");if(!r)return;const o=i.convertItem(a,t.modelCursor);t.modelRange=o.modelRange,t.modelCursor=o.modelCursor;const l=t.modelCursor.nodeBefore;l&&l.is("element","drupalMedia")&&i.writer.setAttribute("linkHref",r,l)}),{priority:"high"})})),e.conversion.for("editingDowncast").add((e=>{e.on("attribute:linkHref:drupalMedia",((e,t,i)=>{const{writer:n}=i;if(!i.consumable.consume(t.item,e.name))return;const a=i.mapper.toViewElement(t.item),r=Array.from(a.getChildren()).find((e=>"a"===e.name));if(r)t.attributeNewValue?n.setAttribute("href",t.attributeNewValue,r):(n.move(n.createRangeIn(r),n.createPositionAt(a,0)),n.remove(r));else{const e=Array.from(a.getChildren()).find((e=>e.getAttribute("data-drupal-media-preview"))),i=n.createContainerElement("a",{href:t.attributeNewValue});n.insert(n.createPositionAt(a,0),i),n.move(n.createRangeOn(e),n.createPositionAt(i,0))}}),{priority:"high"})})),e.conversion.for("dataDowncast").add((e=>{e.on("attribute:linkHref:drupalMedia",((e,t,i)=>{const{writer:n}=i;if(!i.consumable.consume(t.item,e.name))return;const a=i.mapper.toViewElement(t.item),r=n.createContainerElement("a",{href:t.attributeNewValue});n.insert(n.createPositionBefore(a),r),n.move(n.createRangeOn(a),n.createPositionAt(r,0))}),{priority:"high"})})),this._enableManualDecorators()}_enableManualDecorators(){const e=this.editor,t=e.commands.get("link");for(const i of t.manualDecorators)e.model.schema.extend("drupalMedia",{allowAttributes:i.id}),e.conversion.for("downcast").add(V(i)),e.conversion.for("upcast").add(I(0,i))}}class P extends e.Plugin{static get requires(){return["LinkEditing","LinkUI","DrupalMediaEditing"]}static get pluginName(){return"DrupalLinkMediaUi"}init(){const{editor:e}=this,t=e.editing.view.document;this.listenTo(t,"click",((t,i)=>{this._isSelectedLinkedMedia(e.model.document.selection)&&(i.preventDefault(),t.stop())}),{priority:"high"}),this._createToolbarLinkMediaButton()}_createToolbarLinkMediaButton(){const{editor:e}=this;e.ui.componentFactory.add("drupalLinkMedia",(t=>{const i=new m.ButtonView(t),n=e.plugins.get("LinkUI"),a=e.commands.get("link");return i.set({isEnabled:!0,label:Drupal.t("Link media"),icon:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m11.077 15 .991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184z"/></svg>\n',keystroke:"Ctrl+K",tooltip:!0,isToggleable:!0}),i.bind("isEnabled").to(a,"isEnabled"),i.bind("isOn").to(a,"value",(e=>!!e)),this.listenTo(i,"execute",(()=>{this._isSelectedLinkedMedia(e.model.document.selection)?n._addActionsView():n._showUI(!0)})),i}))}_isSelectedLinkedMedia(e){const t=e.getSelectedElement();return!!t&&t.is("element","drupalMedia")&&t.hasAttribute("linkHref")}}class L extends e.Plugin{static get requires(){return[T,P]}static get pluginName(){return"DrupalLinkMedia"}}const{objectFullWidth:B,objectInline:N,objectLeft:O,objectRight:R,objectCenter:F,objectBlockLeft:j,objectBlockRight:U}=e.icons,H={get inline(){return{name:"inline",title:"In line",icon:N,modelElements:["imageInline"],isDefault:!0}},get alignLeft(){return{name:"alignLeft",title:"Left aligned image",icon:O,modelElements:["imageBlock","imageInline"],className:"image-style-align-left"}},get alignBlockLeft(){return{name:"alignBlockLeft",title:"Left aligned image",icon:j,modelElements:["imageBlock"],className:"image-style-block-align-left"}},get alignCenter(){return{name:"alignCenter",title:"Centered image",icon:F,modelElements:["imageBlock"],className:"image-style-align-center"}},get alignRight(){return{name:"alignRight",title:"Right aligned image",icon:R,modelElements:["imageBlock","imageInline"],className:"image-style-align-right"}},get alignBlockRight(){return{name:"alignBlockRight",title:"Right aligned image",icon:U,modelElements:["imageBlock"],className:"image-style-block-align-right"}},get block(){return{name:"block",title:"Centered image",icon:F,modelElements:["imageBlock"],isDefault:!0}},get side(){return{name:"side",title:"Side image",icon:R,modelElements:["imageBlock"],className:"image-style-side"}}},W={full:B,left:j,right:U,center:F,inlineLeft:O,inlineRight:R,inline:N},q=[{name:"imageStyle:wrapText",title:"Wrap text",defaultItem:"imageStyle:alignLeft",items:["imageStyle:alignLeft","imageStyle:alignRight"]},{name:"imageStyle:breakText",title:"Break text",defaultItem:"imageStyle:block",items:["imageStyle:alignBlockLeft","imageStyle:block","imageStyle:alignBlockRight"]}];function K(e){(0,y.logWarning)("image-style-configuration-definition-invalid",e)}var $={normalizeStyles:function(e){return(e.configuredStyles.options||[]).map((e=>function(e){e="string"==typeof e?H[e]?{...H[e]}:{name:e}:function(e,t){const i={...t};for(const n in e)Object.prototype.hasOwnProperty.call(t,n)||(i[n]=e[n]);return i}(H[e.name],e);"string"==typeof e.icon&&(e.icon=W[e.icon]||e.icon);return e}(e))).filter((t=>function(e,{isBlockPluginLoaded:t,isInlinePluginLoaded:i}){const{modelElements:n,name:a}=e;if(!(n&&n.length&&a))return K({style:e}),!1;{const a=[t?"imageBlock":null,i?"imageInline":null];if(!n.some((e=>a.includes(e))))return(0,y.logWarning)("image-style-missing-dependency",{style:e,missingPlugins:n.map((e=>"imageBlock"===e?"ImageBlockEditing":"ImageInlineEditing"))}),!1}return!0}(t,e)))},getDefaultStylesConfiguration:function(e,t){return e&&t?{options:["inline","alignLeft","alignRight","alignCenter","alignBlockLeft","alignBlockRight","block","side"]}:e?{options:["block","side"]}:t?{options:["inline","alignLeft","alignRight"]}:{}},getDefaultDropdownDefinitions:function(e){return e.has("ImageBlockEditing")&&e.has("ImageInlineEditing")?[...q]:[]},warnInvalidStyle:K,DEFAULT_OPTIONS:H,DEFAULT_ICONS:W,DEFAULT_DROPDOWN_DEFINITIONS:q};function z(e,t){const i=e.getSelectedElement();if(i&&t.checkAttribute(i,"drupalElementStyle"))return i;let n=e.getFirstPosition().parent;for(;n;){if(n.is("element")&&t.checkAttribute(n,"drupalElementStyle"))return n;n=n.parent}return null}class Z extends e.Command{constructor(e,t){super(e),this._styles=new Map(t.map((e=>[e.name,e])))}refresh(){const e=this.editor,t=z(e.model.document.selection,e.model.schema);if(this.isEnabled=!!t,this.isEnabled){if(this.value=t.getAttribute("drupalElementStyle"),!this.value)for(const[e,i]of this._styles.entries())if(i.isDefault){if(i.modelElements.find((e=>t.is("element",e)))){this.value=e;break}}}else this.value=!1}execute(e={}){const t=this.editor.model;t.change((i=>{const n=e.value,a=z(t.document.selection,t.schema);!n||this._styles.get(n).isDefault?i.removeAttribute("drupalElementStyle",a):i.setAttribute("drupalElementStyle",n,a)}))}}function G(e,t){for(const i of t)if(i.name===e)return i}class J extends e.Plugin{init(){const t=this.editor;t.config.define("drupalElementStyles",{options:[]});const i=t.config.get("drupalElementStyles").options;this.normalizedStyles=i.map((t=>("string"==typeof t.icon&&e.icons[t.icon]&&(t.icon=e.icons[t.icon]),t))).filter((e=>e.isDefault||e.attributeName&&e.attributeValue?e.modelElements&&Array.isArray(e.modelElements)?!!e.name||(console.warn("drupalElementStyles options must include a name."),!1):(console.warn("drupalElementStyles options must include an array of supported modelElements."),!1):(console.warn("drupalElementStyles options must include attributeName and attributeValue."),!1))),this._setupConversion(),t.commands.add("drupalElementStyle",new Z(t,this.normalizedStyles))}_setupConversion(){const e=this.editor,t=e.model.schema,i=(n=this.normalizedStyles,(e,t,i)=>{if(!i.consumable.consume(t.item,e.name))return;const a=G(t.attributeNewValue,n),r=G(t.attributeOldValue,n),o=i.mapper.toViewElement(t.item),l=i.writer;r&&("class"===r.attributeName?l.removeClass(r.attributeValue,o):l.removeAttribute(r.attributeName,o)),a&&("class"===a.attributeName?l.addClass(a.attributeValue,o):l.setAttribute(a.attributeName,a.attributeValue,o))});var n;const a=function(e){const t=e.filter((e=>!e.isDefault));return(e,i,n)=>{if(!i.modelRange)return;const a=i.viewItem,r=(0,y.first)(i.modelRange.getItems());if(r&&n.schema.checkAttribute(r,"drupalElementStyle"))for(const e of t)if("class"===e.attributeName)n.consumable.consume(a,{classes:e.attributeValue})&&n.writer.setAttribute("drupalElementStyle",e.name,r);else if(n.consumable.consume(a,{attributes:[e.attributeName]}))for(const e of t)e.attributeValue===a.getAttribute(e.attributeName)&&n.writer.setAttribute("drupalElementStyle",e.name,r)}}(this.normalizedStyles);e.editing.downcastDispatcher.on("attribute:drupalElementStyle",i),e.data.downcastDispatcher.on("attribute:drupalElementStyle",i);[...new Set(this.normalizedStyles.map((e=>e.modelElements)).flat())].forEach((e=>{t.extend(e,{allowAttributes:"drupalElementStyle"})})),e.data.upcastDispatcher.on("element",a,{priority:"low"})}static get pluginName(){return"DrupalElementStyleEditing"}}const X=e=>e,Q=(e,t)=>(e?`${e}: `:"")+t;function Y(e){return`drupalElementStyle:${e}`}class ee extends e.Plugin{static get requires(){return[J]}init(){const e=this.editor.plugins,t=this.editor.config.get("drupalMedia.toolbar")||[],i=Object.values(e.get("DrupalElementStyleEditing").normalizedStyles);i.forEach((e=>{this._createButton(e)}));t.filter(d).forEach((e=>{this._createDropdown(e,i)}))}_createDropdown(e,t){const i=this.editor.ui.componentFactory;i.add(e.name,(n=>{let a;const{defaultItem:r,items:o,title:l}=e,s=o.filter((e=>t.find((({name:t})=>Y(t)===e)))).map((e=>{const t=i.create(e);return e===r&&(a=t),t}));o.length!==s.length&&$.warnInvalidStyle({dropdown:e});const d=(0,m.createDropdown)(n,m.SplitButtonView),u=d.buttonView;return(0,m.addToolbarToDropdown)(d,s),u.set({label:Q(l,a.label),class:null,tooltip:!0}),u.bind("icon").toMany(s,"isOn",((...e)=>{const t=e.findIndex(X);return t<0?a.icon:s[t].icon})),u.bind("label").toMany(s,"isOn",((...e)=>{const t=e.findIndex(X);return Q(l,t<0?a.label:s[t].label)})),u.bind("isOn").toMany(s,"isOn",((...e)=>e.some(X))),u.bind("class").toMany(s,"isOn",((...e)=>e.some(X)?"ck-splitbutton_flatten":null)),u.on("execute",(()=>{s.some((({isOn:e})=>e))?d.isOpen=!d.isOpen:a.fire("execute")})),d.bind("isEnabled").toMany(s,"isEnabled",((...e)=>e.some(X))),d}))}_createButton(e){const t=e.name;this.editor.ui.componentFactory.add(Y(t),(i=>{const n=this.editor.commands.get("drupalElementStyle"),a=new m.ButtonView(i);return a.set({label:e.title,icon:e.icon,tooltip:!0,isToggleable:!0}),a.bind("isEnabled").to(n,"isEnabled"),a.bind("isOn").to(n,"value",(e=>e===t)),a.on("execute",this._executeCommand.bind(this,t)),a}))}_executeCommand(e){this.editor.execute("drupalElementStyle",{value:e}),this.editor.editing.view.focus()}static get pluginName(){return"DrupalElementStyleUi"}}class te extends e.Plugin{static get requires(){return[J,ee]}static get pluginName(){return"DrupalElementStyle"}}function ie(e){const t=e.getFirstPosition().findAncestor("caption");return t&&r(t.parent)?t:null}function ne(e){for(const t of e.getChildren())if(t&&t.is("element","caption"))return t;return null}class ae extends e.Command{refresh(){const e=this.editor.model.document.selection,t=e.getSelectedElement();if(!t)return this.isEnabled=!!l(e),void(this.value=!!ie(e));this.isEnabled=r(t),this.isEnabled?this.value=!!ne(t):this.value=!1}execute(e={}){const{focusCaptionOnShow:t}=e;this.editor.model.change((e=>{this.value?this._hideDrupalMediaCaption(e):this._showDrupalMediaCaption(e,t)}))}_showDrupalMediaCaption(e,t){const i=this.editor.model.document.selection,n=this.editor.plugins.get("DrupalMediaCaptionEditing"),a=l(i),r=n._getSavedCaption(a)||e.createElement("caption");e.append(r,a),t&&e.setSelection(r,"in")}_hideDrupalMediaCaption(e){const t=this.editor,i=t.model.document.selection,n=t.plugins.get("DrupalMediaCaptionEditing");let a,r=i.getSelectedElement();r?a=ne(r):(a=ie(i),r=l(i)),n._saveCaption(r,a),e.setSelection(r,"on"),e.remove(a)}}class re extends e.Plugin{static get requires(){return[]}static get pluginName(){return"DrupalMediaCaptionEditing"}constructor(e){super(e),this._savedCaptionsMap=new WeakMap}init(){const e=this.editor,t=e.model.schema;t.isRegistered("caption")?t.extend("caption",{allowIn:"drupalMedia"}):t.register("caption",{allowIn:"drupalMedia",allowContentOf:"$block",isLimit:!0}),e.commands.add("toggleMediaCaption",new ae(e)),this._setupConversion()}_setupConversion(){const e=this.editor,i=e.editing.view;var n;e.conversion.for("upcast").add(function(e){const t=(t,i,n)=>{const{viewItem:a}=i,{writer:r,consumable:o}=n;if(!i.modelRange||!o.consume(a,{attributes:["data-caption"]}))return;const l=r.createElement("caption"),s=i.modelRange.start.nodeAfter,d=e.data.processor.toView(a.getAttribute("data-caption")),u=r.createDocumentFragment();n.consumable.constructor.createFrom(d,n.consumable),n.convertChildren(d,u);for(const e of Array.from(u.getChildren()))r.append(e,l);r.append(l,s)};return e=>{e.on("element:drupal-media",t,{priority:"low"})}}(e)),e.conversion.for("editingDowncast").elementToElement({model:"caption",view:(e,{writer:n})=>{if(!r(e.parent))return null;const a=n.createEditableElement("figcaption");return(0,D.enablePlaceholder)({view:i,element:a,text:Drupal.t("Enter media caption"),keepOnFocus:!0}),(0,t.toWidgetEditable)(a,n)}}),e.editing.mapper.on("modelToViewPosition",(n=i,(e,t)=>{const i=t.modelPosition,a=i.parent;if(!r(a))return;const o=t.mapper.toViewElement(a);t.viewPosition=n.createPositionAt(o,i.offset+1)})),e.conversion.for("dataDowncast").add(function(e){return t=>{t.on("insert:caption",((t,i,n)=>{const{consumable:a,writer:o,mapper:l}=n;if(!r(i.item.parent)||!a.consume(i.item,"insert"))return;const s=e.model.createRangeIn(i.item),d=o.createDocumentFragment();l.bindElements(i.item,d);for(const{item:t}of Array.from(s)){const i={item:t,range:e.model.createRangeOn(t)},a=`insert:${t.name||"$text"}`;e.data.downcastDispatcher.fire(a,i,n);for(const a of t.getAttributeKeys())Object.assign(i,{attributeKey:a,attributeOldValue:null,attributeNewValue:i.item.getAttribute(a)}),e.data.downcastDispatcher.fire(`attribute:${a}`,i,n)}for(const e of o.createRangeIn(d).getItems())l.unbindViewElement(e);l.unbindViewElement(d);const u=e.data.processor.toData(d);if(u){const e=l.toViewElement(i.item.parent);o.setAttribute("data-caption",u,e)}}))}}(e))}_getSavedCaption(e){const t=this._savedCaptionsMap.get(e);return t?D.Element.fromJSON(t):null}_saveCaption(e,t){this._savedCaptionsMap.set(e,t.toJSON())}}class oe extends e.Plugin{static get requires(){return[]}static get pluginName(){return"DrupalMediaCaptionUI"}init(){const{editor:t}=this,i=t.editing.view;t.ui.componentFactory.add("toggleDrupalMediaCaption",(n=>{const a=new m.ButtonView(n),r=t.commands.get("toggleMediaCaption");return a.set({label:Drupal.t("Caption media"),icon:e.icons.caption,tooltip:!0,isToggleable:!0}),a.bind("isOn","isEnabled").to(r,"value","isEnabled"),a.bind("label").to(r,"value",(e=>e?Drupal.t("Toggle caption off"):Drupal.t("Toggle caption on"))),this.listenTo(a,"execute",(()=>{t.execute("toggleMediaCaption",{focusCaptionOnShow:!0});const e=ie(t.model.document.selection);if(e){const n=t.editing.mapper.toViewElement(e);i.scrollToTheSelection(),i.change((e=>{e.addClass("drupal-media__caption_highlighted",n)}))}})),a}))}}class le extends e.Plugin{static get requires(){return[re,oe]}static get pluginName(){return"DrupalMediaCaption"}}var se={DrupalMedia:x,MediaImageTextAlternative:k,MediaImageTextAlternativeEditing:w,MediaImageTextAlternativeUi:M,DrupalLinkMedia:L,DrupalMediaCaption:le,DrupalElementStyle:te}}(),n=n.default}()}));