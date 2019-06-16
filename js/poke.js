$(function () {
    let poke = [];
    let colorArr = ['h','d','s','c'];
    let flag = {};
    let box = $('.box');

    for(let i = 0;i<52;i++){
        let index = Math.floor(Math.random()*colorArr.length);
        let color = colorArr[index];
        let number = Math.round(Math.random()*12+1);

        while (flag[color + '_' + number]){
            index = Math.floor(Math.random()*colorArr.length);
            color = colorArr[index];
            number = Math.round(Math.random()*12+1);
        }
        poke.push({color,number});
        flag[color + '_' + number] = true;
    }

    let index = -1;
    for(let i = 0;i<6;i++){
        for (let j = 0;j<=i;j++){
            index++;
            let obj = poke[index];
            let left = 450 - 50 * i + 100 * j , top = 40 * i;
            $('<div>').addClass('poke')
                .css({backgroundImage: `url(./imgs/${obj.number}${obj.color}.jpg)`})
                .appendTo('.box')
                .attr('id',i + '_' + j)
                .data('num',obj.number)
                .delay(index*50)
                .animate({left:left,top:top,opacity:1});
        }
    }

    for(;index<52;index++){
        let obj = poke[index];
        $('<div>').addClass('poke')
            .addClass('left')
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .appendTo('.box')
            .attr('id','-2_-2')
            .data('num',obj.number)
            .delay(index*100)
            .animate({left:40,top:340,opacity:1});
    }

    //选牌，事件委派
    //(i,j)
    //(i+1,j)  (i+1,j+1)
    //
    let first = null;
    box.on('click','.poke',function () {
        let [i,j] = $(this).attr('id').split('_');
        let id1 = (i*1+1+'_'+j) , id2 = (i*1+1+'_'+(j*1+1));
        if($('#'+id1).length || $('#'+id2).length){
            return;
        }
        if($(this).hasClass('active')){
            $(this).removeClass('active').animate({top:'+=25px'});
        }else {
            $(this).addClass('active').animate({top:'-=25px'});
        }

        if(!first){
           first = $(this);
        }else{
            let number1 = first.data('num') ,number2 = $(this).data('num');
            if(number1 + number2 === 14){
                $('.active').animate({top:0,left:700,opacity:0},function () {
                    $(this).remove();
                })
            }else {
                $('.active').animate({top:'+=25px'},function () {
                    $(this).removeClass('active');
                })
            }
            first = null;
        }
    })

    let n = 0;
    $('.rightBtn').on('click',function () {
        $('.left').last().css('zIndex',n++).animate({left:700},function () {
            $(this).removeClass('left').addClass('right');
        })
    })
    $('.leftBtn').on('click',function () {
        $('.right').first().css('zIndex',n++).animate({left:40},function () {
            $(this).removeClass('right').addClass('left');
        })
    })

    $('.send').on('click',function () {
        for(let i = 0;i<6;i++){
            for (let j = 0;j<=i;j++){
                console.log($('div').attr('id'));
            }
        }
    })

})