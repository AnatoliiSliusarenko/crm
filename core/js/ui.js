define(function(){
	function loadContent(destID, resURL, resID, callback){
		$("#" + destID).empty();
		$("#" + destID).load(resURL + " #" + resID, callback);
	}

    function createGanttChart(projectArray){
        var ganttChartControl = new GanttChart();
        //chart settings
        ganttChartControl.setImagePath("/crm/crm/core/imgs/");
        ganttChartControl.setEditable(true);
        ganttChartControl.showTreePanel(true);
        ganttChartControl.showContextMenu(true);
        ganttChartControl.showDescTask(true,'d,s-f');
        ganttChartControl.showDescProject(true,'n,d');

        projectArray.forEach(function(project){
            if(project.task.tasks.length > 0){
                //get the 'Date' portion of a Date object(without time)
                var startDate = new Date(project.info.StartDate).toDateString();
                var newProject = new GanttProjectInfo(project._id, project.projectname, startDate);
                project.task.tasks.forEach(function(task){

                    var parentTask = new GanttTaskInfo(task._id, task.description, new Date(task.StartDate).toDateString(), hourCount, percentCompleted, predecessorTaskID);//Predecessor and this task will be joined by dependency line in the Gantt Chart.
                    newProject.addTask(parentTask);
                    ganttChartControl.addProject(newProject);
                });
            }
        });

        return ganttChartControl;
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
			   .on('click', function(event){
				   var link = $(event.target).attr('data-link');
				   App.Modules.Communication.getList(link.toLowerCase());
				   return false;
			   });
			
			if(childItems[ind].children != [])
				displayMMItems($li, childItems[ind].children);
			
			$ul.append($li);
		}
	}
	return {
		User: {
			uid: null,
			uname: null,
			uimage: "data:image/png;base64,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"
		},
		initUser: function(uid, uname){
			this.User.uid = uid;
			this.User.uname = uname;
		},
		modulesMenu: [],
		Content: {
			data: [],
			type: "users",
			view: "list",
			index: null,
			curElement: null
		},
		initContentData: function(data){
			this.Content.index = App.Libs.KO.observable(0);
			this.Content.data = App.Libs.KO.observableArray(data);
			this.Content.curElement = App.Libs.KO.computed(function(){
				return this.data.peek()[this.index()];
			}, this.Content);
			this.displayViewPanel();
		},
		initContentType: function(type){
            this.Content.type = type;
        },
        initContentView: function(view){
            this.Content.view = view;
        },
		changeContentIndex: function(shift){
			var newIndex = this.Content.index() + shift;
			if (newIndex < 0) {
				newIndex = 0;
			}else
			if (newIndex >= this.Content.data.peek().length) {
				newIndex = this.Content.data.peek().length - 1;
			}
			
			this.Content.index(newIndex);
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
				App.Modules.UI.displayUserPanel();
				App.Modules.UI.initContentData([]);

				//attach event handlers on view change buttons
                $("a." + App.ID.changeCVClass).click(function(){
					var viewType = $(this).attr('data-view-type');
					
					App.Modules.UI.initContentView(viewType);
					App.Modules.UI.displayContent();
					App.Modules.UI.displayViewPanel();
					
					return false;
				});
				
				$("a." + App.ID.changeCIClass).click(function(){
					var  shift = $(this).attr('data-shift') == "left" ? -1 : 1;
					App.Modules.UI.changeContentIndex(shift);
					App.Modules.UI.displayViewPanel();
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
				if(App.Modules.UI.Content.view == "gantt"){
                    var projectArray = App.Modules.UI.Content.data.peek();

                    if(!projectArray || projectArray.length == 0  ){
                        return;
                    }
                    var ganttChart = createGanttChart(projectArray);


                    ganttChart.create(App.ID.ganttViewHolder);

                   /* var project1 = new GanttProjectInfo(1, "Applet redesign", new Date(2010, 5, 11));
                    var parentTask1 = new GanttTaskInfo(1, "Old code review", new Date(2010, 5, 11), 208, 50, "");
                    parentTask1.addChildTask(new GanttTaskInfo(2, "Convert to J#", new Date(2010, 5, 11), 100, 40, ""));
                    parentTask1.addChildTask(new GanttTaskInfo(13, "Add new functions", new Date(2010, 5, 12), 80, 90, ""));
                    var parentTask2 = new GanttTaskInfo(3, "Hosted Control", new Date(2010, 6, 7), 190, 80, "1");
                    var parentTask5 = new GanttTaskInfo(5, "J# interfaces", new Date(2010, 6, 14), 60, 70, "6");
                    var parentTask123 = new GanttTaskInfo(123, "use GUIDs", new Date(2010, 6, 14), 60, 70, "");
                    parentTask5.addChildTask(parentTask123);
                    parentTask2.addChildTask(parentTask5);
                    parentTask2.addChildTask(new GanttTaskInfo(6, "Task D", new Date(2010, 6, 10), 30, 80, "14"));
                    var parentTask4 = new GanttTaskInfo(7, "Unit testing", new Date(2010, 6, 15), 118, 80, "6");
                    var parentTask8 = new GanttTaskInfo(8, "core (com)", new Date(2010, 6, 15), 100, 10, "");
                    parentTask8.addChildTask(new GanttTaskInfo(55555, "validate uids", new Date(2010, 6, 20), 60, 10, ""));
                    parentTask4.addChildTask(parentTask8);
                    parentTask4.addChildTask(new GanttTaskInfo(9, "Stress test", new Date(2010, 6, 15), 80, 50, ""));
                    parentTask4.addChildTask(new GanttTaskInfo(10, "User interfaces", new Date(2010, 6, 16), 80, 10, ""));
                    parentTask2.addChildTask(parentTask4);
                    parentTask2.addChildTask(new GanttTaskInfo(11, "Testing, QA", new Date(2010, 6, 21), 60, 100, "6"));
                    parentTask2.addChildTask(new GanttTaskInfo(12, "Task B (Jim)", new Date(2010, 6, 8), 110, 1, "14"));
                    parentTask2.addChildTask(new GanttTaskInfo(14, "Task A", new Date(2010, 6, 7), 8, 10, ""));
                    parentTask2.addChildTask(new GanttTaskInfo(15, "Task C", new Date(2010, 6, 9), 110, 90, "14"));
                    project1.addTask(parentTask1);
                    project1.addTask(parentTask2);
                    //project 2

                    // Create Gantt control
                    var ganttChartControl = new GanttChart();
                    // Setup paths and behavior
                    ganttChartControl.setImagePath("/crm/crm/core/imgs/");
                    ganttChartControl.setEditable(true);
                    ganttChartControl.showTreePanel(true);
                    ganttChartControl.showContextMenu(true);
                    ganttChartControl.showDescTask(true,'d,s-f');
                    ganttChartControl.showDescProject(true,'n,d');
                    // Load data structure
                    ganttChartControl.addProject(project1);
                    // Build control on the page
                    var divId = App.ID.ganttViewHolder;
                    ganttChartControl.create(divId);*/
                } else{
                    App.Libs.KO.cleanNode(document.getElementById(App.ID.contentHolder));
                    App.Libs.KO.applyBindings(App.Modules.UI.Content, document.getElementById(App.ID.contentHolder));
                }
			});
		},
		displayUserPanel: function(){
			$("#" + App.ID.userPanel + " #userName").text(this.User.uname);
			$("#" + App.ID.userPanel + " img").attr("src", this.User.uimage);
		},
		displayViewPanel: function(){
			if (this.Content.view != "form")
			{
				$("#" + App.ID.rightBtn).css("display", "none");
				$("#" + App.ID.leftBtn).css("display", "none");
			}else
			{
				if (this.Content.index() == 0)
				{
					$("#" + App.ID.rightBtn).css("display", "block");
					$("#" + App.ID.leftBtn).css("display", "none");
				}else
				if (this.Content.index() == this.Content.data.peek().length - 1)
				{
					$("#" + App.ID.rightBtn).css("display", "none");
					$("#" + App.ID.leftBtn).css("display", "block");
				}else
				{
					$("#" + App.ID.rightBtn).css("display", "block");
					$("#" + App.ID.leftBtn).css("display", "block");
				}
			}
		}
		
	}
});

