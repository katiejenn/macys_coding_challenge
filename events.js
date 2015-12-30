var language = "english";

$(function(){

	grabEvents();
	languageSelected();

});

function grabEvents(index){

	/* request from API endpoint to grab events */
	$.ajax({
	            type: "GET",
	            url: "http://d345h07ts0fu2m.cloudfront.net/379/data48.json",
	            jsonpCallback: 'cmsCallback',
	            dataType: "jsonp",
	            success: function(res){
	            	var events,
	            	previous,
	            	next;

	            	/* the events grabbed from the API endpoint are based off the language chosen. We grab 2014 events for the Spanish option because 2015 is empty in the database (mock data). */
	            	if(language === "english"){
	            		events = res.categories.EnglishEvents2015.entries;
	            	}
	            	else{
	            		events = res.categories.SpanishEvents2014.entries;
	            	}

	            	/* if the index type is a number, we are only looking for information from one specific event */
					if(typeof index === 'number'){
						console.log("index:", index);

						/* if index is currently 0, previous will be undefined. Otherwise, it will contain the index of the previous event */
						if(index !== 0){
							previous = index - 1;
							console.log("previous:", previous);
						}
						/* if the index is the last element, next will be undefined. Otherwise, it will contain the index of the next event */
						if(index !== events.length-1){
							next = index + 1;
							console.log("next:",next);
						}

						/* grabbing all the event info for the lightbox view */
						var currentEvent = events[index],
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

							/* We render English on the page if the language selected was English */
							if(language === "english"){

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

							/* We render Spanish on the page if the language selected was Spanish */
							}else{

								var content =
								"<b>Fecha: </b>" + day + ", " + month + "<br>" + 
								"<b>Hora: </b>" + time + "<br>" + 
								"<b>Direccion: </b>" + street + "<br>" + 
								"<b>Piso: </b>" + floor + "<br>" + 
								"<b>Ciudad: </b>" + city + "<br>" + 
								"<br><b>Descripcion: </b>" + description + "<br>";
								if(rsvpUrl !== "N/A"){
									content = content + "<br><b>Rsvp <a target='_blank' href=" + rsvpUrl + ">Here</a></b>";
								}

								if(previous === 0 || previous){
									content = content + "<div data-_id='" + previous + "' class='previous navigate' onclick='lightboxTrigger(this)'>Previo</div>";
								}
								
								if(next){
									content = content + "<div data-_id='" + next + "' class='next navigate' onclick='lightboxTrigger(this)'>Entrante</div>";
								}

							}

							$('div.content').html(content);
							$('div.lightbox').show();

						}
						/* if the lightbox does not exist yet, we append it to the page */
						else{

							/* We render Spanish on the page if the language chosen was Spanish */
							if(language === "spanish"){

								var lightbox = 
								"<div class='lightbox'>" + 
								"<br>" +
								"<a href='#' class='lightbox-close-trigger'><b>X</b></a>" + 
								"<div class='content'>" + 
								"<b>Fecha: </b>" + day + ", " + month + "<br>" + 
								"<b>Hora: </b>" + time + "<br>" + 
								"<b>Direccion: </b>" + street + "<br>" + 
								"<b>Piso: </b>" + floor + "<br>" + 
								"<b>Ciudad: </b>" + city + "<br>" + 
								"<br><b>Descripcion: </b>" + description + "<br>";

								if(rsvpUrl !== "N/A"){
									lightbox = lightbox + "<br><b>RSVP <a target='_blank' href=" + rsvpUrl + ">Here</a></b>";
								} 
								

								if(previous === 0 || previous){
									lightbox = lightbox + "<div data-_id='" + previous + "' class='previous navigate' onclick='lightboxTrigger(this)'>Previo</div>";
								}
								
								if(next){
									lightbox = lightbox + "<div data-_id='" + next + "' class='next navigate' onclick='lightboxTrigger(this)'>Entrante</div>";
								}

							/* We render English on the page if the language chosen was English */
							}else{

								var lightbox = 
								"<div class='lightbox'>" + 
								"<br>" +
								"<a href='#' class='lightbox-close-trigger'><b>X</b></a>" + 
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

							}



							lightbox = lightbox + '</div></div>';
							$('div#wrapper').append(lightbox);
						}
					}
					/* if index is undefined, we are grabbing all the events to render onto the main page */
					else{
						console.log("rendering events");
	            		renderEvents(events);
					}
	            }
	        });
}

/* helper function for rendering events */
function renderEvents(events){
	var currentDiv = 'div.events-inner';
	$(currentDiv).html('');

	for(var i=0; i<events.length; i++){
		var currentEvent = events[i];

		if(language === "english"){

			$(currentDiv).append('<b>Date: </b>', currentEvent.day + ', ' + currentEvent.month + '<br>');
			$(currentDiv).append('<b>Time: </b>', currentEvent.time + '<br>');
			$(currentDiv).append('<b>Address: </b><br>');
			$(currentDiv).append(currentEvent.street + '<br>')
			$(currentDiv).append(currentEvent.city + ', ' + currentEvent.state + '<br>');
			$(currentDiv).append('<span data-_id="' + i + '" onclick="lightboxTrigger(this)" class="details">See More Details</span><br><br>');
		}else{

			$(currentDiv).append('<b>Fecha: </b>', currentEvent.day + ', ' + currentEvent.month + '<br>');
			$(currentDiv).append('<b>Hora: </b>', currentEvent.time + '<br>');
			$(currentDiv).append('<b>Direccion: </b><br>');
			$(currentDiv).append(currentEvent.street + '<br>')
			$(currentDiv).append(currentEvent.city + ', ' + currentEvent.state + '<br>');
			$(currentDiv).append('<span data-_id="' + i + '" onclick="lightboxTrigger(this)" class="details">Ver Mas Detalles</span><br><br>');
		}
		
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

/* event handlers to detect if a new language was chosen */
function languageSelected(){
	$('body').on('click', 'span.english', function(e){
		$('span.spanish').css("color", "black");
		this.style.color = "#FFA429";
		language = "english";
		grabEvents();
	})

	$('body').on('click', 'span.spanish', function(e){
		$('span.english').css("color", "black");
		this.style.color = "#FFA429";
		language = "spanish";
		console.log("current language is:", language);
		grabEvents();
	})
}





