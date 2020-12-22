import unittest
import requests
import json
import sys
from jsonschema import validate

BASE_URL = 'https://udiuhnbfvf.execute-api.us-east-2.amazonaws.com/Test'

class CustomersFunctionalTest(unittest.TestCase):
    def test_options_returns_verbs_and_204(self):
        r = requests.options(url = BASE_URL + '/customers', headers={'user-agent':'testApp/0.0.1'})
        allowedVerbs = r.headers['Allow'].replace(' ','').split(',')
        self.assertTrue(len(allowedVerbs) == 3, f'Header count is {len(allowedVerbs)}')
        self.assertTrue('GET' in allowedVerbs, 'GET is not in allowed list')
        self.assertTrue('HEAD' in allowedVerbs, 'HEAD is not in allowed list')
        self.assertTrue('POST' in allowedVerbs, 'POST is not in allowed list')

class GetFunctionalTests(unittest.TestCase):
    def test_getting_returns_200_and_valid_json_hal_schema(self):
        r = requests.get(url = BASE_URL + '/customers/ed1bc51e-22c9-452f-b0b0-993b4c7be10e')
        self.assertTrue(r.status_code == 200, f'Actual status code: {r.status_code}')

        f = open('json_hal_schema.json')
        schema = json.load(f)
        validate(instance=r.json(), schema=schema)
        f.close()

    def test_getting_returns_200_and_valid_customer_response_schema(self):
        r = requests.get(url = BASE_URL + '/customers/ed1bc51e-22c9-452f-b0b0-993b4c7be10e')
        self.assertTrue(r.status_code == 200, f'Actual status code: {r.status_code}')

        f = open('customer_response.json')
        data = json.load(f)
        validate(instance=r.json(), schema=data)
        f.close()        

    @unittest.skip('Still trying to decide if I want to have this test')
    def test_getting_returns_code_200_and_list_of_json_objects(self):
        r = requests.get(url = BASE_URL + '/customers/ed1bc51e-22c9-452f-b0b0-993b4c7be10e')
        results = r.json()

        self.assertTrue(results['DisplayName'] == 'Dave')
        self.assertTrue(results['Email'] == 'dave@testexample.com')

        checkIn1 = results['CheckIns'][0]
        self.assertTrue(checkIn1['Shop']['Name'] == 'Dark Legion Games')
        self.assertTrue(checkIn1['Shop']['Id'] == '7b213b3e-9fef-484d-92e2-255b7790ea8c')
        self.assertTrue(checkIn1['NumberOfCheckIns'] == 3)
        self.assertTrue(checkIn1['LastCheckIn'] == '2020-07-13T20:20:39+00:00')

        checkIn2 = results['CheckIns'][1]
        self.assertTrue(checkIn2['Shop']['Name'] == 'Pyramid Gaming')
        self.assertTrue(checkIn2['Shop']['Id'] == 'b54329b7-1d7a-4f1d-a830-5f3209951d39')
        self.assertTrue(checkIn2['NumberOfCheckIns'] == 14)
        self.assertTrue(checkIn2['LastCheckIn'] == '2020-08-22T16:30:00+00:00')

    def test_getting_with_invalid_id_returns_404(self):
        r = requests.get(url = BASE_URL + '/customers/abc')
        self.assertTrue(r.status_code == 404)

class PatchingFunctionalTests(unittest.TestCase):
    def test_patching_returns_204_and_no_content(self):
        r = requests.patch(url = BASE_URL + '/customers/ed1bc51e-22c9-452f-b0b0-993b4c7be10e', \
                           headers = {'Content-Type':'application/json-patch+json'}, \
                           json = [{'op':'replace', 'path':'/CheckIns/0/NumberOfCheckIns', 'value':'4'}, \
                                   {'op':'replace', 'path':'/CheckIns/0/LastCheckIn', 'value':'2020-10-22T16:30:00+00:00'}] \
                           )

        self.assertTrue(r.status_code == 204, f'Actual status code: {r.status_code}')

    def test_patching_with_invalid_content_type_returns_415(self):
        r = requests.patch(url = BASE_URL + '/customers/ed1bc51e-22c9-452f-b0b0-993b4c7be10e', \
                           json = [{'op':'replace', 'path':'/CheckIns/0/NumberOfCheckIns', 'value':'4'}, \
                                   {'op':'replace', 'path':'/CheckIns/0/LastCheckIn', 'value':'2020-10-22T16:30:00+00:00'}] \
                           )

        self.assertTrue(r.status_code == 415, f'Actual status code: {r.status_code}')

    @unittest.skip('Can''t run this test while using mocking')
    def test_patching_with_non_existing_customer_returns_422(self):
        r = requests.patch(url = BASE_URL + '/customers/ed1bc51e-22c9-452f-b0b0-993b4c7be10e', \
                           json = [{'op':'replace', 'path':'/CheckIns', 'value':'4'}, \
                                   {'op':'replace', 'path':'/CheckIns/0/LastCheckIn', 'value':'2020-10-22T16:30:00+00:00'}] \
                           )

        self.assertTrue(r.status_code == 422)
    
    @unittest.skip('Can''t run this test while using mocking')
    def test_patching_with_bad_patch_document_returns_422(self):
        r = requests.patch(url = BASE_URL + '/customers/ed1bc51e-22c9-452f-b0b0-993b4c7be10e', \
                           json = [{'op':'replace', 'path':'/BadPath', 'value':'4'}, \
                                   {'op':'replace', 'path':'/CheckIns/0/LastCheckIn', 'value':'2020-10-22T16:30:00+00:00'}] \
                           )

        self.assertTrue(r.status_code == 422)

if (__name__ == '__main__'):
    if len(sys.argv) > 1:
        BASE_URL = sys.argv.pop()
    unittest.main()