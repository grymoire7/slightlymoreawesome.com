$(function() {
	$(document).on('focusin', '.field, textarea', function() {
		if(this.title==this.value) {
			this.value = '';
		}
	}).on('focusout', '.field, textarea', function(){
		if(this.value=='') {
			this.value = this.title;
		}
	});
	$.flexbg({
		'bgColor' : '#fff',
		'imgSrcs' : [
			'css/images/bg.jpg'
		],
		'fader' : {
			'speed' : '500'
		}
	});
	$('#steps .head li:first, #steps .body .step:first').fadeIn();
	$('.step-btn').click(function() {
		var _val = $(this).parent().find('select').val();
		if (_val == '1') {
			$('#steps .head li').stop(true, true).fadeOut();
			$('#steps .head li:eq(1)').fadeIn();
			$('#steps .step').stop(true, true).fadeOut();
			$('#steps .step:eq(1)').fadeIn();
		} else if (_val == '0') {
			alert('Please select an answer for question #1.');
		} else {
			alert('Your guess is wrong! Please try again.');
		};
		return false;
	});
	$('.select-box select').c2Selectbox();
});