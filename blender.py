
"""

so = bpy.context.active_object 
verts = so.data.vertices
edges = so.data.edges
face = so.data.polygons


for v in verts:
    print(v.co)


for e in  edges:
    for v in e.vertices:
        print(v)

for f in face:
    for v in f.vertices:
        print(v)
"""
"""
verts = []
edges = []
faces = []
verts.append([0.0, 15.0, 0.0])
verts.append([1.0, 0.0, 0.0])
verts.append([0.0, 1.0, 1.0])
verts.append([1.0, 1.0, 0.0])
edges.append([0, 1])
edges.append([1, 2])
edges.append([0, 3])
edges.append([2, 3])
edges.append([0, 2])
faces.append([0, 1, 2])
faces.append([2, 0, 3])

name = "New Object"
mesh = bpy.data.meshes.new(name)
obj = bpy.data.objects.new(name, mesh)
col = bpy.data.collections.get("Collection")

col.objects.link(obj)
bpy.context.view_layer.objects.active = obj
mesh.from_pydata(verts, edges, faces)


"""
"""for x in range(0,251):
    print(str(x)+","+str(x+1)+","+str((253%2) + 1 + x)+","+"\n" + str(x+1)+","+str((253%2)+x+2)+","+str((253%2) + 1 + x)+",")"""


import numpy as np
import matplotlib.pyplot  as plt

ax = plt.axes(projection = "3d")

x_data = np.arange(0, 5,0.9)
y_data = np.arange(0, 5,0.9)
X, Y = np.meshgrid(x_data,y_data)
Z = np.sin(X) * np.cos(Y)

ax.plot_surface(X, Y, Z)
plt.show()

