#!/usr/bin/python3
"""
Pascal's Triangle module
"""

def pascal_triangle(n):
  
    """
    Generate Pascal's Triangle up to the nth row.
    
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

				# Fill the middle values of the row
        for j in range(1, i): 
            new_row.append(prev_row[j-1] + prev_row[j])
            
        new_row.append(1)  # End every row with 1
        
        triangle.append(new_row)

    return triangle
