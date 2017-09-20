$(function() {
	//选择时间
	$(document).on('click', '.date-name', function() {
		var buttons1 = [/*{
				text: '请选择',
				label: true
			},*/
			{
				text: '今日',
				bold: true,
				onClick: function() {
					$('.data-list a').html(this.text +' <span class="icon icon-down"></span>');
					
				}
			},
			{
				text: '昨日',
				onClick: function() {
					$('.data-list a').html(this.text +' <span class="icon icon-down"></span>');
				}
			},
			{
				text: '本月',
				onClick: function() {
					$('.data-list a').html(this.text +' <span class="icon icon-down"></span>');
				}
			},
			{
				text: '自定义',
				onClick: function() {
					setTimeout(function(){
					  $('.date-menu').show();
					} ,200); 
				}
			}
		];
		var buttons2 = [{
			text: '取消',
			bg: 'danger'
		}];
		var groups = [buttons1, buttons2];
		$.actions(groups);
	});
	
	//选择门店
	$(document).on('click', '.store_name', function() {
		var buttons1 = [/*{
				text: '全部门店',
				label: true
			},*/
			{
				text: '菩瑞婷美容连锁',
				bold: true,
				color: '',
				onClick: function() {
					$('.store-list .store_name').html(this.text +' <span class="icon icon-down"></span>');
					
				}
			}
		];	
		var buttons2 = [{
			text: '取消',
			bg: 'danger'
		}];
		var groups = [buttons1, buttons2];
		$.actions(groups);
	});
	
	//排序
	$(document).on('click', '.order-name', function() {
		var buttons1 = [/*{
				text: '选择排序方式',
				label: true
			},*/
			{
				text: '业绩从高到低',
				bold: true,
				color: ''
			}
			,
			{
				text: '业绩从低到高',
				bold: true,
				color: ''
			},
			{
				text: '卡耗从高到低',
				bold: true,
				color: ''
			},
			{
				text: '卡耗从低到高',
				bold: true,
				color: ''
			}
		];	
		var buttons2 = [{
			text: '取消',
			bg: 'danger'
		}];
		var groups = [buttons1, buttons2];
		$.actions(groups);
	});
	
	//筛选
		$(document).on('click', '.filter-name', function() {
		var buttons1 = [/*{
				text: '选择排序方式',
				label: true
			},*/
			{
				text: '全部',
				bold: true,
				color: ''
			}
			,
			{
				text: '尾款',
				bold: true,
				color: ''
			},
			{
				text: '退单',
				bold: true,
				color: ''
			},
			{
				text: '补卡',
				bold: true,
				color: ''
			},
			{
				text: '已付款',
				bold: true,
				color: ''
			},
			{
				text: '待付款',
				bold: true,
				color: ''
			}
		];	
		var buttons2 = [{
			text: '取消',
			bg: 'danger'
		}];
		var groups = [buttons1, buttons2];
		$.actions(groups);
	});
	
	//状态
	$(document).on('click', '.status-name', function() {
		var buttons1 = [/*{
				text: '选择排序方式',
				label: true
			},*/
			{
				text: '全部状态',
				bold: true,
				color: ''
			}
			,
			{
				text: '客户关怀',
				bold: true,
				color: ''
			},
			{
				text: '服务小计',
				bold: true,
				color: ''
			}
		];	
		var buttons2 = [{
			text: '取消',
			bg: 'danger'
		}];
		var groups = [buttons1, buttons2];
		$.actions(groups);
	});
	
	
	
	//自定义时间
	$(document).on('click','.save-date',function(){
		var stTime = $('.start-time').find('input').val();
		var endTime = $('.end-time').find('input').val();
		var reg = /-/g;
		stTime = stTime.replace(reg,'.');
		endTime = endTime.replace(reg,'.');
		
		console.log(stTime,endTime);
		$('.data-list a').html( stTime + ' ~ ' + endTime + ' <span class="icon icon-down"></span>' ).css('font-size','0.6rem');
		$('.date-menu').hide();
	});
	$(document).on('click','.cancel-date',function(){
		
		$('.date-menu').hide();
	});

});