
// Preloader
window.addEventListener("load" , function(){
	document.querySelector(".preloader").classList.add("opacity-0");
	setTimeout(function(){
		document.querySelector(".preloader").style.display = "none";
	},1000)
})

// Portfolio Item Filter
const filterContainer = document.querySelector(".portfolio-filter"),
	  filterBtns = filterContainer.children,
	  totalFilterBtn = filterBtns.length,
	  portfolioItems = document.querySelectorAll(".portfolio-item"),
	  totalPortfolioItem = portfolioItems.length;


for (var i = 0; i < totalFilterBtn; i++) {
	filterBtns[i].addEventListener("click" , function(){
		filterContainer.querySelector(".active").classList.remove("active");
		this.classList.add("active");

		const filterValue = this.getAttribute("data-filter");
		for(let k=0; k<totalPortfolioItem; k++){
			if(filterValue === portfolioItems[k].getAttribute("data-category")){
				portfolioItems[k].classList.remove("hide");
				portfolioItems[k].classList.add("show");
			}
			else{
				portfolioItems[k].classList.remove("show");
				portfolioItems[k].classList.add("hide");
			}
			if(filterValue === "all"){
				portfolioItems[k].classList.remove("hide");
				portfolioItems[k].classList.add("show");
			}
		}
	})
}

//Portfolio Lightbox

const lightbox = document.querySelector(".lightbox"),
	  lightboxImg = lightbox.querySelector(".lightbox-img"),
	  lightboxText = lightbox.querySelector(".caption-text"),
	  lightboxClose = lightbox.querySelector(".lightbox-close"),
	  lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;
for(let i=0; i<totalPortfolioItem; i++){
	portfolioItems[i].addEventListener("click" , function(){
		itemIndex = i;
		changeItem();
		toggleLightBox();
	})
}
function nextItem(){
	if(itemIndex === totalPortfolioItem-1){
		itemIndex = 0;
	}
	else{
		itemIndex++;
	}
	changeItem();
}

function prevItem(){
	if(itemIndex === 0){
		itemIndex = totalPortfolioItem-1;
	}
	else{
		itemIndex--;
	}
	changeItem();
}
function changeItem(){
	var imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
	lightboxImg.src = imgSrc;
	lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
	lightboxCounter.innerHTML = (itemIndex+1) + " of " + totalPortfolioItem;
}
function toggleLightBox(){
	lightbox.classList.toggle("open");
}

// Close Lightbox

lightbox.addEventListener("click" , function(event){
	if(event.target === lightboxClose || event.target === lightbox){
		toggleLightBox();
	}
})

// Aside Navbar

const nav = document.querySelector(".nav"),
	  navList = nav.querySelectorAll("li"),
	  totalNavList = navList.length,
	  allSection = document.querySelectorAll(".section"),
	  totalSection = allSection.length;
for (var i = 0; i < totalNavList; i++) {
	const a = navList[i].querySelector("a");
	a.addEventListener("click" , function(){
		// Removing back-section
		removeBackSectionClass();

		for(var j=0; j<totalNavList; j++){
			if(navList[j].querySelector("a").classList.contains("active")){
				// Adding back-section
				addBackSectionClass(j);
				
			}
			navList[j].querySelector("a").classList.remove("active");
		}
		this.classList.add("active");
		showSection(this);

		if(window.innerWidth<1200){
			asideSectionTogglerBtn();
		}
	})
}

function removeBackSectionClass(){
	for(let i=0; i<totalSection; i++){
		allSection[i].classList.remove("back-section");
	}
}

function addBackSectionClass(num){
	allSection[num].classList.add("back-section");
}

function showSection(element){
	// removing active class from all section
	for(let i=0; i<totalSection; i++){
		allSection[i].classList.remove("active");
	}
	const target = element.getAttribute("href").split("#")[1];
	document.querySelector("#"+target).classList.add("active");
}

function updateNav(element){
	for(let i=0; i<totalNavList; i++){
		navList[i].querySelector("a").classList.remove("active");
		const target = element.getAttribute("href").split("#")[1];
		if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
			navList[i].querySelector("a").classList.add("active");
		}
	}
}

document.querySelector(".hire-me").addEventListener("click" , function(){
	const sectionIndex = this.getAttribute("data-section-index");
	showSection(this);
	updateNav(this);
	removeBackSectionClass();
	addBackSectionClass(sectionIndex);
})

//Nav Toggler
const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click" , function(){
	asideSectionTogglerBtn();
})
function asideSectionTogglerBtn(){
	aside.classList.toggle("open");
	navTogglerBtn.classList.toggle("open");
	for(let i=0; i<totalSection; i++){
		allSection[i].classList.toggle("open");
	}
}

// Visit Counter

const counter = document.querySelector(".counter");
function updateCounter(){
	fetch("https://api.countapi.xyz/update/myportfolio.com/portfolio/?amount=1")
	.then(res => res.json())
	.then(function(data){
		if(data.value<10){
			counter.innerHTML = "0"+data.value;
		}
		else{
			counter.innerHTML = data.value;
		}
	})
}
updateCounter();
