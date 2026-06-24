from PIL import Image

input_path = r'C:\Users\hp\.gemini\antigravity-ide\brain\0ef4758a-47b3-4b5f-ad5e-a61f455873cc\.tempmediaStorage\media_0ef4758a-47b3-4b5f-ad5e-a61f455873cc_1782238854337.png'
output_path = r'c:\laragon\www\fullmarkdisegn\academy\assets\img\avatar-default.png'

try:
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    # Loop through every pixel
    for item in datas:
        # If the pixel is white (or very close to it), make it transparent
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print("Background removed successfully.")
except Exception as e:
    print(f"Error: {e}")
