$.fn.extend({
  animateCss: function (animationName,cb) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
          $(this).removeClass('animated ' + animationName);
          if(cb){
            cb();
          }
      });
      return this;
  }
});
var GAME = {
  $cards:null,
  $shadebg:null,
  marquessTime:null,
  centerPoint:{
    left:0,
    top:0
  },
  init:function(cardsbox,shadeId){
    this.$cards= $(cardsbox).find(".game-card");
    this.centerPoint.left = ($(cardsbox).width() - this.$cards.eq(0).width())/2;
    this.centerPoint.top = ($(cardsbox).height() - this.$cards.eq(0).height())/2;
    this.$shadebg= $(shadeId);
    this.bindEvent();
    this.dealCard();
  },
  bindEvent(){
    var self = this;
    this.$cards.on('click',function(){
      self.showDialog($(this));
    });
    $("#closeBtn").on('click',function(){
      self.closeResult();
    })
  },
  clearMarquess(){
    if(this.marquessTime){
      clearTimeout(this.marquessTime);
      this.marquessTime = null;
    }
  },
  showDialog($item){
    this.clearMarquess();
    this.$shadebg.show();
    $item.removeClass('clight');
    $item.addClass("all-props card-shake");
    $item.css({
      'zIndex':99,
      'left':this.centerPoint.left+'px',
      'top':this.centerPoint.top+'px',
      'width':$item.width()*1.5+'px',
      'height':$item.height()*1.5+'px'
    });
    this.doAjax($item)
  },
  doAjax($item){
    var self = this;
    setTimeout(function(){
      self.itemReset($item);
      self.reset();
      self.showResult({status:'200',message:'可以打电话的手表',img:'./src/xkfdickkja.jpg'});
    },2000);
  },
  showResult(data){
    if(data.status == '200'){
      $('#win-result').css('display','block');
      var $light = $('#win-result').find('.light');
      $light.animateCss('rotateIn',function(){
        $light.addClass('lightrun');
      });
    }
  },
  closeResult(){
    this.$shadebg.hide();
    $('#win-result').css('display','none');
    $('#win-result').find('.light').removeClass('lightrun');
    this.dealCard();
  },
  itemReset($item){
    $item.removeClass('all-props card-shake');
    $item.removeAttr('style');
  },
  dealCard:function(){
    var self = this;
    setTimeout(function(){
      self.$cards.each(function(i){
        $(this).addClass("card-"+(i+1));
       });
    },500);
    this.marquee(3500);
  },
  reset:function(){
    var self = this;
    setTimeout(function(){
      self.$cards.each(function(i){
        $(this).removeClass("card-"+(i+1));
        $(this).removeClass("clight");
       });
      self.clearMarquess();
    },500);
  },
  marquee:function(delay){
    var self = this;
    var size = this.$cards.size();
    setTimeout(function(){
      function run(i){
        self.$cards.removeClass('clight');
        self.$cards.eq(i).addClass("clight");
        self.marquessTime = setTimeout(function(){
          if(i>=size){
            i = 0;
          }else{
            i++;
          }
          run(i);
        },500);
      }
      run(0);
    },delay);
  }

}