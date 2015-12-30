$(function(){

	grabEvents();

});

function grabEvents(index){

	/* request from API endpoint to grab events */
	$.ajax({
	            type: "GET",
	            url: "http://d345h07ts0fu2m.cloudfront.net/379/data48.json",
	            jsonpCallback: 'cmsCallback',
	            dataType: "jsonp",
	            success: function(res){
	            	var englishEvents = res.categories.EnglishEvents2015.entries,
	            	previous,
	            	next;

	            	/* if the index type is a number, we are only looking for information from one specific event */
					if(typeof index === 'number'){
						console.log("index:", index);

						/* if index is currently 0, previous will be undefined. Otherwise, it will contain the index of the previous event */
						if(index !== 0){
							previous = index - 1;
							console.log("previous:", previous);
						}
						/* if the index is the last element, next will be undefined. Otherwise, it will contain the index of the next event */
						if(index !== englishEvents.length-1){
							next = index + 1;
							console.log("next:",next);
						}

						/* grabbing all the event info for the lightbox view */
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
								content = content + "<br><b>Rsvp <a target='_blank' href=" + rsvpUrl + ">Here</a></b>";
							}

							if(previous === 0 || previous){
								content = content + "<div data-_id='" + previous + "' class='previous navigate' onclick='lightboxTrigger(this)'>Previous</div>";
							}
							
							if(next){
								content = content + "<div data-_id='" + next + "' class='next navigate' onclick='lightboxTrigger(this)'>Next</div>";
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
								lightbox = lightbox + "<br><b>RSVP <a target='_blank' href=" + rsvpUrl + ">Here</a></b>";
							} 
							

							if(previous === 0 || previous){
								lightbox = lightbox + "<div data-_id='" + previous + "' class='previous navigate' onclick='lightboxTrigger(this)'>Previous</div>";
							}
							
							if(next){
								lightbox = lightbox + "<div data-_id='" + next + "' class='next navigate' onclick='lightboxTrigger(this)'>Next</div>";
							}



							lightbox = lightbox + '</div></div>';
							$('div#wrapper').append(lightbox);
						}
					}
					/* if index is undefined, we are grabbing all the events to render onto the main page */
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
		$(currentDiv).append('<span data-_id="' + i + '" onclick="lightboxTrigger(this)" class="details">See More Details</span><br><br>');
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

function addNavigation(previous, next, content){

	if(previous){
		content = content + "<div class='navigate'><span data-_id='" + previous + "' class='previous navigate'>Previous</span>";
	}
	
	if(next){
		content = content + "<span data-_id='" + next + "' class='next navigate'>Next<span></div>";
	}							

	return content;
}



