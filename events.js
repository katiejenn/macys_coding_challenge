$(function(){

	grabEvents();
	//lightboxTrigger();

});

function grabEvents(index){

	/* request from API endpoint to grab events */
	$.ajax({
	            type: "GET",
	            url: "http://d345h07ts0fu2m.cloudfront.net/379/data48.json",
	            jsonpCallback: 'cmsCallback',
	            dataType: "jsonp",
	            success: function(res){
	            	// console.log(res)
	            	// console.log(res.categories.EnglishEvents2015.entries);
	            	var englishEvents = res.categories.EnglishEvents2015.entries;
					if(typeof index === 'number'){
						// console.log(index);
						var currentEvent = englishEvents[index],
						day = currentEvent.day,
						month = currentEvent.month,
						time = currentEvent.time,
						street = currentEvent.street,
						city = currentEvent.city,
						state = currentEvent.state,
						floor = currentEvent.floor,
						description = currentEvent.desc,
						rsvpUrl = currentEvent.rsvp;

						/* if the lightbox already exists, we change the contents and visibility */
						if($('div.lightbox').length > 0){
							var content =
							"<b>Date: </b>" + day + ", " + month + "<br>" + 
							"<b>Time: </b>" + time + "<br>" + 
							"<b>Address: </b>" + street + "<br>" + 
							"<b>Floor: </b>" + floor + "<br>" + 
							"<b>City: </b>" + city + "<br>" + 
							"<br><b>Description: </b>" + description + "<br>";
							if(rsvpUrl !== "N/A"){
								console.log(rsvpUrl);
								content = content + "<br><b>Rsvp <a href=" + rsvpUrl + ">Here</a></b>";
							}

							$('div.content').html(content);
							$('div.lightbox').show();

						}
						/* if the lightbox does not exist yet, we append it to the page */
						else{
							var lightbox = 
							"<div class='lightbox'>" + 
							"<br>" +
							"<a href='#' class='lightbox-close-trigger'>X click to close</a>" + 
							"<div class='content'>" + 
							"<b>Date: </b>" + day + ", " + month + "<br>" + 
							"<b>Time: </b>" + time + "<br>" + 
							"<b>Address: </b>" + street + "<br>" + 
							"<b>Floor: </b>" + floor + "<br>" + 
							"<b>City: </b>" + city + "<br>" + 
							"<br><b>Description: </b>" + description + "<br>";
							if(rsvpUrl !== "N/A"){
								console.log(rsvpUrl);
								lightbox = lightbox + "<br><b>RSVP <a href=" + rsvpUrl + ">Here</a></b></div></div>";
							} 
							else{
								lightbox = lightbox + '</div></div>';
							}

							$('div#wrapper').append(lightbox);
						}
					}
					else{
	            		renderEvents(englishEvents);
					}
	            }
	        });
}

/* helper function for rendering events */
function renderEvents(events){
	for(var i=0; i<events.length; i++){
		var currentEvent = events[i];
		var currentDiv = 'div.events-inner';
		$(currentDiv).append('<b>Date: </b>', currentEvent.day + ', ' + currentEvent.month + '<br>');
		$(currentDiv).append('<b>Time: </b>', currentEvent.time + '<br>');
		$(currentDiv).append('<b>Address: </b><br>');
		$(currentDiv).append(currentEvent.street + '<br>')
		$(currentDiv).append(currentEvent.city + ', ' + currentEvent.state + '<br>');
		$(currentDiv).append('<a href="#" data-_id="' + i + '" onclick="lightboxTrigger(this)" class="details">See More Details</a><br><br>');
	}

}

/* event handlers for the lightbox */
function lightboxTrigger(current){
	var id = $(current).data()._id;
	grabEvents(id);


	/* event handler for the link to close the lightbox */
	$('body').on('click', 'a.lightbox-close-trigger', function(e){
		$('div.lightbox').hide();
	})
}

