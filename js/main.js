var shelterData = [];

function getData(){
  d3.csv('data/shelter-img.csv', function(data){ 
    shelterData = data;
  	buildGallery();
  });
}

function buildGallery(){
	$.each(shelterData, function(index, shelter){
		if(shelter.img_house.length > 0){
			var imageSmall = shelter.img_house.slice(0,-4) + "_small.jpg";
			var imageLarge = "https://raw.githubusercontent.com/PhilippineRedCross/yolanda_shelter-img/master/images/" + shelter.img_house;
			var itemHtml = '<a href="' + imageLarge + '" data-location="Barangay ' + 
					shelter.barangay + ', ' + shelter.municipality + ', ' + shelter.province + '" data-partner="' +
					"Philippine Red Cross with support from " + shelter.partner +
			 		'"><img class="lazy galleryImg" data-original="images/' + imageSmall +
					'" width="80px" height="80px" src="img/222222.jpg" alt=""></a>';
			$('#links').append(itemHtml); 
		}	
	});
	$('#links').append('<img class="ifrc-logo" src="img/IFRC_cobranding_small_backing.png">');
	$(function() {
	    $('img.lazy').lazyload({
	    	effect: "fadeIn"
	    });
	});

	document.getElementById('links').onclick = function (event) {
	    event = event || window.event;
	    var target = event.target || event.srcElement,
	        link = target.src ? target.parentNode : target,
	        options = {
	        	index: link, 
	        	event: event,
	        	titleElement: 'h2',
	        	titleProperty: 'data-title',
	        	slideshowInterval: 3000,
	        	onslide: function (index, slide) {
		            var textPartner = this.list[index].getAttribute('data-partner'),
		            	textLocation = this.list[index].getAttribute('data-location'),
		                nodePartner = this.container.find('.partner'),
		                nodeLocation = this.container.find('.location');
		            nodePartner.empty();
		            nodeLocation.empty();
		            if (textPartner) {
		                nodePartner[0].appendChild(document.createTextNode(textPartner));
		            }
		            if (textLocation) {
		                nodeLocation[0].appendChild(document.createTextNode(textLocation));
		            }
		        } 
	        },
	        links = this.getElementsByTagName('a');
	    blueimp.Gallery(links, options);
	};
};

getData();