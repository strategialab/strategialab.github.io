$(document).ready(function() {

	var defaults = {
		'regions': [],
		'styles': {
			'background-color': '#5875a3',
			'completed-background-color': '#74cf5c',
			'color': '#ffffff',
			'special-color': '#fff400',
			'font-size': '20px',
			'margin-bottom': '20px',
			'padding': '15px',
			'text-align': 'center'
		},
		'messages': {
			'goal-in-progress': 'Ainda faltam __MISSING__ em compras pra você GANHAR FRETE GRÁTIS !!!',
			'goal-achieved': 'Parabéns! Você ganhou FRETE GRÁTIS!!!',
			'no-cep': 'Não quer pagar frete? Informe o seu CEP para saber quanto falta!',
			'no-offer': 'Não há opção de frete grátis para sua região.'
		}
	};

	var regions = [];
	var token = Base64.decode(getParam('t'));
	if(!token){
		swal('Acesso negado', 'Não foi possível identificar a sua loja. Verifique se está usando a URL com os parâmetros corretos.', 'error');
		return;
	}
	var arrToken = token.split('|');
	var action = arrToken[0];
	var storeName = arrToken[1];
	var storeDomain = arrToken[2];
	var storeId;
	var filename;
	var downloadUrl;
	var liScriptUrl;

	$('#store-name').html(storeName);

	if(action == 'update'){
		getInstalledConfig(onLoadedConfig);
	} else {
		storeId = arrToken[3];
		filename = arrToken[4];
		downloadUrl = arrToken[5];
		liScriptUrl = 'https://cdn.awsli.com.br/' + storeId.substr(0, 2) + '/' + storeId + '/arquivos/' + filename;
		
		setDefaults(defaults);
		$('#loading').css('display', 'none');
		$('.container').css('display', 'block');
	}

	function onLoadedConfig (config, scriptUrl) {
		if(config){
			swal('Modo de atualização', "Identificamos que a barra já foi instalada em sua loja; portanto, carregamos as configurações atuais para que você possa atualizá-las, se desejar.", "info");
			
			liScriptUrl = scriptUrl;

			setDefaults(config);

			$('#link-download').addClass('disabled');
			$('#link-download').removeClass('active');
			$('#download').removeClass('active');
			$('#link-config').addClass('active');
			$('#config').addClass('active');

			$('#loading').css('display', 'none');
			$('.container').css('display', 'block');

			$('.money').mask("#.##0.00", {reverse: true});
			$('.cep').mask("00000-000");
			$('.colorpicker-component').colorpicker();
		}
	}

	$('.money').mask("#.##0.00", {reverse: true});
	$('.cep').mask("00000-000");
	$('.colorpicker-component').colorpicker();

	var clipboard = new Clipboard('#btn-copy-code');
	clipboard.on('success', function(e) {
		$('#modal-gen-code').modal('hide');
	});

	// var wfs_config = {
	// 	"status": "online",
	// 	"regions": [
	// 		["Sul",1050.00],
	// 		["Sudeste",299],
	// 		["Centro Oeste",449.9],
	// 		["São Paulo - Barueri",149,[["06400001","06499999"]]],
	// 		["São Paulo - Capital 1",149,[["01000000","05999999"]]],
	// 		["São Paulo - Capital 2",149,[["08000000","08499999"]]],
	// 		["São Paulo - Diadema",149,[["09900001","09999999"]]],
	// 		["São Paulo - Estado",199,[["01000000","19999999"]]],
	// 		["São Paulo - Guarulhos",149,[["07000001","07399999"]]],
	// 		["São Paulo - Osasco",149,[["06000001","06299999"]]],
	// 		["São Paulo - Santana de Parnaíba",149,[["06500001","06549999"]]],
	// 		["São Paulo - Santo André ",149,[["09000001","09299999"]]],
	// 		["São Paulo - São Bernado",149,[["09600001","09899999"]]],
	// 		["São Paulo - São Caetano do Sul",149,[["09500001","09599999"]]]
	// 	],
	// 	"styles":{
	// 		"background-color":"#e05e2a",
	// 		"completed-background-color":"#228bcc",
	// 		"color":"#ffffff",
	// 		"special-color":"#110deb",
	// 		"font-size":"20px",
	// 		"margin-bottom":"20px",
	// 		"padding":"15px",
	// 		"text-align":"center"
	// 	},
	// 	"messages":{
	// 		"goal-in-progress":"Ainda faltam __MISSING__ em compras pra você GANHAR FRETE GRÁTIS !!!",
	// 		"goal-achieved":"Parabéns! Você ganhou FRETE GRÁTIS!!!",
	// 		"no-cep":"Não quer pagar frete? Informe o seu CEP para saber quanto falta!",
	// 		"no-offer":"Não há opção de frete grátis para sua região."}
	// 	};

	// Messages

	$('#msg-goal-in-progress-1').on('keyup', function(e){
		$('#preview_in_progress .preview_message_progress_p1').html($(this).val());
	});

	$('#msg-goal-in-progress-2').on('keyup', function(e){
		$('#preview_in_progress .preview_message_progress_p2').html($(this).val());
	});

	$('#msg-goal-achieved').on('keyup', function(e){
		$('#preview_goal_achieved').html($(this).val());
	});

	$('#msg-no-cep').on('keyup', function(e){
		$('#preview_initial').html($(this).val());
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

	$('#btn-download').on('click', function() {
		var iframe = document.getElementById('invisible');
		iframe.src = downloadUrl;
		$('#link-config').tab('show');
	});

	$('#form-conf').submit(function(e) {
		e.preventDefault();
		$('#link-install').tab('show');
	});

	$('#btn-add-region').click(function() {
		addRegion();
		scrollPageToBottom();
	});

	$('#form-config-regions').submit(function(e) {
		e.preventDefault();

		var tmpRegions = [];
		var nulls = [];
		$('.tr', this).each(function(index, value) {
			var active = $('input[name="region_set-'+index+'-active"]').is(':checked');
			var name = $('input[name="region_set-'+index+'-name"]').val();
			var value = $('input[name="region_set-'+index+'-value"]').val();
			var cepStart = $('input[name="region_set-'+index+'-cep-start"]');
			var cepEnd = $('input[name="region_set-'+index+'-cep-end"]');

			if(value){
				value = parseFloat(value);
			} else {
				value = null;
			}

			var region = [name, value];
			if(cepStart.val() && cepEnd.val()) {
				var cepRange = [[cepStart.cleanVal(), cepEnd.cleanVal()]];
				region.push(cepRange);
			}

			if(value == null) {
				nulls.push(index);
			}

			tmpRegions.push(region);
		});

		if(tmpRegions.length == nulls.length) {
			swal("", "Você deve configurar pelo menos uma região", "error");
		} else {
			regions = tmpRegions;
			showPersonalizationTab();
		}
	});

	$('body').delegate('.btn-delete-region', 'click', function(e) {
		$(this).closest('.tr').remove();
	});

	$('.btn-modal-gen-code').click(function(e) {
		if(regions.length == 0){
			swal("", "Você deve configurar pelo menos uma região antes de gerar o código", "error");
		} else {
			updateCodeResult();
			$('#modal-gen-code').modal();
		}
	});

	function getInstalledConfig (callback) {
		$.ajax({
			crossDomain: true,
			cache: false,
			url: 'https://' + storeDomain + '/carrinho/index'
		})
		.done(function(data) {
			var config;
			var scriptUrl;

			var patt = /"(https:\/\/cdn\.awsli\.com\.br\/(.*)\/wfs-(.*))"/
			var result = patt.exec(data);
			if(result){
				scriptUrl = result[1];
			}

			var patt = /var wfs_config = (.*);/
			var result = patt.exec(data);
			if(result){
				config = JSON.parse(result[1]);
			}
			
			callback(config, scriptUrl);
		})
		.fail(function(error){
			callback(null, null, error);
		});
	}

	function setDefaults (defaults) {
		regions = defaults['regions'];
		setRegionsDefaults(defaults['regions']);

		var messages = defaults['messages'];
		var msgGoalInProgressParts = messages['goal-in-progress'].split(' __MISSING__ ');
		$('#msg-goal-in-progress-1').val(msgGoalInProgressParts[0]);
		$('#msg-goal-in-progress-2').val(msgGoalInProgressParts[1]);
		$('#msg-goal-achieved').val(messages['goal-achieved']);
		$('#msg-no-cep').val(messages['no-cep']);
		$('#msg-no-offer').val(messages['no-offer']);

		var styles = defaults['styles'];
		$('#style-bg-color').val(styles['background-color']);
		$('#style-bg-color-special').val(styles['completed-background-color']);
		$('#style-text-color').val(styles['color']);
		$('#style-text-color-special').val(styles['special-color']);
		// $('#style-font-size').val(parseInt(styles['font-size']));
		// $('#style-margin-bottom').val(parseInt(styles['margin-bottom']));
		// $('#style-padding').val(parseInt(styles['padding']));
		// $('#style-text-align').val(styles['text-align']);

		$('#preview_initial').html(messages['no-cep']);
		$('#preview_in_progress .preview_message_progress_p1').html(msgGoalInProgressParts[0]);
		$('#preview_in_progress .preview_message_progress_p2').html(msgGoalInProgressParts[1]);
		$('#preview_goal_achieved').html(messages['goal-achieved']);

		$('#previews div').css('background-color', styles['background-color']);
		$('#preview_goal_achieved').css('background-color', styles['completed-background-color']);

		$('#previews div').css('color', styles['color']);
		$('#previews div .preview_message_progress_goal').css('color', styles['special-color']);
		// $('#previews div').css('font-size', styles['font-size']);
	}

	function setRegionsDefaults (regions) {
		// start temp conditions for versions reasons only

		if(regions[3] != undefined && regions[3][0] != 'Nordeste'){
			regions.splice(3, 0, ['Nordeste', null]);
		}

		if(regions[4] != undefined && regions[4][0] != 'Norte'){
			regions.splice(4, 0, ['Norte', null]);
		}
		// end temp conditions for versions reasons only

		var fixedRegions = ['Sul', 'Sudeste', 'Centro Oeste', 'Nordeste', 'Norte']
		for(var i=0; i<regions.length; i++){
			var region = regions[i][0];
			var minValue = regions[i][1];

			if(minValue){
				minValue = minValue.toFixed(2).replace('.', '');
			}

			if(fixedRegions.indexOf(region) == -1){ // not found
				addRegion();
				$('input[name="region_set-'+i+'-name"]').val(region);
				$('input[name="region_set-'+i+'-value"]').val(minValue);
				var cepRange = regions[i][2][0];
				$('input[name="region_set-'+i+'-cep-start"]').val(cepRange[0]);
				$('input[name="region_set-'+i+'-cep-end"]').val(cepRange[1]);
			} else { // fixed region
				$('input[name="region_set-'+i+'-value"]').val(minValue);
			}
		}
	}

	function addRegion (){
		var template = $('#template-custom-region');
		var container = $('#container-regions');
		var count = container.children('.tr').length;

		var item = template.html().replace(/__prefix__/g, count);

		container.append(item);
		return count;
	}

	function updateCodeResult (){
		var wfs_config = {
			'status': 'online',
			'regions': regions,
			'styles': {
				'background-color': $('#style-bg-color').val(),
				'completed-background-color': $('#style-bg-color-special').val(),
				'color': $('#style-text-color').val(),
				'special-color': $('#style-text-color-special').val(),
				// 'font-size': $('#style-font-size').val() + 'px',
				// 'margin-bottom': $('#style-margin-bottom').val() + 'px',
				// 'padding': $('#style-padding').val() + 'px',
				// 'text-align': $('#style-text-align').val()
				'font-size': defaults['styles']['font-size'],
				'margin-bottom': defaults['styles']['margin-bottom'],
				'padding': defaults['styles']['padding'],
				'text-align': defaults['styles']['text-align']
			},
			'messages': {
				'goal-in-progress': $('#msg-goal-in-progress-1').val() + ' __MISSING__ ' + $('#msg-goal-in-progress-2').val(),
				'goal-achieved': $('#msg-goal-achieved').val(),
				'no-cep': $('#msg-no-cep').val(),
				'no-offer': $('#msg-no-offer').val()
			}
		};
		var code = 'var wfs_config = ' + JSON.stringify(wfs_config) + ';';

		code += '\n(function(d, s, id){\n' +
			'var js, fjs = d.getElementsByTagName(s)[0];\n' +
			'if (d.getElementById(id)) {return;}\n' +
			'js = d.createElement(s); js.id = id;\n' +
			'js.src = "' + liScriptUrl + '";\n' +
			'fjs.parentNode.insertBefore(js, fjs);\n' +
		'}(document, "script", "wfs"));'

		$('#code-container').html('<pre><code>' + code + '</code></pre>').css('display', 'block');
	}

	function getParam(name) {
		url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		    results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	function showPersonalizationTab (){
		$('#link-personalize').tab('show');
	}

	function scrollPageToBottom (){
		$("html, body").animate({ scrollTop: $(document).height() }, 1000);
	}

});

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}