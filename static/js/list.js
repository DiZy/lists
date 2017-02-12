list = (function(item) {
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
			var curItem = item();
			curItem.initialize(JSON.parse(listItems[i]));
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
		            	if(data['status'] == 'error'){
		            		console.log('error occurred');
		            		console.log(data['error']);
		            	}else{
		                 handler(JSON.parse(data));
		             	}
		            },
		            error: function(data){
		            	alert('internal server error');
		            }
		});
	}

	return {
		initialize: function(listJson) {
			_listJson = listJson;
			console.log(_listJson._id);
			removeExisting();
			addListItems();

		},
		addNewItem: function(text) {
			if(!_listJson){
				console.log('no board loaded');
				return;
			}
			$.ajax({
			            type: "POST",
			            url: '/addItem',
			            data: {
			            	'listId':_listJson._id,
			            	'listName':_listJson.text,
			            	'itemText':text
		        		},
			            success: function(data){
			            	if(data['status'] == 'error'){
			            		console.log('error occurred');
			            		console.log(data['error']);
			            	}else{
			            		console.log("success")
			            		removeExisting();
			            		addListItems();
			            	}
			                
			            },
			            error: function(data){
			            	alert('internal server error');
			            }
			});

		}
	}
})(item);