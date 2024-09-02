import json
import pprint

with open("dataset-verified.json") as f:
    swe_data = json.load(f)

with open("patch-explanations.json") as f:
    expl_data = json.load(f)

# select from json
results = [item["repo"] for item in swe_data if "psf" in item["instance_id"]]

print(results)
print(f"Num Results = {len(results)}, Expected 8")

instances = [
    "astropy__astropy-12907",
    "django__django-11141",
]

explanations = [1, 2]

for instance in instances:
    # get patch from instance
    
    for item in swe_data:
        if item["instance_id"] == instance:
            print(f"Patch {instance}:\n{item["patch"]}\n\n")
            break
        
    # select correct instance
        # select correct explanation based on expl id
    
    for expl_id in explanations:
        for item in expl_data:
            if item["instance_id"] == instance:
                for explanation in item["explanations"]:
                    if explanation["id"] == expl_id:
                        print(f"Explanation {expl_id}:\n{explanation["content"]}\n")
                        break
    
    
