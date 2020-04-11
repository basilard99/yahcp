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
        self.assertTrue(results[0]['userId'] == 'basilard99')
        self.assertTrue(results[0]['linkedShopIds'][0] == '9b70ba73-165c-44b4-a0a0-3acffaab19b7')
        self.assertTrue(results[0]['linkedShopIds'][1] == '726c34d6-3e69-4788-a937-97e416c0626c')
        self.assertTrue(results[0]['_links'][0]['self'] == '/users/7b99059f-62b1-4108-8a04-f7d906a8160d')
        self.assertTrue(results[1]['name'] == 'Jesse Busch')
        self.assertTrue(results[1]['email'] == 'jesse@nodomain.com')
        self.assertTrue(results[1]['userId'] == 'jbusch')
        self.assertTrue(results[1]['linkedShopIds'][0] == '9b70ba73-165c-44b4-a0a0-3acffaab19b7')
        self.assertTrue(results[1]['_links'][0]['self'] == '/users/cbd22a8f-31d6-42f7-81d9-cfff3e604b14')

    def test_registering_valid_user_returns_code_201_and_sets_location_header(self):
        test_user = {'name':'Chris Snyder', 'email':'basilard99@gmail.com', 'userId':'basilard99', 'linkedShopIds':[]}
        r = requests.post(url = BASE_URL + '/users', json = test_user)
        self.assertTrue(r.headers['Location'] == '/user/7b99059f-62b1-4108-8a04-f7d906a8160d')
        self.assertTrue(r.status_code == 201)

    def test_registering_invalid_user_returns_400(self):
        test_user = {'name':'D', 'email':'test', 'userId':'basilard99'}
        r = requests.post(url = BASE_URL + '/users', json = test_user)
        self.assertTrue(r.status_code == 400)

    # /users/user
    def test_getting_a_valid_user_returns_200_and_json_object(self):
        r = requests.get(url = BASE_URL + '/users/7b99059f-62b1-4108-8a04-f7d906a8160d')
        self.assertTrue(r.json()['name'] == 'Chris Snyder')
        self.assertTrue(r.json()['email'] == 'basilard99@gmail.com')
        self.assertTrue(r.json()['userId'] == 'basilard99')
        self.assertTrue(r.json()['linkedShopIds'][0] == '9b70ba73-165c-44b4-a0a0-3acffaab19b7')
        self.assertTrue(r.json()['linkedShopIds'][1] == '726c34d6-3e69-4788-a937-97e416c0626c')
        self.assertTrue(r.json()['_links'][0]['self'] == '/users/7b99059f-62b1-4108-8a04-f7d906a8160d')
        self.assertTrue(r.status_code == 200)
    
    def test_getting_a_invalid_user_returns_nothing(self):
        r = requests.get(url = BASE_URL + '/users/00000000-0000-0000-0000-000000000000')
        self.assertTrue(len(r.text) == 0)

    def test_valid_update_an_existing_user_returns_code_204(self):
        test_user = {'name':'Chris Snyder', 'email':'basilard99+test@gmail.com', 'userId':'basilard99', 'linkedShopIds':[]}
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
