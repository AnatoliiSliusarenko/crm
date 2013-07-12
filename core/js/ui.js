define(function(){
	var loadContent = function(destID, resURL, resID, callback){
		$("#" + destID).empty();
		$("#" + destID).load(resURL + " #" + resID, callback);
	};
	
	return {
		topMenu: [], 
		leftMenu: [],
		initLoginPage: function(){
			$("#" + App.ID.loginForm).submit(function(){
				var login = $(this).find("#login").val(),
					password = $(this).find("#password").val();
				
				App.Modules.Communication.login(login, password);
				return false;
			});
		},
		showLoginPage: function(){
			//change hidden class to topMenu, leftMenu
			//change class of content
			loadContent(App.ID.contentHolder, App.Pages.login, App.ID.loginContent, this.initLoginPage);
		},
		showMainPage: function(){
			//change visible class to topMenu, leftMenu
			//change class of content
			
			loadContent(App.ID.contentHolder, App.Pages.main, App.ID.contentHolder);
		}
	}
});

