(function($){
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.

	var $mouseover = $('.mouse-over');
	var $click     = $('.click');
	var $form      = $('form');
	var $timeout   = $('.timeout');

	$mouseover.on('mouseover', function() {
		$(this).html('Scrooge McDuck!');
		$(this).height($(this).height() + 50);
	});

	$click.click('click', function() {
		$(this).html('Peace Out!')
		$(this).fadeOut(1500);
		return false;
	});

	$form.on('submit', function(e) {
		e.preventDefault();
		if ($(this).find('input[type="text"]').val() !== '') {
			$(this).find('input').fadeOut('slow');
			$(this).append('<h2>Congratulations! You\'ve entered some text!</h2>');
		}
	});

	$(document).on('ready', function() {
		setTimeout(function() {
			$timeout.fadeIn('slow');
		}, 1000);

		getTitle();
	});

})(jQuery);

function getTitle() {
	var titleDiv = '<div>Your title: <strong class="title"></strong></div>';

	$('.content').append('<button class="get-title">Get Title</button>');

	if (document.cookie !== "") {
		// The user previously chose 'keep it'
		if ($('.title').length === 0) {
			$('.content').append(titleDiv);
			$('.title').text(document.cookie.split('=')[1]);
		}
	}

	$('.get-title').click(function() {
		$.get('http://www.mattbowytz.com/simple_api.json?data=quizData',
					function(apiData) {
			var title = apiData.data[Math.floor(Math.random() * apiData.data.length)];

			if ($('.title').length === 0) {
				$('.content').append(titleDiv);
			}

			$('.title').text(title);
			$('.get-title').text('Change It');

			if ($('.keep-it').length === 0) {
				$('.get-title').after('<button class="keep-it">Keep It</button>');
			}

			$('.keep-it').click(function() {
				document.cookie = 'title=' + title;
			});
		})
		.fail(function() {
			alert('Failed to retrieve quiz data from API.');
		});
	});
}
