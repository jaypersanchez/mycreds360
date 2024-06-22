import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px

# Load data from JSON file
def load_json_data(filepath):
    return pd.read_json(filepath)

# Path to the JSON file
file_path = 'data/optimized_inventory_data.json'

# Load the data
inventory_data = load_json_data(file_path)

# Assuming the JSON file already contains 'Monthly_Demand'
# And adding placeholders for manual inputs: order_cost, holding_cost_per_unit, and lead_time_days
order_cost = 50  # Cost to place an order (assumed constant for demonstration)
holding_cost_per_unit = 2  # Holding cost per unit per year (assumed constant for demonstration)
lead_time_days = 30  # Lead time to receive an order in days (assumed constant for demonstration)
service_level = 0.95  # Service level for safety stock calculation (Z-score ~1.645 for 95% service level)

# Calculate EOQ (Economic Order Quantity)
inventory_data['EOQ'] = np.sqrt((2 * inventory_data['Monthly_Demand'] * order_cost * 12) / holding_cost_per_unit)
# Assuming coefficient of variation (CV) of monthly demand as 0.5 for this demonstration
cv = 0.5
z_score = 1.645  # Corresponds to the service level of 95%
inventory_data['Safety_Stock'] = z_score * cv * np.sqrt((lead_time_days / 365) * inventory_data['Monthly_Demand'] * 12)
inventory_data['Reorder_Point'] = (inventory_data['Monthly_Demand'] / 30 * lead_time_days) + inventory_data['Safety_Stock']

# Display the results
print("Inventory Optimization Analysis:")
print(inventory_data[['Item_ID', 'EOQ', 'Safety_Stock', 'Reorder_Point']])

# Set the seaborn style for the plots
sns.set(style="whitegrid")

def plot_eoq(inventory_data):
    plt.figure(figsize=(10, 6))
    sns.barplot(x='Item_ID', y='EOQ', data=inventory_data)
    plt.title('Economic Order Quantity (EOQ) for Each Item')
    plt.xlabel('Item ID')
    plt.ylabel('EOQ')
    plt.xticks(rotation=45)
    plt.show()
    
def plot_safety_stock(inventory_data):
    plt.figure(figsize=(10, 6))
    sns.barplot(x='Item_ID', y='Safety_Stock', data=inventory_data)
    plt.title('Safety Stock for Each Item')
    plt.xlabel('Item ID')
    plt.ylabel('Safety Stock')
    plt.xticks(rotation=45)
    plt.show()
    
def plot_reorder_point(inventory_data):
    plt.figure(figsize=(10, 6))
    sns.barplot(x='Item_ID', y='Reorder_Point', data=inventory_data)
    plt.title('Reorder Point for Each Item')
    plt.xlabel('Item ID')
    plt.ylabel('Reorder Point')
    plt.xticks(rotation=45)
    plt.show()
    
# Plotting the results
plot_eoq(inventory_data)
plot_safety_stock(inventory_data)
plot_reorder_point(inventory_data)

