
// Get the necessary elements from the DOM
const sortSelect = document.getElementById('sort-select');
const shopItems = document.querySelectorAll('.shop-item');

// Add an event listener to the sort select element
sortSelect.addEventListener('change', () => {
    const selectedOption = sortSelect.value;

    // Sort the shop items based on the selected option
    if (selectedOption === 'low-to-high') {
        const sortedItems = Array.from(shopItems).sort((a, b) => {
            const priceA = parseInt(a.querySelector('.shop-item-price').textContent);
            const priceB = parseInt(b.querySelector('.shop-item-price').textContent);
            return priceA - priceB;
        });

        // Append the sorted items back to the container
        const shopItemsContainer = document.querySelector('.shop-items');
        shopItemsContainer.innerHTML = '';
        sortedItems.forEach(item => {
            shopItemsContainer.appendChild(item);
        });
    } else if (selectedOption === 'high-to-low') {
        const sortedItems = Array.from(shopItems).sort((a, b) => {
            const priceA = parseInt(a.querySelector('.shop-item-price').textContent);
            const priceB = parseInt(b.querySelector('.shop-item-price').textContent);
            return priceB - priceA;
        });

        // Append the sorted items back to the container
        const shopItemsContainer = document.querySelector('.shop-items');
        shopItemsContainer.innerHTML = '';
        sortedItems.forEach(item => {
            shopItemsContainer.appendChild(item);
        });
    }
});



if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    var purchaseButton = document.getElementsByClassName('btn-purchase')[0];
    purchaseButton.addEventListener('click', purchaseClicked);

   
    //document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

// function purchaseClicked() {
//     alert('Thank you for your purchase')
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     while (cartItems.hasChildNodes()) {
//         cartItems.removeChild(cartItems.firstChild)
//     }
//     updateCartTotal()
// }





// function purchaseClicked() {
//     alert('Thank you for your purchase');
//     var cartItems = document.getElementsByClassName('cart-items')[0];
//     while (cartItems.hasChildNodes()) {
//         cartItems.removeChild(cartItems.firstChild);
//     }
//     updateCartTotal();
// }



function purchaseClicked() { 
    var stripe = Stripe('pk_test_51OX2RJH0EYz8XV5icsn9vn6movkseEPuXUt9TdKz26D1BFWzK9qOQJyAe4JtFHB18FmmAKJWHyqADri8EA5JkzHM002HRXOO8E'); 
    var elements = stripe.elements(); 
    var cardElement = elements.create('card'); 
   
    cardElement.mount('#card-element'); 
   
    stripe.createToken(cardElement).then(function(result) { 
      if (result.error) { 
        // Handle error 
        alert('Payment error: ' + result.error.message); 
      } else { 
        // Send the token to your server for further processing 
        var token = result.token.id; 
        // Make an API call to your server with the token 
        // Replace 'YOUR_SERVER_ENDPOINT' with your server endpoint URL 
        fetch('http://127.0.0.1:8080/Cultural-shop-website-project-main/files/shop.html', { 
          method: 'POST', 
          headers: { 
            'Content-Type': 'application/json', 
          }, 
          body: JSON.stringify({ token: token }), 
        }) 
        .then(function(response) { 
          if (response.ok) { 
            alert('Payment successful'); 
            var cartItems = document.getElementsByClassName('cart-items')[0]; 
            while (cartItems.hasChildNodes()) { 
              cartItems.removeChild(cartItems.firstChild); 
            } 
            updateCartTotal(); 
          } else { 
            alert('Payment error: ' + response.statusText); 
          } 
        }) 
        .catch(function(error) { 
          alert('Payment error: ' + error); 
        }); 
      } 
    }); 
  }

  



function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

// function addItemToCart(title, price, imageSrc) {
//     var cartRow = document.createElement('div')
//     cartRow.classList.add('cart-row')
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
//     for (var i = 0; i < cartItemNames.length; i++) {
//         if (cartItemNames[i].innerText == title) {
//             alert('This item is already added to the cart')
//             return
//         }
//     }
//     var cartRowContents = `
//         <div class="cart-item cart-column">
//             <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//             <span class="cart-item-title">${title}</span>
//         </div>
//         <span class="cart-price cart-column">${price}</span>
//         <div class="cart-quantity cart-column">
//             <input class="cart-quantity-input" type="number" value="1">
//             <button class="btn btn-danger" type="button">REMOVE</button>
//         </div>`
//     cartRow.innerHTML = cartRowContents
//     cartItems.append(cartRow)
//     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
//     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
// }


function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    updateCartTotal();
}




function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}



      var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        getSortData: {
          name: function (element) {
            return $(element).text();
          }
        }
      });
      $('.filter button').on("click", function () {
        var value = $(this).attr('data-name');
          $grid.isotope({
            filter: value
          });
        $('.filter button').removeClass('active');
        $(this).addClass('active');
      })
      $('.sort button').on("click", function () {
        var value = $(this).attr('data-name');
        $grid.isotope({
          sortBy: value
        });
        $('.sort button').removeClass('active');
        $(this).addClass('active');
      })




