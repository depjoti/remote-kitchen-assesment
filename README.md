# **Answer of First Assesment**

## Naming the Hotfix Branch:

1. Identify the Issue: First, identify the specific issue or bug that requires a hotfix. This could be a critical bug affecting the production environment.

2. Choose a Descriptive Name: Based on the issue , choose a descriptive name for the branch that clearly indicates it's a hotfix and what issue it resolves.

3. Follow Conventions: Adhere to the team's branch naming conventions to maintain consistency across the project. Typically, for a hotfix, prefix the branch name with "hotfix/". If team uses an issue tracking system (e.g., Jira, GitHub Issues), include the issue number in the branch name to provide a clear link between the branch and the corresponding issue Or team uses a author name into the branch name it would tell who is working for fix the issue. In my current company we use this convention.

Example: Let's say  fixing a critical bug related to order processing. I could name my hotfix branch something like:

First of all I create a branch name write this command:

``` git checkout -b hotfix/dep-order-processing-bug ```

Then I pull from ‘main or master’ branch

``` ‘git pull origin main’ ```

## Creating a Pull Request and Merging with the Production Branch:

1. Push Changes: Once i did my work on the hotfix branch, ensure my changes are committed and pushed to the remote repository.
```
‘git add . ’
‘git commit -m “fix: order processing bug” ‘
‘git push origin hotfix/dep-order-processing-bug’
```

2. Create Pull Request (PR): Go to the repository hosting platform (e.g., GitHub) and create a new pull request.

3. Select Base Branch: Set the base branch of the pull request to the production branch (e.g., main, master).
4. Assign Reviewers: Assign reviewers to the PR. These could be other developers on the team who are familiar with the codebase and can verify the fix.
5. Review and Address Feedback: Wait for reviewers to review the changes. Address any feedback or suggestions provided by making necessary adjustments to  hotfix branch.

6 .Merge Pull Request: Once the PR has been approved and all feedback addressed, I can merge my changes into the production branch.
If I have merge permissions, I can merge the PR myself.
Otherwise, request a team member with merge permissions to do it for me.

7.Delete Hotfix Branch: After merging, delete my hotfix branch both locally and remotely to keep the repository clean.
```
‘git checkout main’  # Switch to the production branch
‘git branch -d  hotfix/dep-order-processing-bug’  # Delete the local branch
‘git push origin --delete hotfix/dep-order-processing-bug’ # Delete the remote branch
```
8.Update Local Production Branch: Finally, pull the changes from the remote production branch to ensure my local copy is up to date.

‘git pull origin main’

By following these detailed steps, I can effectively name my hotfix branch, create a pull request, and merge my changes into the production branch, ensuring a smooth and organized workflow for the team.

# **Answer of Second Assesment**

1. Iterate through each menu collection.
2. For each menu collection, iterate through each category.
3. For each category, create a new array to store the menu items with their details (ID and name).
4. Match the IDs of menu items in the category with the IDs of all menu items to find the corresponding menu item details.
5. Populate the array with the menu item details for the current category.
6. Once all categories are processed, update the ‘menuItems’ array in the category object with the array containing menu item details.
7. Repeat this process for each menu collection.

This approach ensures that the data is organized properly, with each category containing an array of menu items along with their details.

Here's how the restructured data might look:
```
 const restructuredDummyArray = [
  {
    type: "Vegetarian",
    category: [
      {
        name: "Starters",
        menuItems: [
          { id: 1, name: "Salad" },
          { id: 2, name: "Veg Burger" }
        ]
      }
    ]
  },
  {
    type: "Non-Vegetarian",
    category: [
      {
        name: "Main Course",
        menuItems: [
          { id: 4, name: "Chicken Wings" },
          { id: 5, name: "Beef Burger" }
        ]
      }
    ]
  }
];
```
In this restructured data, each menu collection contains an array of categories, and each category contains an array of menu items with their details (ID and name). This structure clearly shows which menu items belong to which category.


## *** How to run this application on Local machine ***
This project made with react.

1. Run the project in your local machine first you have to ***fork*** the repository then click on ***code*** button then copy the ***HTTPS link***.
2. After all this open terminal then write this command  ```git clone https://github.com/depjoti/remote-kitchen-assesment.git```
3. Then write ```npm install``` after installing everything then open project on your editor then write this command ```npm run json-server```  then run ```npm run dev```.
4. You can show the in terminal like this port ```http://localhost:3000/``` then click this and you can show the project on your browser.


