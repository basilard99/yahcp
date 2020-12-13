import AwsWebApiCustomersIntegrationTests
import unittest

class TestCase(unittest.TestCase):    
    def test_something2(self):
        print('\n>>>>> test_something: param =')
        self.assertEqual(1, 1)
    

def load_tests(loader, tests, pattern):
    print('hello')
    suite = unittest.TestSuite()
    print(f'Test Count: {len(suite._tests)}')
    testloader = unittest.TestLoader()
    testnames = testloader.getTestCaseNames(TestCase)
    for name in testnames:
        suite.addTest(TestCase(name))
    
    print(f'Test Count: {len(suite._tests)}')
    return suite

