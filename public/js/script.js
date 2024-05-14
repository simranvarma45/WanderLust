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

  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
        taxSwitch.addEventListener("click", () => {
            let taxInfo = document.getElementsByClassName("tax-info");
            for (info of taxInfo) {
                if (info.style.display != "inline")
                    info.style.display = "inline";
                else
                    info.style.display = "none";
            }

        });

        //navbar h4 
        let h4 = document.querySelector("h4");

        //index.ejs script 

        function filterListing(value) {

          let elements = document.querySelectorAll(".cards");

          elements.forEach((element) => {
            if(!(h4.classList.contains("hide"))){
              h4.classList.add("hide");
            }
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

      // window.onload = () => {
      //     filterListing("All");
      // }

      //navbar.ejs script

      document.getElementById("search-btn").addEventListener("click",()=>{

        let searchInput = document.getElementById("input-search").value;
        let elements = document.querySelectorAll(".listing-title");
        
        let cards = document.querySelectorAll(".cards");
        let check = false;
        
    
        elements.forEach((element,index)=>{
            if(element.innerText.toUpperCase().includes(searchInput.toUpperCase()) ){
             
                cards[index].classList.remove("hide");
    
            }
            else {
                cards[index].classList.add("hide");
            }
            if(!(cards[index].classList.contains("hide"))){
                check= true;
            }
        }); 
        if(!check){
         h4.classList.remove("hide");
         throw new Error("Listing Not found!!");
        }
        else{
            h4.classList.add("hide");
        }
    });