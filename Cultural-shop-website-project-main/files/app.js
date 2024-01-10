//responsive menu
 const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
});
//accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
   
    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


//search
const searchbox=document.getElementById('search-item').value.toUpperCase();
const storeitems=document.getElementById('grid')
const product=document.querySelectorAll('.card')
const pname=document.getElementByTagName('h4')
    for (var i=0; i<pname.length; i++){
        let match=product[i].getElementByTagName('h4')[0];
        if (match){
            let (textvalue.toUpperCase().indexOf(searchbox)>-1)
            {
                product[i].style.display=""
            }
        }
            else{
                product[i].style.display="none"
            }
        
      
    }
