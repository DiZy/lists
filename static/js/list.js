list = (function() {
	var _boardId;

	function removeExisting() {
		$('.item').remove();
	}

	function addListItems() {
		var listItems = getListItems();
		for(var itemJson : listItems) {
			var item = new item();
			item.initialize(itemJson);
		}
	}

	function getListItems() {
		//create request
	}

	return {
		initialize: function(boardId) {
			_boardId = boardId;
			removeExisting();
			addListItems();

		}
	}
})();