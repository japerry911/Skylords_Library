
# Skylord's Library App
 
Skylord's Library App is an App that is meant to be a hangout for all book lovers. In this App, users are able to review books, add new books/authors, make a favorite books list, and much more. The App is built with a React Native Frontend and a Ruby on Rails Backend. The App is built with only functional components and utilizes React's hooks instead of using classes. This is Jack's first React Native App, and was inspired by his dog, Skylord, and was also inspired by his love to read. Enjoy! 
- React Native -> iOS/Android Compatible || For iOS: works on most iOS phones/iPads

### Required Versions

- Rails 6.0+
- React-Native .61.4+
- Expo 3.17.24+

### Features
- React Context API - Review, Book, Author, User, and Favorite Contexts
- React Hooks
- Functional Components set up, no classes
- Native Base UI Library - Only used to style foundation for Buttons/Forms and used for misc. things (Toast Messages)
- Rails Backend with 2 Many-to-Many Relationships
- React Navigation - Drawer, Stack, and another Drawer Navigators
- Full BCrypt Authentication that goes through Rails, also utilizes JWT Tokens for authenticating requests
- Loading Spinner added to pages that need to fetch data
- Rails String IDs customization - Creates unique string ID for each item in each table instead of using default integer ID

### Before You Start Using

Navigate to the Backend folder and run the following commands in order:<br />
- `bundle-install`
- `rails db:create`
- `rails db:migrate`
- `rails db:seed` - dummy dataset seeded

### Starting the Frontend and Backend

To start the servers you will need to:<br />
- Backend:
    - Go into the Backend folder and run the following command: `rails s -p 4000 -b 10.0.0.22`<br />
- Frontend:
    - Go into the Frontend folder and run the following command: `expo start -c` or `npm start -c`

### Navigating to the Application

After you have started running the Frontend and the Backend, then you will navigate to need to install  the Expo App on either your phone, or an iOS/Android simulator.

### Screens

- Welcome Screen
- Get Started
- Learn More
- Sign Up
- Sign In
- Home (after authentication Home)
- All Books
- Show Book
- Favorites
- Add a Review
- User Profile

### Video Demo

[![Skylord's Library Walkthrough](https://img.youtube.com/vi/q3Z97DHl-2o/0.jpg)](https://www.youtube.com/watch?v=q3Z97DHl-2o)

### Authors

* **Jack Perry**  - [Jack Perry's Github](https://github.com/japerry911)

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

