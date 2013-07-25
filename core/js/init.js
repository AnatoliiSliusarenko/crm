//define main variables
var App = App || 
{
	Server: {
		ip: "192.168.88.45",
		//ip: "192.168.88.109",
		port: "8088"
	},
	ID: {
		topMenu: "topmenu-holder",
		leftMenu: "leftmenu-holder",
		pageHolder: "body",
		contentResource: "wrapper",
		loginForm: "loginForm",
		contentHolder: "content-holder",
		viewPanel: "top-bar",
		leftBtn: "leftBtn",
		rightBtn: "rightBtn",
		listBtn: "listBtn",
		thumbBtn: "thumbBtn",
        ganttBtn: "ganttBtn",
        ganttViewHolder: "GanttViewHolder",
		formBtn: "formBtn",
		userPanel: "loginPanel",
		changeCVClass: "changeContentView",
		changeCIClass: "changeContentIndex"

	},
	URL: {
		login: "core/html/login.html",
		main: "core/html/main.html",
		templateFolder: "core/html/templates/"
	},
	Classes: {},
	Libs: {
		IO: {},
		KO: {}
	},
	Modules: {
		UI: {},
		LocalStorage: {},
		Communication: {}
	},
	InitApp: function(){
		this.Modules.Communication.initConnection();
		this.Modules.Communication.checkHash();
	}
};


//include modules and libraries
requirejs(["classes", "ui", "localstorage", "../../libraries/socket.io", "../../libraries/knockout-2.3.0", "communication"], function(classesContent, uiContent, localstorageContent, ioContent, knockoutContent, communicationContent){
	App.Classes = classesContent;

	App.Libs.IO = ioContent;
	App.Libs.KO = knockoutContent;

	App.Modules.UI = uiContent;
	App.Modules.LocalStorage = localstorageContent;
	App.Modules.Communication = communicationContent;
		
	App.InitApp();
});