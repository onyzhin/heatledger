'use strict'; 
function scrollUp(block,targetBlock) {
	$(block).click(function(event){
		event.preventDefault();
		var target = $(targetBlock).offset().top;
		$('body, html').animate({scrollTop:target},800);
		return false;
	});
}   

function star(rating){
	$(rating).each(function(){
		var rating = $(this).data('rating');
		var maxrating = 5;
		for (var i = 0; i < maxrating; i++){
			$(this).append('<span></span>');
			if (i<rating)
				$(this).find('span').eq(i).addClass('active');
		}
	})
}

function slickInit(){
	if ($('.slider').length){
		$('.slider').slick({
		  slidesToShow: 2,
		  slidesToScroll: 1,
		  arrows: true,
		  useCSS: false,
		  responsive: [
		    {
		      breakpoint: 767,
		      settings: {
		        slidesToShow: 1
		      }
		    }
	    ]
		});
	}
	if ($('.slider-for').length){
		$('.slider-for').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: true,
		  fade: true,
		  asNavFor: '.slider-nav'
		});
		$('.slider-nav').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.slider-for',
		  dots: false,
		  centerMode: true,
		  centerPadding:'0px',
		  focusOnSelect: true
		});
	}
}

function expandTool(){
	$('.expand-subject').slideUp(0);
	$('.expand-tool').click(function(e){
		$(this).siblings('.expand-subject').stop().slideToggle();
		$(this).parent().toggleClass('active');
		e.preventDefault();
	})
}

function navbartoggle(){
	$('.navbar-toggle').click(function(){
		var navbar = $('.navbar-collapse');
		if($(this).is('.active')){
			$(this).removeClass('active');
			navbar.stop().slideUp().removeClass('active');
		}
		else{
			$(this).addClass('active');
			navbar.stop().slideDown().addClass('active');
		}
		return false;
	});
}

function footerplaceholder(){	
	$('.footer_placeholder')
		.height($('.footer')
		.outerHeight());
}

function tabs(block){
	if (typeof(block)==='undefined') block=$('.tabs');
	block.each(function(){
		var $wrap=$(this);
		if (!$wrap.is('.tabs-done')){
			$wrap.addClass('tabs-done');
			$('[data-tabId]',$wrap).click(function(event){
				event.preventDefault();
				//coneole.log(3);
				var tabid=$(this).data('tabid');
				$('[data-tabId]',$wrap).removeClass('active');
				$('[data-tabId="'+tabid+'"]',$wrap).addClass('active');
				$('[data-tab]',$wrap).removeClass('active').addClass('hidden');
				$('[data-tab="'+tabid+'"]',$wrap).addClass('active').removeClass('hidden');
			})
			if ($('.active[data-tabId]',$wrap).length>0)
				$('.active[data-tabId]',$wrap).click();
			else
				$('[data-tabId]:eq(0)',$wrap).click();
		}
	})
}

function sendForm(){
	$('form [type="submit"]').click(function(){

 		var parentClass=$(this).attr('rel');
	 	var paramsFancy={
		    'scrolling':0,
		    'autoScale': true,
		    'transitionIn': 'elastic',
		    'transitionOut': 'elastic',
		    'speedIn': 500,
		    'speedOut': 300,
		    'autoDimensions': true,
		    'centerOnScroll': true,
		    'href' : '#thanks',
		    'padding' : '0',
		    'height' : 'auto',
		    helpers: {
	            overlay: {
	              locked: false
	            }
	        }
	    };

	   form =  $(this).closest('form');

	    if(form.valid()){
	        $.ajax({
	            url: 'form_work.php',
	            data: 'action=send_form&'+form.serialize(),
	            success: function(data){
	                $.fancybox.close();
	                $.fancybox.open(paramsFancy);
	                $('form input[type="text"]').val('');
                  	$('form input[type="text"]').blur();
                  	$('.zNice-tInput').removeClass('zNice-error zNice-valid');
	            }
	        });
	        
	    }else{

	    } 
	}); 
}

function previewHeight() {
	$('.preview').height($(window).height());
}

$(document).ready(function(){
	navbartoggle();
	slickInit();
	footerplaceholder();
	tabs();
	previewHeight();
});

$(window).resize(function(){
	footerplaceholder();
	previewHeight();
})