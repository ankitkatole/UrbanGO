<h1>UrbanGO Server</h1>

<h1>UrbanGo API</h1>
<p>UrbanGo API is a comprehensive travel service that provides information and booking options for flights, hotels, cars, and famous places. It also includes user authentication and cart management features.</p>

<h2>Table of Contents</h2>
<ul>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#environment-variables">Environment Variables</a></li>
  <li><a href="#api-endpoints">API Endpoints</a>
    <ul>
      <li><a href="#user-authentication">User Authentication</a></li>
      <li><a href="#search-services">Search Services</a></li>
      <li><a href="#cart-management">Cart Management</a></li>
    </ul>
  </li>
  <li><a href="#file-structure">File Structure</a></li>
  <li><a href="#usage">Usage</a></li>
</ul>

<h2 id="installation">Installation</h2>
<ol>
  <li>Clone the repository:
    <pre><code>git clone https://github.com/your-username/urbango-api.git
cd urbango-api
    </code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install
    </code></pre>
  </li>
  <li>Set up your environment variables in a <code>.env</code> file (see <a href="#environment-variables">Environment Variables</a> section for details).</li>
  <li>Start the server:
    <pre><code>node index.js
    </code></pre>
  </li>
</ol>

<h2 id="environment-variables">Environment Variables</h2>
<p>Create a <code>.env</code> file in the root directory of your project and add the following environment variables:</p>
<pre><code>
<h2>Environment Variables:</h2>
<h4>
  BASE_URL<br>
  HOST<br>
  SERVICE<br>
  EMAIL_PORT<br>
  USERK<br>
  PASS<br>
  MONGO_URI_URBANGO<br>
  API_KEY<br>
  EMAIL<br>
  TOKEN<br>
</h4>
</code></pre>

<h2 id="api-endpoints">API Endpoints</h2>

<h3 id="user-authentication">User Authentication</h3>
<ul>
  <li><strong>Register</strong> - <code> /user/register</code>
    <pre><code>{
  "fname": "John",
  "lname": "Doe",
  "e_mail": "john.doe@example.com",
  "password": "password123"
}
    </code></pre>
  </li>
  <li><strong>Login</strong> - <code> /user/login</code>
    <pre><code>{
  "email": "john.doe@example.com",
  "passwd": "password123"
}
    </code></pre>
  </li>
  <li><strong>Forgot Password</strong> - <code> /user/forgotpassword</code>
    <pre><code>{
  "email": "john.doe@example.com"
}
    </code></pre>
  </li>
  <li><strong>Update Password</strong> - <code> /user/forgotpassword/user/update</code>
    <pre><code>{
  "email": "john.doe@example.com",
  "passwd": "newpassword123"
}
    </code></pre>
  </li>
</ul>

<h3 id="search-services">Search Services</h3>
<ul>
  <li><strong>Search Flights</strong> - <code> /search/flights</code>
    <pre><code>{
  "From": "CityA",
  "to": "CityB"
}
    </code></pre>
  </li>
  <li><strong>Search Hotels</strong> - <code> /search/hotels</code>
    <pre><code>{
  "city": "CityA"
}
    </code></pre>
  </li>
  <li><strong>Search Cars</strong> - <code> /search/cars</code>
    <pre><code>{
  "city": "CityA",
  "to": "CityB"
}
    </code></pre>
  </li>
  <li><strong>Search Famous Places</strong> - <code> /search/famousplaces</code>
    <pre><code>{
  "city": "CityA"
}
    </code></pre>
  </li>
</ul>

<h3 id="cart-management">Cart Management</h3>
<ul>
  <li><strong>Add to Cart</strong> - <code> /cart/add</code>
    <pre><code>{
  "email": "john.doe@example.com",
  "trips": [
    {
      "type": "flight",
      "data": { ... }
    }
  ]
}
    </code></pre>
  </li>
  <li><strong>Remove from Cart</strong> - <code> /cart/remove</code>
    <pre><code>{
  "email": "john.doe@example.com",
  "removetripID": "trip_id"
}
    </code></pre>
  </li>
  <li><strong>Get Cart Info</strong> - <code> /cart/info</code>
    <pre><code>{
  "email": "john.doe@example.com"
}
    </code></pre>
  </li>
  <li><strong>Checkout</strong> - <code> /cart/checkout</code>
    <pre><code>{
  "email": "john.doe@example.com"
}
    </code></pre>
  </li>
</ul>

<h2 id="file-structure">File Structure</h2>
<pre><code>urbango-api/
│
├── db/
│   └── urbango.js          # Database connection file
│
├── middlewares/
│   └── auth.js             # Authentication middleware
│
├── models/
│   ├── cart.js             # Cart model
│   ├── flights.js          # Flights model
│   ├── hotels.js           # Hotels model
│   ├── famousplaces.js     # Famous places model
│   ├── cars.js             # Cars model
│   └── user.js             # User model
│
├── routes/
│   ├── cart.js             # Cart routes
│   └── search.js           # Search routes
│
├── utils/
│   ├── weather.js          # Weather utility
│   ├── sendmailForgetPasswd.js # Email utility for password reset
│   └── payment.js          # Payment utility
│
├── index.js                # Entry point
├── package.json            # NPM package file
└── .env                    # Environment variables
</code></pre>

<h2 id="usage">Usage</h2>
<ol>
  <li><strong>User Registration and Login</strong>
    <ul>
      <li>Register a new user by sending a POST request to <code>/user/register</code>.</li>
      <li>Log in with registered user credentials by sending a POST request to <code>/user/login</code>.</li>
    </ul>
  </li>
  <li><strong>Search for Travel Services</strong>
    <ul>
      <li>Use the appropriate endpoints to search for flights, hotels, cars, or famous places.</li>
    </ul>
  </li>
  <li><strong>Cart Management</strong>
    <ul>
      <li>Add items to the cart, view cart information, remove items from the cart, and proceed to checkout using the cart endpoints.</li>
    </ul>
  </li>
  <li><strong>Forgot Password and Password Reset</strong>
    <ul>
      <li>If a user forgets their password, they can request a password reset link by sending a POST request to <code>/user/forgotpassword</code>.</li>
      <li>After receiving the reset link, the user can update their password by sending a POST request to <code>/user/forgotpassword/user/update</code>.</li>
    </ul>
  </li>
</ol>

<p>This setup provides a fully functional travel service API with user authentication, search capabilities, and cart management.</p>

</body>
</html>
