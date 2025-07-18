(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

//   let taxSwitch = document.getElementById("flexSwitchCheckDefault");
//         taxSwitch.addEventListener("click", () => {
//             let taxInfo = document.getElementsByClassName("tax-info");
//             for (let info of taxInfo) {
//                 if (info.style.display != "inline")
//                     info.style.display = "inline";
//                 else
//                     info.style.display = "none";
//             }

//         });
        window.onload = () => {
    const taxSwitch = document.getElementById("flexSwitchCheckDefault");
    if (taxSwitch) {
        taxSwitch.addEventListener("click", () => {
            const taxInfo = document.getElementsByClassName("tax-info");
            for (let info of taxInfo) {
                info.classList.toggle("hidden");
            }
        });
    }
};


        //navbar h4
        let notFound = document.getElementById("myDiv");

        //index.ejs script 

        function filterListing(value) {

          let elements = document.querySelectorAll(".cards");

          elements.forEach((element) => {

              if (value == "All") {
                  element.classList.remove("hide");
              }
              else {
                  if (element.classList.contains(value)) {
                      element.classList.remove("hide");
                  }
                  else {
                      element.classList.add("hide");
                  }
              }
              
          });

      }

      window.onload = () => {
          filterListing("All");
      }


      //navbar.ejs script

      document.getElementById("search-btn").addEventListener("click",()=>{

        let searchInput = document.getElementById("input-search").value;
        let elements = document.querySelectorAll(".listing-title");
        
        let cards = document.querySelectorAll(".cards");
        let check = false;
       
    
        elements.forEach((element,index)=>{
            if(element.innerText.toUpperCase().includes(searchInput.toUpperCase()) ){
                check= true;
                cards[index].classList.remove("hide");
                notFound.classList.add("hide");
    
            }
            else {
                cards[index].classList.add("hide");
            }
            
        }); 
        if(!check){
         notFound.classList.remove("hide");
         filterListing("All");
        }  
        
    });
//Dragging Functionality 
const wrapper = document.querySelector(".wrapper");
arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false;
const handleIcons = (scrollVal)=>{
    let maxScrollableWidth = wrapper.scrollWidth-wrapper.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal<=0?"none":"flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth-scrollVal<=1?"none":"flex";
}

arrowIcons.forEach(icon=>{
    icon.addEventListener("click",()=>{
        
         let scrollWidth = wrapper.scrollLeft += icon.id ==="left"? -340:340;
         handleIcons(scrollWidth);
    });
});


   