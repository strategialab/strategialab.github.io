$(document).ready(function() {

	var values = [10, 40, 70];
	var message = 'Faltam <span class="value">R$ __MISSING__</span> pra você ganhar FRETE GRÁTIS!';

	var current = 100;
	showMsg();
	var int = setInterval(showMsg, 1000);

	$('.preview .caption').css('visibility','visible').hide().fadeIn('slow');

	function showMsg (){

		var msg;
		if(current <= 0){
			msg = 'Parabéns! Você ganhou FRETE GRÁTIS!';
			$('.bar').addClass('achieved');
			current = 100;
			$('.preview .caption-achieved').css('visibility','visible').hide().fadeIn('slow');
		} else {
			msg = message.replace('__MISSING__', current);
			$('.bar').removeClass('achieved');
			current -= 30;
			$('.caption-achieved').fadeOut();
		}

		$('.bar .msg').html(msg);
		$('.bar .msg .value').hide().fadeIn('slow');

	}


});