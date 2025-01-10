# Blogify

Blogify is a modern, feature-rich blog application that allows users to read, write, comment on blog posts, and categorize content. With a clean, responsive interface and rich functionality, Blogify is designed to provide a seamless user experience on both mobile and desktop devices. This project combines the power of React on the frontend and Django REST Framework on the backend. 

## User's Aim

The goal of Blogify is to provide an easy-to-use platform for readers who likes to just read about interesting topics without being distracted with images to share and explore content. Users can:

- Create, read, update, and delete blog posts.
- Leave comments on posts to engage with the content.
- Categorize posts by topics for easier discovery.
- View posts with an infinite scroll for seamless browsing.

### Existing Features

- **Blog Posts**: 
  - Users can create, read, update, and delete blog posts.
  - Blog posts can be categorized into different topics for better organization.
  - Posts can contain rich text content, images, and media.
- **Comments**: 
  - Logged-in users can comment on blog posts.
  - Comments are nested to allow replies.
- **Categories**:
  - Posts can be tagged with categories like "Technology", "Lifestyle", etc.
  - Categories are easily filterable to help users explore posts by topic.
- **Infinite Scroll**: 
  - The blog post list supports infinite scrolling for seamless navigation and load on-demand.
- **Responsive Design**: 
  - The site adjusts seamlessly between mobile, tablet, and desktop views.


### Future Features 
- **User Profiles**:
  - Users can have customizable profiles that display their authored posts and personal information.
- **Admin Panel**:
  - Admins can manage users, posts, categories, and comments through a web-based interface.
- **Real-time Comments**:
  - Implement WebSockets or similar technologies to allow users to see new comments in real time.

## Technologies Used

- **Frontend**:
  - **React**: JavaScript library for building user interfaces.
  - **React Router**: Routing library for navigating between different pages.
  - **React Bootstrap**: Bootstrap-based components for responsive design.
  - **Axios**: Promise-based HTTP client for interacting with the API.
  - **CSS Modules**: Scoped styling to avoid conflicts across components.
- **Backend**:
  - **Django**: Python-based web framework for rapid development.
  - **Django REST Framework**: Powerful toolkit for building Web APIs.
  - **PostgreSQL**: Relational database management system for storing data.
  - **JWT**: JSON Web Tokens for user authentication.

### Blog Management

- On the home page, you can view the latest blog posts.
- Use the sorting options to arrange blog posts by date, views, or likes.
- Navigate through multiple pages of blog posts using pagination.

## 🛠 Built With

* HTML
* CSS
* JAVASCRIPT
* PYTHON
* DJANGO
* DATABASE 

### User Interaction

- Users can like or unlike blog posts without page reload.
- Users can also post comments on their own or other users' blog posts.

### Deployment

This project is deployed through Heroku.

These steps were taken for the deployment:

- Create an account or log in to Heroku.

- On the dashboard, in the right corner click the button that says "New" and choose "Create New App".

- Pick a name of the app. The name has to be unique because it can't match any other name being used.

- Select your region, United States or Europe. 

- "Create App".

- On the menu at the top of the page, go to the Settings Tab.

- Scroll down to Config Vars and click "Reveal Config Vars".

- Add a new Config Var and enter PORT in the keybox and 8000 in the valuebox.

- Under Config Vars you will find Buildpacks. 

- Click "Add Buildpacks".

- Select python.

- Repeat this step but select nodejs. 

- Important to know: The python has to be picked before the nodejs, if it is not you can change the order by click and drag to correct the order. 

- Scroll back to the top of the page, to the menu and go to the Deploy Tab.

- Select GitHub as the deployment method and confirm. 

- Search for you repository name and connect that. 

- Scroll down to the bottom of the page and there you can choose if you want the deploys to be Automatic or Manually. The Manually deployed branches needs redepolying each time the repository is updated. 

- Click "View" to see the live site. 

## Credits
- Wikidipedia for the details on the Battleship game. 
- Youtube videos on how to go by the Project. 
- Code Institute lessons and projects.