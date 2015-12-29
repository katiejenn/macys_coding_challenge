$(function(){
	grabEvents();
	
	$('body').on('click', 'a.lightbox-trigger', function(e){
		alert('triggered the lightbox!');
	})
});

function grabEvents(){

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
}

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
		$(currentDiv).append('<a href="#" class="lightbox-trigger">See More Details</a><br>');
		$(currentDiv).append('<br>');
	}

}

function lightboxTrigger(){
	/* if the buttton is clicked, the lightbox appears */
	$('.lightbox-trigger').on('click', function(e){
		e.preventDefault();

		/* if the lightbox already exists, we change the contents and visibility */
		if($('div.lightbox').length > 0){
			$('div.content').html('NEW lightbox content');
			$('div.lightbox').show();
		}
		/* if the lightbox does not exist yet, we append it to the page */
		else{
			var lightbox = 
			"<div class='lightbox'>" + 
				"<br>" +
				"<a href='#' class='lightbox-trigger'>X click to close</a>" + 
				"<div class='content'>" +
					"<br><br>" + 
					"woohoo! it is a lightbox!" + 
				"</div>" +
			"</div>";

			$('div#wrapper').append(lightbox);
		}

	})

	/* event handler for the link to close the lightbox */
	$('body').on('click', 'a.lightbox-trigger', function(e){
		$('div.lightbox').hide();
	})
}

