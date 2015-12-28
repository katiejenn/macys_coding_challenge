$(function(){

	$('span.events').append('test')
	/* request from API endpoint to grab events */
	$.ajax({
	            type: "GET",
	            url: "http://d345h07ts0fu2m.cloudfront.net/379/data48.json",
	            jsonpCallback: 'cmsCallback',
	            dataType: "jsonp",
	            success: function(res){
	            	console.log(res)
	            	console.log(res.categories.EnglishEvents2015.entries);
	            	englishEvents = res.categories.EnglishEvents2015.entries;

	            	renderEvents(englishEvents);
	            }
	        });


	/* helper function for rendering events */
	function renderEvents(events){
		for(var i=0; i<events.length; i++){
			var currentEvent = events[i];
			var currentDiv = 'div.events';
			$(currentDiv).append('Date: ', currentEvent.day + ',' + currentEvent.month + '<br>');
			$(currentDiv).append('Time: ', currentEvent.time + '<br>');
			$(currentDiv).append('Address: <br>');
			$(currentDiv).append(currentEvent.street + '<br>')
			$(currentDiv).append(currentEvent.city + ',' + currentEvent.state + '<br>');
			$(currentDiv).append('<a href="#">See More Details</a><br>');
			$(currentDiv).append('<br>');
		}

	}

});