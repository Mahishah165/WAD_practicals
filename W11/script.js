document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      mobile: document.getElementById("mobile").value,
      dob: document.getElementById("dob").value,
      city: document.getElementById("city").value,
      address: document.getElementById("address").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    };
  
    // Save to localStorage (simulate AJAX POST)
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Registered Successfully!");
    this.reset();
  });
  
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const uname = document.getElementById("loginUsername").value;
    const pwd = document.getElementById("loginPassword").value;
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(u => u.username === uname && u.password === pwd);
  
    if (found) {
      alert("Login successful!");
      window.location.href = "users.html";
    } else {
      alert("Invalid credentials!");
    }
  });
  