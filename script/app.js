const products = {
    crazy:{
        title:"Crazy",
        price:31000,
        amount:0,
        image:"images/products/burger-1.png",
        get summ(){
            return this.price * this.amount
        }
    },
    light:{
        title:"Light",
        price:26000,
        amount:0,
        image:"images/products/burger-2.png",
        get summ(){
            return this.price * this.amount
        }
    },
    cheeseburger:{
        title:"CheeseBurger",
        price:29000,
        amount:0,
        image:"images/products/burger-1.png",
        get summ(){
            return this.price * this.amount
        }
    },
    dburger:{
        title:"dBurger",
        price:24000,
        amount:0,
        image:"images/products/burger-1.png",
        get summ(){
            return this.price * this.amount
        }
    }
}


const ProductBtns = document.querySelectorAll('.wrapper__list-btn');
const BasketBtn = document.querySelector('.wrapper__navbar-btn');
const Basket = document.querySelector('.wrapper__navbar-basket');
const BasketClose = document.querySelector('.wrapper__navbar-close');
const BasketCount = document.querySelector('.wrapper__navbar-count');
const BasketCheckList = document.querySelector('.wrapper__navbar-checklist');
const BasketTotalPrice = document.querySelector('.wrapper__navbar-totalprice');
const BasketOrder = document.querySelector('.wrapper__navbar-bottom');
const printBody = document.querySelector('.print__body');
const printFooter = document.querySelector('.print__footer');

ProductBtns.forEach((btn)=>{
    btn.addEventListener('click',function () {
        addProduct(this)
    })
})
function addProduct(btn) {
    const parent = btn.closest('.wrapper__list-card')
    const parentId = parent.getAttribute('id')
    products[parentId].amount++
    basketInfo()
}
function basketInfo() {
    const productList = []
    let totalCount = 0
    for (const key in products) {
        const product = products[key]
        const productCard = document.querySelector(`#${product.title.toLowerCase()}`);
        const productCount = productCard.querySelector('.wrapper__list-count');
        if (product.amount) {
            productList.push(product)
            BasketCount.classList.add('active')
            totalCount = totalCount + product.amount
            productCount.classList.add('active')
            productCount.innerHTML = product.amount
        }else{
            productCount.classList.remove('active')
            productCount.innerHTML = 0
        }
        BasketCount.innerHTML = totalCount
    }
    BasketCheckList.innerHTML = ''
    for (let i = 0; i < productList.length; i++) {
        BasketCheckList.innerHTML += basketCard(productList[i])
        
    }
    BasketTotalPrice.innerHTML = productTotalPrice()
    let count = productTotalCount()
    if (count) {
        BasketCount.classList.add('active')
    }else{
        BasketCount.classList.remove('active')
    }
    BasketCount.innerHTML = count
}
function productTotalPrice() {
    let total = 0
    for (const key in products) {
        total += products[key].summ
    }
    return total.toString() + ' sum'
}
function productTotalCount() {
    let total = 0
    for (const key in products) {
        total += products[key].amount
    }
    return total
}
function basketCard(item) {
    return `
    <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img src="${item.image}" alt="${item.title}" class="wrapper__navbar-productImage">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${item.title}</p>
                <p class="wrapper__navbar-infoPrice"><span>${item.price}</span> sum</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${item.title.toLowerCase()}__card">
            <button class="wrapper__navbar-symbol fa-minus" data-symbol="-" >-</button>
            <output class="wrapper__navbar-num">${item.amount}</output>
            <button class="wrapper__navbar-symbol fa-plus" data-symbol="+" >+</button>
        </div>
    </div>
    `
}


window.addEventListener('click', function (e) {
    let btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        let attr = btn.getAttribute('data-symbol')
        let btnParent = btn.closest('.wrapper__navbar-option')
        if (btnParent) {
            let btnParentId = btnParent.getAttribute('id').split('__')[0]
            if (attr === '-') products[btnParentId].amount--
            else if (attr === '+') products[btnParentId].amount++
            basketInfo()
        }
    }
})



BasketBtn.addEventListener('click',function () {
    Basket.classList.add('active')
})
BasketClose.addEventListener('click',function () {
    Basket.classList.remove('active')
})

BasketOrder.addEventListener('click',function () {
    printBody.innerHTML = ''
    for (const key in products) {
        let item = products[key]
        if (item.amount) {
            printBody.innerHTML += `
            <div class="print__body-item">
                <p class="print__body-item_name">
                    <span class="name">${item.title}</span>
                    <span class="count">${item.amount}</span>
                </p>
                <p class="print__body-item_summ">${item.summ}</p>
            </div>
            `
        }
    }
    printFooter.innerHTML = productTotalPrice()
    window.print()
})
