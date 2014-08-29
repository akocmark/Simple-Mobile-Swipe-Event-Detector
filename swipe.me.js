(function($) {
	$.fn.swipe = function(options) {
		var el = document.getElementById(this.attr('id'));
		var startX = 0; // starting X position
		var startY = 0;  // starting Y position
		var distX = 0;  // horizontal distance traveled
		var distY = 0;  // vertical distance traveled
		
		var settings = $.extend({
			swipe: null,
			allowPageVertScroll: false
		}, options);

		// touchstart
		el.addEventListener('touchstart', function(e){
			// reference first touch point for this event
			var touchobj = e.changedTouches[0];

			// get x position of touch point relative to left edge of browser
			startX= parseInt(touchobj.clientX); 

			// get y position of touch point relative to top edge of browser
			startY = parseInt(touchobj.clientY);
		}, false);

		// touchmove
		el.addEventListener('touchmove', function(e){
			// reference first touch point for this event
			var touchobj = e.changedTouches[0];

			// get horizonal distance traveled
			distX = parseInt(touchobj.clientX) - startX;

			// get vertical distance traveled
			distY = parseInt(touchobj.clientY) - startY;

			// use prevent default only on horizontal swipes
			if (settings.allowPageVertScroll) {
				if (distY>-50 && distY<50) {
					e.preventDefault();
				}
			} else {
				e.preventDefault();
			}
		}, false);

		// touchend
		el.addEventListener('touchend', function(e){
			// reference first touch point for this event
			var touchobj = e.changedTouches[0];
			var swipeDirection = null;

			// swipe RIGHT
			if (distX > 50) {
				swipeDirection = 'RIGHT';
			}

			// swipe LEFT
			if (distX < -50) {
				swipeDirection = 'LEFT';
			}

			// swipe  UP
			if (distY < -50) {
				swipeDirection = 'UP';
			}

			// swipe DOWN
			if (distY > 50) {
				swipeDirection = 'DOWN';
			}

			// callback function
			if (settings.swipe) {
				settings.swipe(swipeDirection);
			}
	 	}, false);
	};
})(jQuery);