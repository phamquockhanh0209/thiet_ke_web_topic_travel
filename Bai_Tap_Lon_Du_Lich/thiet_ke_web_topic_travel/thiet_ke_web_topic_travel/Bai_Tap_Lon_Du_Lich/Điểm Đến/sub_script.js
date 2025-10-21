
document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
}
document.querySelectorAll('.see-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('section2').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
});
