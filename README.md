# 🛒 Shopverse - E-commerce Website (Next.js)

Shopverse is a modern e-commerce platform built with **Next.js, React, MongoDB, Express, and TailwindCSS**.  
It includes authentication, cart & wishlist management, secure payments via Razorpay, and a responsive UI.

---

## 🚀 Features

- ⚡ **Next.js 15** with App Router  
- 🎨 **Tailwind CSS** for styling  
- 🔐 User Authentication (JWT + bcryptjs)  
- 📦 Cart & Wishlist functionality  
- 💳 Razorpay payment integration  
- 🛍️ Product categories: Electronics, Men, Women, Kids  
- 📱 Fully responsive design  
- 🔄 Toast notifications with **React-Toastify**  

---

## 📂 Tech Stack

**Frontend:**
- Next.js
- React 19
- TailwindCSS
- Axios
- React Icons & React-Icon
- React Toastify  

**Backend:**
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing  

**Payments:**
- Razorpay integration  

**Dev Tools:**
- ESLint & TypeScript  
- PostCSS  

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/SHARRYGill0087/ecommerce-site-nextjs.git
cd ecommerce-site-nextjs

Install dependencies:

npm install
# or
yarn install


Create a .env file in the root directory and add the following:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret


Run the development server:

npm run dev


Open http://localhost:3000
 in your browser.

📸 Screenshots
🏠 Homepage
![Homepage](/public/github-sc/homepage.png)



🛍️ Product Page

🛒 Cart & Wishlist

🛠️ Folder Structure
ecommerce-site-nextjs/
│-- app/                # Next.js App Router pages
│-- components/         # Reusable components
│-- lib/                # DB connection, helpers
│-- models/             # Mongoose models
│-- public/             # Static files
│-- package.json
│-- README.md

🌟 Future Improvements

Admin Dashboard (Add/Update/Delete Products)

Order History & Tracking

Product Reviews & Ratings

Improved SEO & Performance

🤝 Contributing

Contributions are welcome!
Fork this repo and create a pull request for any feature/bug fixes.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Developed by Sharry Gill
🔗 GitHub Profile


👉 I also added an **`.env` setup guide** since you’re using MongoDB, JWT, and Razorpay.  

Do you want me to also add a **"Demo Credentials" section** (for login as test user) so recruiters/testers can try it quickly?

