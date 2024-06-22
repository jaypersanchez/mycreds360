import numpy as np

arr_1d = np.array([1, 2, 3, 4, 5])
#print("One-dimensional arry:\n", arr_1d)

arr_2d = np.array([[1,2,3],[4,5,6],[7,8,9]])
print("Two-dimensional arry:\n", arr_2d)

#print("Addition:\n", arr_1d + 2)
#print("Subtraction:\n", arr_1d - 2)
#print("Multiplication:\n", arr_1d * 2)
#print("Division:\n", arr_1d / 2)

arr_2d_2 = np.array([[9,8,7],[6,5,4],[3,2,1]])
#print("\nElement-wise multiplication:\n", arr_2d*arr_2d_2)

#print("Sum:", np.sum(arr_1d) )
#print("Mean:", np.mean(arr_1d))
#print("Standard Deviation:", np.std(arr_1d))

#print("\nSum of two-dimensional arry:", np.sum(arr_2d))

reshaped_arr = arr_2d.reshape(1,9)
print("Reshaped array:\n", reshaped_arr)
second_row = arr_2d[1,:]
print("\nSecond row:\n", second_row)
