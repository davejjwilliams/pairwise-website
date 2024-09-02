from itertools import combinations
import random

random.seed(1202030123214)

patches = [f"r{i}" for i in range(1, 21)]
patches.extend([f"s{i}" for i in range(1, 41)])
explanations = [i for i in range(1, 21)]

comparisons = list(combinations(explanations, 2))

print(explanations)
print(comparisons)
print(len(comparisons))

for patch in patches:
    print(f"Patch {patch}:")