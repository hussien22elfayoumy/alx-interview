#!/usr/bin/python3
"""
# End every row with 1
"""
def pascal_triangle(n):
    """
    Parameters:
    n (int): The number of rows to generate. Must be a positive integer.
    
    Returns:
    list: A list of lists representing Pascal's Triangle up to the nth row.
    """
    
    if n <= 0:
        return []

    triangle = [[1]] # Initialize with the first row

    for i in range(1, n):
        prev_row = triangle[-1]
        new_row = [1]  # Start every row with 1

        for j in range(1, i): # Fill the middle values of the row
            new_row.append(prev_row[j-1] + prev_row[j])
            
        new_row.append(1)  # End every row with 1
        
        triangle.append(new_row)

    return triangle
