list = (function() {
	var _boardId;

	function removeExisting() {
		$('.item').remove();
	}

	function addListItems() {
		// var listItems = getListItems();
		// console.log(listItems);
		// for(var itemJson : listItems) {
		// 	var item = new item();
		// 	item.initialize(itemJson);
		// }
	}

	function getListItems() {
		//create request
	}

	return {
		initialize: function(boardId) {
			console.log(boardId);
			_boardId = boardId;
			removeExisting();
			addListItems();

		},
		addNewItem: function(text) {
			if(!_boardId){
				console.log('no board loaded');
				return;
			}
			console.log("adding: " + text);

		}
	}
})();