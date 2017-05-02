$(document).ready(function() {

	var values = [99, 80, 65, 50, 35, 19, 10];
	var currentIndex = 1;

	updateMessages();

	$('.launch-modal').on('click', function(e){
	    e.preventDefault();
	    $( '#' + $(this).data('modal-id') ).modal();
	});

	$("#modal-video").on("hidden.bs.modal", function () {
		var url = $('#video-frame').attr('src');
		$('#video-frame').attr('src', '');
		$('#video-frame').attr('src', url);
	});

	function updateMessages (){

		setTimeout(function(){

			$('.caption-achieved').fadeOut();
			$('.bar-achieved').fadeOut(function(){
				$('.bar-missing').fadeIn();
				$('.caption').fadeIn();
			});

			if (currentIndex >= values.length) {
				$('.caption').hide();
				$('.caption-achieved').fadeIn('slow');
				$('.bar-missing').hide();
				$('.bar-achieved').fadeIn();

				currentIndex = 0;

				setTimeout(function(){
					updateMessages();
				}, 10000);

				return;

			}

			var value = values[currentIndex];
			$('.bar-missing .value').hide().html('R$ ' + value).fadeIn();

			currentIndex++;
			updateMessages();

		}, 500);

	}

});