define(function(){
	return {
		topMenu: [], 
		leftMenu: [],
		loadContent: function(destID, resURL, resID, callback){
			$("#" + destID).empty();
			$("#" + destID).load(resURL + " #" + resID, callback);
		},
		hideContent: function(){
			$("#" + App.ID.contentHolder).fadeOut("normal");
		},
		showContent: function(){
			$("#" + App.ID.contentHolder).fadeIn("normal");
		},
		initLoginPage: function(){
			$("#" + App.ID.loginForm).submit(function(){
				var login = $(this).find("#login").val(),
					password = $(this).find("#password").val();
				
				App.Modules.Communication.login(login, password);
				return false;
			});
			
			//App.Modules.UI.showContent();
		},
		showLoginAnswer: function(message){
			$("#" + App.ID.loginForm + " #response").empty().append(message);
		},
		showLoginPage: function(){
			//this.hideContent();
			this.hideLeftMenu();
			this.hideTopMenu();
			
			//change class of content
			this.loadContent(App.ID.contentHolder, App.Pages.login, App.ID.loginContent, this.initLoginPage);
		},
		showMainPage: function(){
			//change visible class to topMenu, leftMenu
			//change class of content
			this.createTopMenu();
			this.showTopMenu();
			
			this.createLeftMenu();
			this.showLeftMenu();
			
			this.hideContent();
			
		},
		createTopMenu: function(){
			
		},
		createLeftMenu: function(){
			
		},
		showTopMenu: function(){
			
		},
		showLeftMenu: function(){
			
		},
		hideTopMenu: function(){
			
		},
		hideLeftMenu: function(){
			
		}
	}
});

