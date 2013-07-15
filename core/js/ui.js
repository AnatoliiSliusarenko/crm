define(function(){
	return {
		topMenu: [], 
		leftMenu: [],
		loadContent: function(destID, resURL, resID, callback){
			$("#" + destID).empty();
			$("#" + destID).load(resURL + " #" + resID, callback);
		},
		initLoginPage: function(){
			this.loadContent(App.ID.pageHolder, App.Pages.login, App.ID.contentResource, function(){
				$("#" + App.ID.loginForm).bind("submit",function(){
					var login = $(this).find("#login").val(),
						password = $(this).find("#password").val();
					
					App.Modules.Communication.login(login, password);
					return false;
				});
			});
			
			
			
			
		},
		showLoginAnswer: function(message){
			$("#" + App.ID.loginForm + " #response").empty().append(message);
		},
		initMainPage: function(){
			this.loadContent(App.ID.pageHolder, App.Pages.main, App.ID.contentResource, function(){
				// load menu
			});
			
			
			
		}
	}
});

