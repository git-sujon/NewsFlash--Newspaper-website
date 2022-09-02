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
        const createCategory= document.createElement("p")
        createCategory.classList.add("me-4")
        createCategory.innerText=`${category.category_name}`
        categoriesHolder.append(createCategory)   
    });

}

loadCategories()

x= {
    "category_id": "01",
    "category_name": "Breaking News"
}