# Pixelate
Allows the user to select an image and pixelation amount with a live preview of pixelation and saves a pixelated image.

![Demo Image](https://github.com/nanna7077/LHDBuild22/blob/main/Pixelate/images/1.png?raw=true)

#### How to run the program:
#### Linux:
1. Open a terminal and enter your virtual environment and do
##### Debian/Ubuntu Based Distro's: 
Execute ```sudo apt install libgirepository1.0-dev gcc libcairo2-dev pkg-config python3-dev gir1.2-gtk-3.0``` to install the build dependencies and GTK.
##### Arch Based Distro's: 
Execute ```sudo pacman -S python cairo pkgconf gobject-introspection gtk3``` to install the build dependencies and GTK.
##### Fedora: 
Execute ```sudo dnf install gcc gobject-introspection-devel cairo-gobject-devel pkg-config python3-devel gtk3``` to install the build dependencies and GTK.
##### openSUSE:
Execute ```sudo zypper install cairo-devel pkg-config python3-devel gcc gobject-introspection-devel``` to install the build dependencies and GTK.

2. Execute ```pip3 install pycairo``` to build and install Pycairo
3. Execute ```pip3 install PyGObject``` to build and install PyGObject
4. Change the working directory to where the app.py script can be found
5. Run python3 app.py

#### macOS:

1. Go to https://brew.sh/ and install homebrew
2. Open a terminal
3. Execute brew install pygobject3 gtk+3
4. Change the working directory to where app.py script can be found
5. Run python3 app.py

#### Windows:

1. Go to http://www.msys2.org/ and download the x86_64 installer
2. Follow the instructions on the page for setting up the basic environment
3. Run ```C:\msys64\mingw64.exe``` - a terminal window should pop up
4. Execute ```pacman -Suy```
5. Execute ```pacman -S mingw-w64-x86_64-gtk3 mingw-w64-x86_64-python3 mingw-w64-x86_64-python3-gobject```
6. Copy the app.py script you created to C:\msys64\home\<username>
7. In the mingw32 terminal execute ```python3 app.py``` - a window should appear.

### Screenshots:

![Test Image](https://github.com/nanna7077/LHDBuild22/blob/main/Pixelate/images/2.png?raw=true)

![Pixelated Test Image](https://github.com/nanna7077/LHDBuild22/blob/main/Pixelate/images/3.png?raw=true)
