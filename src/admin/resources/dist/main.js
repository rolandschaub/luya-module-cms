"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};zaa.directive("menuDropdown",["ServiceMenuData","$filter",function(a,r){return{restrict:"E",scope:{navId:"="},controller:["$scope",function(o){for(var e in o.changeModel=function(e){o.navId=e.id},o.menuData=angular.copy(a.data),o.menuDataOriginal=angular.copy(a.data),o.$on("service:MenuData",function(e,a){o.menuData=angular.copy(a),o.menuDataOriginal=angular.copy(a)}),o.menuData.containers)o.menuData.containers[e].isHidden=!1;o.$watch("searchQuery",function(e){if(null!=e&&""!=e){var a=r("filter")(o.menuDataOriginal.items,{title:e});angular.forEach(a,function(e){0<e.parent_nav_id&&o.bubbleParents(e.parent_nav_id,e.nav_container_id,a)}),o.menuData.items=a}else o.menuData.items=angular.copy(o.menuDataOriginal.items)}),o.bubbleParents=function(e,a,t){var n=r("menuchildfilter")(o.menuDataOriginal.items,a,e);if(n){var i=!1;angular.forEach(t,function(e){e.id==n.id&&(i=!0)}),i||t.push(n),o.bubbleParents(n.parent_nav_id,n.nav_container_id,t)}},o.toggler=!0,0==o.menuData.length&&a.load()}],template:function(){return'<div><div class="input-group mb-2"><div class="input-group-addon" ng-hide="searchQuery"><i class="material-icons">search</i></div><span class="input-group-addon" ng-show="searchQuery" ng-click="searchQuery = \'\'"><i class="material-icons">clear</i></span><input class="form-control" ng-model="searchQuery" type="text" placeholder="'+i18n.ngrest_crud_search_text+'"></div><div ng-repeat="(key, container) in menuData.containers" ng-show="(menuData.items | menuparentfilter:container.id:0).length > 0" class="card mb-2" ng-class="{\'card-closed\': !container.isHidden}"><div class="card-header" ng-click="container.isHidden=!container.isHidden"><span class="material-icons card-toggle-indicator">keyboard_arrow_down</span><span>{{container.name}}</span></div><div class="card-body"><div class="treeview treeview-chooser"><ul class="treeview-items treeview-items-lvl1"><li class="treeview-item treeview-item-lvl1" ng-class="{\'treeview-item-has-children\' : (menuData.items | menuparentfilter:container.id:0).length}" ng-repeat="(key, data) in menuData.items | menuparentfilter:container.id:0 track by data.id" ng-include="\'menuDropdownReverse\'"></li></ul></div></div></div></div>'}}}]),zaa.directive("zaaCmsPage",function(){return{restrict:"E",scope:{model:"=",options:"=",label:"@label",i18n:"@i18n",id:"@fieldid",name:"@fieldname"},template:function(){return'<div class="form-group form-side-by-side" ng-class="{\'input--hide-label\': i18n}"><div class="form-side form-side-label"><label>{{label}}</label></div><div class="form-side"><menu-dropdown class="menu-dropdown" nav-id="model" /></div></div>'}}}),zaa.directive("showInternalRedirection",function(){return{restrict:"E",scope:{navId:"="},controller:["$scope","$http","$state",function(a,t,e){a.$watch("navId",function(e){e&&(t.get("admin/api-cms-navitem/get-nav-item-path",{params:{navId:a.navId}}).then(function(e){a.path=e.data}),t.get("admin/api-cms-navitem/get-nav-container-name",{params:{navId:a.navId}}).then(function(e){a.container=e.data}))})}],template:function(){return'<a class="btn btn-secondary btn-sm" ui-sref="custom.cmsedit({ navId : navId, templateId: \'cmsadmin/default/index\'})">{{path}}</a> in {{container}}'}}}),zaa.directive("updateFormPage",["ServiceLayoutsData",function(a){return{restrict:"EA",scope:{data:"="},templateUrl:"updateformpage.html",controller:["$scope","$http",function(t,e){t.parent=t.$parent.$parent,t.navItemId=t.parent.item.id,t.data.layout_id=0,t.layoutsData=a.data,t.$on("service:LayoutsData",function(e,a){t.layoutsData=a}),t.versionsData=[],t.getVersionList=function(){e.get("admin/api-cms-navitempage/versions",{params:{navItemId:t.navItemId}}).then(function(e){t.versionsData=e.data})},t.isEditAvailable=function(){return t.versionsData.length},t.getVersionList()}]}}]),zaa.directive("updateFormModule",function(){return{restrict:"EA",scope:{data:"="},templateUrl:"updateformmodule.html",controller:["$scope","$http",function(a,e){a.modules=[],e.get("admin/api-admin-common/data-modules").then(function(e){a.modules=e.data})}]}}),zaa.directive("updateFormRedirect",function(){return{restrict:"EA",scope:{data:"="},templateUrl:"updateformredirect.html",controller:["$scope",function(t){t.$watch(function(){return t.data},function(e,a){angular.isArray(e)&&(t.data={})})}]}}),zaa.directive("createForm",function(){return{restrict:"EA",scope:{data:"="},templateUrl:"createform.html",controller:["$scope","$http","$filter","ServiceMenuData","ServiceLanguagesData","AdminToastService",function(t,e,n,a,i,o){t.error=[],t.success=!1,t.controller=t.$parent,t.menuData=a.data,t.$on("service:MenuData",function(e,a){t.menuData=a}),t.menuDataReload=function(){return a.load(!0)},t.menu=t.menuData.items,t.navcontainers=t.menuData.containers,t.data.nav_item_type=1,t.data.parent_nav_id=0,t.data.is_draft=0,t.data.nav_container_id=1,t.languagesData=i.data,t.$on("service:LanguagesData",function(e,a){t.languagesData=a}),t.data.lang_id=parseInt(n("filter")(t.languagesData,{is_default:"1"},!0)[0].id),t.navitems=[],t.$watch(function(){return t.data.nav_container_id},function(e,a){void 0!==e&&e!==a&&(t.data.parent_nav_id=0,t.navitems=t.menu[e].__items)}),t.aliasSuggestion=function(){t.data.alias=n("slugify")(t.data.title)},t.$watch("data.alias",function(e,a){e!=a&&null!=e&&(t.data.alias=n("slugify")(e))}),t.exec=function(){t.controller.save().then(function(e){t.menuDataReload(),t.success=!0,t.error=[],t.data.title=null,t.data.alias=null,t.data.isInline&&t.$parent.$parent.getItem(t.data.lang_id,t.data.nav_id),o.success(i18n.view_index_page_success)},function(e){angular.forEach(e,function(e,a){o.error(e[0])}),t.error=e})}}]}}),zaa.directive("createFormPage",function(){return{restrict:"EA",scope:{data:"="},templateUrl:"createformpage.html",controller:["$scope","ServiceLayoutsData","ServiceMenuData",function(t,e,a){t.data.use_draft=0,t.data.layout_id=0,t.data.from_draft_id=0,t.layoutsData=e.data,t.$on("service:BlocksData",function(e,a){t.layoutsData=a}),t.menuData=a.data,t.$on("service:MenuData",function(e,a){t.menuData=a}),t.drafts=t.menuData.drafts,t.layouts=t.layoutsData,t.save=function(){t.$parent.exec()}}]}}),zaa.directive("createFormModule",function(){return{restrict:"EA",scope:{data:"="},templateUrl:"createformmodule.html",controller:["$scope","$http",function(a,e){a.modules=[],e.get("admin/api-admin-common/data-modules").then(function(e){a.modules=e.data}),a.save=function(){a.$parent.exec()}}]}}),zaa.directive("createFormRedirect",function(){return{restrict:"EA",scope:{data:"="},templateUrl:"createformredirect.html",controller:["$scope",function(e){e.save=function(){e.$parent.exec()}}]}}),zaa.factory("PlaceholderService",function(){var a=[];return a.status=1,a.delegate=function(e){a.status=e},a}),zaa.config(["$stateProvider",function(e){e.state("custom.cmsedit",{url:"/update/:navId",templateUrl:"cmsadmin/page/update"}).state("custom.cmsadd",{url:"/create",templateUrl:"cmsadmin/page/create"}).state("custom.cmsdraft",{url:"/drafts",templateUrl:"cmsadmin/page/drafts"})}]),zaa.controller("DraftsController",["$scope","$state","ServiceMenuData",function(t,a,e){t.menuData=e.data,t.$on("service:MenuData",function(e,a){t.menuData=a}),t.go=function(e){a.go("custom.cmsedit",{navId:e})}}]),zaa.controller("CmsDashboard",["$scope","$http",function(a,e){a.dashboard=[],e.get("admin/api-cms-admin/dashboard-log").then(function(e){a.dashboard=e.data})}]),zaa.controller("ConfigController",["$scope","$http","AdminToastService",function(a,e,t){a.data={},e.get("admin/api-cms-admin/config").then(function(e){a.data=e.data}),a.save=function(){e.post("admin/api-cms-admin/config",a.data).then(function(e){t.success(i18n.js_config_update_success)})}}]),zaa.controller("PageVersionsController",["$scope","$http","ServiceLayoutsData","AdminToastService",function(t,a,e,n){var i={headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}};t.layoutsData=e.data,t.$on("service:LayoutsData",function(e,a){t.layoutsData=a}),t.createNewVersionSubmit=function(e){if(null==e)return n.error(i18n.js_version_error_empty_fields),null;e.copyExistingVersion&&(e.versionLayoutId=0),a.post("admin/api-cms-navitem/create-page-version",$.param({layoutId:e.versionLayoutId,navItemId:t.item.id,name:e.versionName,fromPageId:e.fromVersionPageId}),i).then(function(e){if(e.data.error)return n.error(i18n.js_version_error_empty_fields),null;t.refreshForce(),n.success(i18n.js_version_create_success)})}}]),zaa.controller("CopyPageController",["$scope","$http","$filter","AdminToastService",function(t,e,a,n){var i={headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}};t.$on("deletedNavItem",function(){t.isOpen=!1,t.itemSelection=!1,t.selection=0}),t.NavItemController=t.$parent,t.navId=0,t.items=null,t.isOpen=!1,t.itemSelection=!1,t.selection=0,t.select=function(e){t.selection=e.id,t.itemSelection=angular.copy(e)},t.$watch("itemSelection.title",function(e,a){e&&t.aliasSuggestion()}),t.aliasSuggestion=function(){t.itemSelection.alias=a("slugify")(t.itemSelection.title)},t.loadItems=function(){t.navId=t.NavItemController.NavController.navData.id,e.get("admin/api-cms-nav/find-nav-items",{params:{navId:t.navId}}).then(function(e){t.items=e.data,t.isOpen=!0})},t.save=function(){t.itemSelection.toLangId=t.NavItemController.lang.id,e.post("admin/api-cms-nav/create-from-page",$.param(t.itemSelection),i).then(function(e){e.data?(n.success(i18n.js_added_translation_ok),t.NavItemController.refresh()):n.error(i18n.js_added_translation_error)},function(e){n.errorArray(e.data)})}}]),zaa.filter("menuparentfilter",function(){return function(e,t,n){var i=[];return angular.forEach(e,function(e,a){e.parent_nav_id==n&&e.nav_container_id==t&&i.push(e)}),i}}),zaa.filter("menuchildfilter",function(){return function(e,t,n){var i=!1;return angular.forEach(e,function(e,a){i||e.id==n&&e.nav_container_id==t&&(i=e)}),i}}),zaa.controller("CmsMenuTreeController",["$scope","$rootScope","$state","$http","$filter","ServiceMenuData","ServiceLiveEditMode",function(n,a,t,o,i,r,c){n.liveEditState=0,n.$watch("liveEditStateToggler",function(e){c.state=e}),n.loadCmsConfig=function(){o.get("admin/api-cms-admin/config").then(function(e){a.cmsConfig=e.data})},n.loadCmsConfig(),n.menuData=r.data,n.$on("service:MenuData",function(e,a){n.menuData=a}),n.menuDataReload=function(){return r.load(!0)},n.dropEmptyContainer=function(e,a,t,n){o.get("admin/api-cms-navitem/move-to-container",{params:{moveItemId:e.id,droppedOnCatId:n}}).then(function(e){r.load(!0)})},n.dropItem=function(e,a,t){if("bottom"==t)var n="admin/api-cms-navitem/move-after",i={moveItemId:e.id,droppedAfterItemId:a.id};else"top"==t?(n="admin/api-cms-navitem/move-before",i={moveItemId:e.id,droppedBeforeItemId:a.id}):"middle"==t&&(n="admin/api-cms-navitem/move-to-child",i={moveItemId:e.id,droppedOnItemId:a.id});o.get(n,{params:i}).then(function(e){r.load(!0)},function(e){console.log("throw error message errorMessageOnDuplicateAlias"),r.load(!0)})},n.validItem=function(e,a){return e.id!=a.id&&(n.rritems=[],n.recursivItemValidity(a.nav_container_id,a.id),-1==n.rritems.indexOf(e.id))},n.rritems=[],n.recursivItemValidity=function(a,e){var t=i("menuparentfilter")(n.menuData.items,a,e);angular.forEach(t,function(e){n.rritems.push(e.id),n.recursivItemValidity(a,e.id)})},n.toggleItem=function(e){null==e.toggle_open?e.toggle_open=1:e.toggle_open=!e.toggle_open,o.post("admin/api-cms-nav/tree-history",{data:e},{ignoreLoadingBar:!0})},n.go=function(e){c.changeUrl(e.nav_item_id,0),t.go("custom.cmsedit",{navId:e.id})},n.showDrag=0,n.isCurrentElement=function(e){return null!==e&&t.params.navId==e.id},n.hiddenCats=[],n.$watch("menuData",function(e,a){n.hiddenCats=e.hiddenCats}),n.toggleCat=function(e){e in n.hiddenCats?n.hiddenCats[e]=!n.hiddenCats[e]:n.hiddenCats[e]=1,o.post("admin/api-cms-nav/save-cat-toggle",{catId:e,state:n.hiddenCats[e]},{ignoreLoadingBar:!0})},n.toggleIsHidden=function(e){return null!=n.hiddenCats&&e in n.hiddenCats&&1==n.hiddenCats[e]}}]),zaa.controller("CmsadminCreateController",["$scope","$q","$http",function(n,a,i){n.data={},n.data.isInline=!1,n.save=function(){var e={headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}};return a(function(a,t){1==n.data.nav_item_type&&i.post("admin/api-cms-nav/create-page",$.param(n.data),e).then(function(e){a(e.data)},function(e){t(e.data)}),2==n.data.nav_item_type&&i.post("admin/api-cms-nav/create-module",$.param(n.data),e).then(function(e){a(e.data)},function(e){t(e.data)}),3==n.data.nav_item_type&&i.post("admin/api-cms-nav/create-redirect",$.param(n.data),e).then(function(e){a(e.data)},function(e){t(e.data)})})}}]),zaa.controller("CmsadminCreateInlineController",["$scope","$q","$http",function(n,a,i){n.data={nav_id:n.$parent.NavController.id},n.data.isInline=!0,n.save=function(){n.data.lang_id=n.lang.id;var e={headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}};return a(function(a,t){1==n.data.nav_item_type&&i.post("admin/api-cms-nav/create-page-item",$.param(n.data),e).then(function(e){a(e.data)},function(e){t(e.data)}),2==n.data.nav_item_type&&i.post("admin/api-cms-nav/create-module-item",$.param(n.data),e).then(function(e){a(e.data)},function(e){t(e.data)}),3==n.data.nav_item_type&&i.post("admin/api-cms-nav/create-redirect-item",$.param(n.data),e).then(function(e){a(e.data)},function(e){t(e.data)})})}}]),zaa.controller("NavController",["$scope","$rootScope","$filter","$state","$stateParams","$http","PlaceholderService","ServicePropertiesData","ServiceMenuData","ServiceLanguagesData","ServiceLiveEditMode","AdminToastService","AdminClassService","AdminLangService","HtmlStorage",function(n,e,i,a,t,o,r,c,s,d,l,u,m,p,v){n.pageSettingsOverlayHidden=!0,n.pageSettingsOverlayTab=1,n.togglePageSettingsOverlay=function(e){n.pageSettingsOverlayTab=e,n.pageSettingsOverlayHidden=!n.pageSettingsOverlayHidden},n.navCfg={helptags:e.luyacfg.helptags},n.$watch(function(){return l.state},function(e,a){n.displayLiveContainer=e}),n.$watch(function(){return l.url},function(e,a){n.liveUrl=e}),n.AdminLangService=p,n.propertiesData=c.data,n.$on("service:PropertiesData",function(e,a){n.propertiesData=a}),n.menuData=s.data,n.$on("service:MenuData",function(e,a){n.menuData=a}),n.menuDataReload=function(){return s.load(!0)},n.languagesData=d.data,n.$on("service:LanguagesData",function(e,a){n.languagesData=a}),n.PlaceholderService=r,n.placeholderState=n.PlaceholderService.status,n.$watch("placeholderState",function(e,a){e!==a&&void 0!==e&&n.PlaceholderService.delegate(e)}),n.isBlockholderSmall=v.getValue("blockholderToggleState",!0),n.toggleBlockholderSize=function(){n.isBlockholderSmall=!n.isBlockholderSmall,v.setValue("blockholderToggleState",n.isBlockholderSmall)},n.sidebar=!1,n.enableSidebar=function(){n.sidebar=!0},n.toggleSidebar=function(){n.sidebar=!n.sidebar},n.showActions=1,n.id=parseInt(t.navId),n.isDeleted=!1,n.AdminClassService=m,n.propValues={},n.hasValues=!1,n.bubbleParents=function(e,a){var t=i("menuchildfilter")(n.menuData.items,a,e);t&&(t.toggle_open=1,n.bubbleParents(t.parent_nav_id,t.nav_container_id))},n.createDeepPageCopy=function(){o.post("admin/api-cms-nav/deep-page-copy",{navId:n.id}).then(function(e){n.menuDataReload(),u.success(i18n.js_page_create_copy_success),n.showActions=1,n.togglePageSettingsOverlay()})},n.createDeepPageCopyAsTemplate=function(){o.post("admin/api-cms-nav/deep-page-copy-as-template",{navId:n.id}).then(function(e){n.menuDataReload(),u.success(i18n.js_page_create_copy_as_template_success),n.showActions=1,n.togglePageSettingsOverlay(),a.go("custom.cmsdraft")})},n.loadNavProperties=function(){o.get("admin/api-cms-nav/get-properties",{params:{navId:n.id}}).then(function(e){for(var a in e.data){var t=e.data[a];n.propValues[t.admin_prop_id]=t.value,n.hasValues=!0}})},n.togglePropMask=function(){n.showPropForm=!n.showPropForm},n.showPropForm=!1,n.storePropValues=function(){o.post("admin/api-cms-nav/save-properties?navId="+n.id,$.param(n.propValues),{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).then(function(e){u.success(i18n.js_page_property_refresh),n.loadNavProperties(),n.showPropForm=!1,n.togglePageSettingsOverlay()})},n.trash=function(){u.confirm(i18n.js_page_confirm_delete,i18n.cmsadmin_settings_trashpage_title,["$toast",function(a){o.get("admin/api-cms-nav/delete",{params:{navId:n.id}}).then(function(e){n.isDeleted=!0,n.menuDataReload().then(function(){a.close(),n.togglePageSettingsOverlay()})},function(e){u.error(i18n.js_page_delete_error_cause_redirects)})}])},n.isDraft=!1,n.submitNavForm=function(e){o.post("admin/api-cms-nav/update?id="+n.navData.id,e).then(function(e){u.success(i18nParam("js_page_update_layout_save_success")),n.togglePageSettingsOverlay()},function(e){angular.forEach(e.data,function(e){u.error(e.message)})})},n.navData=i("filter")(n.menuData.items,{id:n.id},!0)[0],null==n.navData?n.isDraft=!0:(n.loadNavProperties(),n.$watch(function(){return n.navData.is_offline},function(e,a){e!==a&&void 0!==e&&o.get("admin/api-cms-nav/toggle-offline",{params:{navId:n.navData.id,offlineStatus:e}}).then(function(e){1==n.navData.is_offline?u.info(i18nParam("js_state_offline",{title:n.navData.title})):u.info(i18nParam("js_state_online",{title:n.navData.title}))})}),n.$watch(function(){return n.navData.is_hidden},function(e,a){e!==a&&void 0!==e&&o.get("admin/api-cms-nav/toggle-hidden",{params:{navId:n.navData.id,hiddenStatus:e}}).then(function(e){1==n.navData.is_hidden?u.info(i18nParam("js_state_hidden",{title:n.navData.title})):u.info(i18nParam("js_state_visible",{title:n.navData.title}))})}),n.$watch(function(){return n.navData.is_home},function(e,a){e!==a&&void 0!==e&&o.get("admin/api-cms-nav/toggle-home",{params:{navId:n.navData.id,homeState:e}}).then(function(e){n.menuDataReload().then(function(){1==n.navData.is_home?u.success(i18nParam("js_state_is_home",{title:n.navData.title})):u.success(i18nParam("js_state_is_not_home",{title:n.navData.title})),n.togglePageSettingsOverlay()})})}))}]),zaa.controller("NavItemController",["$scope","$rootScope","$http","$filter","$timeout","ServiceMenuData","AdminLangService","AdminToastService","ServiceLiveEditMode","ServiceLayoutsData","ServiceWorkingPageVersion",function(c,e,i,t,a,n,o,r,s,d,l){c.loaded=!1,c.NavController=c.$parent,c.liveEditState=!1,c.$watch(function(){return s.state},function(e,a){c.liveEditState=e}),c.openLiveUrl=function(e,a){s.changeUrl(e,a)},c.loadLiveUrl=function(){s.changeUrl(c.item.id,c.currentPageVersion)},c.layoutsData=d.data,c.$on("service:BlocksData",function(e,a){c.layoutsData=a}),c.menuDataReload=function(){return n.load(!0)},c.$on("service:LoadLanguage",function(e,a){c.loaded||c.refresh()}),c.isTranslated=!1,c.item=[],c.itemCopy=[],c.settings=!1,c.typeDataCopy=[],c.typeData=[],c.container=[],c.errors=[],c.homeUrl=e.luyacfg.homeUrl,c.currentPageVersion=0,c.currentPageVersionAlias,c.trashItem=function(){0==c.lang.is_default&&r.confirm(i18n.js_page_confirm_delete,i18n.cmsadmin_settings_trashpage_title,["$toast",function(){i.delete("admin/api-cms-navitem/delete?navItemId="+c.item.id).then(function(e){c.menuDataReload().then(function(){c.isTranslated=!1,c.item=[],c.itemCopy=[],c.settings=!1,c.typeDataCopy=[],c.typeData=[],c.container=[],c.errors=[],c.currentPageVersion=0,c.$broadcast("deletedNavItem"),$toast.close()})},function(e){r.error(i18n.js_page_delete_error_cause_redirects)})}])},c.reset=function(){c.itemCopy=angular.copy(c.item),1==c.item.nav_item_type?c.typeDataCopy=angular.copy({nav_item_type_id:c.item.nav_item_type_id}):c.typeDataCopy=angular.copy(c.typeData)},c.updateNavItemData=function(t,e){c.errors=[];var a=t.id;e.title=t.title,e.alias=t.alias,e.title_tag=t.title_tag,e.description=t.description,e.keywords=t.keywords,e.timestamp_create=t.timestamp_create,e.image_id=t.image_id,e.is_url_strict_parsing_disabled=t.is_url_strict_parsing_disabled,i.post("admin/api-cms-navitem/update-page-item?navItemId="+a+"&navItemType="+t.nav_item_type,$.param(e),{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).then(function(e){if(1!==t.nav_item_type&&(c.currentPageVersion=0),c.loaded=!1,e.data&&1==t.nav_item_type&&"object"===_typeof(e.data.typeData)){var a=e.data.item.nav_item_type_id;0==e.data.item.nav_item_type_id&&(a=Object.keys(e.data.typeData)[0]),c.container=e.data.typeData[a].contentAsArray,c.currentPageVersionAlias=e.data.typeData[a].version_alias,c.currentPageVersion=a}r.success(i18nParam("js_page_item_update_ok",{title:t.title})),c.menuDataReload(),c.refresh(),c.toggleSettingsOverlay(),c.reset()},function(e){angular.forEach(e.data,function(e){r.error(e.message)})})},c.$watch("itemCopy.alias",function(e,a){e!=a&&null!=e&&(c.itemCopy.alias=t("slugify")(e))}),c.removeVersion=function(t){r.confirm(i18nParam("js_version_delete_confirm",{alias:t.version_alias}),i18n.cmsadmin_version_remove,["$toast","$http",function(a,e){e.post("admin/api-cms-navitem/remove-page-version",{pageId:t.id}).then(function(e){c.refreshForce(),a.close(),r.success(i18nParam("js_version_delete_confirm_success",{alias:t.version_alias}))})}])},c.editVersionItem,c.tab=1,c.editVersion=function(e){c.changeTab(4),c.editVersionItem=e},c.editVersionUpdate=function(e){i.post("admin/api-cms-navitem/change-page-version-layout",{pageItemId:e.id,layoutId:e.layout_id,alias:e.version_alias}).then(function(e){c.refreshForce(),r.success(i18n.js_version_update_success),c.toggleSettingsOverlay()})},c.getItem=function(e,a){i({url:"admin/api-cms-navitem/nav-lang-item",method:"GET",params:{langId:e,navId:a}}).then(function(e){if(e.data){if(!e.data.error)if(c.item=e.data.item,c.typeData=e.data.typeData,c.isTranslated=!0,c.reset(),e.data.nav.is_draft)c.currentPageVersion=e.data.item.nav_item_type_id,c.container=e.data.typeData[c.currentPageVersion].contentAsArray;else if(c.NavController.bubbleParents(c.NavController.navData.parent_nav_id,c.NavController.navData.nav_container_id),1==c.item.nav_item_type){var a=l.hasVersion(c.item.id);a?c.switchVersion(a):(0==c.currentPageVersion&&(c.currentPageVersion=e.data.item.nav_item_type_id),e.data.item.nav_item_type_id in e.data.typeData&&(c.currentPageVersionAlias=c.container=e.data.typeData[c.currentPageVersion].version_alias,c.container=e.data.typeData[c.currentPageVersion].contentAsArray))}c.loaded=!0}})},c.versionDropDownVisbility=!1,c.toggleVersionsDropdown=function(){c.versionDropDownVisbility=!c.versionDropDownVisbility},c.switchVersion=function(e,a){l.store(c.item.id,e),c.container=c.typeData[e].contentAsArray,c.currentPageVersionAlias=c.typeData[e].version_alias,c.currentPageVersion=e,c.loadLiveUrl(),a&&c.toggleVersionsDropdown()},c.refreshForce=function(){c.getItem(c.lang.id,c.NavController.id)},c.refresh=function(){o.isInSelection(c.lang.short_code)&&c.getItem(c.lang.id,c.NavController.id)},c.settingsOverlayVisibility=!0,c.toggleSettingsOverlay=function(e){c.settingsOverlayVisibility=!c.settingsOverlayVisibility,e&&(c.tab=e)},c.changeTab=function(e){c.tab=e},c.refreshNested=function(t,n){i({url:"admin/api-cms-navitem/reload-placeholder",method:"GET",params:{navItemPageId:c.currentPageVersion,prevId:t,placeholderVar:n}}).then(function(a){s.changeUrl(c.item.id,c.currentPageVersion),angular.forEach(c.container.__placeholders,function(e){c.revPlaceholders(e,t,n,a.data)})})},c.revPlaceholders=function(t,n,i,o){angular.forEach(t,function(e,a){parseInt(n)==parseInt(e.prev_id)&&i==e.var?t[a].__nav_item_page_block_items=o:c.revFind(e,n,i,o)})},c.revFind=function(e,a,t,n){for(var i in e.__nav_item_page_block_items)for(var o in e.__nav_item_page_block_items[i].__placeholders)for(var r in e.__nav_item_page_block_items[i].__placeholders[o])c.revPlaceholders(e.__nav_item_page_block_items[i].__placeholders[o],a,t,n)},c.dropItemPlaceholder=function(e,a,t){e.hasOwnProperty("favorized")||e.hasOwnProperty("newblock")?i.post("admin/api-cms-navitempageblockitem/create",{prev_id:a.prev_id,sort_index:0,block_id:e.id,placeholder_var:a.var,nav_item_page_id:a.nav_item_page_id}).then(function(e){c.refreshNested(a.prev_id,a.var)}):e.hasOwnProperty("copystack")?i.post("admin/api-cms-navitemblock/copy-block-from-stack",{copyBlockId:e.id,sort_index:0,prev_id:a.prev_id,placeholder_var:a.var,nav_item_page_id:a.nav_item_page_id}).then(function(e){c.refreshNested(a.prev_id,a.var)}):i.put("admin/api-cms-navitempageblockitem/update?id="+e.id,{sort_index:0,prev_id:a.prev_id,placeholder_var:a.var}).then(function(e){c.refreshForce()})},c.refresh()}]),zaa.controller("PageBlockEditController",["$scope","$sce","$http","AdminClassService","AdminToastService","ServiceBlockCopyStack","ServiceLiveEditMode",function(o,r,c,e,t,a,n){o.NavItemTypePageController=o.$parent,o.dropItemPlaceholder=function(e,a,t){e.hasOwnProperty("favorized")||e.hasOwnProperty("newblock")?c.post("admin/api-cms-navitempageblockitem/create",{prev_id:a.prev_id,sort_index:0,block_id:e.id,placeholder_var:a.var,nav_item_page_id:a.nav_item_page_id}).then(function(e){o.NavItemTypePageController.refreshNested(a.prev_id,a.var)}):e.hasOwnProperty("copystack")?c.post("admin/api-cms-navitemblock/copy-block-from-stack",{copyBlockId:e.id,sort_index:0,prev_id:a.prev_id,placeholder_var:a.var,nav_item_page_id:a.nav_item_page_id}).then(function(e){o.NavItemTypePageController.refreshNested(o.placeholder.prev_id,o.placeholder.var)}):c.put("admin/api-cms-navitempageblockitem/update?id="+e.id,{sort_index:0,prev_id:a.prev_id,placeholder_var:a.var}).then(function(e){o.refreshForce()})},o.dropItem=function(e,a,t,n){var i=o.$index;"bottom"==t&&(i+=1),e.hasOwnProperty("favorized")||e.hasOwnProperty("newblock")?c.post("admin/api-cms-navitempageblockitem/create",{prev_id:o.placeholder.prev_id,sort_index:i,block_id:e.id,placeholder_var:o.placeholder.var,nav_item_page_id:o.placeholder.nav_item_page_id}).then(function(e){o.NavItemTypePageController.refreshNested(o.placeholder.prev_id,o.placeholder.var)}):e.hasOwnProperty("copystack")?c.post("admin/api-cms-navitemblock/copy-block-from-stack",{copyBlockId:e.id,sort_index:i,prev_id:o.placeholder.prev_id,placeholder_var:o.placeholder.var,nav_item_page_id:o.placeholder.nav_item_page_id}).then(function(e){o.NavItemTypePageController.refreshNested(o.placeholder.prev_id,o.placeholder.var)}):c.put("admin/api-cms-navitempageblockitem/update?id="+e.id,{prev_id:o.placeholder.prev_id,placeholder_var:o.placeholder.var,sort_index:i}).then(function(e){angular.element(n).remove(),o.NavItemTypePageController.refreshNested(o.placeholder.prev_id,o.placeholder.var)})},o.copyBlock=function(){a.push(o.block)},o.toggleHidden=function(){0==o.block.is_hidden?o.block.is_hidden=1:o.block.is_hidden=0,c({url:"admin/api-cms-navitem/toggle-block-hidden",method:"GET",params:{blockId:o.block.id,hiddenState:o.block.is_hidden}}).then(function(e){o.NavItemTypePageController.$parent.$parent.loadLiveUrl(),t.info(i18nParam("js_page_block_visbility_change",{name:o.block.name}))})},o.isEditable=function(){return void 0!==o.block.vars&&0<o.block.vars.length},o.isConfigurable=function(){return void 0!==o.block.cfgs&&0<o.block.cfgs.length},o.$watch(function(){return o.block.values},function(e,a){o.data=e}),o.$watch(function(){return o.block.variation},function(e,a){o.evalVariationVisbility(e)}),o.getInfo=function(e){return!!o.block.field_help.hasOwnProperty(e)&&o.block.field_help[e]},o.evalVariationVisbility=function(e){if(o.block.variations.hasOwnProperty(e)){var a=o.block.variations[o.block.variation];angular.forEach(a,function(e,t){angular.isObject(e)&&angular.forEach(e,function(e,a){angular.forEach(o.block[t],function(e){a==e.var&&(e.invisible=!0)})})})}else angular.forEach(o.block.cfgs,function(e){e.invisible=!1}),angular.forEach(o.block.vars,function(e){e.invisible=!1})},o.cfgdata=o.block.cfgvalues||{},o.edit=!1,o.modalHidden=!0,o.modalMode=1,o.initModalMode=function(){0==o.block.vars.length&&(o.modalMode=2)},o.toggleEdit=function(){(o.isEditable()||o.isConfigurable())&&(o.modalHidden=!o.modalHidden,o.edit=!o.edit)},o.renderTemplate=function(e,a,t,n,i){if(null==e)return"";var o=(e=Twig.twig({data:e})).render({vars:a,cfgs:t,block:n,extras:i});return r.trustAsHtml(o)},o.removeBlock=function(){t.confirm(i18nParam("js_page_block_delete_confirm",{name:o.block.name}),i18n.view_update_block_tooltip_delete,["$toast",function(a){c.delete("admin/api-cms-navitempageblockitem/delete?id="+o.block.id).then(function(e){o.NavItemTypePageController.refreshNested(o.placeholder.prev_id,o.placeholder.var),o.NavItemTypePageController.loadLiveUrl(),a.close(),t.success(i18nParam("js_page_block_remove_ok",{name:o.block.name}))})}])},o.save=function(){c.put("admin/api-cms-navitempageblockitem/update?id="+o.block.id,{json_config_values:o.data,json_config_cfg_values:o.cfgdata,variation:o.block.variation}).then(function(e){t.success(i18nParam("js_page_block_update_ok",{name:o.block.name})),o.toggleEdit(),o.block.is_dirty=1,o.block=angular.copy(e.data.objectdetail),o.NavItemTypePageController.loadLiveUrl(),o.evalVariationVisbility(o.block.variation)})}}]),zaa.controller("DroppableBlocksController",["$scope","$http","AdminClassService","ServiceBlocksData","ServiceBlockCopyStack",function(t,a,e,n,i){t.blocksData=n.data,t.blocksDataRestore=angular.copy(t.blocksData),t.$on("service:BlocksData",function(e,a){t.blocksData=a}),t.blocksDataReload=function(){return n.load(!0)},t.addToFav=function(e){a.post("admin/api-cms-block/to-fav",{block:e}).then(function(e){t.blocksDataReload()})},t.removeFromFav=function(e){a.post("admin/api-cms-block/remove-fav",{block:e}).then(function(e){t.blocksDataReload()})},t.toggleGroup=function(e){null==e.toggle_open?e.toggle_open=1:e.toggle_open=!e.toggle_open,a.post("admin/api-cms-block/toggle-group",{group:e},{ignoreLoadingBar:!0})},t.isPreviewEnabled=function(e){return e.preview_enabled},t.copyStack=i.stack,t.$on("service:CopyStack",function(e,a){t.copyStack=a}),t.clearStack=function(){i.clear()},t.searchQuery="",t.searchIsDirty=!1,t.$watch("searchQuery",function(e,a){""!==e?(t.searchIsDirty=!0,angular.forEach(t.blocksData,function(e,a){e.group.is_fav&&t.blocksData.splice(a,1),e.group.toggle_open=1})):t.searchIsDirty&&(t.blocksData=angular.copy(t.blocksDataRestore))})}]),zaa.config(["resolverProvider",function(e){e.addCallback(["ServiceMenuData","ServiceBlocksData","ServiceLayoutsData","LuyaLoading",function(e,a,t,n){n.start(),a.load(),t.load(),e.load().then(function(e){n.stop()})}])}]),zaa.factory("ServiceBlockCopyStack",["$rootScope",function(a){var t=[];return t.stack=[],t.clear=function(){t.stack=[],a.$broadcast("service:CopyStack",t.stack)},t.push=function(e){4<t.stack.length&&t.stack.shift(),t.stack.push({blockId:e.block_id,name:e.name,icon:e.icon,id:e.id,copystack:1}),a.$broadcast("service:CopyStack",t.stack)},t}]),zaa.factory("ServiceMenuData",["$http","$q","$rootScope",function(n,e,i){var o=[];return o.data=[],o.load=function(t){return e(function(a,e){0<o.data.length&&!0!==t?a(o.data):n.get("admin/api-cms-menu/data-menu").then(function(e){o.data=e.data,i.$broadcast("service:MenuData",o.data),a(o.data)})})},o}]),zaa.factory("ServiceBlocksData",["$http","$q","$rootScope",function(n,e,i){var o=[];return o.data=[],o.load=function(t){return e(function(a,e){0<o.data.length&&!0!==t?a(o.data):n.get("admin/api-cms-admin/data-blocks").then(function(e){o.data=e.data,i.$broadcast("service:BlocksData",o.data),a(o.data)})})},o}]),zaa.factory("ServiceLayoutsData",["$http","$q","$rootScope",function(n,e,i){var o=[];return o.data=[],o.load=function(t){return e(function(a,e){0<o.data.length&&!0!==t?a(o.data):n.get("admin/api-cms-admin/data-layouts").then(function(e){o.data=e.data,i.$broadcast("service:LayoutsData",o.data),a(o.data)})})},o}]),zaa.factory("ServiceLiveEditMode",["$rootScope",function(n){var i=[];return i.state=0,i.url=n.luyacfg.homeUrl,i.toggle=function(){i.state=!i.state},i.setUrl=function(e,a){var t=(new Date).getTime();i.url=n.cmsConfig.previewUrl+"?itemId="+e+"&version="+a+"&date="+t},i.changeUrl=function(e,a){null==a&&(a=0),i.setUrl(e,a),n.$broadcast("service:LiveEditModeUrlChange",i.url)},i}]),zaa.factory("ServiceWorkingPageVersion",[function(){var t={page:{},store:function(e,a){t.page[e]=a},hasVersion:function(e){return!!t.page.hasOwnProperty(e)&&t.page[e]}};return t}]);