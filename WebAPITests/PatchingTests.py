import AwsWebApiCustomersIntegrationTests
import unittest

class TestCase(unittest.TestCase):    
    def test_something2(self):
        print('\n>>>>> test_something: param =')
        self.assertEqual(1, 1)
    

def load_tests(loader, tests, pattern):
    baseSuite = unittest.TestSuite() #VS Code integration expects there to be an outer suite
    patchingSuite = unittest.TestSuite()

    baseSuite.addTest(patchingSuite)

    testloader = unittest.TestLoader()
    testnames = testloader.getTestCaseNames(TestCase)    
    for name in testnames:
        patchingSuite.addTest(TestCase(name))
    
    return baseSuite

