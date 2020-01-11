function resize(){
if ($(window).width() < 768) {
$(".hero-hp img").attr('src','/images/HP3.png');
} else {
$(".hero-hp img").attr('src','/images/HP.png');
}
}
resize();
$(window).on('resize', resize);


AOS.init({
    duration: 1000
});
