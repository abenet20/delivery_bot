# Delivery Bot

Delivery Bot is a Node.js-based backend and Telegram bot for an online delivery service, offering a RESTful API for product and order management as well as a Telegram chat interface that supports user signup, login, and interaction.

## Features

- **RESTful API** with user and admin routes:
  - Manage products, customers, and orders
  - Separate endpoints for users and admins
- **Telegram Bot** for easy customer signup/login and interaction
- **MongoDB** database connectivity for persistent storage
- **Cloudinary file upload** integration for product images (admin)
- **Structured codebase** with `src/` directory for handlers, routes, controllers, and configuration

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB Instance](https://www.mongodb.com/)
- [Cloudinary Account](https://cloudinary.com/) (for file storage)
- Telegram Bot Token (from [BotFather](https://t.me/botfather))
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abenet20/delivery_bot.git
   cd delivery_bot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables (create a `.env` file in the project root):

   ```
   MONGO_URI=your_mongodb_connection_string
   botToken=your_telegram_bot_token
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

### Running the Server

Start the HTTP server (default port: 8000):

```bash
node server.js
```

To enable the Telegram bot, uncomment the line `runBot();` in `server.js`.

### API Endpoints

#### User Endpoints

| Method | Endpoint                     | Description        |
| ------ | ---------------------------- | ------------------ |
| GET    | `/api/user/products`         | List products      |
| GET    | `/api/user/orders/:id`       | List user's orders |
| POST   | `/api/user/save-order`       | Place order        |
| PUT    | `/api/user/update-order/:id` | Update order       |
| DELETE | `/api/user/remove-order`     | Remove order       |

#### Admin Endpoints

| Method | Endpoint                    | Description                 |
| ------ | --------------------------- | --------------------------- |
| GET    | `/api/admin/products`       | List products               |
| GET    | `/api/admin/orders`         | List all orders             |
| GET    | `/api/admin/customers`      | List customers              |
| POST   | `/api/admin/save-product`   | Add product (with image)    |
| PUT    | `/api/admin/update-product` | Update product (with image) |
| DELETE | `/api/admin/remove-product` | Remove product              |

### Telegram Bot

- Interact with the bot for signup and login flows.
- Custom commands and menu for users:
  - `/start` to begin chatbot flow (signup or login)
- Message flows are handled in `src/bot.js`, with specific handlers for signup and login.

### Project Structure

```
.
├── server.js
├── package.json
├── src/
│   ├── bot.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   ├── handlers/
│   ├── middleware/
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   └── userRoutes.js
│   └── ...
└── ...
```

### Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

### License

This project is open source, released under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Maintainer:** [abenet20](https://github.com/abenet20)
