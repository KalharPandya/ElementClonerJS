class elementCloner {
	constructor(id) {
		this.id = id;
		this.index = 0; 
		this.element = document.getElementById(id);
		this.values = {};
		this.findAll();
	}
	hideSample(){
		this.element.style.display = "none";
	}
	findAll() {
		this.nodeDFS(this.element);
	}
	setValue(key, value){
		if(this.values[key])
		this.values[key].innerHTML = value;
	}
	generateId(){
		return this.id+"-copy-"+this.index++; 
	}
	nodeDFS(node) {
		if(!node || !node.getAttribute)
			return;
		let name = node.getAttribute("nameAs");
		if(name){
			this.values[name] = node;
		}
		if(!node.hasChildNodes()) {
			return;
		}
		for(let i in node.childNodes){
			this.nodeDFS(node.childNodes[i]);
		}
	}

	getCopy(){
		this.copy = this.element.cloneNode(true);
		this.copy.style.display = "block";
		this.copyId = this.generateId();
		this.copy.setAttribute("id",this.copyId);
		return new elementCloner(this.copyId);
	}

	addCopy(parent){
		if(!parent){
			if(this.element.parentNode){
				parent = this.element.parentNode;
			}
		}
		this.getCopy();
		parent.appendChild(this.copy);
		return new elementCloner(this.copyId);
	}
}