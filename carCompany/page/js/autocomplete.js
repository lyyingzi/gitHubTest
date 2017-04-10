/**
A jQuery plugin for search hints

Author: Lorenzo Cioni - https://github.com/lorecioni
*/

(function($) {
	$.fn.autocomplete = function(params) {
		
		//Selections
		var currentSelection = -1;
		var currentProposals = [];
		
		//Default parameters
		params = $.extend({
			hints: [],
			//placeholder: 'Search',
			width: 212,
			//width: 230,
			height: 15,
			//height: 35,
			showButton: true,
			//buttonText: 'Search',
			onSubmit: function(text){},
			onBlur: function(){}
		}, params);

		//Build messagess
		this.each(function() {
			//Container
			var searchContainer = $('<div></div>')
				.addClass('autocomplete-container')
				//.css('height', params.height * 2);
				.css('height', params.height);

			//Text input		
			var input = $('<input type="text" autocomplete="off" name="query">')
				.attr('placeholder', params.placeholder)
				.addClass('autocomplete-input')
				.css({
					'width' : params.width,
					'height' : params.height - 17
				});


			//Proposals

			var proposals = $('<div></div>')
				.addClass('proposal-box')
				.css('width', params.width + 18)
				.css('top', input.height() + 20);
			var proposalList = $('<ul></ul>')
				.addClass('proposal-list');

			proposals.append(proposalList);
			
			input.keydown(function(e) {
				//proposalList.empty();
				switch(e.which) {
					case 38: // Up arrow
					e.preventDefault();
					$('ul.proposal-list li').removeClass('selected');
					if((currentSelection - 1) >= 0){
						currentSelection--;
						$( "ul.proposal-list li:eq(" + currentSelection + ")" )
							.addClass('selected');
					} else {
						currentSelection = -1;
					}
					break;
					case 40: // Down arrow
					e.preventDefault();
					if((currentSelection + 1) < currentProposals.length){
						$('ul.proposal-list li').removeClass('selected');
						currentSelection++;
						$( "ul.proposal-list li:eq(" + currentSelection + ")" )
							.addClass('selected');
					}
					break;
					case 13: // Enter
						if(currentSelection > -1){
							var text = $( "ul.proposal-list li:eq(" + currentSelection + ")" ).html();
							input.val(text);
						}
						currentSelection = -1;
						proposalList.empty();
						params.onSubmit(input.val());
						input.val("");
						break;
					case 27: // Esc button
						currentSelection = -1;
						proposalList.empty();
						input.val('');
						break;
				}
			});
				
			input.bind("change paste keyup", function(e){
				//proposalList.empty();
				if(e.which != 13 && e.which != 27 
						&& e.which != 38 && e.which != 40){				
					currentProposals = [];
					currentSelection = -1;
					proposalList.empty();
					if(input.val() != ''){
						var word = "^" + input.val() + ".*";
						proposalList.empty();
						for(var test in params.hints){
							//proposalList.empty();
							if(params.hints[test].match(word)){
								currentProposals.push(params.hints[test]);	
								var element = $('<li></li>')
									.html(params.hints[test])
									.addClass('proposal')
									.click(function(){
										input.val($(this).html());
										proposalList.empty();
										params.onSubmit(input.val());
										input.val("");
									})
									.mouseenter(function() {
										$(this).addClass('selected');
									})
									.mouseleave(function() {
										$(this).removeClass('selected');
									});
								proposalList.append(element);
							}
						}
					}
				}
			});
			
			input.blur(function(e){
				currentSelection = -1;
				//proposalList.empty();
				params.onBlur();
			});
			
			searchContainer.append(input);
			searchContainer.append(proposals);
	
			$(this).append(searchContainer);

		});

		return this;
	};

})(jQuery);