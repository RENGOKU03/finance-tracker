# Finance Tracker

## Overview

This project is a finance tracker application that allows users to manage their income and expenses. It provides features such as:

- Adding transactions (income and expenses)
- Displaying financial statistics
- Visualizing data with charts
- User authentication with Google
- Data persistence using Firebase

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Redux: A state management library for managing the application's data.
- Firebase: A platform for building web and mobile applications, used for authentication and data storage.
- Tailwind CSS: A utility-first CSS framework for styling the application.
- Framer Motion: A library for adding animations and transitions.
- React Toastify: A library for displaying toast notifications.
- Vite: A build tool for fast and efficient development.

## Setup Instructions

1.  **Clone the repository:**

    ```shell
    git clone <repository-url>
    cd finance-tracker
    ```

2.  **Install dependencies:**

    ```shell
    npm install
    ```

3.  **Set up Firebase:**

    - Create a new project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable Google Authentication in the Firebase project.
    - Create a Firestore database to store the transaction data.
    - Obtain the Firebase configuration object from the Firebase Console and replace the placeholder in `src/firebase/firebase.js`:

      ```javascript
      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
      };
      ```

4.  **Run the application:**

    ```shell
    npm run dev
    ```

    This will start the development server and open the application in your browser.

## Usage

1.  **Login with Google:**

    Click the "Login with Google" button to authenticate using your Google account.

2.  **Add Transactions:**

    - Click the "Add Transaction" button to open the transaction form.
    - Enter the transaction details, including type (income/expense), description, amount, and date.
    - Submit the form to add the transaction to the list.

3.  **View Statistics and Charts:**

    The application displays an overview of your financial statistics, including the current balance and a chart visualizing income vs. expenses.

4.  **Manage Transactions:**

    The application lists all transactions, allowing you to view and delete them.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.
