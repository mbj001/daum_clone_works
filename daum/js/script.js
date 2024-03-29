$(function(){
   let n = 0;
   viewSlide(n);

   $('.slide-left').click(function(){
      n--;
      if(n < 0){
         n = 4;
      }
      viewSlide(n);
   });

   $('.slide-right').click(function(){
      n++;
      if(n > 4){
         n = 0;
      }
      viewSlide(n);
   });

   $('.small-list').hover(function(){
      $(this).find('.small-navbox').toggle();
   });

   /** 검색이벤트 */
   $('.search-select').click(function(){
      if($(this).find('.fa-solid').hasClass('fa-angle-down')){
         $(this).find('.fa-solid')
                .removeClass('fa-angle-down')
                .addClass('fa-angle-up');
         $('.select-value').slideDown(100);       
      }else{
         $(this).find('.fa-solid')
                .removeClass('fa-angle-up')
                .addClass('fa-angle-down');
         $('.select-value').slideUp(100);        
      }
   });

   $('.select-value li').click(function(){
      const txt = $(this).text();  //선택한 text 가져옴
      $('.select-value li').removeClass('active');  //li에 모든 active지움
      $(this).addClass('active'); //선택한 부분에 active를 추가
      $('.search-select>span').text(txt);  //span에 가져온 text를 입력
      $('.search-form').focus();
   });

   $('.slider-list li').mouseenter(function(){
       $('.slider-list li').removeClass('active');
       $(this).addClass('active');
   });

   setInterval(autoSlide, 10000);

   var page_num = 1;
   var pop;
   
   $(".prev").click(function(){
      if(page_num == 1){
         return;
      }
      page_num--;
      pageMove(page_num, pop);
   })

   $(".last").click(function(){
      if(page_num == 10){
         return;
      }
      page_num++;
      pageMove(page_num, pop);
   })

   $.ajax({
      type: 'GET',
      url: 'data/list.json',
      dataType: 'json',
      success: function(data){
         //console.log(data.list);
         pop = data.list;
         let li="";
         for(let i = 0; i < 10; i++){
            li += `<li>
                  <a href="#">
                  <div class="d-flex">
                        <div class="img-thumb">
                           <img src="images/list/${pop[i].img}" alt="001" />
                        </div>
                        <p class="pop-num">${i+1}</p>
                        <p class="pop-text">${pop[i].title}</p>
                        <p class="pop-cafe-list">${pop[i].cafename}</p>
                        <span class="pop-comment">${pop[i].comment}</span>
                     </div> 
                  </a>
               </li>`;
         }

         $('.pop-list').html(li);
      },
      error: function(request, status, error){
         console.log(error);
      }
   });


});  //jquery

//자동실행 함수
function autoSlide(){
   let slide = $('.slide-row');
   let index = slide.index($('.zindex'));  //zindex가 위치한 순서를 읽어옴
   if(index == 4){  // 4보다 높으면 0으로 초기화
      n = 0;  
   }else{
      n = index + 1; 
   }
   viewSlide(n); 
}

function viewSlide(n) {
   $('.slide-row').removeClass('zindex');
   $('.slide-row').eq(n).addClass('zindex');
   $('.slider-list>li').css({
      opacity: 0,
      top: '30px',
      position:'relative'
   });

   $('.slider-list>li').animate({
       opacity: 1,
       top: '0px'
   }, 500);
}



function pageMove(page_num, pop){
   let li = "";

   for(let i = 0; i < 10; i++){
      li += `<li>
            <a href="#">
            <div class="d-flex">
                  <div class="img-thumb">
                     <img src="images/list/${pop[((page_num-1)*10)+i].img}" alt="001" />
                  </div>
                  <p class="pop-num">${((page_num-1)*10)+(i+1)}</p>
                  <p class="pop-text">${pop[((page_num-1)*10)+i].title}</p>
                  <p class="pop-cafe-list">${pop[((page_num-1)*10)+i].cafename}</p>
                  <span class="pop-comment">${pop[((page_num-1)*10)+i].comment}</span>
               </div> 
            </a>
         </li>`;
   }


   $('.pop-list').html(li);
   $(".active").html(page_num);
}
