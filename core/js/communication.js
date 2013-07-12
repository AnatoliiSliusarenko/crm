define(function(){
	return {
		socket: {},
		initConnection: function(){
			this.socket = App.Libs.IO.connect('http://' + App.Server.ip + ':' + App.Server.port);
			this.socket.on('connect', function(){
				console.log('Connected to server...');
				
			});
		},
		login: function(login, password){
			this.socket.emit('login', {"ulogin": login, "upass": password});
			this.socket.on('responseLogin', function(response){
				//debugger
				console.log('login');
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
            		}
            		case "2":
            		{
            			App.Modules.UI.showLoginPage();
            		}
            	}
            });
		}
	}
});