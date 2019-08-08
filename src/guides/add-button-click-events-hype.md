---
slug: '/hype-click-events'
title: 'How to auto-add click events to buttons in Tumlt Hype'
---

# Auto-add click events to buttons

**Platform**: Tumult Hype

Adding the same click event to multiple buttons is time consuming and introduces multiple points of failure where one typo hidden somewhere in one of multiple frames. 

This method addresses these issues by itterating over a list of button names to add the same type on functionality (or similar) method they all require


## Basic - change scene on click

Add this to the first frame of the scene. Add the names of all the buttons that require this functionality and that's it!

``` javascript
// List the class names of all the buttons that need to have the.
// ! The names are case sensitive
var buttons = [
  'button_1',
  'button_2',
  'button_3',
];

// This is the function that will be called for all button presses from the list above
// We can add additional functionality here too
// ! The scenes must named the same as button's class name.
function handleButtonClick (button) {
  hypeDocument.showSceneNamed(scene, hypeDocument.kSceneTransitionCrossFade, 1.1);
  console.log('Clicked on ', button);

  // Adds analytic tracking for button clicks
  // ! Be sure to change the project name so events are logged alongside it
  ga('send', 'event', {
    hitType: 'event', 
    eventAction: 'click', // Type of interactive
    eventCategory: 'DT-project-name', // Name of the project
    eventLabel: button, // Name of the item clicked
    // eventValue: 1,
  });
};

// Using the list of names above, find that instance, adds a click event and the appropriate function
buttons.forEach(function (button) {
  Array.from(hypeDocument.querySelectorAll('.' + button))
    .forEach(function (b) {
      b.addEventListener("click", handleButtonClick.bind(null, b));
    });
});
```
