# This is a sample Python script.

# Press Maj+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


# def print_hi(name):
# Use a breakpoint in the code line below to debug your script.
#    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.


# Press the green button in the gutter to run the script.
# if __name__ == '__main__':
#   print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
import cv2
import numpy as np
import urllib.request
import sys
import json
import string

import random



def empty(a):
    pass

cv2.namedWindow("Parameters")
cv2.resizeWindow("Parameters",640,240)
cv2.createTrackbar("Threshold1","Parameters",200,255,empty)
cv2.createTrackbar("Threshold2","Parameters",20,255,empty)
cv2.createTrackbar("Area","Parameters",5000,30000,empty)
s = sys.argv[1]
l = list(s)
l[7] = '/'
s = "".join(l)
#print(s)

url ="http://192.168.80.1:3000/" + s
#print(url)
url_response = urllib.request.urlopen(url)

img_array = np.array(bytearray(url_response.read()), dtype =  np.uint8)

image = cv2.imdecode(img_array,1)
imgContour = image.copy()
imgBlur = cv2.GaussianBlur(image, (7, 7), 1)
imgGray = cv2.cvtColor(imgBlur, cv2.COLOR_BGR2GRAY)
threshold1 = cv2.getTrackbarPos("Threshold1", "Parameters")
threshold2 = cv2.getTrackbarPos("Threshold2", "Parameters")
imgCanny = cv2.Canny(imgGray, threshold1, threshold2)
kernel = np.ones((5, 5))
imgDil = cv2.dilate(imgCanny, kernel, iterations=1)



contours, hierarchy = cv2.findContours(imgDil, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
"""    for cnt in contours:
    area = cv2.contourArea(cnt)
    areaMin = cv2.getTrackbarPos("Area", "Parameters")
    if area > areaMin:
"""

cnt = max(contours,key = cv2.contourArea)
print(cnt)

cv2.drawContours(imgContour, cnt, -1, (255, 0, 255), 5)
#cv2.imwrite('C:/Users/yassine derbel/Pictures/Camera Roll/contoureImage.jpg', img)
#f = "oooo"

peri = cv2.arcLength(cnt, True)
#print(peri)

approx = cv2.approxPolyDP(cnt, 0.02 * peri, True)
x , y , w, h = cv2.boundingRect(approx)

cv2.rectangle(imgContour, (x , y ), (x + w , y + h ), (0, 255, 0), 10)
"""print("\"corX\"" + " : " + "{[")
for i in cnt:
    print( str(i[0][0])+",")
print("]}")
print("\",corY\"" + " : " + "{[")

for i in cnt:
    print( str(i[0][1])+",")
print("]}")
"""


with open("cordonne.txt", "w+") as file:
 
    #file.write("{\"corX\":")
    #file.write("[")
    for i in cnt:
        #file.write( "\""+str(i[0][0])+"\""+",")
        file.write(str(i[0][0])+",")
    #file.write("]")



    file.close()
with open("cordonneY.txt", "w+") as file:
 
    #file.write("{\"corX\":")
    #file.write("[")
    for j in cnt:
        #file.write( "\""+str(i[0][0])+"\""+",")
        file.write(str(j[0][1])+",")
    #file.write("]")



    file.close()

n = random.randint(0,3000)

cv2.imwrite("./uploads/contoure"+str(n)+"Image.jpg",imgContour)
with open("contourName.txt", "w+") as file:
 
    file.write("./uploads/contoure"+str(n)+"Image.jpg")
    file.close()

    """
with open("cordonne.txt", "read") as file:
resp = file.readline()


file.close()
print(json.dump(resp))
sys.stdout.flush()
    """

