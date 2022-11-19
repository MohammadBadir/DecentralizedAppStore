*Prerequisites*

Ganache - Version 2.5.4
Metamask – Version 10.21.2
Truffle Suite – Version 5.15.0
Solidity – Version 0.8.10
Npm – Version 8.12.1

Recommended IDE: VSCode

*Frontend*

Our frontend uses the React.js framework, implementing a webpage that uses the smart contract to present a user interface of an Appstore.

As is standard in React, we have a main component is called App, it manages the transitions between the different pages of the app. It also contains the main data structures of the logged in user, including their purchases, published apps, etc.

In the frontend we make use of additional APIs to improve the user experience. This includes a currency convertor, that allows an app publisher to select a price for his app in either ETH or USD currency.

AppPage.js:

Clicking on an app in the library takes you to a dedicated AppPage. This page includes all the app data displayed in a user friendly formate, including published reviews by other users, developer info, pricing, etc.

On this page, we allow users to purchase the app, and to leave a review after doing so.

AppsView.js, DownloadedApps.js, MyApps.js:

Three pages that present their relevant apps in a similar way: A category bar, a grid of clickable app cards containing their info, and a search bar to query relevant apps.
UploadApp.js:

The screen for publishing apps, includes various fields and file upload requests (logo, app files), utilizing the IPFS protocol on top of the Fleek Gateway.

Topbar.js:

Displays the main app transition buttons, as well as the logged in user’s username. 

firstTimeScreen.js:

The screen that is displayed when a non-registered user first accesses the Appstore.

App.css:

A css file congaing all the styling conventions used by the Appstore.

Config.js:

Contains the contract address abi – required for connecting web3 to the smart contract.


*Smart Contract*

Our contract includes the following basic structures:

-	UserData: Structure that represents a user on the Appstore, including their metadata and published/purchased apps.

-	AppData: Structure that represents an app in the Appstore, including its metadata and categorization in the store.

-	ReviewAndRating: Stucture that represents review data, used by AppData.

Our main data structures are a mapping of appIDs to their AppData, a mapping of appIDs to their hashes, and a map of addresses to their respective user’s UserData.

The main transactions of the contract:

-	registerUser: Registers a user in the system, allowing him to access the Appstore to browse and publish apps.

-	createApp: Publishes an app to the app library, adding it to the database.

-	purchaseApp: Purchases a given app, adding it to the sender’s library, and sending the payment to the app author.

-	addReview: After purchasing an app, this transaction can be called by the sender to leave a review/rating on the app.
![image](https://user-images.githubusercontent.com/49198538/202866248-7f89c866-bb26-4d41-938f-aced890f262d.png)
