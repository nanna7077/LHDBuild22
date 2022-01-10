"""Script to get current weather based on user's current location.
Written for Local Hack Day: Build Day 1 Challenge"""

import requests
import socket
from colorama import Fore, Style

WEATHERAPIKEY="" # Please sign up at https://www.weatherapi.com/ to get the API Key and set it here.

def is_connected():
    try:
        host = socket.gethostbyname("one.one.one.one")
        s = socket.create_connection((host, 80), 2)
        s.close()
        return True
    except:
        pass
    return False

def ProcessResponse(response):
    """ Change non-pythonic data values to pythonic data values """
    response=str(response)
    response=response.replace("null", 'None')
    response=response.replace('false', 'False')
    response=response.replace('true', 'True')
    return response

def display(message, _type="NORMAL"):
    """ Display Output"""
    if _type=="ERROR":
        print("["+Fore.RED+_type+Fore.RESET+"] "+Fore.GREEN+message)
        print(Style.RESET_ALL)
    if _type=="NORMAL":
        print(Fore.GREEN+message)
        print(Style.RESET_ALL)

if WEATHERAPIKEY=="":
    display("Please get a API Key from https://www.weatherapi.com/ and add it in the script.", "ERROR")
    exit()
if not is_connected():
    display("Internet not available or unreachable.", "ERROR")
    exit()
locationRequest=requests.get("http://ipinfo.io")
if locationRequest:
    locationInfo=eval(eval(ProcessResponse(locationRequest.content)))
    lat_long=locationInfo["loc"]
else:
    display("Location Identification service unreachable.", "ERROR")
    exit()
weatherRequest=requests.get("http://api.weatherapi.com/v1/current.json?key="+WEATHERAPIKEY+"&q="+lat_long)
if weatherRequest:
    weatherInformation=eval(eval(ProcessResponse(weatherRequest.content)))
    outmessage="""
Weather at {location}, {region}, {country}.

{BOLD}{weatherText}{RESET_ALL} {MAGENTACLR}{currentTempCel}°C ({currentTempFar}°F{RESETCOLOR}) which feels like {MAGENTACLR}{feelsTempCel}°C ({feelsTempFar}°F{RESETCOLOR}) with {cloud} sky.
Wind Speed is {MAGENTACLR}{windSpeedMPH} MPH ({windSpeedKPH} KPH){MAGENTACLR} in {YELLOWCLR}{windDir}{RESETCOLOR} direction.
Humidity is at {humidity} and UV Index is at {uvindex}.
""".format(
    location=weatherInformation['location']['name'], region=weatherInformation['location']['region'], country=weatherInformation['location']['country'],
    weatherText=weatherInformation['current']['condition']['text'],
    currentTempCel=weatherInformation['current']['temp_c'], currentTempFar=weatherInformation['current']['temp_f'], feelsTempCel=weatherInformation['current']['feelslike_c'], feelsTempFar=weatherInformation['current']['feelslike_f'],
    windSpeedMPH=weatherInformation['current']['wind_mph'], windSpeedKPH=weatherInformation['current']['wind_kph'], windDir=weatherInformation['current']['wind_dir'],
    humidity=weatherInformation['current']['humidity'], cloud=(lambda x: "cloudy" if x>=50 else ("partially cloudy" if x>25 else "clear"))(weatherInformation['current']['cloud']), uvindex=weatherInformation['current']['uv'],
    MAGENTACLR=Fore.MAGENTA, RESETCOLOR=Fore.RESET, YELLOWCLR=Fore.YELLOW, BOLD=Style.BRIGHT, RESET_ALL=Style.RESET_ALL
)
    display(message=outmessage)
else:
    display("Weather service unreachable.", "ERROR")
