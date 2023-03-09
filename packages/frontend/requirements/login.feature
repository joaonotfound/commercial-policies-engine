Feature: Login
    As a new user
    I want to authenticate
    So that I can access the platform's features

    Scenario: Successful login
        Given I am on the login page
        When I enter my email "joao@joao.com" and password "password123"
        And I click the login button
        Then I should be redirected to the home page
        And I should see a welcome message

    Scenario: Invalid login
        Given I am on the sign up page
        When I enter an invalid email or password
        Then I should not be able to click on the login button
        And I should see an error message