---
slug: "/simple-web-server"
title: "How to start a simple web server"
---

# How to start a simple web server

Having a simple local web server is a great way to quickly test local web development builds on native devices or share preview links internally.

The simplest way to get up and running is to install this [Google Chrome plugin](https://chrome.google.com/webstore/detail/web-server-for-chromeofhbbkphhbklhfoeikjpcbhemlocgigb) to run one from the browser (even Chrome Books).


## How to

  - Visit this link and install the plugin.
  - A new app will be installed, launch it.
  - Choose the local folder you want to host (note, this must be local, not a network device).
  - In the options, select `Accessible on local network`.
  - Quit and start the app again for this change to take effect.
  - Click on the `Web Server URL(s)` that should be: `http://127.0.0.1:8887`


## How to share a link with other devices/people

So far we have got the server running locally, but we'll need to find your computers IP address to share this with other people

  - Find your IP address
    - Mac: Open system preferences, choose the network option and find it listed under status.
    - Windows: From the desktop, press the Windows key, type `Command` and hit enter. Now type `.ipconfig`.
  - Swap that IP address into the preview url we used before; you should have something like this: `http://10.60.60.600:8887`

