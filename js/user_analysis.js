$(function(){
	
	var myChart = echarts.init(document.getElementById('main'));

	
	option = {
	    /*title : {
	    	text: '某站点用户访问来源',
        	subtext: '纯属虚构',
	        x:'center',
	    },*/
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    /*legend: {
	        orient: 'vertical',
        	center: 'center',
        	bottom:'bottom',
	        data: ['自主上门','微信活动','名单导入','支付宝口碑','美团','大众点评']
	    },*/
	    legend: {
                x : 'center',
        		y : 'bottom',
                data: ['自主上门','微信活动','名单导入','支付宝口碑','美团','大众点评']
            },
	    series: [
	        {
	            name: '访问来源',
	            type: 'pie',
	            radius : '40%',
	            center: ['50%', '40%'],
	            data:[
	                {value:335, name:'自主上门'},
	                {value:230, name:'支付宝口碑'},
	                {value:234, name:'名单导入'},
	                {value:135, name:'微信活动'},
	                {value:154, name:'美团'},
	                {value:52, name:'大众点评'}
	            ],
	           
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            },
	            color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83']
	        }
	    ]
	};

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
	
});
