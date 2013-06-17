# SMARTIP Drupal and App

1. The SmartIp Drupal Development-Server is a basic Drupal Standard-Profile with a preinstalled feature which provides dependencies, permissions, taxonomies and views. It offers a ReST-Endpoint with several resources for CRUD operations on nodes, files and users.

2. The SmartIp App is based on Sencha 2.0.1. It can be included into a phonegap wrapper to add native photo support for different mobile platforms.

## Install and configure Drupal
https://drupal.org/documentation/install

### Basic Configuration of the SmartIP Drupal Server

1. Make sure the Clean Urls configuration is set
2. Edit User Settings: Visitors can register, no E-Mail required
3. Enable the SmartIp Feature (all dependencies should be met)

### Add Categories

According to your app's categories (should be requested from drupal's services some day) please add them via taxonomy terms.
For a working example add terms in the following order:
<code>1. Category A</code>
<code>2. Category B</code>
<code>3. Category C</code>
<code>4. Category D</code>

## Prepare SmartIP App
Download the App Repo. All configuration especially connecting the app to the ReST-Endpoint is made in <code>app/util/Config.js</code>

## toDos
### App
- Add history and backbutton-support for Android
- Improve location and map handling
- Add comments from service endpoint
- Better visualization of votings

### Drupal
- Comments as services endpoint