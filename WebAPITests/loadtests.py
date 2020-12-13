import unittest
loader = unittest.TestLoader()
suites = loader.discover(".", pattern="PatchingTests.py")
print(f'Base Suite Count {len(suites._tests)}')
print("start") #Don't remove this line
for suite in suites._tests:
    print(f'Inner Suite Count {len(suite._tests)}')
    for cls in suite._tests:
        for m in cls._tests:
            print(m.id())