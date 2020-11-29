(function($){
	initFlex = function(){		
		$('body')
			.prepend('<div id="flex-wrapper"></div>')
			.css('background-color', settings['bgColor']);
		
		$.each(settings['imgSrcs'], function(){
			$('#flex-wrapper').append('<img src="' + this + '" />');
		});
		
		$(window).load(function(){
			resizeFlex();
			showFlex();
		}).resize(function() {
			resizeFlex();
		});
	};
	
	resizeFlex = function(){
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		
		$('#flex-wrapper img').each(function(){
			var imgHeight = $(this).height();
			var imgWidth = $(this).width();
			
			var imgRatio = imgWidth / imgHeight;
			var windowRatio = windowWidth / windowHeight;
			
			if (windowRatio < imgRatio) {
				$(this).css({'height' : windowHeight, 'width' : 'auto'});
				$(this).css('top', '0').css('left', function(){
					var centerHorizontal = Math.abs(windowWidth - $(this).width()) / 2;
					return -centerHorizontal;
				});
			} else {
				$(this).css({'width' : windowWidth, 'height' : 'auto'});
				$(this).css('left', '0').css('top', function(){
					var centerVertical = Math.abs(windowHeight - $(this).height()) / 2;
					return -centerVertical;
				});
			};
		});
	};
	
	showFlex = function(){
		_img = $('#flex-wrapper img');
		speed = parseInt(settings['fader']['speed']);
		count = $('#flex-wrapper img').length;
		first = settings['fader']['firstSlide'];

		if (srcCount == 1) {
			curr = 0;
		} else {
			( first > count ) ? (curr = _img.last().index()) : (curr = first - 1);
		};

		if (typeof settings.beforeReveal == 'function') {
			settings.beforeReveal.call(this);
		};
		
		if (settings['fader']['fade'] == true) {
			_img.eq(curr)
				.addClass('active')
				.animate({'opacity' : '1'}, speed, function(){
					if (typeof settings.afterReveal == 'function') {
						settings.afterReveal.call(this);
					};
				});			
		} else {
			_img.eq(curr)
				.addClass('active')
				.animate({'opacity' : '1'}, 1, function(){
					if (typeof settings.afterReveal == 'function') {
						settings.afterReveal.call(this);
					};
				});
		}

		if (srcCount > 1) {
			setInterval('faderFlex()', settings['fader']['duration']);
		};
	};
	
	faderFlex = function(){
		random = settings['fader']['randomSlide'];
		flag = 0;
		var next = curr;
		
		if (random == true) {
			next = randomFlex();
		} else {
			next = $('#flex-wrapper img.active').index() + 1;
		};

		if (next >= count) {
			next = 0;
		};
		
		if (typeof settings.beforeReveal == 'function') {
			settings.beforeReveal.call(this);
		};

		_img.removeClass('active');
		_img.eq(next).addClass('active').animate({'opacity' : '1'}, speed);
				
		_img.not('.active').animate({'opacity' : '0'}, speed, function(){
			if ((typeof settings.afterReveal == 'function') && (flag == 0)) {
				settings.afterReveal.call(this);
				flag = 1;
			};
		});
	};
	
	randomFlex = function(){
		var _random = Math.floor(Math.random() * count);
		var _curr = $('#flex-wrapper img.active').index();
		if (_random == _curr) {
			return randomFlex();
		} else {
			return _random;
		};
	}
	
	$.flexbg = function(options) {
		var defaults = {
			'imgSrcs' : [],
			'bgColor' : '#fff',
			'fader' : {
				'duration' : '4000',
				'speed' : '800',
				'firstSlide' : '1',
				'randomSlide' : false,
				'fade' : true
			},
			beforeReveal : function(){},
			afterReveal : function(){}
		};

		settings = $.extend(true, {}, defaults, options);
		srcCount = settings['imgSrcs'].length;
		
		if (srcCount != 0) {
			initFlex();
		};
	};
})(jQuery);