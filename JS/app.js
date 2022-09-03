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
        createCategory.innerHTML = `<p onclick="loadNews(${category.category_id})" class="me-4">${category.category_name}</p>`
        categoriesHolder.append(createCategory)
    });
}

const loadNews = async (id) => {
    // console.log(id)

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
    
    let newsCount= idData.length
   
    // if(newsCount === 0) {
    //     newsCount=newsCount+1
    // }
    //  console.log(newsCount)
    const getPostHolder = document.getElementById("post-holder-id")
    getPostHolder.innerHTML = ''
    // const newsCategoriesName= document.getElementById("")
    
    const totalViewCount=[]
    
    idData.forEach(data => {
        const createDiv = document.createElement("div")
        // newsPost Start 
        // console.log(data.total_view)
       
        totalViewCount.push(data.total_view)
        
        
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
                    <p>${(data.details).slice(0, 300)}</p>
                    <p>${(data.details).slice(300, 500)}...</p>
                </div>
                <div>
                    <div class="post-footer d-flex justify-content-between  align-items-center ">

                        <div class="author-details d-flex">
                            <div class="author-img">
                                <img src="${data.author ? data.author.img : "No Image"}" class="img-fluid" alt="">
                            </div>
                            <div class="author-info ms-3 align-items-center ">
                                <h6 class="mb-0 fw-bold">${(data.author) ? (data.author.name === null ? "No Data Found" : data.author.name) : 'No Data Found'}</h6>
                                <p class="text-secondary mb-0">${(data.author) ? (data.author.published_date === null ? "No Data Found" : data.author.published_date) : 'No Data Found'}</p>
                            </div>
                        </div>
                
                        <div class="view-counter align-items-center ">
                            <span><i class="fa fa-eye" aria-hidden="true"></i></span>
                            <span class="fw-bold">${data.total_view ? data.total_view : "No Data Found"}</span>
                        </div>

                        <div class="post-icons">
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star-half" aria-hidden="true"></i></span>
                        </div>

                        <!-- News Details Button -->
                        <div class="modal-button">
                            <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                        </div>
                        

                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="news-modal-details" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="news-modal-details">${data.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                              <h6 class="mb-0 fw-bold">${(data.author) ? (data.author.name === null ? "No Data Found" : data.author.name) : 'No Data Found'}</h6>
                              <p class="text-secondary mb-0">${(data.author) ? (data.author.published_date === null ? "No Data Found" : data.author.published_date) : 'No Data Found'}</p>
                              <br>
                              <p>${(data.details)}</p>

                              
                            <!-- Modal Views and Icons -->
                            <div class="post-footer d-flex   align-items-center ">
                                <div class="view-counter align-items-center text-danger me-5">
                                    <span><i class="fa fa-eye" aria-hidden="true"></i></span>
                                    <span class="fw-bold">15M</span>
                                </div>

                                <div class="post-icons text-danger">
                                    <span><i class="fa fa-star" aria-hidden="true"></i></span>
                                    <span><i class="fa fa-star" aria-hidden="true"></i></span>
                                    <span><i class="fa fa-star" aria-hidden="true"></i></span>
                                    <span><i class="fa fa-star" aria-hidden="true"></i></span>
                                    <span><i class="fa fa-star-half" aria-hidden="true"></i></span>
                                </div>
                            </div>


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
        // ADDing News Count 
        const newsCountHolder= document.getElementById("news-count")
        newsCountHolder.innerText=`${(newsCount === false) ? "No News Found" : newsCount}`
        // const newsCountCategoryName= document.getElementById("news-count-category-name")
        // newsCountCategoryName.innerText=`s`
        // console.log(newsCount)
    })

    // sorting in Descending 
    totalViewCount.sort( (a,b) => b-a )
    
    
   
}

loadNews(8)

loadCategories()


x = {
    "_id": "0282e0e58a5c404fbd15261f11c2ab6a",
    "others_info": {
        "is_todays_pick": false,
        "is_trending": true
    },
    "category_id": "01",
    "rating": {
        "number": 4.5,
        "badge": "Excellent"
    },
    "total_view": 488,
    "title": "Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S. Military Aid Package Yet",
    "author": {
        "name": "Jimmy Dane",
        "published_date": "2022-08-24 17:27:34",
        "img": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
    },
    "thumbnail_url": "https://i.ibb.co/QnwC4sG/unsplash-Eh-Tc-C9s-YXsw-11.png",
    "image_url": "https://i.ibb.co/M23fhxm/unsplash-Eh-Tc-C9s-YXsw.png",
    "details": "Wednesday, August 24, 2022 | Tag Cloud Tags: Biden, EU, Euro, Europe, Joe Biden, Military, News, Russia, Security, UK, Ukraine, United States, Worthy News (Worthy News) – U.S. President Joe Biden has announced nearly $3 billion in new U.S. military aid for Kyiv as Ukraine marked its independence day six months after Russia invaded the country.'The United States of America is committed to supporting the people of Ukraine as they continue the fight to defend their sovereignty. As part of that commitment, I am proud to announce our biggest tranche of security assistance to date: approximately $2."
}