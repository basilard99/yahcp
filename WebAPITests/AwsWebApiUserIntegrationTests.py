import unittest
import requests
import json
import sys

BASE_URL = 'https://udiuhnbfvf.execute-api.us-east-2.amazonaws.com/Test'

class AwsWebApiFunctionalTests(unittest.TestCase):

    # /users
    def test_getting_users_returns_code_200_and_list_of_json_objects(self):
        r = requests.get(url = BASE_URL + '/users')
        results = r.json()
        self.assertTrue(results[0]['name'] == 'Chris Snyder')
        self.assertTrue(results[0]['email'] == 'basilard99@gmail.com')
        self.assertTrue(results[0]['userId'] == '7b99059f-62b1-4108-8a04-f7d906a8160d')
        self.assertTrue(results[0]['_links']['self'] == '/users/7b99059f-62b1-4108-8a04-f7d906a8160d')
        self.assertTrue(results[1]['name'] == 'Jesse Busch')
        self.assertTrue(results[1]['email'] == 'jesse@nodomain.com')
        self.assertTrue(results[1]['userId'] == 'cbd22a8f-31d6-42f7-81d9-cfff3e604b14')
        self.assertTrue(results[1]['_links']['self'] == '/users/cbd22a8f-31d6-42f7-81d9-cfff3e604b14')

    def test_registering_valid_user_returns_code_201_and_sets_location_header(self):
        test_user = {'name':'Chris Snyder', 'email':'basilard99@gmail.com'}
        r = requests.post(url = BASE_URL + '/users', json = test_user)
        self.assertTrue(r.status_code == 201)
        self.assertTrue(r.headers['Location'] == '/user/7b99059f-62b1-4108-8a04-f7d906a8160d')

    def test_registering_invalid_user_returns_400(self):
        test_user = {'name':'D', 'email':'test'}
        r = requests.post(url = BASE_URL + '/users', json = test_user)
        self.assertTrue(r.status_code == 400)

    # /users/user
    def test_getting_a_valid_user_returns_200_and_json_object(self):
        r = requests.get(url = BASE_URL + '/users/7b99059f-62b1-4108-8a04-f7d906a8160d')
        self.assertTrue(r.json()['name'] == 'Chris Snyder')
        self.assertTrue(r.json()['email'] == 'basilard99@gmail.com')
        self.assertTrue(r.status_code == 200)
    
    def test_getting_a_invalid_user_returns_nothing(self):
        r = requests.get(url = BASE_URL + '/users/00000000-0000-0000-0000-000000000000')
        self.assertTrue(len(r.text) == 0)

    def test_valid_update_an_existing_user_returns_code_204(self):
        test_user = {'name':'Chris Snyder', 'email':'basilard99+test@gmail.com', 'userId':'7b99059f-62b1-4108-8a04-f7d906a8160d'}
        r = requests.put(url = BASE_URL + '/users/7b99059f-62b1-4108-8a04-f7d906a8160d', json = test_user)
        self.assertTrue(r.status_code == 204)
    
    def test_invalid_update_an_existing_user_returns_code_204(self):
        test_user = {'name':'Chris Snyder', 'email':'bad', 'userId':'7b99059f-62b1-4108-8a04-f7d906a8160d'}
        r = requests.put(url = BASE_URL + '/users/7b99059f-62b1-4108-8a04-f7d906a8160d', json = test_user)
        self.assertTrue(r.status_code == 204)


if (__name__ == '__main__'):
    if len(sys.argv) > 1:
        BASE_URL = sys.argv.pop()
    unittest.main()
