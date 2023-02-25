Feature: Sign Up
    As a new user
    I want to create an account
    So that I can access the platform's features

    Scenario: Successful Sign Up
        Given I am on the sign up page
        When I enter my email "joao@joao.com", my username "joaonotfound" and password "password123"
        And I click the sign up button
        Then I should be redirected to the home page
        And I should see a welcome message

    Scenario: Invalid Sign Up
        Given I am on the sign up page
        When I enter an invalid email, username or password
        Then I should not be able to click on the sign up button
        And I should see an error message

    Scenario: Duplicate Username
        Given I am on the sign up page
        When I enter an username that already exists in the system
        And I click the sign up button
        Then I should see an error message
        And I should not be redirected to the home page

    Scenario: Duplicate Email
        Given I am on the sign up page
        When I enter an email that already exists in the system
        And I click the sign up button
        Then I should see an error message
        And I should not be redirected to the home page