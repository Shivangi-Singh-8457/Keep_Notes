from flask import Flask, request
import json
from bson import ObjectId
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from flask_mail import Mail, Message
import random
from cryptography.fernet import Fernet

app = Flask(__name__)
mail=Mail(app)
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'email'
app.config['MAIL_PASSWORD'] = 'password'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)
app.config['CORS_HEADERS']='Content-Type'
CORS(app, support_credentials=True)

CONNECTION_STRING = "connect_url"
client = MongoClient(CONNECTION_STRING)
db=client['keep']
users=db['users']
notes=db['notes']
user=""
isLogin=False
# key = Fernet.generate_key()
key=""
fernet = Fernet(key)
def sendMail(otp):
   global user_email 
   msg = Message('Hello', sender = 'email', recipients = [user_email])
   msg.body = "This email is from Keep Notes.\nyour OTP is "+otp+"."
   mail.send(msg)

def generate_otp():
    global otp
    otp=random.randint(1000,9999)
    print(str(otp))
    sendMail(str(otp)) 
    print("sentmail_1")
    return 

@app.route("/register",methods=["GET","POST"])
@cross_origin(supports_credentials=True)
def register():
   # print("get data")
   data=request.get_data()
   global user_email
   user_email=data.decode()
   print(user_email)
   # print(data)
   result=users.find_one({"email":user_email})
   # print(result)
   if result is not None:
      return json.dumps("false")
   generate_otp()
   return json.dumps("true")
   

@app.route("/register_otp",methods=["GET","POST"])
@cross_origin(supports_credentials=True)
def register_otp():
   data=request.get_json()
   print(data)
   if data['otp']==str(otp):
      data['password'] = fernet.encrypt(data['password'].encode())
      del data['otp']
      users.insert_one(data)
      return json.dumps("true")
   else:
      return json.dumps("false")

@app.route("/login",methods=["GET","POST"])
@cross_origin(supports_credentials=True)
def login():
   data=request.get_json()
   result=users.find_one({"email":data["email"]})
   global isLogin
   global user
   if result is None:
      return json.dumps(["You are not our registered user, register yourself.","false"])
   else:
      result['password']=fernet.decrypt(result['password']).decode()
   if result['email']==data['email'] and result['password']==data['password']:
      isLogin=True
      user=data['email']
      return json.dumps(["You are logged in successfully.","true"])
   else:
      return json.dumps(["Bad Request.","false"])
   
@app.route("/check_email", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)  
def check_email():
   data = request.get_data()
   global user_email
   user_email=data.decode()
   print(user_email)
   result=users.find_one({'email':user_email})
   if result is not None:
      generate_otp()
      return json.dumps("true")
   else:
      return json.dumps("false")
    
           
@app.route("/check_otp", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def check_otp():
   data=request.get_data()
   getotp=data.decode()
   global otp
   if(str(otp)==getotp):
      return json.dumps("true")
   else:
      return json.dumps("false")

@app.route("/resend", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def resend():
   generate_otp()
   return json.dumps("")

@app.route("/change_pswd", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def change_pswd():
   data=request.get_json()
   data['password']=fernet.encrypt(data['password'].encode())
   users.update_one({'email':data['email']},{'$set':{'password':data['password']}})
   return json.dumps("Password changed successfully.")

@app.route("/checklogin", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def check_signin():
   global isLogin
   print(isLogin)
   if isLogin:
      return json.dumps("true")
   else:
      return json.dumps("false")


@app.route("/logout", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)        
def signout():
   global isLogin
   isLogin=False
   print(isLogin)
   global user
   user=""
   print(user)
   return json.dumps("You are logged out.")

class JSONEncoder(json.JSONEncoder):
   def default(self, o):
      if isinstance(o, ObjectId):
         return str(o)  # Convert ObjectId to its string representation
      return super().default(o)

def getDocuments():
   documents = notes.find({'email': user})
   list_docs=[]
   for doc in documents:
     encoded_doc = json.dumps(doc, cls=JSONEncoder)
     list_docs.append(json.loads(encoded_doc))
   return list_docs  

@app.route("/getNotes",methods=["GET","POST"])
@cross_origin(supports_credentials=True)
def getNotes():
   list_docs=getDocuments()
   return json.dumps(list_docs)

@app.route("/saveNotes",methods=["GET","POST"])
@cross_origin(supports_credentials=True)
def saveNotes():
   data=request.get_json()
   print(1)
   data['email']=user
   print(data)
   notes.insert_one(data)
   query = {'email': user}  # Filter documents by email
   sort_key = '_id'  # Assuming _id represents the insertion timestamp
   sort_order = -1  # Sort in descending order
   options = {'sort': [(sort_key, sort_order)], 'limit': 1}  # Sort and limit the result
   recent_document = notes.find_one(query, **options)
   encoded_doc = json.dumps(recent_document, cls=JSONEncoder)
   return json.dumps(json.loads(encoded_doc))

@app.route("/deleteNotes",methods=["GET","POST"])
@cross_origin(supports_credentials=True)
def deleteNotes():
   data=request.get_data()
   getKey=data.decode()
   print(getKey)
   object_id = ObjectId(getKey)
   notes.delete_one({'_id': object_id})
   return json.dumps(getKey)

if __name__ == '__main__':
   app.run(debug=True)
