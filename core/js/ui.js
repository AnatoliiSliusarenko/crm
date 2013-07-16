define(function(){
	function addChildren(destItem, childItems){
		for (ind in childItems)
		{
			var newMMItem = new App.Classes.ModuleMenuItem(childItems[ind].cname, childItems[ind].cname, false);
			
			if (childItems[ind].children != [])
				addChildren(newMMItem, childItems[ind].children);
			
			destItem.addMMItem(newMMItem);
		}
	}
	
	function displayMMItem(destItem, childItems){
		var $ul = destItem.append("<ul></ul>").find("ul");
		for (ind in childItems)
		{
			var $li = $("<li><a></a></li>");
			
			$li.find("a")
			   .attr("data-link", childItems[ind].link)
			   .text(childItems[ind].link);
			
			if(childItems[ind].children != [])
				displayMMItem($li, childItems[ind].children);
			//add to ul
			
		}
	}
	return {
		modulesMenu: [],
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
				App.Modules.Communication.getModules();
			});
		},
		initModulesMenu: function(initArray){
			this.modulesMenu = [];
			for (ind in initArray)
			{
				var newMItem = new App.Classes.ModuleItem(initArray[ind].mname, initArray[ind].mname, false);
				
				addChildren(newMItem, initArray[ind].content);
				
				this.modulesMenu.push(newMItem);
			}
			
			this.modulesMenu[0].selected = true;
			this.modulesMenu[0].structure[0].selected = true;
		},
		displayTopMenu: function(){
			var $ul = $("#" + App.ID.topMenu + " ul");
				$ul.empty();
			for (ind in this.modulesMenu)
			{
				//create and than add
				$li = $ul.append("<li><a></a></li>").find("li").last();
				
				if(this.modulesMenu[ind].selected == true) $li.addClass("selected");
											  
				$li.find("a")
				   .attr("data-link", this.modulesMenu[ind].link)
				   .text(this.modulesMenu[ind].link);
			}
		},
		displayLeftMenu: function(){
			var $nav = $("#" + App.ID.leftMenu + " nav"),
				link = $("#" + App.ID.topMenu + " li.selected a").attr("data-link");
			$nav.empty();
			for (ind in this.modulesMenu)
			{
				if (this.modulesMenu[ind].link == link)
					displayMMItem($nav, this.modulesMenu[ind].structure);
				break;
			}	
		}
	}
});

