# Financetracker-ionicv3
An app made in ionic to keep track of shopping expenses, supported by ChartJS.

## Description

This app is made in ionic v3 and is used to keep track of your own expenses. It provides a per month overview of expenses, divided in custom categories such as 'food' etc.
ChartJS is used to provide extra insight such as what categories you spend on the most.

## Technical

It uses a cloudant CouchDB. Every month is implemented in a MonthOverview object. This object is stored in the database. Every month a new object is created based on the previous month.
All expenses made are linked to a given month. Filtering data is done by querying all months and calculating all expenses. This approach proved to be not ideal, filtering data for charts is not that easy. 
My new project in a newer version of ionic fixes this issue by just keeping track of the expenses and the starting account balance.
More information in the new project. 






