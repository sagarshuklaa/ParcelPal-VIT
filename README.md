# 🚀 ParcelPal-VIT

> Built by a VIT student, for VIT students 🚀

🔗 **Live Demo:** https://parcel-pal-vit.vercel.app 

---

## 📖 About The Project

**ParcelPal-VIT** is a peer-to-peer delivery platform designed specifically for VIT Bhopal campus.

It allows students to:

* Request parcel or food delivery to their hostel rooms
* Accept delivery requests while moving across campus
* Earn money by helping fellow students

This creates a **fast, low-cost, and efficient delivery ecosystem powered by students themselves.**

---

## ❗ Problem

Students often face:

* Parcels stuck at campus gates
* Long walks to canteens or Safal Mart
* No internal delivery system

---

## 💡 Solution

ParcelPal solves this using a **peer-to-peer delivery model**:

* Students post requests
* Other students fulfill them
* Small delivery fee ensures motivation

---

## ⚙️ How It Works

1. User creates a request (parcel / food)
2. Pays ₹10–₹20 delivery fee
3. Request becomes live
4. Another student accepts it
5. Delivery is completed
6. User confirms → carrier gets paid

---

## ✨ Features

### 📦 Parcel Delivery

* Pickup from campus gates (Amazon, Flipkart, etc.)
* Delivered directly to hostel rooms

### 🍱 Food Ordering

* Order from:

  * Mayuri
  * Underbelly
  * Safal Mart

### 💰 Earn While Walking

* Accept requests along your route
* Earn ₹10–₹20 per delivery

### 🔐 Secure Payment Flow

* Pay before request goes live
* Carrier paid after delivery confirmation

### 📊 Dashboard

* Track:

  * Requests
  * Deliveries
  * Earnings

### 📍 Live Tracking

* Real-time delivery status updates

### 🏆 Leaderboard

* Compare earnings with other students

### 👤 Authentication

* VIT email-based login/signup
* Hostel-based user system

---

## 🛠️ Tech Stack

| Layer    | Technology            |
| -------- | --------------------- |
| Frontend | HTML, CSS, JavaScript |
| Backend  | Supabase              |
| Auth     | Supabase Auth         |
| Database | Supabase DB           |
| Hosting  | Vercel                |

---

## 💳 Payment System

* UPI-based payments (`parcelpal@upi`)
* Users enter UTR after payment
* Request activates after verification

---

## 📂 Project Structure

```
parcelpal-vit/
│── index.html
│── styles (inline CSS)
│── scripts (JS logic)
```

---

## 🚀 Getting Started

### 🔹 Clone the repository

```
git clone https://github.com/sagarshuklaa/ParcelPal-VIT.git
cd ParcelPal-VIT
```

### 🔹 Run Locally

Simply open `index.html` in your browser

---

### 🔹 Deploy on Vercel

1. Push code to GitHub
2. Go to Vercel
3. Import repository
4. Click **Deploy**

---

## 🔐 Environment Variables

If using Supabase, add:

```
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
```

---

## 🎯 Use Cases

* Parcel pickup from gates
* Food delivery to hostel
* Earning passive income
* Saving time on campus

---

## 🔮 Future Improvements

* Real-time tracking (WebSockets)
* In-app wallet system
* Push notifications
* Rating & review system
* Admin dashboard
* AI-based route optimization

---

## 👨‍💻 Author

**Sagar Shukla**
VIT Bhopal University

---

## 📄 License

This project is licensed under the **Apache License 2.0**

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 🚀 Contribute

---

## 💡 Vision

To build a **student-powered hyperlocal delivery ecosystem** that can scale across campuses in India.
