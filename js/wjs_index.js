$(function(){
    //判断屏幕是否为移动端的屏幕
    var isMobile=true;
   function init(){
    $.ajax({
        url:'./data/wjs_data.json',
        type:'get',
        dataType:'json',
        success:function(result){
            // console.log(result);
            if($(window).width()>768){
                //非小屏幕
                isMobile=false;
            }else{
                //是小屏幕
                isMobile=true;
            }
            //调用模板引擎生成动态数据，获取图片数据的时候，需要将屏幕的信息传递过去，才能获取对应的大图或小图
            var bannerHtml=template('bannerTemp',{'list':result,isMobile:isMobile});
            $('.carousel-inner').html(bannerHtml)
            // console.log(bannerHtml);
            //点标记、分页器
            var indicatorsHtml=template('IndicatorsTemp',{'list':result})
            $('.carousel-indicators').html(indicatorsHtml)
        //     console.log( $('.carousel-indicators'));
        //     console.log(indicatorsHtml);
        //
         }
    })
}
    init();
    $(window).on('resize',function(){
        // 如果宽度从768以下变化到768以上，重新刷新页面
        // 如果宽度从768以上变化到768以下，重新刷新页面
        if((isMobile && $(window).width>768) || (!isMobile && $(window).width<768) ){
            isMobile && $(window).width>768 ? false:true;
            init()
        }
    })
    //原生touch事件来实现滑动操作
    var clientX,distanceX;
    //juery取到的是数组对象，需要通过索引取出来才能变成dom对象，才能使用原生js的方法
    var carousel_inner=$('.carousel-inner')[0];
    //监听touchstart 事件，获取起始坐标
    carousel_inner.addEventListener('touchstart',function(e){
        //在touchstart事件中通过targetTouches获取手指的信息
        clientX=e.targetTouches[0].clientX;
    })
    //监听touchend事件，获取手指弹起坐标
    carousel_inner.addEventListener('touchend',function(e){
        //在end事件中，只有通过changedTouches事件才能获取到手指的相关数据
        distanceX=e.changedTouches[0].clientX-clientX;
        //绝对值 判断手指滑动的范围，如果满足条件则换图，否则回弹
        if(Math.abs(distanceX)>50){
            if(distanceX>0){
                //在插件中没有封装滑动事件，
                //但是可以调用对应的方法来实现移动端的滑动轮播效果
                $('.carousel').carousel('prev')
            }else{
                $('.carousel').carousel('next')
            }
        }
    })
    //初始化宝和北的提示工具
    $('[data-toggle="tooltip"]').tooltip()
    //获取产品导航块所有li元素的宽度，并且将宽度赋值给最近的父容器
    lis=$('.wjs_proNav>ul').find('li');
    var totalWidth=0;
    lis.each(function(index,value){
        // outerWidth(true):获取内容+padding+border+margin
        totalWidth+=$(value).outerWidth(true);
    })
    // console.log(totalWidth);
    //要想实现滑动，还得添加相关的配置
    $('.wjs_proNav>ul').width(totalWidth+2);
    // 使用iScroll实现导航项的滑动
    var myScroll =  new  IScroll('.wjs_proNav',{
        scrollX: true, //支持水平滑动
        scrollY: false //设置不支持垂直滑动
    })
})