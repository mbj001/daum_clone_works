$(function(){
    // $("input").click(function(){
    //     $('input').css('border', '3px solid #333');
    // });
});      //

function popupClick(){
    // document.getElementsByClassName("popup-menu").style.display = "block";

    if(document.getElementById("popup-menu").style.display == "block"){
        document.getElementById("popup-menu").style.display = "none";
    }
    else{
        document.getElementById("popup-menu").style.display = "block";
    }

}