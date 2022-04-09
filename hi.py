import sys
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
import time
import cv2
import numpy as np
import urllib.request
import sys


"""frameWidth = 640
frameHeight = 480
cap = cv2.VideoCapture(2)
cap.set(3, frameWidth)
cap.set(4, frameHeight)
"""

def empty(a):
    pass

cv2.namedWindow("Parameters")
cv2.resizeWindow("Parameters",640,240)
cv2.createTrackbar("Threshold1","Parameters",60,255,empty)
cv2.createTrackbar("Threshold2","Parameters",20,255,empty)
cv2.createTrackbar("Area","Parameters",5000,30000,empty)

url ="http://192.168.80.1:3000/uploads/" + sys.argv[1]
url_response = urllib.request.urlopen(url)
img_array = np.array(bytearray(url_response.read()), dtype =  np.uint8)

def stackImages(scale,imgArray):
    rows = len(imgArray)
    cols = len(imgArray[0])
    rowsAvailable = isinstance(imgArray[0], list)
    width = imgArray[0][0].shape[1]
    height = imgArray[0][0].shape[0]
    if rowsAvailable:
        for x in range ( 0, rows):
            for y in range(0, cols):
                if imgArray[x][y].shape[:2] == imgArray[0][0].shape [:2]:
                    imgArray[x][y] = cv2.resize(imgArray[x][y], (0, 0), None, scale, scale)
                else:
                    imgArray[x][y] = cv2.resize(imgArray[x][y], (imgArray[0][0].shape[1], imgArray[0][0].shape[0]), None, scale, scale)
                if len(imgArray[x][y].shape) == 2: imgArray[x][y]= cv2.cvtColor( imgArray[x][y], cv2.COLOR_GRAY2BGR)
        imageBlank = np.zeros((height, width, 3), np.uint8)
        hor = [imageBlank]*rows
        hor_con = [imageBlank]*rows
        for x in range(0, rows):
            hor[x] = np.hstack(imgArray[x])
        ver = np.vstack(hor)
    else:
        for x in range(0, rows):
            if imgArray[x].shape[:2] == imgArray[0].shape[:2]:
                imgArray[x] = cv2.resize(imgArray[x], (0, 0), None, scale, scale)
            else:
                imgArray[x] = cv2.resize(imgArray[x], (imgArray[0].shape[1], imgArray[0].shape[0]), None,scale, scale)
            if len(imgArray[x].shape) == 2: imgArray[x] = cv2.cvtColor(imgArray[x], cv2.COLOR_GRAY2BGR)
        hor= np.hstack(imgArray)
        ver = hor
    return ver




def getContours(img,imgContour):
    contours, hierarchy = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    """    for cnt in contours:
        area = cv2.contourArea(cnt)
        areaMin = cv2.getTrackbarPos("Area", "Parameters")
        if area > areaMin:
"""

    cnt = max(contours,key = cv2.contourArea)
    #print(cnt)

    cv2.drawContours(imgContour, cnt, -1, (255, 0, 255), 5)
    peri = cv2.arcLength(cnt, True)
    print(peri)
    #rect = cv2.minAreaRect(cnt)
    #(x, y), (w, h), angle = rect
    #print(x,y,w,h)

    approx = cv2.approxPolyDP(cnt, 0.02 * peri, True)
    #print(len(approx))
    x , y , w, h = cv2.boundingRect(approx)

    cv2.rectangle(imgContour, (x , y ), (x + w , y + h ), (0, 255, 0), 10)
    #print(x,y,w,h)

    cv2.putText(imgContour, "Points: " + str(len(approx)), (x + w + 20, y + 20), cv2.FONT_HERSHEY_COMPLEX, 0.4,
                (0, 255, 0), 1)
    #cv2.putText(imgContour, "Area: " + str(int(area)), (x + w + 20, y + 45), cv2.FONT_HERSHEY_COMPLEX, 0.4,
     #           (0, 255, 0), 1)
    #cv2.putText(image, f'FPS: {int(fps)}', (20, 70), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 2)
    cv2.putText(imgContour, "Width {} cm".format(round(w, 1)), (int(x - 100), int(y - 20)),
                cv2.FONT_HERSHEY_PLAIN, 2, (100, 200, 0), 2)
    cv2.putText(imgContour, "Height {} cm".format(round(h, 1)), (int(x - 100), int(y + 15)),
                cv2.FONT_HERSHEY_PLAIN, 2, (100, 200, 0), 2)

    with open("cordonne.txt", "w+") as file:
        for i in cnt:
            file.write( str(i[0][1])+",")

        file.close()

#path = "./uplodsimages/test100.jpg "
#cap = cv2.VideoCapture(0)
#while cap.isOpened():
while True:

        #success, image = cap.read()
        #image = cv2.imread(path)
        image = cv2.imdecode(img_array,1)
        imgContour = image.copy()
        imgBlur = cv2.GaussianBlur(image, (7, 7), 1)
        imgGray = cv2.cvtColor(imgBlur, cv2.COLOR_BGR2GRAY)
        threshold1 = cv2.getTrackbarPos("Threshold1", "Parameters")
        threshold2 = cv2.getTrackbarPos("Threshold2", "Parameters")
        imgCanny = cv2.Canny(imgGray, threshold1, threshold2)
        kernel = np.ones((5, 5))
        imgDil = cv2.dilate(imgCanny, kernel, iterations=1)
        getContours(imgDil, imgContour)
        imgStack = stackImages(0.8, ([image, imgCanny],
                                     [imgDil, imgContour]))
         




        print(url)
        cv2.imshow('mediaPipe Objection', imgContour)

        if cv2.waitKey(5) & 0xFF ==27:
               break

   # cap.release()





