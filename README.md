# same-Q-App

Questions paired, knowledge shared.

README File CS 147 – Autumn 2023

Jailia Y. | Seamus A. | Frédéric U. | Ashton X.

INSTALLATION REQUIREMENTS To access the app using the provided .zip file: Download the .zip file and unzip the package Install “Expo Cli” and “Expo Go” Navigate to where the package was unzipped Execute “npm install” in the terminal command line Start the server with “npx expo start” If prompted to login with EAS, use the username “seamus.allen” and password “*AwXqcEGA1gKC2@i” Press “i” to open the app inside the Mac XCode iOS simulator, or scan the QR code and open the app in the Expo Go application Wait for the app to finish loading and data to become populated

To access the app by cloning the repo: Navigate to our git repo Clone the repo Execute “npm install” in the terminal command line Start the server with “npx expo start” If prompted to login with EAS, use the username “seamus.allen” and password “*AwXqcEGA1gKC2@i” Press “i” to open the app inside the Mac XCode iOS simulator, or scan the QR code and open the app in the Expo Go application Wait for the app to finish loading and data to become populated

IMPLEMENTATION Database: Supabase React-native-async-storage UI: React Native React-native-vector-icons React-native-bottom-tab-navigator React-native-elements React-native-get-random-values React-native-modal React-native-pulse React-native-reanimated Navigation: React-navigation React-navigation-stack

OPERATING INSTRUCTIONS The landing page of the Same-Q app is the Home page. The user can use the sidebar hamburger menu, available in the top left corner of the Home page, to navigate to a filler page (used for our additional, unimplemented pages). The user can also utilize the bottom bar navigation that remains across all screens to easily navigate to important pages in the app.

From the Home page, the user can view all the active office hours sessions. They can explore the queue for each class and join a question. Joining a question takes the user to a Question page. Once in a Question page, a user can choose to collaborate on a question. Once collaborating, the question gets added to the user’s Collaborating page, found in the bottom bar. The user can then send messages, images and join the voice huddle to converse with classmates.

The user can also navigate to the Ask page using the bottom bar and ask a new question. The user must select the desired class that they are asking the question for before submitting. Once the user is done typing their question and selects the “Next” button, the question is added to the indicated course’s queue. The user is also given the option to either navigate to their new question’s Question page, or they can view a list of questions similar to the question the user just asked.

LIMITATIONS The following features have not been implemented in the hi-fidelity prototype:

Login and account creation
Settings page
Real time messaging
Real voice conversation
Question filtering
Slow page rendering (multiple API calls occurring that may cause a delay in data rendering)
WIZARD OF OZ We have Wizard of Oz-ed some aspects of the app to ensure responses:

Voice huddle – The same sound plays each time you join the voice huddle.
HARD CODED ELEMENTS To create a fully immersive and functioning app, some elements were hardcoded:

Courses – The app assumes each user is in the same three classes.
Filler pages (Profile, Most Frequently Collaborated, link to Canvas, and additional pages linked through the Settings page) -- The app uses a filler page to denote these screens are under construction.
Static pages (Notifications) – The information is hard coded to imitate user activity.
Question chat messages – Some questions are pre-populated with chats.
Number of people collaborating and in huddles – These numbers are used to ensure the user is not the only person in a question or huddle.
