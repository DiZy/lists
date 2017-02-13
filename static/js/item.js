var item = function() {
	var _itemJson;

	function render() {
		var div = $('<div>').addClass('item').appendTo('#items');
		var text = $('<div>').addClass('col-xs-11').text(_itemJson.text).appendTo(div);
		var removeButton = $('<div>').addClass('col-xs-1 remove-item').text('X').appendTo(div);

		removeButton.click(function() {
			remove(div);
		});

	}

	function remove(thisItem) {
		var itemId = _itemJson._id;
		var removed = false;
		$.ajax({
		            type: "POST",
		            url: '/removeItem',
		            async: false,
		            data: {
		            	'itemId':itemId
	        		},
		            success: function(data){
		                 removed = true;
		            }
		});
		if(removed){
			thisItem.remove();	
		}
		else {
			alert('Item remove error');
		}
		

	}

	return {
		initialize: function(itemJson) {
			_itemJson = itemJson;
			render();
		}
	}
}