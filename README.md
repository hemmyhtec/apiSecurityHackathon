runi# apiSecurityHackathon

This guide will walk you through the process of starting this project.

# Prerequisites
Before you begin, make sure you have the following installed on your machine:

Node.js: Visit the official Node.js website (https://nodejs.org) and download the latest LTS (Long Term Support) version suitable for your operating system. Follow the installation instructions provided.


# Setup Steps
To start, follow these steps:

Clone the project: Open your terminal or command prompt and navigate to the directory where you want to clone the project. Use the following command:

# Step one:
git clone https://github.com/hemmyhtec/apiSecurityHackathon

# Step two:
cd <project_directory>

# Step 3:
Install dependences by running: npm install

# Step 4: 
Create .env file in the root of the folder and add the followings: 

DATABASE_URL=mongodb+srv://hemmyPromise:40u4uL14O5mAZyv9@cluster0.n6kuzaq.mongodb.net/?retryWrites=true&w=majority
SECRET_CODE=9ac6b6aee6036bf7bfd76546d84934292b022bf96ad911a2c8af9802a1eef094
PORT=8000
TREBLLE_API_KEY=JRGeJ3XNBmos0Q20NGxDFhsNyoXtSve6
TREBLLE_PROJECT_ID=6plSpIri9fc5S37i

# Final Step:
Start the Node.js application: After installing the dependencies and configuring the project, you can start the Node.js application. Run the following command:

npm run dev
