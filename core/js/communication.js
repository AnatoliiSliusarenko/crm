define(function(){
	return {
		socket: {},
		initConnection: function(){
			this.socket = App.Libs.IO.connect('http://' + App.Server.ip + ':' + App.Server.port);
			this.socket.on('connect', function(){
				console.log('Server connected...');
			});
			this.socket.on('disconnect', function(){
				console.log('Server disconnected...');
			});
		},
		login: function(login, password){
			this.socket.emit('login', {"ulogin": login, "upass": password});
			this.socket.on('responseLogin', function(response){
				switch(response.result.status)
				{
					case "0": 
					{
						console.log('responseLogin OK');
						App.Modules.LocalStorage.saveToLocalStorage("hash", response.data.hash);
						App.Modules.LocalStorage.saveToLocalStorage("uid", response.data.uid);
						
						App.Modules.UI.initMainPage();
						break;
					}
					default: 
					{
						console.log('responseLogin BAD');
						
						App.Modules.UI.showLoginAnswer("Incorrect login or password");
						break;
					}
					
				}
			});
		},
		checkHash: function(){	
			var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
				uid = App.Modules.LocalStorage.getFromLocalStorage("uid");
			
			if ((hash == false) || (uid == false)) 
			{
				App.Modules.UI.initLoginPage();
				return;
			}
		
			this.socket.emit('checkHash', {"hash": hash, "uid": uid});
			this.socket.on('responseCheckHash', function(response){
            	switch(response.result.status)
            	{
            		case "0":
            		{
            			console.log('checkHash OK');
            			
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
		},
		createUser: function(data){
			var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
				uid = App.Modules.LocalStorage.getFromLocalStorage("uid");
		
			if ((hash == false) || (uid == false)) 
			{
				App.Modules.UI.initLoginPage();
				return;
			}
			/*var data = {};
            data['ulogin'] = 'vika';
            data['upass'] = '12345';
            data['uemail'] = 'vika@dghhfg.com';
            data['uname'] = 'Gogo Gogi';
            data['ucompanyid'] = '123';
            data['uactive'] = '0';
            data['ulang'] = 'English';
            data['utimezone'] = 'UTC';*/
            
            
            this.socket.emit('createUser', data);
            this.socket.on('responseCreateUser', function(response){
            	debugger
            	console.log('responseCreateUser ANSWER')
            });
		},
		getModules: function(){
			var hash = App.Modules.LocalStorage.getFromLocalStorage("hash"),
				uid = App.Modules.LocalStorage.getFromLocalStorage("uid");
		
			if ((hash == false) || (uid == false)) 
			{
				App.Modules.UI.initLoginPage();
				return;
			}
			
			this.socket.emit('getModules', {"hash": hash, "uid": uid});
			this.socket.on('responseGetModules', function(response){
				debugger
			});
		}
	}
});