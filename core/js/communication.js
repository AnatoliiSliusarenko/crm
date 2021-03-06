define(function(){
	return {
		socket: {},
		initConnection: function(){
			this.socket = App.Libs.IO.connect('http://'.concat(App.Server.ip,':',App.Server.port));
			this.socket.on('connect', function(){
				console.log('Server connected...');
			});
			
			this.socket.on('disconnect', function(){
				console.log('Server disconnected...');
			});
			
			this.socket.on('responseLogin', function(response){
				switch(response.result.status)
				{
					case "0":
					{
						console.log('responseLogin: ' + response.result.description);
						App.Modules.LocalStorage.saveToLocalStorage("hash", response.hash);
						App.Modules.LocalStorage.saveToLocalStorage("_id", response.data._id);
						App.Modules.UI.initUser(response.data._id, response.data.uname);
						App.Modules.UI.initMainPage();
						break;
					}
					default:
					{
						console.log(response.result.description);
						App.Modules.UI.showLoginAnswer("Incorrect login or password");
						break;
					}
					
				}
			});
			
			this.socket.on('responseCheckHash', function(response){
            	switch(response.result.status)
            	{
            		case "0":
            		{
            			console.log('checkHash OK');
            			App.Modules.UI.initUser(response.data._id, response.data.uname);
            			App.Modules.UI.initMainPage();
            			break;
            		}
            		default:
            		{
            			console.log('checkHash BAD');
            			App.Modules.UI.initLoginPage();
            			break;
            		}
            	}
            });
			
			this.socket.on('responseCreateUser', function(response){
				console.log('responseCreateUser ANSWER')
            });
			this.socket.on('responseGetAccountsForUsers',function(response){
				console.log('responseGetAccountsForUser OK');
				console.log(response.data);
				App.Modules.UI.initTempData(response.data);
                App.Modules.UI.displayContent();
			});
			this.socket.on('responseGetModules', function(response){
				response = $.parseJSON(response);
				switch(response.result.status)
            	{
            		case "0":
            		{
            			console.log('responseGetModules OK');
            			
            			App.Modules.UI.initModulesMenu(response.data);
            			App.Modules.UI.displayTopMenu();
            			App.Modules.UI.displayLeftMenu();
            			break;
            		}
            		default:
            		{
            			console.log('responseGetModules BAD');
            			
            			App.Modules.UI.initLoginPage();
            			break;
            		}
            	}		
			});


            this.socket.on('responseGetProjects', function(response){
                switch(response.result.status)
                {
                    case "0":
                    {
                        console.log('responseGetProjects OK');
                        App.Modules.UI.initTempData(response.data);
                        App.Modules.UI.displayContent();
                        break;
                    }
                    case "4":
                        console.log(response.result.description);
                        App.Modules.UI.initLoginPage();
                        break;
                    default:
                    {
                        console.log('responseGetList BAD');
                        break;
                    }
                }
            });

            this.socket.on('responseGetTasks', function(response){
                switch(response.result.status)
                {
                    case "0":
                    {
                        console.log('responseGetTasks OK');
                        App.Modules.UI.initTempData(response.data);
                        App.Modules.UI.displayContent();
                        break;
                    }
                    case "4":
                        console.log(response.result.description);
                        App.Modules.UI.initLoginPage();
                        break;
                    default:
                    {
                        console.log('responseGetList BAD');
                        break;
                    }
                }
            });

            this.socket.on('responseCreate', function(response){
                switch(response.result.status)
                {
                    case "0":
                    {
                        console.log('responseGetList OK');
                        App.Modules.UI.initContentData(response.data);
                        //console.log(App.Modules.UI.Content.data.peek());
                        //App.Modules.UI.initContentType('...');
                        //App.Modules.UI.initContentView('...');
                        App.Modules.UI.displayContent();
                        break;
                    }
                    case "4":
                        console.log(response.result.description);
                        App.Modules.UI.initLoginPage();
                        break;
                    default:
                    {
                        console.log('responseCreate' + response.result.description);

                        break;
                    }
                }
            });

            this.socket.on('responseGetUsersForDd', function(response){
                switch(response.result.status)
                {
                    case "0":
                    {
                        console.log('usersForDD loaded');
                        if(response.data.length> 0){
                            App.Modules.UI.initCreateFormData(response.data);
                            App.Libs.KO.cleanNode(document.getElementById("projectManagerDD"));
                            App.Libs.KO.applyBindings(App.Modules.UI.CreateFormData, document.getElementById("projectManagerDD"));
                        }

                        break;
                    }
                    case "4":
                        console.log(response.result.description);
                        App.Modules.UI.initLoginPage();
                        break;
                    default:
                    {
                        console.log('responseCreate' + response.result.description);

                        break;
                    }
                }
            });

            this.socket.on('responseGetProjectsForDd', function(response){
                switch(response.result.status)
                {
                    case "0":
                    {
                        console.log('usersForDD loaded');
                        if(response.data.length> 0){
                            App.Modules.UI.initCreateFormData(response.data);
                            App.Libs.KO.cleanNode($(App.ID.managerSelect)[0]);
                            App.Libs.KO.applyBindings(App.Modules.UI.CreateFormData, $(App.ID.managerSelect)[0]);
                        }
                        break;
                    }
                    case "4":
                        console.log(response.result.description);
                        App.Modules.UI.initLoginPage();
                        break;
                    default:
                    {
                        console.log('responseCreate' + response.result.description);

                        break;
                    }
                }
            });
		},

        getProjects: function(){
            console.log('GET PROJECTS');
            var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
                _id = App.Modules.LocalStorage.getFromLocalStorage("_id");
            if ((!hash) || (!_id))
            {
                App.Modules.UI.initLoginPage();
                return;
            }
            this.socket.emit('getProjects', {"hash": hash, "uid": _id, 'mid':39});
        },
        getProjectsForDd:function(){
            console.log('GET PROJECTSFORDD');
            var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
                _id = App.Modules.LocalStorage.getFromLocalStorage("_id");
            if ((!hash) || (!_id))
            {
                App.Modules.UI.initLoginPage();
                return;
            }
            this.socket.emit('getProjects', {"hash": hash, "uid": _id, 'mid':39});
        },

        getTasks: function(){
            console.log('GET TASKS');
            var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
                _id = App.Modules.LocalStorage.getFromLocalStorage("_id");

            if ((!hash) || (!_id))
            {
                App.Modules.UI.initLoginPage();
                return;
            }

            this.socket.emit('getTasks', {"hash": hash, "uid": _id, 'mid':39});
        },

        //get users for drop down list [{uname:'user1',_id:'25252'}]
        getUsersForDd: function(){
            console.log('GETUSERSFORDD');
            var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
                _id = App.Modules.LocalStorage.getFromLocalStorage("_id");

            if ((!hash) || (!_id))
            {
                App.Modules.UI.initLoginPage();
                return;
            }
            this.socket.emit('getUsersForDd', {"hash": hash, "uid": _id, 'mid':39});
        },
        getAccountsForUsers: function(){
            console.log('GETAccountsForUsers');
            var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
            _id = App.Modules.LocalStorage.getFromLocalStorage("_id");
            if ((!hash) || (!_id))
            {
                App.Modules.UI.initLoginPage();
                return;
            }
            this.socket.emit('getAccountsForUsers', {"hash": hash, "uid": _id, 'mid':39});
        },
        login: function(login, password){
            this.socket.emit('login', {"ulogin": login, "upass": password});
        },
		checkHash: function(){	
			var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
				_id = App.Modules.LocalStorage.getFromLocalStorage("_id");
			
			if ((hash == false) || (_id == false)) 
			{
				App.Modules.UI.initLoginPage();
				return;
			}
			this.socket.emit('checkHash', {"hash": hash, "uid": _id});
		},
		createUser: function(data){
			/*var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
				_id = App.Modules.LocalStorage.getFromLocalStorage("_id");
		
			if ((hash == false) || (_id == false)) 
			{
				App.Modules.UI.initLoginPage();
				return;
			}
			*/
			var data = {};
            data['ulogin'] = 'olya';
            data['upass'] = '12345';
            data['uemail'] = 'olya@dghhfg.com';
            data['uname'] = 'Olya Ivanova';
            data['ucompanyid'] = '123';
            data['uactive'] = '0';
            data['ulang'] = 'English';
            data['utimezone'] = 'UTC';
            
            this.socket.emit('createUser', data);
		},
        createProject: function(formData){
            var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
                _id = App.Modules.LocalStorage.getFromLocalStorage("_id");
            if ((hash == false) || (_id == false))
            {
                App.Modules.UI.initLoginPage();
                return;
            }
            var data = {};
            data.hash = hash;
            data._id = _id;
            data.mid = 40;
            data.datatype = "project";
            data.content = formData;
            this.socket.emit('createProject',data);
        },

		getModules: function(){
			var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
				_id = App.Modules.LocalStorage.getFromLocalStorage("_id");
		
			if ((hash == false) || (_id == false)) 
			{
				App.Modules.UI.initLoginPage();
				return;
			}
			
			this.socket.emit('getModules', {"hash": hash, "uid": _id});
		}
	}
});