const header = document.getElementById("header");
header.innerHTML =`
    <nav>
        <a href="#"> <div class="logo"><i class="fab fa-stripe-s"></i>tore <i class="fab fa-medium-m"></i>anager</div></a>
        <ul>
            <li><a href="index.html">Products</a></li>
            <li><i class="fas fa-search"></i> <input type="search"></li>
            <li><a href=""><i class="fas fa-shopping-cart"></i></a></li>
            <li><a href=""><i class="fas fa-sign-in-alt"></i> Log in/Logout </a></li>
        </ul>
    </nav>`;