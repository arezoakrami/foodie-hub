 Foodie Hub Food Ordering System (Backend)
This is the backend for Foodie Hub, a public food ordering platform that allows anyone to browse restaurants and menus, place orders, and view their order history — without authentication.

Features:
CRUD operations for Restaurants, Menu Items, Customers, and Orders
Order items with quantity per menu item
Track order status (e.g., pending → completed)

Optional Enhancements:
Pagination 
Filter orders by status
Popular menu items 
Get all orders for a specific restaurant 

Tech Stack:
NodeJs 
Express 
Postgre SQL

Project Structure:
foodie-hub-backend/
controllers/
models/
routes/
db/
app.js
.env
foodhub.sql
foodiehub.drawio
README.md
foodiehub diagram.jpg

Database:
PostgreSQL schema is defined in `foodie hub.sql`
Entities: `restaurants`, `menu_items`, `customers`, `orders`, `order_items`
All tables use snake_case
All relations are via foreign keys

Environment Setup:
env
DB_HOST=localhost
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_NAME=foodie_hub
PORT=3000


Restaurants:
Method use:
Get: list all resturants
Post: Create a new resturant
Put: update restaurant
Delete: Delete reataurant

Menu Items:
Method use:
Get: Get all item for a restaurant
Post: Add item ti restaurant
Put: Edite item
Delete: Delete item
Patch: Toggle availabaility

Customers:
Method use:
Get: list all customers
Post: Add new customer
Put: update customer
Delete: Delete customer

Orders:
Method use:
Get: list all order , filter order, orders for a customer
Post: Create new order
Put: update order status
Delete: Cancel order
Get: order for a restaurant, Most sold menu items

Arezo Akrami
