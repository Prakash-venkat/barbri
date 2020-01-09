// Dynamic page title for all components using props

export const customPageTitle =(pageTitle)=>{
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    let title = document.querySelector("title");
    let titleText = `${pageTitle + `${" | "}` + 'Multistate Edge'}`
    title.innerText = titleText;
  }