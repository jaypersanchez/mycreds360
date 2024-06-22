import pandas as pd

# Create data frame
data = {
    'Name': ['Anna', 'Bob', 'Catherine', 'David', 'Emily'],
    'Age': [28, 34, 29, 42, 21],
    'City': ['New York', 'Paris', 'Berlin', 'London', 'Tokyo']
}

df = pd.DataFrame(data)
print(df)

print(df['Name'])
print(df.iloc[2])
print(df.loc[df['Name']=='Catherine','Age'].item())

df['Salary'] = [50000, 60000, 52000, 45000, 58000]
print("\nDataframe with 'Salary' column:\n", df)

df.drop('City', axis=1, inplace=True)
print("\nDataframe without 'City' column:\n", df)

print("\nRows where Age > 30:\n", df[df['Age']> 30])
print("\nAverage Age:", df['Age'].mean())

