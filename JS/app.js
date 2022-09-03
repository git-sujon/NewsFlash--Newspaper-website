const loadCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url)
        const data = await res.json()
        findCategories(data.data.news_category)
       
    }
    catch {
        console.log(error)
    }
}

const findCategories = categories => {
    const categoriesHolder = document.getElementById("all-categories")
    categories.forEach(category => {
        // console.log(category)
        const createCategory = document.createElement("div")
        createCategory.innerHTML = `<p class="me-4 btn btn-outline-danger" onclick="loadNews(${category.category_id})" class="me-4">${category.category_name}</p>`
        categoriesHolder.append(createCategory)
    });
}

const loadNews = async (id) => {
    // console.log(id)
    // running sppiner
    toggleSpinner(true)
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
        const res = await fetch(url)
        const data = await res.json()
        displayNews(data.data)
    }
    catch {
        console.log(error)
    }
}

const displayNews = (idData) => {

    // console.log(idData.length)
    // sorting in Descending
    idData.sort((a,b) => b.total_view-a.total_view)
    
    let newsCount= idData.length
   
    // if(newsCount === 0) {
    //     newsCount=newsCount+1
    // }
    //  console.log(newsCount)
    const getPostHolder = document.getElementById("post-holder-id")
    getPostHolder.innerHTML = ''
    // const newsCategoriesName= document.getElementById("")
   
    
    idData.forEach(data => {
        const createDiv = document.createElement("div")
        // newsPost Start 
        // console.log(data.total_view)
       
        
        
        
        createDiv.innerHTML = `
        <div class="mb-4">
        <div class="row  bg-white">
            <div class="col-3 post-thumb">
                <div class="m-3 rounded">
                    <img src="${data.thumbnail_url}" class="img-fluid" alt="">
                </div>
            </div>
            <!-- News Post Start -->
            <div class="col-9 post-body">
                <div class="my-3 me-3">
                    <h4>${data.title}</h4>
                    <p>${(data.details).slice(0, 300)}<span  class="d-sm-none">...</span></p>
                    <p  class="d-none d-md-block"><span>${(data.details).slice(300, 500)}</span>...</p>
                </div>
                <div>
                    <div class="post-footer d-flex justify-content-between  align-items-center ">

                        <div class="author-details d-flex">
                            <div class="author-img">
                                <img src="${data.author ? data.author.img : "No Image"}" class="img-fluid" alt="">
                            </div>
                            <div class="author-info ms-3 align-items-center ">
                                <h6 class="mb-0 fw-bold">${((data.author) ? (data.author.name === null ? "No Data Found" : data.author.name) : 'No Data Found') || ((data.author) ? (data.author.name === '' ? "No Data Found" : data.author.name) : 'No Data Found')}</h6>
                                <p class="text-secondary mb-0">${(data.author) ? (data.author.published_date === null ? "No Data Found" : data.author.published_date) : 'No Data Found'}</p>
                            </div>
                        </div>
                
                        <div class="view-counter align-items-center ">
                            <span><i class="fa fa-eye" aria-hidden="true"></i></span>
                            <span class="fw-bold">${data.total_view ? data.total_view : "No Data Found"}</span>
                        </div>

                        <div class="post-icons d-none d-md-block">
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star-half" aria-hidden="true"></i></span>
                        </div>

                        <!-- News Details Button -->
                        <div class="modal-button">
                            <button onclick="modalDetailsLoad('${data._id}')" id="modal-details-id" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                        </div>
                        

                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="news-modal-details" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="news-modal-details"></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div id="modal-body-id" class="modal-body">
                              

                              
                            


                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        



                </div>
            </div>
        </div>
    </div>
        
        `
        // NewsPost End 
        getPostHolder.appendChild(createDiv)
        
     
    })

    // ADDing News Count 
    const newsCountHolder= document.getElementById("news-count")
    newsCountHolder.innerText=`${newsCount === 0 ? "No ": newsCount}`

    
    // Stoping Spiner 
    toggleSpinner(false)
  
   

}

const toggleSpinner =isSpine => {
    const spinnerHolder= document.getElementById("spinner-id")
    if(isSpine) {
        spinnerHolder.classList.remove("d-none")
    }
    else {
        spinnerHolder.classList.add("d-none")
    }
}


const modalDetailsLoad =async(news_id) => {
    try {
        const url= `https://openapi.programming-hero.com/api/news/${news_id}`
    // const url= `https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`
    const res = await fetch(url)
    const data = await res.json()
    displayModalDetails(data.data[0])
    }
    catch {
        console.log(error)
    }
}

const displayModalDetails = (data) => {
    const modalTitle= document.getElementById("news-modal-details")
    modalTitle.innerText=`${data.title}`
    const modalBody= document.getElementById("modal-body-id")
    modalBody.innerHTML=`
    <img class="img-fluid" src="${data.image_url}" alt="">
    <h6 class="mb-0 fw-bold">${((data.author) ? (data.author.name === null ? "No Data Found" : data.author.name) : 'No Data Found') || ((data.author) ? (data.author.name === '' ? "No Data Found" : data.author.name) : 'No Data Found')}</h6>
    <p class="text-secondary mb-0">${(data.author) ? (data.author.published_date === null ? "No Data Found" : data.author.published_date) : 'No Data Found'}</p>
    <br>
    <p>${(data.details)}</p>
    

    <!-- Modal Views and Icons -->
                            <div class="post-footer d-flex   align-items-center ">
                                <div class="view-counter align-items-center text-danger me-5">
                                    <span><i class="fa fa-eye" aria-hidden="true"></i></span>
                                    <span class="fw-bold">${data.total_view}</span>
                                </div>

                                <div class="post-icons text-danger">
                                    <span><i class="fa fa-star" aria-hidden="true"></i></span>
                                    <span><i class="fa fa-star" aria-hidden="true"></i></span>
                                    <span><i class="fa fa-star" aria-hidden="true"></i></span>
                                    <span><i class="fa fa-star" aria-hidden="true"></i></span>
                                    <span><i class="fa fa-star-half" aria-hidden="true"></i></span>
                                </div>
                            </div>
    
    `
}

loadNews(8)

loadCategories()
