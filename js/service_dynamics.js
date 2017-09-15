$(function(){
	
	/*搜索模态框*/
	$(document).on('click','.seach-btn',function(){
		$('.seach-modal').show();
	});
	
	$(document).on('click','.close-btn',function(){
		$('.search-box input').val('');
		$('.seach-modal').hide();
	});
	$(document).on('click','.staff-box li',function(){
		var name = $(this).html(),
			html = "<span>"+ name+"<span>" + '&nbsp;<span class= "close-name" > X </span>';
		$('.staff-name').html(html).find('span').css('color','#666666');
		$('.seach-modal').hide();
	});
	$(document).on('click','.close-name',function(){
		var html = '<span class="icon icon-search"></span>&nbsp;搜索';
		$('.staff-name').html(html);
		$('.seach-modal').hide();
	});
	
});
