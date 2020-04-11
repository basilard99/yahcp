import unittest
import requests
import json
import sys

BASE_URL = 'https://udiuhnbfvf.execute-api.us-east-2.amazonaws.com/Test'

class AwsWebApiFunctionalTests(unittest.TestCase):

    # /Shops
    def test_getting_shops_returns_code_200_and_list_of_json_objects(self):
        r = requests.get(url = BASE_URL + '/shops')
        results = r.json()
        self.assertTrue(results[0]['name'] == 'Phantom of the Attic')
        self.assertTrue(results[0]['primaryEmail'] == 'test@pota.com')
        self.assertTrue(results[0]['_links'][0]['self'] == '/Test/shops/9b70ba73-165c-44b4-a0a0-3acffaab19b7')
        self.assertTrue(results[1]['name'] == 'Drawbridge Games')
        self.assertTrue(results[1]['primaryEmail'] == 'test@drawbridgegames.com')
        self.assertTrue(results[1]['_links'][0]['self'] == '/Test/shops/726c34d6-3e69-4788-a937-97e416c0626c')

    def test_registering_valid_shop_returns_code_201_and_sets_location_header(self):
        test_shop = {'name':'Drawbridge Games', 'primaryEmail':'test@drawbridgegames.com'}
        r = requests.post(url = BASE_URL + '/shops', json = test_shop)
        self.assertTrue(r.status_code == 201)
        self.assertTrue(r.headers['Location'] == '/shops/726c34d6-3e69-4788-a937-97e416c0626c')

    def test_registering_invalid_shop_returns_400(self):
        test_shop = {'name':'D', 'primaryEmail':'test@email.com'}
        r = requests.post(url = BASE_URL + '/shops', json = test_shop)
        self.assertTrue(r.status_code == 400)

    # /Shops/Shop
    def test_getting_a_valid_shop_returns_200_and_json_object(self):
        r = requests.get(url = BASE_URL + '/shops/726c34d6-3e69-4788-a937-97e416c0626c')
        testObject = r.json()
        self.assertTrue(testObject['name'] == 'Drawbridge Games')
        self.assertTrue(testObject['primaryEmail'] == 'test@drawbridgegames.com')
        self.assertTrue(testObject['_links'][0]['self'] == '/Test/shops/726c34d6-3e69-4788-a937-97e416c0626c')
        self.assertTrue(r.status_code == 200)
    
    def test_getting_an_invalid_shop_returns_nothing(self):
        r = requests.get(url = BASE_URL + '/shops/00000000-0000-0000-0000-000000000000')
        self.assertTrue(len(r.text) == 0)
        self.assertTrue(r.status_code == 200)

    def test_valid_update_an_existing_shop_returns_code_204(self):
        test_shop = {'name':'Drawbridge Games', 'primaryEmail':'test2@drawbridgegames.com'}
        r = requests.put(url = BASE_URL + '/shops/726c34d6-3e69-4788-a937-97e416c0626c', json = test_shop)
        self.assertTrue(r.status_code == 204)
    
    def test_update_an_existing_shop_with_invalid_data_returns_code_400(self):
        test_shop = {'name':'D', 'primaryEmail':'test2@drawbridgegames.com', 'shopId':'726c34d6-3e69-4788-a937-97e416c0626c'}
        r = requests.put(url = BASE_URL + '/shops/726c34d6-3e69-4788-a937-97e416c0626c', json = test_shop)
        self.assertTrue(r.status_code == 400)
    
if (__name__ == '__main__'):
    if len(sys.argv) > 1:
        BASE_URL = sys.argv.pop()
    unittest.main()
