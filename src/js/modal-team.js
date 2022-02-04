const openBtnEl=document.querySelector(".footer__btn")
const modalOurTeamEl=document.querySelector(".backdrop-ourteam")
const closeBtnEl=document.querySelector(".modal-ourteam__closeBtn")
const backdrop=document.querySelector(".backdrop-ourteam")
openBtnEl.addEventListener("click", openModal)
function openModal() {
    modalOurTeamEl.classList.remove("is-hidden") 
    closeBtnEl.addEventListener("click",closeModal)
    document.body.addEventListener("keydown",closeModalEsc)
    backdrop.addEventListener("click",event=>{
        if(event.target===backdrop)
        {
            return closeModal()   
        }
    })
}
function closeModal(){
    modalOurTeamEl.classList.add("is-hidden")
    closeBtnEl.removeEventListener("click",closeModal)
    document.body.removeEventListener("keydown",closeModalEsc)
}
function closeModalEsc (e){
    if(e.key==="Escape")
    {
        return closeModal()
    }
}
