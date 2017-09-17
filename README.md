# RD challenge

This system is comprised of a Rails application, a user tracker and a indenpendent web site.
Each compoment is on a different dir on this same repo:
* server The Rails application
* site The user tracking web site
* tracker The tracker lib

## Tracker lib

This lib creates a session with the Rails backend, and sends user activity.
It's session is stablished through a browser fingerprint, which is used to identify the user accross visits.
The tracker monitors clicks on <nav> elements and sends full URLs to the server (together with a click timestamp). This allows trackinkg the user throuh different sites using the tracker.
It could be changed to monitor 'window.location' via polling, or monitor other elements (such as buttons)
The tracked user is exposed to the parent web site through a global variable.

## Tracking site

This web site is a skeleton React app, using react-router and redux. It contains sample 'home', 'features' and 'contact' pages.
The contact page allows the user to sign up for a service informing his email, and once set this form is disabled.

## Rails application

This app defines services for creating/retrieving users and tracking data.
It saves user data based on the id supplied by the tracker and session cookies.
The user email is saved to the profile created through the tracker, without the web site needing to handle user ids - the app uses cookies for that.
This app will record a complete history of a user's visits instead of a set of visited pages (or visited page + visit count). I choose to do this way because it collects more information.
User visit data is stored on a separate database table with a foreign key (one-to-many mapping). Old records could be deleted to save space and reduce query time.
It could be converted to a blob or text field on the user table, but this would make maintenance harder. It is also a nice case for using MongoDB.
The landing page lists all known users, with links to their detailed data. These are simple views with hand crafted css.

## Links

The tracking web site is deployed at [https://bisol.github.io/].
The backend is at [https://fierce-plains-91052.herokuapp.com/].

## General considerations

This was my first React app, and I based it on react-boilerplate to help me learn the React ecosystem.
I've deployed it to GitHub Pages simply because it's fast and easy, and may remove it soon. This harms the user experience, because the static nature of GitHub Pages 
breaks react-router (if an user types 'bisol.github.io/contact' he should land on the Contact page, but instead he will get a 404 error)


This was also my first Ruby (and therefore Rails) experience, and I had some fun learning all this stuff.

### Known bugs

* On submitting the contact form, the form is disabled but the page will not show the user email until refreshing (it should replace the form with a loggin success message)

### Improvements

* Finnish test coverage
* Add pagination to Rails' views
* Better looking views
* Make the tracker monitor more user actions
* Deply the site on a proper host (or rewrite it without react-router)

## Running locally

### Tracking site

> cd site

> npm install

> npm test

> npm start -- --host=localhost --port=3003

### Rails application

> cd server

> bundle install

> RAILS_ENV=test rails db:migrate

> rails test

> rails run db:migrate

> rails server
