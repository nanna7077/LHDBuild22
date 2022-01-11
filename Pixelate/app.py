"""Program to pixelate images built using GTK 3.
Written for Local Hack Day: Build Day 2 Challenge"""

import tempfile
import random
import os

import gi
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk

from PIL import Image

if os.name=="nt":
    fileSeparator="\\"
else:
    fileSeparator="/"

def save_image(image, outputFile) -> None:
    with open(outputFile, 'wb') as fp:
        image.save(fp)

def getTempImageFile(image) -> str:
    savepath=tempfile.gettempdir()+fileSeparator+str(random.randint(10000, 99999))+".png"
    image.save(savepath)
    return savepath

def pixelArtGenerator(inputFile, pixelSize) -> Image:
    image=Image.open(inputFile)
    image = image.resize((image.size[0] // pixelSize, image.size[1] // pixelSize), Image.NEAREST)
    image = image.resize((image.size[0] * pixelSize, image.size[1] * pixelSize),Image.NEAREST)
    return image

class MainWindow(Gtk.Window):
    def __init__(self) -> None:
        super().__init__(title="Pixelate")
        self.initalize()

    def initalize(self, *args):
        try:
            self.remove(self.grid)
        except:
            pass
        self.grid = Gtk.Grid()
        self.grid.set_row_spacing(5)
        self.grid.set_column_spacing(5)
        self.add(self.grid)
        initialDialogOpenButton = Gtk.Button(label="Choose File to Pixelate")
        initialDialogOpenButton.connect("clicked", self.on_initialDialogOpenButton_button_clicked)
        appLabel=Gtk.Label("Pixelate")
        appLabel.set_markup("<span size='xx-large' weight='bold'>Pixelate</span>")
        appLabel.set_justify(Gtk.Justification.CENTER)
        appLabel.set_selectable(False)
        self.grid.attach(appLabel, 4, 0, 6, 6)
        self.grid.attach(initialDialogOpenButton, 4, 8, 5, 5)
        self.show_all()
    
    def on_initialDialogOpenButton_button_clicked(self, widget):
        def add_filters(dialog):
            filefilter = Gtk.FileFilter()
            filefilter.set_name("Images")
            filefilter.add_pattern("*.png")
            filefilter.add_pattern("*.jpg")
            filefilter.add_pattern("*.bmp")
            dialog.add_filter(filefilter)

        dialog = Gtk.FileChooserDialog(title="Please choose a file", parent=self, action=Gtk.FileChooserAction.OPEN)
        add_filters(dialog)
        dialog.add_buttons(Gtk.STOCK_CANCEL, Gtk.ResponseType.CANCEL, Gtk.STOCK_OPEN, Gtk.ResponseType.OK)
        response = dialog.run()
        if response == Gtk.ResponseType.OK:
            self.displayAndGetPixelationValue(dialog.get_filename())
        elif response == Gtk.ResponseType.CANCEL:
            pass
        dialog.destroy()
    
    def displayAndGetPixelationValue(self, filePath, pixelSize=1):
        self.filePath=filePath
        self.remove(self.grid)
        self.grid = Gtk.Grid()
        self.add(self.grid)
        self.pixelSize=pixelSize
        selectPixelationLabel=Gtk.Label("Select Pixelation Amount")
        selectPixelationLabel.set_markup("<span size='xx-large' weight='bold'>Select Pixelation Amount</span>")
        selectPixelationLabel.set_justify(Gtk.Justification.CENTER)
        selectPixelationLabel.set_selectable(False)
        self.grid.attach(selectPixelationLabel, 4, 0, 6, 6)
        image=Gtk.Image()
        image=image.new_from_file(getTempImageFile(pixelArtGenerator(self.filePath, self.pixelSize)))
        self.grid.attach(image, 4, 8, 5, 5)
        vscale = Gtk.VScale()
        vscale.set_range(1, 20)
        vscale.set_value(self.pixelSize)
        vscale.connect('value-changed', self.on_slider_done)
        self.grid.attach(vscale, 20, 8, 6, 6)
        saveButton = Gtk.Button(label="Save Image")
        saveButton.connect("clicked", self.on_saveButton_button_clicked)
        self.grid.attach(saveButton, 30, 8, 7, 7)
        self.show_all()
    
    def on_saveButton_button_clicked(self, *args):
        def add_filters(dialog):
            filefilter = Gtk.FileFilter()
            filefilter.set_name("Images")
            filefilter.add_pattern("*.png")
            filefilter.add_pattern("*.jpg")
            filefilter.add_pattern("*.bmp")
            dialog.add_filter(filefilter)

        dialog = Gtk.FileChooserDialog("Please choose a file", None, Gtk.FileChooserAction.SAVE, (Gtk.STOCK_CANCEL, Gtk.ResponseType.CANCEL, Gtk.STOCK_SAVE, Gtk.ResponseType.OK))
        add_filters(dialog)
        response = dialog.run()
        if response == Gtk.ResponseType.OK:
            file_path = dialog.get_filename()
            if len(file_path.split(fileSeparator)[-1].split("."))==1:
                file_path+=".png"
            save_image(pixelArtGenerator(self.filePath, self.pixelSize), file_path)
            self.remove(self.grid)
            self.grid=Gtk.Grid()
            self.add(self.grid)
            savedsuccessfullymessage=Gtk.Label("Saved successfully to {}".format(file_path))
            savedsuccessfullymessage.set_markup("<span size='x-large' weight='bold'>Saved successfully to {}</span>".format(file_path))
            oknicegoback=Gtk.Button(label="OK")
            oknicegoback.connect("clicked", self.initalize)
            self.grid.attach(savedsuccessfullymessage, 4, 0, 6, 6)
            self.grid.attach(oknicegoback, 4, 8, 5, 5)
            self.show_all()
        elif response == Gtk.ResponseType.CANCEL:
            pass
        dialog.destroy()
    
    def on_slider_done(self, vscale):
        self.displayAndGetPixelationValue(self.filePath, int(vscale.get_value()))

win = MainWindow()
win.connect("destroy", Gtk.main_quit)
win.show_all()
Gtk.main()
