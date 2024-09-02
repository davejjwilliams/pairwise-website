import json
import pprint

with open('dataset-verified.json') as f:
    d = json.load(f)
    
# select from json
results = [a['repo'] for a in d if "psf" in a['instance_id']]

print(results)
print(f"Num Results = {len(results)}, Expected 8")