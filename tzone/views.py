from flask import Blueprint, request, render_template, flash, g, session, redirect, url_for
from functools import wraps
from utils import *
import pytz
from datetime import datetime

from users.views import login_required

mod = Blueprint('tzone', __name__, url_prefix='/tzone')

@mod.route('/app', methods=['GET'])
@templated("app.html")
def home():
    print "apikey", g.appConfig['google_api_key']
    return {"google_api_key": g.appConfig['google_api_key'], "content" : "home", "content_body" : "body "}

#get  
@mod.route('/', methods=['GET'])
@mod.route('/<entryid>', methods=['GET'])
@login_required()
def tzone(entryid=None):
    if entryid == None:
        data = []
        for f in g.db.friends.find({"uid": session['uid']}):
            insertUTCOffset(f)
            f["id"] = str(f["_id"])
            del f["_id"]
            data.append(f)
        return makeJSONResponse(data)
    else:
        f = g.db.friends.find_one({'_id': ObjectId(entryid)})
        insertUTCOffset(f)
        f["id"] = str(f["_id"])
        del f["_id"]
        print f
        return makeJSONResponse(f)

def insertUTCOffset(person):
    if "timezoneid" in person:
        person["UTCOffset"] = getUTCOffset(person["timezoneid"])

def getUTCOffset(tzName):
    try:
        return datetime.now(pytz.timezone(tzName)).strftime('%z')
    except pytz.UnknownTimeZoneError:
        return "0000"

def removeUTCOffset(person):
    if "UTCOffset" in person:
        del person["UTCOffset"]
    return person
	
# create
@mod.route('/', methods=['POST'])
@login_required()
def createTZoneEntry():
    return createDocument(g.db.friends, request.json)

# update 
@mod.route('/<entryid>', methods=['PUT'])
@login_required()
def updateTZoneEntry(entryid):
    return updateDocumnet(g.db.friends, entryid, removeUTCOffset(request.json))

# delete
@mod.route('/<entryid>', methods=['DELETE'])
@login_required()
def deleteZoneEntry(entryid):
    return deleteDocument(g.db.friends, entryid)
