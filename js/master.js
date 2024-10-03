/* Start Projects */
let demo = document.querySelectorAll(".projects .box .pr .content p");
let par = document.querySelectorAll(".projects .box .pr");

demo.forEach((de) => {
  de.addEventListener("click", (e) => {
    /* Start Overlay */
    let overlay = document.querySelector(".projects .container .overlay")
    overlay.classList.add("active");
    /* End Overlay */

    /* Srart Information */
    let info = document.createElement("div");
    info.classList.add("info")

    let img = document.createElement("img");
    img.src = e.target.parentElement.parentElement.querySelector("img").src;
    info.appendChild(img);

    let cont = document.createElement("div");
    cont.classList.add("cont");

    let name = document.createElement("h2");
    name.classList.add("name");
    let nameText = document.createTextNode(e.target.parentElement.parentElement.querySelector(".content h3").innerText)
    name.appendChild(nameText);

    let des = document.createElement("div");

    let deOne = document.createElement("span");
    let deTextOne = document.createTextNode("Technologies : " + e.target.dataset.tech);
    deOne.appendChild(deTextOne);

    let deTwo = document.createElement("span");
    let deTextTwo = document.createTextNode("Role : Frontend");
    deTwo.appendChild(deTextTwo);

    let deThree = document.createElement("span");
    let deTextThree = document.createTextNode("View : ");
    deThree.appendChild(deTextThree);

    let link = document.createElement("a");
    link.href = e.target.parentElement.parentElement.querySelector(".content h3 a").href;
    let linkText = document.createTextNode("Visit Project");
    link.target = "_blank";
    link.appendChild(linkText);

    link.addEventListener("click", (e) =>{
      e.preventDefault();
      window.open(link.href, "_blank");
    })

    let both = document.createElement("div");
    both.appendChild(deThree);
    both.appendChild(link);

    des.appendChild(deOne);
    des.appendChild(deTwo);
    des.appendChild(both);

    cont.appendChild(name);
    cont.appendChild(des);
    info.appendChild(cont);

    document.body.appendChild(info);
    /* End Information */

    /* Start Close */
      let close = document.createElement("div");
      close.classList.add("close");
      let closeText = document.createTextNode("X");
      close.appendChild(closeText);
      info.appendChild(close);

      close.onclick = function (){
        info.remove();
        overlay.classList.remove("active")
      }
    /* End Close */
  })
})
/* End Projects */
/*----------------------------------------------------*/
/* Start Toggle Menu */
let toggleMenu = document.querySelector(".toggle-menu");
let asideSection = document.querySelector(".aside");
let asideAppear = false;

window.onresize = function (){
  if(window.innerWidth <= 1200){
    asideSection.style.cssText = "margin-left: -270px";

    toggleMenu.onclick = function (){
      if(asideAppear === false){
      asideSection.style.cssText = "margin-left: 0px";
      this.style.cssText = "margin-left: 270px";
      this.innerHTML = "X";
      asideAppear = true;
      }else{
        asideSection.style.cssText = "margin-left: -270px";
        this.style.cssText = "margin-left: 0px";
        this.innerHTML = `<i class="fa-solid fa-bars"></i>`;
        asideAppear = false;
      }
    }
  }else{
    asideSection.style.cssText = "margin-left: 0";
  }
}
/* End Toggle Menu */
/*----------------------------------------------------*/
/* Start Active Side */
let links = document.querySelectorAll(".aside li a");
let sections = document.querySelectorAll(".main-container .main-content > div");
// Active When Click
links.forEach((link) => {
  link.addEventListener("click", (e) => {

    links.forEach((lin) => {
      lin.classList.remove("active");
    })

    e.target.classList.toggle("active");
  })
})

/* Start Scroll Active Side */
let scrollAside = function (){
  sections.forEach((sec) =>{
    let allScroll = window.scrollY
    let beforeSection = (sec.offsetTop - 200);
    let scrollSection = sec.offsetHeight;
    let classSection = sec.classList[0];

    if(allScroll >= beforeSection && allScroll < (scrollSection + beforeSection)){
      links.forEach((lin) => {
        lin.classList.remove("active");
      })
      links.forEach((lin) => {
        if(lin.dataset.section == classSection)
        lin.classList.add("active");
      })
    }
  })
}
/* End Scroll Active Side */
window.onload = scrollAside;
/* End Active Side */
/*----------------------------------------------------*/
/* Start Scroll */
let scrollBtn = document.querySelector(".go-up");
let homeSection = document.querySelector(".home");

window.onscroll = function (){

  /* Start Scroll Go Up */
  if(window.scrollY >= (homeSection.offsetHeight * 0.5)){
    scrollBtn.style.opacity = "1";
    scrollBtn.style.pointerEvents = "auto";
  }else{
    scrollBtn.style.opacity = "0";
    scrollBtn.style.pointerEvents = "none";
  }
  /* End Scroll Go Up */

  scrollAside();
}
/* End Scroll */
/*----------------------------------------------------*/
/* Start Skills Box */
let skillsSection = document.querySelector(".skills");
let skills = document.querySelectorAll(".skills span");

  skills.forEach((skill) => {
    skill.style.cssText = `background: conic-gradient(var(--skin-color) 0% ${skill.dataset.progress}, #ccc ${skill.dataset.progress} 100%);`
  })
/* End Skills Box */
/*----------------------------------------------------*/
/* End Projects */
let projects = document.querySelectorAll(".projects .project > div");
let projectsBtn = document.querySelectorAll(".projects .type button");

let localProjects = localStorage.getItem("localProj");

if(localProjects != null && localProjects !== "all"){
    projectsBtn.forEach((pro) => {
      // Reomve Active Class
      pro.classList.remove("active");

      // Add Active Class
      if(pro.classList[0] === localProjects){
        pro.classList.add("active");
      }
    })

  projects.forEach((pro) => {
    if(pro.classList[0] != (localProjects)){
      pro.style.display = "none";
    }
  })

  projects.forEach((pro) => {
    if(pro.classList.contains(localProjects)){
      pro.style.display = "block";
      pro.querySelector("h4").style.display = "none";
    }
  })
}

projectsBtn.forEach((proj) => {
  proj.addEventListener("click", (e) => {
    // Reomve Active Class
    projectsBtn.forEach((pro) => {
      pro.classList.remove("active");
    })

    // Add Active Class
    e.target.classList.add("active");

    // Local Storage
    localStorage.setItem("localProj", e.target.classList[0]);

    // Hide All Projects
    projects.forEach((pro) => {
      if(pro.classList[0] != (e.target.classList[0])){
        pro.style.display = "none";
      }
    })

    if(e.target.classList.contains("all")){
      // Show All Projects
      projects.forEach((pro) => {
        pro.style.display = "block";
        pro.querySelector("h4").style.display = "block";
      })
    }else{
      // Show Specific Projects
      projects.forEach((pro) => {
        if(pro.classList.contains(e.target.classList[0])){
          pro.style.display = "block";
          pro.querySelector("h4").style.display = "none";
        }
      })
    }

  })
})
/* End Projects */
/*----------------------------------------------------*/
/* Start Setting */
let colors = document.querySelector(".settings .colors");
let colorsSpan = document.querySelectorAll(".settings .colors span");
let colorBtn = document.querySelector(".settings .icons .color");
let modeBtn = document.querySelector(".settings .icons .mode");

/* Start Set Colors For Span */
colorsSpan.forEach((color) => {
  color.style.backgroundColor = color.dataset.color;
})
/* End Set Colors For Span */

/* Start Local Storeage Colors */
let localColors = localStorage.getItem("localColo");

if(localColors !== null){
  document.documentElement.style.setProperty("--skin-color", localColors);
}
/* End Local Storeage Colors */

/* Start Click On Color */
colorsSpan.forEach((color) => {
  color.addEventListener("click", (colo) => {

    colorsSpan.forEach((co) => {
      co.classList.remove("active");
    })

    document.documentElement.style.setProperty("--skin-color", colo.target.dataset.color);
    localStorage.setItem("localColo", colo.target.dataset.color)

    colo.target.classList.add("active");
  })
})
/* End Click On Color */

/* Start Open Color */
colorBtn.onclick = function (){
  colors.classList.toggle("active");
  colorBtn.classList.toggle("fa-spin");
}
/* End Open Color */

/* Start Mode */
let lightMode = true;

/* Start Local Storage Mode */
let localmode = localStorage.getItem("localmod");

if(localmode !== null){
  if(localmode === "dark"){
    darkModeProperties();
  }else{
    lightModeProperties();
  }
}
/* End Local Storage Mode */

function darkModeProperties(){
  document.documentElement.style.setProperty("--main-light-color", "#fff");
  document.documentElement.style.setProperty("--secondary-light-color", "#161516");
  document.documentElement.style.setProperty("--bg-light-100", "#232123");
  document.documentElement.style.setProperty("--border-color", "#777");
  document.documentElement.style.setProperty("--brder-theme-color", "#f2f2fc");
  document.documentElement.style.setProperty("--bg-scrollbar-color", "#232123");

  modeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  lightMode = false;
  localStorage.setItem("localmod", "dark");
}

function lightModeProperties(){
  document.documentElement.style.setProperty("--main-light-color", "#2a292e");
  document.documentElement.style.setProperty("--secondary-light-color", "#f2f2fc");
  document.documentElement.style.setProperty("--bg-light-100", "#fdf9ff");
  document.documentElement.style.setProperty("--border-color", "#e8dfec");
  document.documentElement.style.setProperty("--brder-theme-color", "#161516");
  document.documentElement.style.setProperty("--bg-scrollbar-color", "#fdf9ff");

  modeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  lightMode = true;
  localStorage.setItem("localmod", "light");
}

modeBtn.onclick = function (){
  if(lightMode){
    darkModeProperties();
  }else{
    lightModeProperties();
  }
}
/* End Mode */
/* End Setting */