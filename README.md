   ![image](https://github.com/amanfcp/assessment/assets/26200071/605ecef0-88aa-4dbf-8d15-639184b62b15)

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## Implementation

Following are the elements that were considered while coding:

- Completeness
  - The requirement to create a tree view to browse through product categories
  - The ability to select/unselect categories
  - A view to see all the selected categories and the ability to remove them
- Code cleanliness
  - The folder structure follows component/container structure
  - `ui` folder for stylistic components
  - `util` folder for utility functions
  - `constants` folder for all the constants that will be used in app
  - `data` folder for mock data and other necessary data
  - `types` folder for all the shared types
  - Naming convention is clear and concise
     - For components, Pascal case is used
     - For rest of the files, Kebab case is used 
- Unit Tests /Test Coverage 
- Reusability
  - The `CategoryList` component can be used anywhere in the app
  - It also has an `onSelect` prop which allows you to perform any action, for e.g. an API call based on selected categories
- Scalability
   - The `CategoryList` can easily be scaled for different scenarios
   - Pagingation can also be added when API is used for data
- Performance
  - The `CategoryList` is made performant considering rerendering in mind
  - `useMemo` is used to memoize some variables which are not supposed to rerender
- Responsive Design
  -  The `CategoryList` can easily be used in different screen sizes 


1. Using bottom to top approach, mock data was created using the following schema;
   ```
   export type Category = {
     id: number;
     name: string;
     description?: string;
     headId: number | null;
   };
   ```
   Head ID assumption was based on the fact that at backend, categories and sub categories are usually stored in the same table with a self join
2. The mock data is converted into a tree structure using the following schema;
   ```
   export type HierarchicalCategory = Category & {
     subCategories: HierarchicalCategory[];
   };
   ```
3. The tree structered data is then mapped using Flatlist and and recursion inside the `renderMethod` in [CategoryList.tsx](src/components/CategoryList.tsx)





















