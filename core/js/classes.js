define(function(){
	return {
		ModuleItem: function(title, link, selected){
			this.title = title;
			this.link = link;
			this.selected = selected;
			this.structure = [];
			
			this.addMMItem = function(mmItem){
				this.structure.push(mmItem);
			}
		},
		ModuleMenuItem: function(title, link, selected, id){
			if (link === "undefined") link = "#";
			
			this.title = title;
			this.link = link;
            this.id = id;
			this.selected = selected;
			this.children = [];
			
			this.addMMItem = function(mmItem){
				this.children.push(mmItem);
			}
		}
	}
});