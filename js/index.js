$(function(){
	var canvas=$('#canvas').get(0);
	var ctx=canvas.getContext('2d');
//	var canvasb=$('#canvasb').get(0);
//	var ctx1=canvasb.getContext('2d');
//	var canvast=$('#canvast').get(0);
//	var ctx2=canvast.getContext('2d');
//	ctx1.translate(100,100);
//		function clock(){
//		ctx1.clearRect(-100,-100,200,200);
//		ctx1.save();	
//		function biao(){
//			ctx1.beginPath();
//			if(i%5==0){
//				ctx1.moveTo(0,-70);
//			}else{
//				ctx1.moveTo(0,-80);
//			}
//			ctx1.lineTo(0,-100);
//			ctx1.closePath();	
//			ctx1.stroke();
//			
//		}
//		for(var i=0;i<60;i++){
//			biao()
//			ctx1.rotate(Math.PI/30)
//		}
//		ctx1.restore();
//		
//		
//		//秒针
//		var date=new Date();
//		var s=date.getSeconds();	
//		ctx1.save();
//		ctx1.rotate(2*Math.PI*s/60);
//		ctx1.save();
//		ctx1.beginPath();
//		ctx1.moveTo(0,20);
//		ctx1.lineTo(0,10);
//		ctx1.moveTo(10,0);
//		ctx1.arc(0,0,10,0,2*Math.PI);
//		ctx1.moveTo(0,-10);
//		ctx1.lineTo(0,-60);
//		ctx1.stroke();
//		ctx1.closePath();	
//		ctx1.restore();
//		ctx1.restore();
//	}
//	setInterval(clock,1000)
//	
//	
//	
//	ctx2.translate(100,100);
//		function clock1(){
//		ctx2.clearRect(-100,-100,200,200);
//		ctx2.save();	
//		function biao1(){
//			ctx2.beginPath();
//			if(i%5==0){
//				ctx2.moveTo(0,-70);
//			}else{
//				ctx2.moveTo(0,-80);
//			}
//			ctx2.lineTo(0,-100);
//			ctx2.closePath();	
//			ctx2.stroke();
//			
//		}
//		for(var i=0;i<60;i++){
//			biao1()
//			ctx2.rotate(Math.PI/30)
//		}
//		ctx2.restore();
//		
//		
//		//秒针
//		var date=new Date();
//		var s=date.getSeconds();
//		ctx2.save();
//		ctx2.rotate(2*Math.PI*s/60);
//		ctx2.save();
//		ctx2.beginPath();
//		ctx2.moveTo(0,20);
//		ctx2.lineTo(0,10);
//		ctx2.moveTo(10,0);
//		ctx2.arc(0,0,10,0,2*Math.PI);
//		ctx2.moveTo(0,-10);
//		ctx2.lineTo(0,-60);
//		ctx2.stroke();
//		ctx2.closePath();	
//		ctx2.restore();
//		ctx2.restore();
//	}
//	setInterval(clock1,500)
	var ROW=15;
	var width=canvas.width;
	var off=width/ROW;
	var flag=true;
	var block={};
	var ai=false;
    var blank={};
    for(var i=0;i<ROW;i++){
        for(var j=0;j<ROW;j++){
            blank[p2k(i,j)]=true;
        }
    }
//  console.log(blank);
	function o2k(position){
		return position.x+'_'+position.y;
	}
	function p2k(x,y){
		return x+'_'+y;
	}
	function review(){
        var i=1;
        for(var pos in block){
            // k2o(pos)
            drawText(k2o(pos),i,block[pos]);
            i++;

        }
    }
    function k2o(pos){
        var arr=pos.split('_');
        return {x:parseInt(arr[0]),y:parseInt(arr[1])};
    }
    function drawText(pos,text,color){
        ctx.save();
        if(color=="black"){
            ctx.fillStyle="white";
        }else if(color=="white"){
            ctx.fillStyle="black";
        }
        ctx.font="16px 微软雅黑";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillText(text,(pos.x+0.5)*off,(pos.y+0.5)*off);
        ctx.restore();
    }
	//检查棋子的摆放位置
	function check(pos,color){
		 var rowNum=1;
        var colNum=1;
        var leftNum=1;
        var rightNum=1;
        var table={};
        for(var i in block){
            if(block[i]==color){
                table[i]=true;
            }
        }
        // console.log(table);
        var tx=pos.x;
        var ty=pos.y;
        while(table[p2k(tx+1,ty)]){
            rowNum++;
            // console.log(num)

            tx++;
        }
        tx=pos.x;
        ty=pos.y;
        while(table[p2k(tx-1,ty)]){
            rowNum++;
            tx--;

        }
        // console.log(num)

         var tx=pos.x;
         var ty=pos.y;

          while(table[p2k(tx,ty+1)]){
              colNum+=1;
              ty++;
          }
          var tx=pos.x;
          var ty=pos.y;
          while(table[p2k(tx,ty-1)]){
              colNum++;
              ty--;
          }
        // console.log(cos);
         //
         tx=pos.x;
         ty=pos.y;
         while(table[p2k(tx+1,ty+1)]){
             leftNum++;
             ty++;
             tx++;
         }
         tx=pos.x;
         ty=pos.y;
         while(table[p2k(tx-1,ty-1)]){
             leftNum++;
             ty--;
             tx--;
         }

        //
        tx=pos.x;
        ty=pos.y;
        while(table[p2k(tx+1,ty-1)]){
            rightNum++;
            ty--;
            tx++;
        }
        tx=pos.x;
        ty=pos.y;
        while(table[p2k(tx-1,ty+1)]){
            rightNum++;
            ty++;
            tx--;
        }
        var max=Math.max(rowNum,colNum,leftNum,rightNum)
        // return num>=5||cos>=5 || xie>=5 ||n>=5;
        return max;
		
	}
	//画5个小圆
	function drawCicle(x,y){
		ctx.beginPath();
		ctx.arc((x+0.5)*off+0.5,(y+0.5)*off+0.5,3,0,Math.PI*2)
		ctx.fill();
		ctx.closePath();
	}
	//画棋子
	function drawChess(position,color){
		ctx.save();
		ctx.beginPath();
		ctx.translate((position.x+0.5)*off+0.5,(position.y+0.5)*off+0.5)
		var radgrad = ctx.createRadialGradient(-2,-2,2,0,0,15);
	    radgrad.addColorStop(0, '#fff');
	    radgrad.addColorStop(1, '#000');
		if(color=='black'){  
			ctx.fillStyle=radgrad;
		}else{
			ctx.shadowOffsetX = 2;
		  	ctx.shadowOffsetY = 2;
		  	ctx.shadowBlur = 4;
		  	ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
			ctx.fillStyle='white'
		}
		ctx.arc(0,0,15,0,Math.PI*2)
		block[o2k(position)]=color;
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
	//画15X15的方格
	function draw(){
		ctx.beginPath();
		for(var i=0;i<ROW;i++){
				ctx.moveTo(off/2+0.5,off/2+0.5+i*off);
				ctx.lineTo((width-off/2)+0.5,off/2+0.5+i*off);
				ctx.moveTo(off/2+0.5+i*off,off/2+0.5);
				ctx.lineTo(off/2+0.5+i*off,(width-off/2)+0.5);	
		}
		ctx.stroke();
		ctx.closePath();	
		drawCicle(3,3)
		drawCicle(11,3)
		drawCicle(7,7)
		drawCicle(3,11)
		drawCicle(11,11)
	}
	draw()
	
	$('canvas').on('click',handleClick);
    draw();
  function handleClick(e){
      var position={x:Math.round((e.offsetX-off/2)/off),y:Math.round((e.offsetY-off/2)/off)};
      // console.log(position.x*off);
      if(block[o2k(position)]){
          return;
      }
      //判断黑棋
      if(ai){
          drawChess(position,'black');
          drawChess(AI(),'white');
          if(check(position,'black')>5){
              alert('黑棋赢');
              // hei.show();
              $(canvas).off('click');
              if(confirm('是否生成棋谱')){
                  review();
              }
              return;
          }
          if(check(AI(),'white')>5){
              alert('白棋赢');
              // bai.show();
              $(canvas).off('click');
              if(confirm('是否生成棋谱')){
                  review();
              }
              return;
          }
          return;
      }

      if(flag){
       drawChess(position,'black');
//     $(canvasb).css({
//     	display:'block'
//     })
       if(check(position,'black')>=5){

       alert('黑棋赢');
       $('canvas').off('click');
       if(confirm('是否生成棋谱')){
       review();
       }
       return;
       }
       }else{
       drawChess(position,'white');
//     $(canvast).css({
//     	display:'block'
//     })
       if(check(position,'white')>=5){
       alert('白棋赢')
       $('canvas').off('click');
       if(confirm('是否生成棋谱')){
       review();
       }
       return;
       }
       }
       flag=!flag;
  }
    function restart(){
        ctx.clearRect(0,0,width,width);

        block={};
//      console.log(block);
        flag=true;
        $('canvas').off('click').on('click',handleClick);
        draw();

    }
    $('.left-box .reset').on('click',function(){
        restart();
    })
    $('.left-box .ai').on('click',function(){
        ai=!ai;
        
//      $(this).toggleClass('active');

    })
    function AI(){
        var max1=-Infinity;
        var pos1;
        var max2=-Infinity;
        var pos2;
        for(var i in blank){
           var score1= check(k2o(i),'black');
            if(score1>max1){
                max1=score1;
                pos1=k2o(i);
            }
        }
        for(var i in blank){
            var score2= check(k2o(i),'white');
            if(score2>max2){
                max2=score2;
                pos2=k2o(i);
            }
        }
        if(max2>=max1){
            return pos2;
        }else{
            return pos1;
        }
    }
	
	
	
	//点击开始
	$('.left-box .start').on('click',function(){
		$('.shan-box').css('display','block').delay(500).queue(function(){
			$(this).css("display","none")
			.dequeue()
		})
	})
})
