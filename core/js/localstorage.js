define(function(){
	return {
		getFromLocalStorage: function(key){
			if (window.localStorage === "undefined" || window.localStorage.getItem(key) == null)
			{
				return false;
			}else
			{
				return window.localStorage.getItem(key);
			}
		},
		setToLocalStorage: function(key, value){
			if (window.localStorage === "undefined")
			{
				return false;
			}else
			{
				window.localStorage.setItem(key, value);
				return true;
			}
		}
	}
});