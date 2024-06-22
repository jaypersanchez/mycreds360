import pandas as pd
import numpy as np

data = [4, 7, -5, 3]
series = pd.Series(data)
print("Series without custom index:\n", series)

index_labels = ['CA', 'CB', 'CC', 'CD']
series.index = index_labels
print('\nSeries with custom index:\n', series)

print("Element at index CB:", series['CB'] )
print("\nSeries from CB to CD:\n", series['CB':'CD'])

print("Series * 2:\n", series * 2)
print("\nExponential of Series using natural logarithms 2.71828:\n", np.exp(series))
