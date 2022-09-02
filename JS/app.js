const loadCategories = async() => {
    const url='https://openapi.programming-hero.com/api/news/categories'
    const res= await fetch(url)
    const data= await res.json()
    findCategories(data.data.news_category)
}   

const findCategories = categories => {
    const categoriesHolder=document.getElementById("all-categories")
    categories.forEach(category => {
        // console.log(category.category_name)
        const createCategory= document.createElement("div")
        createCategory.innerHTML=`<p onclick="loadNews(${category.category_id})" class="me-4">${category.category_name}</p>`
        categoriesHolder.append(createCategory)   
    });
}

const loadNews = async() => {
     const url=`https://openapi.programming-hero.com/api/news/category/${01}`
    const res= await fetch(url)
    const data= await res.json()
    console.log(data)
}



loadCategories()

// x= {
//     "category_id": "01",
//     "category_name": "Breaking News"
// }