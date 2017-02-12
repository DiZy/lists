list = (function() {
	var _listJson;

	function removeExisting() {
		$('.item').remove();
	}

	function addListItems() {
		var listItems;
		getListItems(function(output){
			listItems = output;
		});

		console.log(listItems);
		for(var i =0; i < listItems.length; i++) {
			var item = new item();
			item.initialize(JSON.parse(listItems[i]));
		}
	}

	function getListItems(handler) {
		$.ajax({
		            type: "POST",
		            url: '/getListItems',
		            async: false,
		            data: {
		            	'listId':_listJson._id
	        		},
		            success: function(data){
		                 handler(JSON.parse(data));
		            },
		            error: function(data){
		            	alert('internal server error');
		            }
		});
	}

	return {
		initialize: function(listJson) {
			_listJson = listJson;
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