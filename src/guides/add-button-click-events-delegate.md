---
slug: '/tumult-analytics'
title: 'How to add analytics to Tumult Hype'
---

# Adding analytics to Tumult's Hype

**Platform**: Tumult Hype

Adding the same click event to multiple buttons is time consuming and introduces multiple points of failure where one typo hidden somewhere in one of multiple frames. 

We can take advantage of Hype's feature to add a separate script at build time to handle analytic features including:

- Page tracking
- Button clicks to change scenes

Here we are using a delegate to add tracking events to prevent the risk of introducing ghost events as scenes load and unload

_A delegate is a function that listens for events on teh whole dom then checks if the target (element clicked on) matches a specific criteria before firing a callback_

_**A Google Analytics account ID is required.**_


## Naming conventions
In order for this to work successfully a specific naming convention must be used for both the buttons and scenes they link to.

| Class name     | Target                 | Description |
| -------------- | -----------------------| ----------- |
| button         | Page element (buttons) | denotes that this is a button element that should be tracked |
|scene_sceneName | Scene                  | is the scene taht it is linking to. This name must match the name of the secene and is case sensitive |


_**NOTE**_ Multiple class names can be added by separting them with spaces, therefore each class cannot have spaces in. Here we are using camle case to denote different words.


## The script
_This script will be available as a file as part of a core template_

```javascript
;(function () {
  // Adding the GA library and registering the project, this (and more) is available from the GA docs
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', '<-- Google Analytics ID -->', 'auto');

  // Sends a page view event when the page loaded
  ga('send', 'pageview');

  // A page name must be specified when setting up the Hype doc
  // This is used to create a unique data set and allow the
  // project's activity to be tracked accurately
  var pageName = document.querySelector('title').innerText;

  // Setting up the delegate; listens for all click events on the whole document
  document.addEventListener('click', function (e) {
    // Class names are used to determine if we should do something when that element is clicked. 
    // Get and store the classList as an Array (the default is a tokenList) for the element clicked
    var classList = Array.from(e.target.classList);

    // Check if the class list includes specific class names that should trigger events and fire it
    // Here we check if it has a button class...
    if (classList.includes('button')) {
      // And then we find the matching scene class name
      var scene = classList.filter(function (c) {
        return c !== 'button' && c.includes('scene_')
      })[0];

      // An additional check is performed in case a scene name wasn't specified and a placeholder is added.
      // This will not provide as accurate data but will prevent runtime errors or datal-oss
      if (!scene) {
        scene = 'sceneChanged'
      }

      // Adds analytic tracking for button clicks
      // ! Be sure to change the project name so events are logged alongside it
      ga('send', 'event', {
        hitType: 'event', 
        eventAction: 'click', // Type of interactive
        eventCategory: pageName, // Name of the project - This should changed for each project
        eventLabel: scene, // Name of the scene being navigated to
      });
    };
  });
})();
```