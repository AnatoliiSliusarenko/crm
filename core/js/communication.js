define(function(){
	return {
		socket: {},
		initConnection: function(){
			this.socket = App.Libs.IO.connect('http://' + App.Server.ip + ':' + App.Server.port);
			this.socket.on('connect', function(){
				console.log('Server connected...');
			});
		},
		login: function(login, password){
			
			this.socket.emit('login', {"ulogin": login, "upass": password});
			this.socket.on('responseLogin', function(response){
		
				switch(response.Result.Status)
				{
					case "0": 
					{
						App.Modules.UI.showMainPage();
						break;
					}
					case "3": 
					{
						App.Modules.UI.showLoginAnswer("Incorrect login or password");
						break;
					}
					
				}
			});
		},
		checkHash: function(){
			var hash = App.Modules.LocalStorage.getFromLocalStorage("hash");
			
			if (hash == false)
			{
				App.Modules.UI.showLoginPage();
				return;
			}
			
			this.socket.emit('checkHash', {"hash": hash});
			this.socket.on('checkHash', function(response){
            	switch(response.result)
            	{
            		case "0":
            		{
            			App.Modules.UI.showMainPage();
            			break;
            		}
            		case "2":
            		{
            			App.Modules.UI.showLoginPage();
            			break;
            		}
            	}
            });
		}
	}
});