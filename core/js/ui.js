define(function(){
	function loadContent(destID, resURL, resID, callback){
		$("#" + destID).empty();
		$("#" + destID).load(resURL + " #" + resID, callback);
	}
	function addChildren(destItem, childItems){
		for (ind in childItems)
		{
			var newMMItem = new App.Classes.ModuleMenuItem(childItems[ind].cname, childItems[ind].cname, false);
			
			if (childItems[ind].children != [])
				addChildren(newMMItem, childItems[ind].children);
			
			destItem.addMMItem(newMMItem);
		}
	}
	
	function displayMMItems(destItem, childItems){
		var $ul = destItem.append("<ul></ul>").find("ul");
		
		for (ind in childItems)
		{
			var $li = $("<li><a></a></li>");
			
			$li.find("a")
			   .attr("data-link", childItems[ind].link)
			   .attr("href", "#")
			   .text(childItems[ind].link)
			   .bind('click', function(event){
				   var link = $(event.target).attr('data-link');
				   App.Modules.Communication.getList(link);
				   return false;
			   });
			
			if(childItems[ind].children != [])
				displayMMItems($li, childItems[ind].children);
			
			$ul.append($li);
		}
	}
	return {
		modulesMenu: [],
		Content: {
			data: [],
			type: "users",
			view: "list",
			index: null
			
		},
		initContentData: function(data){
			this.Content.index = App.Libs.KO.observable(0);
			this.Content.data = App.Libs.KO.observableArray(data);
			
		},
		initContentType: function(type){
			this.Content.type = type;
		},
		initContentView: function(view){
			this.Content.view = view;
		},
		changeContentIndex: function(shift){
			this.Content.index(this.Content.index() + shift);
			
			//if <0   or more than length
		},
		initLoginPage: function(){
			loadContent(App.ID.pageHolder, App.URL.login, App.ID.contentResource, function(){
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
			loadContent(App.ID.pageHolder, App.URL.main, App.ID.contentResource, function(){	
				App.Modules.Communication.getModules();
				$("a." + App.ID.changeCVClass).click(function(){
					var viewType = $(this).attr('data-view-type');
					
					App.Modules.UI.initContentView(viewType);
					App.Modules.UI.displayContent();
					
					return false;
				});
				
				$("a." + App.ID.changeCIClass).click(function(){
					var  shift = $(this).attr('data-shift') == "left" ? -1 : 1;
					App.Modules.UI.changeContentIndex(shift);
					console.log(App.Modules.UI.Content.index());
					return false;
				});
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
				var $li = $ul.append("<li><a></a></li>").find("li").last();
				
				if(this.modulesMenu[ind].selected == true) $li.addClass("selected");
							
				$li.bind('click', function(){
					var link = $(this).find('a').attr('data-link');
					
					for (ind in App.Modules.UI.modulesMenu)
					{
						if (App.Modules.UI.modulesMenu[ind].link == link)
						{
							App.Modules.UI.modulesMenu[ind].selected = true;
						}else
						{
							App.Modules.UI.modulesMenu[ind].selected = false;
						}
					}
					  
					App.Modules.UI.displayTopMenu();
					App.Modules.UI.displayLeftMenu();
				});
				
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
				{
					displayMMItems($nav, this.modulesMenu[ind].structure);
					break;
				}
			}	
		},
		displayContent: function(){
			var url = App.URL.templateFolder 
					+ this.Content.type + "/" 
					+ this.Content.view + ".html";
			
			loadContent(App.ID.contentHolder, url, App.ID.contentResource, function(){
					App.Libs.KO.cleanNode(document.getElementById(App.ID.contentHolder));
					App.Libs.KO.applyBindings(App.Modules.UI.Content, document.getElementById(App.ID.contentHolder));
					
			});
		}
		
	}
});

