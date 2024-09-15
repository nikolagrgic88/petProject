# NSW Pet Registration Simulation

This project simulates the NSW Government website for registering pets. It is built with **React** and **CSS** for the front end, and **Kotlin** for the back end, demonstrating a full-stack approach to pet registration management.

## Features
- **Pet Registration**: Users can register their pets by providing details such as name, species, and age.
- **Pet Information Management**: View, update, or delete pet information.
- **Responsive Design**: The UI is optimized for both desktop and mobile use.
- **Secure Data Handling**: Back-end built with Kotlin to handle user data efficiently and securely.

## Technologies Used
- **React**: For creating an interactive, dynamic user interface.
- **CSS**: For styling and ensuring the website is fully responsive.
- **Kotlin**: For building the back end, providing REST APIs for handling pet registrations.

## Project Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/nikolagrgic88/nsw-pet-registration.git
    ```
2. Install front-end dependencies:
    ```bash
    cd frontend
    npm install
    ```
3. Set up the back-end server:
    ```bash
    cd backend
    ./gradlew build
    ```
4. Start the development servers:
    - **Frontend**: 
    ```bash
    npm start
    ```
    - **Backend**: 
    ```bash
    ./gradlew bootRun
    ```

## Future Enhancements
- Implement email notifications upon successful registration.
- Add a pet search feature to filter pets by type or name.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request if you have improvements or new features.
