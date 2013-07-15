//define main variables
var App = App || 
{
	Server: {
		ip: "192.168.88.109",
		port: "8088"
	},
	ID: {
		topMenu: "topmenu-holder",
		leftMenu: "leftmenu-holder",
		pageHolder: "body",
		contentResource: "wrapper",
		loginForm: "loginForm"
	},
	Pages: {
		login: "core/html/login.html",
		main: "core/html/main.html"
	},
	Classes: {},
	Libs: {
		IO: {}
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


//include all files
requirejs(["classes", "ui", "localstorage", "../../libraries/socket.io", "communication"], function(classesContent, uiContent, localstorageContent, ioContent, communicationContent){
	App.Classes = classesContent;
	
	App.Libs.IO = ioContent;
	
	App.Modules.UI = uiContent;
	App.Modules.LocalStorage = localstorageContent;
	App.Modules.Communication = communicationContent;
	
	
	
	App.InitApp();
});