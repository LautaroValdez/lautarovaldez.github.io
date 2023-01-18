/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav_menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav_menu')
    // Cuando hacemos click en cada nav_link se remueve la clase show-menu
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Tema seleccionado previamente (si está seleccionado por el usuario)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtenemos el modo actual que tenga la interfaz validando la clase 'dark-theme' 
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// Validamos si el usuario eligio previamente un tema
if (selectedTheme) {
  //  Si se cumple la validación, preguntamos cuál fue el problema para saber si activamos o desactivamos la oscuridad.
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activar / Desactivar el modo manualmente con el boton
themeButton.addEventListener('click', () => {
    // Agregar o remover el icono modo oscuro
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // Guardamos el modo actual y el icono que el usuario eligio 
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== REDUCIR EL TAMAÑO Y IMPRIMIR EN HOJA A4 ====================*/ 
function scaleCV(){
    document.body.classList.add('scale-cv')
}

/*==================== ELIMINA EL TAMAÑO CUANDO SE DESCARGA EL CV ====================*/ 
function removeScale(){
    document.body.classList.remove('scale-cv')
}

/*==================== GENERAR PDF ====================*/ 
//  Area PDF generada

let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')

// Html2pdf opciones
let opt = {
    margin:       1,
    filename:     'miCV.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 4 },
    jsPDF:        { format: 'a4', orientation: 'portrait' }
};

// Función para llamar a las opciones areaCv y Html2Pdf 
function generateResume(){
    html2pdf(areaCv, opt)
}

// Cuando se clickea el boton se ejecutan 3 funciones 
resumeButton.addEventListener('click', () =>{
    // 1. La clase .scale-cv se añade al body, reduciendo el tamaño de los elementos
    scaleCV()

    // 2. Se genera el PDF
    generateResume()

    // 3. La clase .scale-cv se elimina del body después de 5 segundos para volver al tamaño normal.
    setTimeout(removeScale, 5000)
})