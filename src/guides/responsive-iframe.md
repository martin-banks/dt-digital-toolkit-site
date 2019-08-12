---
slug: '/responsive-iframe'
title: 'Embed iFrames that resize to fit content'
---

# "Responsive" iFrame embed

Used to generate an embed script to allow iFramed projects of a fixed shape to be responsive. This works by storing information about the height of the iFrame should be when rendered at different widths and to update if the page/frame is resized.

Does not require any communication between the iFrame content and the parent it is loaded into

## How to 
- Replace the URL’s into the respective place below, DO NOT DELETE THE QUOTE MARKS
- Replace the breakpoint value if different
- View each version in the chrome browser dev tools
- Open the Chrome dev tools (right click / inspect)
- Click on the devices icon (if not already active)
- Choose responsive from the device menu
- Turn on rulers
- Set width to 650px
- Replace the corresponding height below
- Copy the whole embed code template
- Open the minifier link and paste the code in to get a compact, minified version
- This minified code is the embed code to add to stories through Methode’s custom HTML tool


[HTML Minifier](http://minifycode.com/html-minifier/)


## Default sizes
Current agreed spec is to design each mobile/desktop version to the sizes below and are responsive to other screen widths.

Sizes only need to be updated in the embed code if the interactive deviates from this spec

| Device | Width | Height |
| --- | --- | --- |
| Desktop | 650px | 650px |
| Mobile | 450px | 650px |


```html
<div>
  <!-- Embed code template: v0.3 -->
  <div data-app="custom-iframe-container">
    <!-- Change the Sourcebelow to point to the location ofthe publish project -->
    <iframe id="interactiveiframe"
      src="https://path/to/interactive" 
      frameborder="0"
      scrolling="no"
      style="position: relative; display: block; width: 100%; height: 50px; border: none; overflow: hidden; margin: 32px auto;"
    ></iframe>
  </div>
  <script>
    ;(function(){
      // Changes the dimensions to get the correct ratios for different devices
      // The widths are used as break points to know when to load either version
      var deviceWidths = {
        mobile: 450,
        desktop: 650,
      };
      var deviceHeights = {
        mobile: 650,
        desktop: 650,
      };

      // Get the parentdom element that this embed is wrapped in.
      // This allows for multiple embeds with different settings in a single page without conflict
      var container = document.currentScript.parentNode.querySelector('[data-app="custom-iframe-container"]');
      var iframe = container.querySelector('iframe#interactiveiframe');
      var updateIframe = function() {
        var device = container.offsetWidth > deviceWidths.mobile ? 'desktop' : 'mobile';
        var ratio = deviceHeights[device] / deviceWidths[device];
        iframe.style.width = Math.min(container.offsetWidth, deviceWidths[device]) + 'px';
        iframe.style.height = Math.min((ratio * container.offsetWidth), deviceHeights[device]) + 'px';
      };
      var resizeTimeout = null;
      var handleResize = function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          updateIframe();
        }, 500);
      };
      updateIframe();
      window.addEventListener('resize', handleResize);
      document.addEventListener('DOMContentLoaded', updateIframe)
    })();
  </script>
</div>

```

