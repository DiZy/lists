item = function() {
	var _itemJson;

	function render() {

	}

	function remove(this) {
		//make remove request
		var itemId = _itemJson.get('_id');
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
			this.remove();	
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