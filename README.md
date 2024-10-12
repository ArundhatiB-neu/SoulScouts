# SoulScouts - Mental Wellness Website

# Purpose

SoulScouts is a mental wellness website offering features like Mood Tracking, Journaling, AI-Based Mental Health Insights, Crisis Mode, Emergency Contacts, Integration with Teletherapy Services, Push Notifications, and a Mindfulness and Meditation Library. It provides users with a safe space to track their mental health journey and access helpful tools for emotional well-being.

# Bootstrap Components Used

1. **Navbar** (`navbar` class)
   - A responsive navigation bar is implemented at the top of the page.
   - It contains links for navigating to different sections of the website like login/sign up.

2. **Forms** (`form-control` and `input`)
   - Forms for both login and signup are styled using Bootstrap’s form components.
   - Input fields (`input` with `form-control` class) include validation for fields like email, name, password, and date of birth.
   - Custom error messages are displayed below the input fields when validation fails.

3. **Buttons** (`btn`, `btn-primary`, `btn-light`)
   - Multiple button styles are used across the website.
   - The primary call-to-action buttons use `btn` and `btn-primary` classes to make them stand out.
   - Buttons for Google sign-in are customized using `btn-light` and include a Google logo.

4. **Tooltips** (`tooltip`)
   - Tooltips provide additional information for form fields to guide the user during the signup and login process.
   - Implemented using the `data-bs-toggle="tooltip"` attribute to enhance user experience.

5. **Modal** (`modal`, `modal-dialog`, `modal-content`)
   - The login and signup forms are displayed in modals for a sleek and user-friendly interface.
   - The modal design ensures that users can focus on authentication without being redirected to a different page.
   - Implemented using `modal-dialog` and `modal-content` for Bootstrap's structured modal behavior.

6. **Spinner** (`spinner-border`)
   - A loading spinner is used to indicate that the content is being loaded.
   - The spinner appears for 1.5 seconds when the page is loaded, offering a smooth transition between the loading state and content display.

7. **Toasts** (`toast`)
   - Toasts are utilized to display brief messages or notifications to users.
   - They provide feedback for actions performed on the website, such as when "sign in with google" button is clicked, it displays that the functionality is still under development.

8. **Custom Checkbox** (`form-check`, `form-check-input`, `form-check-label`)
   - Used in the login form to offer a "Remember Me" option.
   - Styled with Bootstrap’s custom checkbox component (`form-check-input`).

9. **Responsive Grid System** (`row`, `col-lg`)
    - The landing page layout uses Bootstrap’s grid system to ensure responsiveness across different devices.
    - Sections are organized into rows and columns (`row`, `col-lg-6`) for a well-structured layout on mobile and desktop screens.

10. **Cards** (`card`, `card-body`, `card-title`, `card-text`)
    - Cards have been included in the subscription section suggesting the 3 pricing models: basic, premium, ultimate.
    - The card includes a title, subtitle and brief description, enhancing the website's visual appeal.

11. **Carousels** (`carousel`, `carousel-item`)
    - A carousel component is used in the hero section as an image gallery.
    - The `carousel` class allows for smooth transitions between slides, with navigation buttons to cycle through content.
   
12. **Close Button** (`btn-close`)
   - The `.btn-close` class is used to create a close button in the modal, allowing users to easily dismiss the modal window.

13. **Badges** (`badge`)
    - Badges are implemented using the `.badge` class.
    - It displays small counts or highlights within the modal, enhancing the visual appeal of the signup form.

12. **Accordion** (`accordion`, `accordion-item`, `accordion-header`, `accordion-button`, `accordion-collapse`)
    - The FAQ section utilizes an accordion to display questions and answers interactively.
    - Users can expand and collapse answers to maintain a clean and organized layout.
   
13. **Offcanvas** (`offcanvas`, `offcanvas-start`, `offcanvas-end`)
    - Offcanvas components are used to implement hidden navigation (onclick="Tools for Tranquility") that slides in from the side of the screen.
    - Ideal for mobile navigation to save space while still providing easy access to important links.

14. **Dropdowns** (`dropdown`, `dropdown-menu`, `dropdown-item`)
    - Dropdowns are implemented in the offcanvas navigation bar to provide a list of options or actions for users, enhancing the interactivity of the site.

15. **Alerts** (`alert`)
    - A bootstrap alert is appended to the screen onclick "Begin your soul search" as found in the hero section.
    - The alert is appended in the script.js file and a placeholder for it is added in the html code.

16. **Images** (`img-fluid`)
    - The `img-fluid` class ensures that images are responsive and scale well across different devices.

## Additional Features:
- **Validation:**
  - The login and signup forms include real-time validation feedback using JavaScript, integrated with Bootstrap's form styles for a polished UI.
  
- **Responsiveness:**
  - Bootstrap’s grid system ensures that the website is fully responsive, adapting to various screen sizes and orientations without losing functionality or design quality.
