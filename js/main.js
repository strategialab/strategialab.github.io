$(document).ready(function() {

	var token = Base64.decode(getParam('t'));
	var arrToken = token.split('|');
	var storeName = arrToken[0];
	var scriptUrl = arrToken[1];
	var liScriptUrl = arrToken[2];

	$('#store-name').html(storeName);

	$('.money').mask("#.##0.00", {reverse: true});
	$('.colorpicker-component').colorpicker();

	// Initial
	var messageInitial = $('#msg-no-cep').val();
	var messageProgressP1 = $('#msg-in-progress-1').val();
	var messageProgressP2 = $('#msg-in-progress-2').val();
	var messageGoalAchieved = $('#msg-goal-achieved').val();
	var backgroundColor = $('#style-bg-color').val();
	var backgroundColorSpecial = $('#style-bg-color-special').val();
	var textColor = $('#style-text-color').val();
	var specialTextColor = $('#style-text-color-special').val();
	var fontSize = $('#style-font-size').val() + 'px';

	$('#preview_initial').html(messageInitial);
	$('#preview_in_progress .preview_message_progress_p1').html(messageProgressP1);
	$('#preview_in_progress .preview_message_progress_p2').html(messageProgressP2);
	$('#preview_goal_achieved').html(messageGoalAchieved);

	$('#previews div').css('background-color', backgroundColor);
	$('#preview_goal_achieved').css('background-color', backgroundColorSpecial);

	$('#previews div').css('color', textColor);
	$('#previews div .preview_message_progress_goal').css('color', specialTextColor);
	$('#previews div').css('font-size', fontSize);

	// Messages

	$('#msg-in-progress-1').on('keyup', function(e){
		$('#preview_in_progress .preview_message_progress_p1').html($(this).val());
	});

	$('#msg-in-progress-2').on('keyup', function(e){
		$('#preview_in_progress .preview_message_progress_p2').html($(this).val());
	});

	$('#msg-goal-achieved').on('keyup', function(e){
		$('#preview_goal_achieved').html($(this).val());
	});

	// Appearance

	$('#style-bg-color').on('change', function(e){
		$('#preview_initial').css('background-color', $(this).val());
		$('#preview_in_progress').css('background-color', $(this).val());
	});

	$('#style-bg-color-special').on('change', function(e){
		$('#preview_goal_achieved').css('background-color', $(this).val());
	});

	$('#style-text-color').on('change', function(e){
		$('#preview_initial').css('color', $(this).val());
		$('#preview_in_progress').css('color', $(this).val());
		$('#preview_goal_achieved').css('color', $(this).val());
	});

	$('#style-text-color-special').on('change', function(e){
		$('#preview_in_progress .preview_message_progress_goal').css('color', $(this).val());
	});

	$('#style-font-size').on('change', function(e){
		var size = $(this).val() + 'px';
		$('#preview_initial').css('font-size', size);
		$('#preview_in_progress').css('font-size', size);
		$('#preview_goal_achieved').css('font-size', size);
	});

	function updateCodeResult(){
		var wfs_config = {
			'status': 'online',
			'regions': {
				'Sul': parseFloat($('#region-sul').val()),
				'Sudeste': parseFloat($('#region-sudeste').val()),
				'Norte': parseFloat($('#region-norte').val()),
				'Nordeste': parseFloat($('#region-nordeste').val()),
				'Centro Oeste': parseFloat($('#region-centro-oeste').val())
			},
			'styles': {
				'background-color': $('#style-bg-color').val(),
				'completed-background-color': $('#style-bg-color-special').val(),
				'color': $('#style-text-color').val(),
				'special-color': $('#style-text-color-special').val(),
				'font-size': $('#style-font-size').val() + 'px',
				'margin-bottom': $('#style-margin-bottom').val() + 'px',
				'padding': $('#style-padding').val() + 'px',
				'text-align': $('#style-text-align').val()
			},
			'messages': {
				'goal_in_progress': $('#msg-in-progress-1').val() + ' __MISSING__ ' + $('#msg-in-progress-2').val(),
				'goal_completed': $('#msg-goal-achieved').val(),
				'no-cep': $('#msg-no-cep').val(),
				'no-offer': $('#msg-no-offer').val()
			}
		};
		var code = 'var wfs_config = ' + JSON.stringify(wfs_config);

		code += '\n(function(d, s, id){\n' +
			'var js, fjs = d.getElementsByTagName(s)[0];\n' +
			'if (d.getElementById(id)) {return;}\n' +
			'js = d.createElement(s); js.id = id;\n' +
			'js.src = "' + liScriptUrl + '";\n' +
			'fjs.parentNode.insertBefore(js, fjs);\n' +
		'}(document, "script", "wfs"));'

		$('#code-container').html('<pre><code>' + code + '</code></pre>').css('display', 'block');

		// $("html, body").animate({ scrollTop: $(document).height() }, 1000);
	}

	$('#btn-download').on('click', function(){
		var iframe = document.getElementById('invisible');
		iframe.src = scriptUrl;
		$('#link-personalize').tab('show');
	});

	$('#form-conf').submit(function(e){
		e.preventDefault();
		updateCodeResult();
		$('#link-install').removeClass('disabled');
		$('#link-install').tab('show');
	});

	$('#btn-copy-code').click(function(){
		copyToClipboard('code-container');
	});

	function getParam(name) {
		url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		    results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	function copyToClipboard(containerid) {
		if (document.selection) { 
			var range = document.body.createTextRange();
			range.moveToElementText(document.getElementById(containerid));
			range.select().createTextRange();
			document.execCommand("Copy"); 
		} else if (window.getSelection) {
			var range = document.createRange();
			range.selectNode(document.getElementById(containerid));
			window.getSelection().addRange(range);
			document.execCommand("Copy");
			// alert("text copied") 
		}
	}

});

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}